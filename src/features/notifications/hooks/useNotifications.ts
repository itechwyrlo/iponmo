import { useCallback, useState } from 'react';
import type { AppNotification } from '../types/notification.types';

interface UseNotificationsResult {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (notification: AppNotification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

export function useNotifications(): UseNotificationsResult {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const addNotification = useCallback((notification: AppNotification): void => {
    setNotifications((prev) => [notification, ...prev]);
    setUnreadCount((prev) => prev + 1);
  }, []);

  const markAsRead = useCallback((id: string): void => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, isRead: true } : n));
      setUnreadCount(updated.filter((n) => !n.isRead).length);
      return updated;
    });
  }, []);

  const markAllAsRead = useCallback((): void => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
  }, []);

  return { notifications, unreadCount, addNotification, markAsRead, markAllAsRead };
}
