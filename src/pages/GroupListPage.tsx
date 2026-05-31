import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useGroups } from '../features/groups/hooks/useGroups';
import { GroupCard } from '../features/groups/components/GroupCard';
import { CreateGroupModal } from '../features/groups/components/CreateGroupModal';
import { GroupCardSkeleton } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';

export function GroupListPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { groups, loading, error, refetch } = useGroups();
  const [showCreate, setShowCreate] = useState(false);

  const totalContributed = groups.reduce((sum, g) => sum + g.paidCount * g.contributionAmount, 0);
  const pendingCount = groups.filter((g) => !g.myPaymentStatus).length;

  return (
    <div className="screen">
      <div className="page-header" style={{ paddingBottom: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: 13, color: 'var(--text2)', fontWeight: 600 }}>
              Kumusta, {user?.email} 👋
            </p>
            <h1 style={{ fontSize: 26, marginTop: 2 }}>My Groups</h1>
          </div>
          <div className="avatar" style={{ width: 44, height: 44, fontSize: 16 }}>
            {user?.email.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="stat-row" style={{ marginTop: 20 }}>
          <div className="stat-box">
            <div className="stat-value">₱{totalContributed.toLocaleString()}</div>
            <div className="stat-label">Total Collected</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{groups.length}</div>
            <div className="stat-label">Active Groups</div>
          </div>
          <div className="stat-box">
            <div className="stat-value" style={{ color: pendingCount > 0 ? 'var(--danger)' : 'var(--success)' }}>
              {pendingCount}
            </div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
      </div>

      <div style={{ height: 20 }} />

      <div className="scroll-container">
        {loading && (
          <>
            <GroupCardSkeleton />
            <GroupCardSkeleton />
            <GroupCardSkeleton />
          </>
        )}

        {!loading && error && (
          <EmptyState message="Could not load groups. Check your connection and try again." />
        )}

        {!loading && !error && groups.length === 0 && (
          <EmptyState message="No groups yet. Create one to get started." />
        )}

        {!loading && !error && groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            currentUserId={user?.userId ?? ''}
            onSelect={(id) => navigate(`/groups/${id}`)}
          />
        ))}
      </div>

      <button className="fab" onClick={() => setShowCreate(true)}>+</button>

      {showCreate && (
        <CreateGroupModal
          onClose={() => setShowCreate(false)}
          onCreated={refetch}
        />
      )}
    </div>
  );
}
