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

export function GroupListPageSkeleton() {
  return (
    <div className="screen">
      <div className="page-header" style={{ paddingBottom: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Skeleton width="44px" height="44px" borderRadius="50%" />
            <Skeleton height="13px" width="140px" />
          </div>
          <Skeleton width="32px" height="32px" borderRadius="50%" />
        </div>
        <div style={{ marginTop: 16, marginBottom: 4 }}>
          <Skeleton height="26px" width="42%" />
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ flex: 1, background: 'var(--card2)', borderRadius: 10, padding: 14 }}>
              <Skeleton height="20px" width="65%" />
              <div style={{ height: 6 }} />
              <Skeleton height="11px" width="80%" />
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 20 }} />
      <div className="scroll-container">
        <GroupCardSkeleton />
        <GroupCardSkeleton />
        <GroupCardSkeleton />
      </div>
    </div>
  );
}

export function ProfilePageSkeleton() {
  return (
    <div className="screen">
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Skeleton height="26px" width="100px" />
            <div style={{ height: 6 }} />
            <Skeleton height="13px" width="200px" />
          </div>
          <Skeleton width="32px" height="32px" borderRadius="50%" />
        </div>
      </div>
      <div className="scroll-container">
        <div className="card" style={{ textAlign: 'center', padding: '28px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <Skeleton width="72px" height="72px" borderRadius="50%" />
          <Skeleton height="22px" width="160px" />
          <Skeleton height="14px" width="80px" />
        </div>
        <div className="card">
          <Skeleton height="13px" width="100px" />
          <div style={{ height: 14 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <Skeleton height="11px" width="70px" />
              <div style={{ marginTop: 4 }}><Skeleton height="18px" width="55%" /></div>
            </div>
            <div style={{ height: 1, background: 'var(--border)' }} />
            <div>
              <Skeleton height="11px" width="50px" />
              <div style={{ marginTop: 4 }}><Skeleton height="18px" width="70%" /></div>
            </div>
            <div style={{ height: 1, background: 'var(--border)' }} />
            <div>
              <Skeleton height="11px" width="40px" />
              <div style={{ marginTop: 4 }}><Skeleton height="18px" width="40%" /></div>
            </div>
          </div>
        </div>
        <div className="card">
          <Skeleton height="13px" width="80px" />
          <div style={{ height: 10 }} />
          <Skeleton height="13px" width="75%" />
          <div style={{ height: 10 }} />
          <Skeleton height="40px" />
        </div>
        <div className="card">
          <Skeleton height="13px" width="120px" />
          <div style={{ height: 4 }} />
          <Skeleton height="13px" width="80%" />
          <div style={{ height: 16 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Skeleton height="200px" />
            <Skeleton height="46px" />
          </div>
        </div>
      </div>
    </div>
  );
}
