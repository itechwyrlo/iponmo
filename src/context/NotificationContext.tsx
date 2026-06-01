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
    if (unsubscribeRef.current) {
      console.log('[FCM] setupFcm skipped: listener already registered');
      return;
    }
    console.log('[FCM] setupFcm starting…');
    const messaging = getOrInitMessaging();
    let fcmToken: string;
    try {
      fcmToken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      console.log('[FCM] getToken succeeded:', fcmToken.slice(0, 20) + '…');
    } catch (err) {
      console.error('[FCM] getToken FAILED — push will not work:', err);
      return;
    }
    try {
      await saveFcmToken(fcmToken, authToken);
      console.log('[FCM] FCM token saved to backend successfully');
    } catch (err) {
      console.error('[FCM] saveFcmToken FAILED — backend may have stale token:', err);
    }
    unsubscribeRef.current = onMessage(messaging, (payload) => {
      console.log('[FCM] foreground message received. Full payload:', JSON.stringify(payload));
      const { data, notification: n } = payload;
      if (!data) {
        console.warn('[FCM] payload has no "data" field — notification dropped.');
        return;
      }
      if (data['type'] === 'new_message') {
        console.log('[FCM] adding message notification from', n?.title, 'groupId:', data['groupId']);
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
      } else if (data['type'] === 'payment_confirmed') {
        console.log('[FCM] adding payment notification for group:', data['groupName'], 'round:', data['round']);
        addNotification({
          id: crypto.randomUUID(),
          type: 'payment_confirmed',
          groupName: data['groupName'] ?? '',
          round: parseInt(data['round'] ?? '0', 10),
          receivedAt: new Date().toISOString(),
          isRead: false,
        });
      } else {
        console.warn('[FCM] data.type is "' + data['type'] + '" — unhandled notification type.');
      }
    });
    console.log('[FCM] onMessage foreground listener registered');
  }, [addNotification]);

  useEffect(() => {
    const cleanup = () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
        console.log('[FCM] onMessage listener unregistered (cleanup)');
      }
    };

    if (!token) {
      console.log('[FCM] useEffect: no auth token — skipping FCM setup');
      return cleanup;
    }
    if (!('Notification' in window)) {
      console.warn('[FCM] useEffect: Notification API not supported in this browser');
      return cleanup;
    }
    if (!('serviceWorker' in navigator)) {
      console.warn('[FCM] useEffect: Service Worker not supported in this browser');
      return cleanup;
    }

    console.log('[FCM] useEffect: token present, Notification.permission =', Notification.permission);

    if (Notification.permission === 'granted') {
      setupFcm(token).catch((err) => console.error('[FCM] setupFcm unexpected error:', err));
    } else {
      console.log('[FCM] useEffect: permission not granted yet — FCM setup deferred');
    }

    return cleanup;
  }, [token, setupFcm]);

  const requestNotificationPermission = useCallback(async (): Promise<void> => {
    if (!token || !('Notification' in window) || !('serviceWorker' in navigator)) return;

    console.log('[FCM] requestNotificationPermission: calling Notification.requestPermission()');
    const permission = await Notification.requestPermission();
    console.log('[FCM] requestNotificationPermission: user answered =', permission);
    setPermissionStatus(permission);

    if (permission !== 'granted') return;
    await setupFcm(token).catch((err) => console.error('[FCM] requestNotificationPermission: setupFcm failed:', err));
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
