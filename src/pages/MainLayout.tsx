import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { NotificationBell } from '../features/notifications/components/NotificationBell';
import { NotificationDropdown } from '../features/notifications/components/NotificationDropdown';
import { useNotificationContext } from '../context/NotificationContext';
import type { AppNotification } from '../features/notifications/types/notification.types';

type NavTab = 'home' | 'profile';

const tabRoutes: Record<NavTab, string> = {
  home: '/',
  profile: '/profile',
};

function getActiveTab(pathname: string): NavTab {
  if (pathname.startsWith('/profile')) return 'profile';
  return 'home';
}

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = getActiveTab(location.pathname);
  const showNav = !location.pathname.startsWith('/groups/');

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

  function handleTabChange(tab: NavTab) {
    navigate(tabRoutes[tab]);
  }

  function handleNotificationClick(notification: AppNotification) {
    markAsRead(notification.id);
    navigate(`/groups/${notification.groupId}`);
  }

  return (
    <>
      <Outlet />
      {showNav && <BottomNav active={activeTab} onChange={handleTabChange} />}
      <div ref={containerRef} style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
        <NotificationBell
          unreadCount={unreadCount}
          onClick={() => setShowNotifications((prev) => !prev)}
        />
        {showNotifications && (
          <NotificationDropdown
            notifications={notifications}
            onNotificationClick={handleNotificationClick}
            onMarkAllRead={markAllAsRead}
            onClose={() => setShowNotifications(false)}
          />
        )}
      </div>
    </>
  );
}
