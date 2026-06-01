import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useNotificationContext } from '../context/NotificationContext';
import { useGroups } from '../features/groups/hooks/useGroups';
import { useNotificationBell } from '../features/notifications/hooks/useNotificationBell';
import { GroupCard } from '../features/groups/components/GroupCard';
import { CreateGroupModal } from '../features/groups/components/CreateGroupModal';
import { NotificationBell } from '../features/notifications/components/NotificationBell';
import { NotificationDropdown } from '../features/notifications/components/NotificationDropdown';
import { NotificationPermissionBanner } from '../features/notifications/components/NotificationPermissionBanner';
import { GroupCardSkeleton } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';
import type { AppNotification } from '../features/notifications/types/notification.types';

export function GroupListPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { permissionStatus, requestNotificationPermission } = useNotificationContext();
  const { groups, loading, error, refetch } = useGroups();
  const [showCreate, setShowCreate] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    showNotifications,
    toggleNotifications,
    closeNotifications,
    containerRef,
    dropdownPosition,
  } = useNotificationBell();

  const totalContributed = groups.reduce((sum, g) => sum + g.paidCount * g.contributionAmount, 0);
  const pendingCount = groups.filter((g) => !g.myPaymentStatus).length;

  function handleNotificationClick(notification: AppNotification) {
    markAsRead(notification.id);
    if (notification.type === 'new_message') {
      navigate(`/groups/${notification.groupId}`);
    }
    closeNotifications();
  }

  return (
    <div className="screen">
      <div className="page-header" style={{ paddingBottom: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="avatar" style={{ width: 44, height: 44, fontSize: 16, flexShrink: 0 }}>
              {user?.email.charAt(0).toUpperCase()}
            </div>
            <p style={{ fontSize: 13, color: 'var(--text2)', fontWeight: 600 }}>
              Kumusta, {user?.email} 👋
            </p>
          </div>
          <div ref={containerRef}>
            <NotificationBell unreadCount={unreadCount} onClick={toggleNotifications} />
            {showNotifications && (
              <NotificationDropdown
                notifications={notifications}
                onNotificationClick={handleNotificationClick}
                onMarkAllRead={markAllAsRead}
                onClose={closeNotifications}
                position={dropdownPosition}
              />
            )}
          </div>
        </div>
        <h1 style={{ fontSize: 26, marginTop: 16, marginBottom: 4 }}>My Groups</h1>

        <div className="stat-row" style={{ marginTop: 20 }}>
          <div className="stat-box">
            <div className="stat-value">₱{totalContributed.toLocaleString()}</div>
            <div className="stat-label">Total Collected</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{groups.length}</div>
            <div className="stat-label">Active Groups</div>
          </div>
          <div className="stat-box">
            <div className="stat-value" style={{ color: pendingCount > 0 ? 'var(--danger)' : 'var(--success)' }}>
              {pendingCount}
            </div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
      </div>

      <div style={{ height: 20 }} />

      <div className="scroll-container">
        {permissionStatus === 'default' && !bannerDismissed && (
          <NotificationPermissionBanner
            onEnable={() => { void requestNotificationPermission(); }}
            onDismiss={() => setBannerDismissed(true)}
          />
        )}

        {loading && (
          <>
            <GroupCardSkeleton />
            <GroupCardSkeleton />
            <GroupCardSkeleton />
          </>
        )}

        {!loading && error && (
          <EmptyState message="Could not load groups. Check your connection and try again." />
        )}

        {!loading && !error && groups.length === 0 && (
          <EmptyState message="No groups yet. Create one to get started." />
        )}

        {!loading && !error && groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            currentUserId={user?.userId ?? ''}
            onSelect={(id) => navigate(`/groups/${id}`)}
          />
        ))}
      </div>

      <button className="fab" onClick={() => setShowCreate(true)}>+</button>

      {showCreate && (
        <CreateGroupModal
          onClose={() => setShowCreate(false)}
          onCreated={refetch}
        />
      )}
    </div>
  );
}
