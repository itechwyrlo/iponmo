import { EmptyState } from '../../../components/EmptyState';
import { TabContentSkeleton } from '../../../components/Skeleton';
import type { PaymentStatus } from '../types/group.types';

interface PaymentsTabProps {
  payments: PaymentStatus[];
  loading: boolean;
  currentRound: number;
  isOrganizer: boolean;
  onMarkPaid: (memberId: string) => void;
  onPayClick: () => void;
}

export function PaymentsTab({
  payments,
  loading,
  currentRound,
  isOrganizer,
  onMarkPaid,
  onPayClick,
}: PaymentsTabProps) {
  if (loading) return <TabContentSkeleton />;

  return (
    <div style={{ padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <p style={{ fontSize: 13, color: 'var(--text2)', fontWeight: 600 }}>
          ROUND {currentRound} PAYMENTS
        </p>
        {!isOrganizer && (
          <button
            className="btn btn-outline"
            style={{ width: 'auto', padding: '7px 14px', fontSize: 13 }}
            onClick={onPayClick}
          >
            Pay via GCash/Maya
          </button>
        )}
      </div>

      {payments.length === 0 ? (
        <EmptyState message="No payment records for this round yet." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {payments.map((p) => {
            const initials = p.memberName.split(' ').map((n) => n[0]).join('').slice(0, 2);
            return (
              <div key={p.memberId} className="card" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="avatar">{initials}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: 15 }}>{p.memberName}</p>
                  <p style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>
                    {p.isPaid ? `Paid on ${new Date(p.paidAt!).toLocaleDateString()}` : 'Not yet paid'}
                  </p>
                </div>
                {p.isPaid ? (
                  <span style={{ fontSize: 20 }}>✓</span>
                ) : isOrganizer ? (
                  <button
                    className="btn btn-primary"
                    style={{ width: 'auto', padding: '8px 14px', fontSize: 13 }}
                    onClick={() => onMarkPaid(p.memberId)}
                  >
                    Mark Paid
                  </button>
                ) : (
                  <span style={{ fontSize: 13, color: 'var(--danger)', fontWeight: 600 }}>Pending</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
