import { EmptyState } from '../../../components/EmptyState';
import { TabContentSkeleton } from '../../../components/Skeleton';
import type { MemberDetail } from '../types/group.types';

interface MembersTabProps {
  members: MemberDetail[];
  loading: boolean;
  currentRound: number;
  isOrganizer: boolean;
  onAddMember: () => void;
}

export function MembersTab({ members, loading, currentRound, isOrganizer, onAddMember }: MembersTabProps) {
  if (loading) return <TabContentSkeleton />;

  return (
    <div style={{ padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <p style={{ fontSize: 13, color: 'var(--text2)', fontWeight: 600 }}>PAYOUT ORDER</p>
        {isOrganizer && (
          <button className="btn btn-outline" style={{ width: 'auto', padding: '7px 14px', fontSize: 13 }} onClick={onAddMember}>
            + Add Member
          </button>
        )}
      </div>

      {members.length === 0 ? (
        <EmptyState message="No members have been added yet." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[...members].sort((a, b) => a.payoutOrder - b.payoutOrder).map((m) => {
            const isCurrent = m.payoutOrder === currentRound;
            return (
              <div
                key={m.userId}
                className="card"
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  border: isCurrent ? '1px solid var(--primary)' : undefined,
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: isCurrent ? 'rgba(244,165,53,0.15)' : 'var(--card2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 14,
                  color: isCurrent ? 'var(--primary)' : 'var(--text3)',
                }}>
                  {m.payoutOrder}
                </div>
                <div className="avatar">{m.fullName.charAt(0)}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600 }}>{m.fullName}</p>
                  <p style={{ fontSize: 12, color: 'var(--text2)' }}>
                    {isCurrent ? 'Current recipient' : `Turn #${m.payoutOrder}`}
                  </p>
                </div>
                {isCurrent && <span style={{ color: 'var(--primary)', fontSize: 18 }}>🏆</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
