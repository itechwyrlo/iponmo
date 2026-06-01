interface NotificationPermissionBannerProps {
  onEnable: () => void;
  onDismiss: () => void;
}

export function NotificationPermissionBanner({ onEnable, onDismiss }: NotificationPermissionBannerProps) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 16,
    }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text1)', marginBottom: 2 }}>
          Stay in the loop
        </p>
        <p style={{ fontSize: 12, color: 'var(--text2)' }}>
          Get notified when someone messages or pays in your groups.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
        <button
          onClick={onEnable}
          style={{
            background: 'var(--primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '6px 14px',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Enable
        </button>
        <button
          onClick={onDismiss}
          style={{
            background: 'transparent',
            color: 'var(--text2)',
            border: 'none',
            padding: '4px 0',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
