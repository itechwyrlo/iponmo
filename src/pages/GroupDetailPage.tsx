import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useGroupDetail } from '../features/groups/hooks/useGroupDetail';
import { PaymentsTab } from '../features/groups/components/PaymentsTab';
import { MembersTab } from '../features/groups/components/MembersTab';
import { HistoryTab } from '../features/groups/components/HistoryTab';
import { PaymentInfoSheet } from '../features/groups/components/PaymentInfoSheet';
import { AddMemberModal } from '../features/groups/components/AddMemberModal';
import { ChatDrawer } from '../features/chat/components/ChatDrawer';
import { GroupDetailSkeleton } from '../components/Skeleton';

export function GroupDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [chatTarget, setChatTarget] = useState<{ userId: string; userName: string } | null>(null);

  const {
    detail,
    members,
    payments,
    history,
    loadingDetail,
    loadingTab,
    activeTab,
    setActiveTab,
    handleMarkPaid,
    handleAddMember,
  } = useGroupDetail(id ?? '');

  if (loadingDetail) return <GroupDetailSkeleton />;

  if (!detail) {
    return (
      <div style={{ padding: 28 }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'var(--text2)', cursor: 'pointer', marginBottom: 16 }}>
          ← Back
        </button>
        <p style={{ color: 'var(--text2)' }}>Group not found.</p>
      </div>
    );
  }

  const isOrganizer = detail.organizerId === user?.userId;

  return (
    <div className="screen">
      <div className="page-header">
        <button
          onClick={() => navigate('/')}
          style={{ background: 'none', border: 'none', color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, cursor: 'pointer', padding: 0, fontSize: 14 }}
        >
          ← Back
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: 22 }}>{detail.name}</h1>
            <p style={{ color: 'var(--text2)', fontSize: 14, marginTop: 4 }}>
              ₱{detail.contributionAmount.toLocaleString()} / {detail.schedule}
            </p>
          </div>
          {isOrganizer && <span className="badge badge-warning">Organizer</span>}
        </div>

        <div className="stat-row" style={{ marginTop: 16 }}>
          <div className="stat-box">
            <div className="stat-value">Round {detail.currentRound}</div>
            <div className="stat-label">Current</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{detail.paidCount}/{detail.numberOfSlots}</div>
            <div className="stat-label">Paid</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">₱{detail.collectedAmount.toLocaleString()}</div>
            <div className="stat-label">Collected</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px 16px' }}>
        <div className="tab-group">
          {(['payments', 'members', 'history'] as const).map((tab) => (
            <button
              key={tab}
              className={`tab-pill ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'payments' && (
        <PaymentsTab
          payments={payments}
          loading={loadingTab}
          currentRound={detail.currentRound}
          isOrganizer={isOrganizer}
          onMarkPaid={handleMarkPaid}
          onPayClick={() => setShowPaymentInfo(true)}
        />
      )}

      {activeTab === 'members' && (
        <MembersTab
          members={members}
          loading={loadingTab}
          currentRound={detail.currentRound}
          isOrganizer={isOrganizer}
          organizerId={detail.organizerId}
          onAddMember={() => setShowAddMember(true)}
          onMessageClick={(userId, userName) => setChatTarget({ userId, userName })}
        />
      )}

      {activeTab === 'history' && (
        <HistoryTab history={history} loading={loadingTab} />
      )}

      {showPaymentInfo && (
        <PaymentInfoSheet
          organizerQrCodeUrl={detail.organizerQrCodeUrl}
          contributionAmount={detail.contributionAmount}
          onClose={() => setShowPaymentInfo(false)}
        />
      )}

      {showAddMember && (
        <AddMemberModal
          numberOfSlots={detail.numberOfSlots}
          onClose={() => setShowAddMember(false)}
          onAddMember={handleAddMember}
        />
      )}

      {chatTarget && (
        <ChatDrawer
          groupId={id ?? ''}
          receiverId={chatTarget.userId}
          receiverName={chatTarget.userName}
          onClose={() => setChatTarget(null)}
        />
      )}
    </div>
  );
}
