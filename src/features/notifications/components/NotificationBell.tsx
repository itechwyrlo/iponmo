interface NotificationBellProps {
  unreadCount: number;
  onClick: () => void;
}

export function NotificationBell({ unreadCount, onClick }: NotificationBellProps) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 8,
        color: 'var(--text1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
      {unreadCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            background: 'var(--primary)',
            color: '#fff',
            borderRadius: '50%',
            minWidth: 16,
            height: 16,
            fontSize: 10,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 3px',
            lineHeight: 1,
          }}
        >
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </button>
  );
}
