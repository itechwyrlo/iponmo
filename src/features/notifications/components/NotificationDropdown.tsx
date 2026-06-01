import type { AppNotification } from '../types/notification.types';

interface DropdownPosition {
  top: number;
  right: number;
}

interface NotificationDropdownProps {
  notifications: AppNotification[];
  onNotificationClick: (notification: AppNotification) => void;
  onMarkAllRead: () => void;
  onClose: () => void;
  position: DropdownPosition;
}

function formatTimeAgo(isoString: string): string {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  if (diffSecs < 60) return 'just now';
  const diffMins = Math.floor(diffSecs / 60);
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
}

export function NotificationDropdown({
  notifications,
  onNotificationClick,
  onMarkAllRead,
  onClose,
  position,
}: NotificationDropdownProps) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1000,
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: position.top,
          right: position.right,
          width: `min(320px, calc(100vw - 32px))`,
          maxHeight: '60vh',
          overflowY: 'auto',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
          zIndex: 1001,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderBottom: '1px solid var(--border)',
            position: 'sticky',
            top: 0,
            background: 'var(--card)',
          }}
        >
          <span style={{ fontWeight: 600, fontSize: 16 }}>Notifications</span>
          <button
            onClick={onMarkAllRead}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--primary)',
              fontSize: 13,
              padding: 0,
            }}
          >
            Mark all read
          </button>
        </div>

        {notifications.length === 0 ? (
          <div style={{ padding: 24, textAlign: 'center', color: 'var(--text2)', fontSize: 14 }}>
            No notifications yet.
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => { onNotificationClick(n); onClose(); }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                padding: '12px 16px',
                cursor: 'pointer',
                borderBottom: '1px solid var(--border)',
                background: n.isRead ? 'transparent' : 'rgba(0,0,0,0.03)',
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: n.isRead ? 'transparent' : 'var(--primary)',
                  flexShrink: 0,
                  marginTop: 5,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 600, margin: 0, fontSize: 14, color: 'var(--text)' }}>
                  {n.senderName}
                </p>
                <p
                  style={{
                    margin: '2px 0',
                    fontSize: 13,
                    color: 'var(--text2)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {n.messagePreview}
                </p>
                <p style={{ margin: 0, fontSize: 11, color: 'var(--text2)' }}>
                  {formatTimeAgo(n.receivedAt)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
