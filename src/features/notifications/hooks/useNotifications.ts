import { useCallback, useState } from 'react';
import type { Notification } from '../types/notification.types';

interface UseNotificationsResult {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  replaceNotifications: (data: Notification[]) => void;
}

export function useNotifications(): UseNotificationsResult {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const addNotification = useCallback((notification: Notification): void => {
    setNotifications((prev) => [notification, ...prev]);
  }, []);

  const markAsRead = useCallback((id: string): void => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  }, []);

  const markAllAsRead = useCallback((): void => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  const replaceNotifications = useCallback((data: Notification[]): void => {
    setNotifications(data);
  }, []);

  return { notifications, unreadCount, addNotification, markAsRead, markAllAsRead, replaceNotifications };
}
