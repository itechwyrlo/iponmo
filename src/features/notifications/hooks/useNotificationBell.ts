import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { useNotificationContext } from '../../../context/NotificationContext';
import type { AppNotification } from '../types/notification.types';

interface UseNotificationBellResult {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  showNotifications: boolean;
  toggleNotifications: () => void;
  closeNotifications: () => void;
  containerRef: RefObject<HTMLDivElement>;
}

export function useNotificationBell(): UseNotificationBellResult {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showNotifications) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications]);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    showNotifications,
    toggleNotifications: () => setShowNotifications((prev) => !prev),
    closeNotifications: () => setShowNotifications(false),
    containerRef,
  };
}
