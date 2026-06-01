import { EmptyState } from '../../../components/EmptyState';
import { TabContentSkeleton } from '../../../components/Skeleton';
import type { MemberDetail } from '../types/group.types';

interface MembersTabProps {
  members: MemberDetail[];
  loading: boolean;
  currentRound: number;
  isOrganizer: boolean;
  organizerId: string;
  onAddMember: () => void;
  onMessageClick: (userId: string, userName: string) => void;
}

export function MembersTab({ members, loading, currentRound, isOrganizer, organizerId, onAddMember, onMessageClick }: MembersTabProps) {
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

      {!isOrganizer && !members.some((m) => m.userId === organizerId) && (
        <div
          className="card"
          style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}
        >
          <div className="avatar" style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))' }}>O</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 600 }}>Group Organizer</p>
            <p style={{ fontSize: 12, color: 'var(--text2)' }}>Organizer</p>
          </div>
          <button
            onClick={() => onMessageClick(organizerId, 'Group Organizer')}
            style={{ width: 'auto', padding: 8, background: 'transparent', border: '1px solid var(--border)', borderRadius: 8, cursor: 'pointer', color: 'var(--text2)', display: 'flex', alignItems: 'center' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
      )}

      {members.length === 0 ? (
        <EmptyState message="No members have been added yet." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[...members].sort((a, b) => a.payoutOrder - b.payoutOrder).map((m) => {
            const isCurrent = m.payoutOrder === currentRound;
            const showMessage = isOrganizer || m.userId === organizerId;
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
                {showMessage && (
                  <button
                    className="btn-outline"
                    onClick={() => onMessageClick(m.userId, m.fullName)}
                    style={{ width: 'auto', padding: 8, background: 'transparent', border: '1px solid var(--border)', borderRadius: 8, cursor: 'pointer', color: 'var(--text2)', display: 'flex', alignItems: 'center' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
