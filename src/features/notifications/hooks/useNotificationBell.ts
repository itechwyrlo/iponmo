import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { useNotificationContext } from '../../../context/NotificationContext';
import type { AppNotification } from '../types/notification.types';

interface DropdownPosition {
  top: number;
  right: number;
}

interface UseNotificationBellResult {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  showNotifications: boolean;
  toggleNotifications: () => void;
  closeNotifications: () => void;
  containerRef: RefObject<HTMLDivElement>;
  dropdownPosition: DropdownPosition;
}

export function useNotificationBell(): UseNotificationBellResult {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>({ top: 0, right: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showNotifications) return;
    function handleScroll() {
      setShowNotifications(false);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showNotifications]);

  function toggleNotifications() {
    if (!showNotifications && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: Math.round(rect.bottom + 8),
        right: Math.max(0, Math.round(window.innerWidth - rect.right)),
      });
    }
    setShowNotifications((prev) => !prev);
  }

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    showNotifications,
    toggleNotifications,
    closeNotifications: () => setShowNotifications(false),
    containerRef,
    dropdownPosition,
  };
}
