interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

export function Skeleton({ width = '100%', height = '16px', borderRadius = '8px' }: SkeletonProps) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, var(--card2) 25%, var(--border) 50%, var(--card2) 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.4s infinite',
      }}
    />
  );
}

export function GroupCardSkeleton() {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Skeleton height="18px" width="60%" />
      <Skeleton height="13px" width="40%" />
      <div style={{ height: 1, background: 'var(--border)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton height="13px" width="35%" />
        <Skeleton height="13px" width="25%" />
      </div>
    </div>
  );
}

export function GroupDetailSkeleton() {
  return (
    <div style={{ padding: '54px 20px 20px' }}>
      <Skeleton height="14px" width="40px" borderRadius="6px" />
      <div style={{ height: 16 }} />
      <Skeleton height="26px" width="50%" />
      <div style={{ height: 8 }} />
      <Skeleton height="14px" width="35%" />
      <div style={{ height: 20 }} />
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ flex: 1, background: 'var(--card2)', borderRadius: 10, padding: 14 }}>
          <Skeleton height="20px" width="60%" />
          <div style={{ height: 6 }} />
          <Skeleton height="11px" width="50%" />
        </div>
        <div style={{ flex: 1, background: 'var(--card2)', borderRadius: 10, padding: 14 }}>
          <Skeleton height="20px" width="60%" />
          <div style={{ height: 6 }} />
          <Skeleton height="11px" width="50%" />
        </div>
        <div style={{ flex: 1, background: 'var(--card2)', borderRadius: 10, padding: 14 }}>
          <Skeleton height="20px" width="60%" />
          <div style={{ height: 6 }} />
          <Skeleton height="11px" width="50%" />
        </div>
      </div>
    </div>
  );
}

export function TabContentSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '0 20px' }}>
      {[1, 2, 3].map((i) => (
        <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Skeleton width="38px" height="38px" borderRadius="50%" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Skeleton height="15px" width="55%" />
            <Skeleton height="12px" width="35%" />
          </div>
          <Skeleton height="15px" width="60px" />
        </div>
      ))}
    </div>
  );
}
