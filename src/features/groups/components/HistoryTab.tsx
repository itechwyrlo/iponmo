import { EmptyState } from '../../../components/EmptyState';
import { TabContentSkeleton } from '../../../components/Skeleton';
import type { PayoutHistory } from '../types/group.types';

interface HistoryTabProps {
  history: PayoutHistory[];
  loading: boolean;
}

export function HistoryTab({ history, loading }: HistoryTabProps) {
  if (loading) return <TabContentSkeleton />;

  return (
    <div style={{ padding: '0 20px' }}>
      <p style={{ fontSize: 13, color: 'var(--text2)', fontWeight: 600, marginBottom: 16 }}>
        PAYOUT HISTORY
      </p>

      {history.length === 0 ? (
        <EmptyState message="No payouts have been made yet." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {history.map((p, i) => (
            <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="avatar" style={{ background: 'rgba(74,222,128,0.15)', color: 'var(--success)' }}>
                ₱
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600 }}>{p.memberName}</p>
                <p style={{ fontSize: 12, color: 'var(--text2)' }}>
                  Round {p.round} · {new Date(p.paidAt).toLocaleDateString()}
                </p>
              </div>
              <span style={{ fontFamily: 'Sora', fontWeight: 700, color: 'var(--success)', fontSize: 16 }}>
                +₱{p.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
