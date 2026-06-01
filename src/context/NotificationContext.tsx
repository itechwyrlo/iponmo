import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import type { Messaging } from 'firebase/messaging';
import { useAuthContext } from './AuthContext';
import { useNotifications } from '../features/notifications/hooks/useNotifications';
import { saveFcmToken } from '../features/notifications/services/notificationService';
import type { AppNotification } from '../features/notifications/types/notification.types';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let messagingInstance: Messaging | null = null;

function getOrInitMessaging(): Messaging {
  if (messagingInstance) return messagingInstance;
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  messagingInstance = getMessaging(app);
  return messagingInstance;
}

interface NotificationContextValue {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (notification: AppNotification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  permissionStatus: NotificationPermission;
  requestNotificationPermission: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { token } = useAuthContext();
  const { notifications, unreadCount, addNotification, markAsRead, markAllAsRead } = useNotifications();
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>(
    'Notification' in window ? Notification.permission : 'denied'
  );
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const setupFcm = useCallback(async (authToken: string): Promise<void> => {
    if (unsubscribeRef.current) return;
    const messaging = getOrInitMessaging();
    const fcmToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });
    await saveFcmToken(fcmToken, authToken).catch(() => null);
    unsubscribeRef.current = onMessage(messaging, (payload) => {
      const { data, notification: n } = payload;
      if (!data || data['type'] !== 'new_message') return;
      addNotification({
        id: crypto.randomUUID(),
        type: 'new_message',
        senderName: n?.title ?? 'Unknown',
        messagePreview: n?.body ?? '',
        groupId: data['groupId'] ?? '',
        groupName: '',
        receivedAt: new Date().toISOString(),
        isRead: false,
      });
    });
  }, [addNotification]);

  useEffect(() => {
    const cleanup = () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };

    if (!token || !('Notification' in window) || !('serviceWorker' in navigator)) {
      return cleanup;
    }

    if (Notification.permission === 'granted') {
      setupFcm(token).catch(() => null);
    }

    return cleanup;
  }, [token, setupFcm]);

  const requestNotificationPermission = useCallback(async (): Promise<void> => {
    if (!token || !('Notification' in window) || !('serviceWorker' in navigator)) return;

    const permission = await Notification.requestPermission();
    setPermissionStatus(permission);

    if (permission !== 'granted') return;
    await setupFcm(token).catch(() => null);
  }, [token, setupFcm]);

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, addNotification, markAsRead, markAllAsRead, permissionStatus, requestNotificationPermission }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext(): NotificationContextValue {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotificationContext must be used inside NotificationProvider');
  return context;
}
