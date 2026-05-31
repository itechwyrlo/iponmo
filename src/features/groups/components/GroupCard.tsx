import type { GroupSummary } from '../types/group.types';

interface GroupCardProps {
  group: GroupSummary;
  currentUserId: string;
  onSelect: (id: string) => void;
}

export function GroupCard({ group, currentUserId, onSelect }: GroupCardProps) {
  const isOrganizer = group.organizerId === currentUserId;
  const isPaid = group.myPaymentStatus;

  return (
    <div className="card card-pressable" onClick={() => onSelect(group.id)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 16 }}>{group.name}</span>
            {isOrganizer && <span className="badge badge-warning">Organizer</span>}
          </div>
          <p style={{ fontSize: 13, color: 'var(--text2)' }}>
            ₱{group.contributionAmount.toLocaleString()} / {group.schedule} · {group.totalSlots} slots
          </p>
        </div>
        <span style={{ fontSize: 18, color: 'var(--text3)' }}>›</span>
      </div>

      <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13, color: isPaid ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>
            {isPaid ? 'Paid' : 'Unpaid'}
          </span>
        </div>
        <span style={{ fontSize: 13, color: 'var(--text3)' }}>
          Round {group.currentRound} · {group.paidCount}/{group.totalSlots} paid
        </span>
      </div>
    </div>
  );
}
