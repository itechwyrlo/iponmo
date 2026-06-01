import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useGroupDetail } from '../features/groups/hooks/useGroupDetail';
import { PaymentsTab } from '../features/groups/components/PaymentsTab';
import { MembersTab } from '../features/groups/components/MembersTab';
import { HistoryTab } from '../features/groups/components/HistoryTab';
import { PaymentInfoSheet } from '../features/groups/components/PaymentInfoSheet';
import { AddMemberModal } from '../features/groups/components/AddMemberModal';
import { GroupDetailSkeleton } from '../components/Skeleton';
export function GroupDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [showPaymentInfo, setShowPaymentInfo] = useState(false);
    const [showAddMember, setShowAddMember] = useState(false);
    const { detail, members, payments, history, loadingDetail, loadingTab, activeTab, setActiveTab, handleMarkPaid, handleAddMember, } = useGroupDetail(id ?? '');
    if (loadingDetail)
        return _jsx(GroupDetailSkeleton, {});
    if (!detail) {
        return (_jsxs("div", { style: { padding: 28 }, children: [_jsx("button", { onClick: () => navigate('/'), style: { background: 'none', border: 'none', color: 'var(--text2)', cursor: 'pointer', marginBottom: 16 }, children: "\u2190 Back" }), _jsx("p", { style: { color: 'var(--text2)' }, children: "Group not found." })] }));
    }
    const isOrganizer = detail.organizerId === user?.userId;
    return (_jsxs("div", { className: "screen", children: [_jsxs("div", { className: "page-header", children: [_jsx("button", { onClick: () => navigate('/'), style: { background: 'none', border: 'none', color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, cursor: 'pointer', padding: 0, fontSize: 14 }, children: "\u2190 Back" }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }, children: [_jsxs("div", { children: [_jsx("h1", { style: { fontSize: 22 }, children: detail.name }), _jsxs("p", { style: { color: 'var(--text2)', fontSize: 14, marginTop: 4 }, children: ["\u20B1", detail.contributionAmount.toLocaleString(), " / ", detail.schedule] })] }), isOrganizer && _jsx("span", { className: "badge badge-warning", children: "Organizer" })] }), _jsxs("div", { className: "stat-row", style: { marginTop: 16 }, children: [_jsxs("div", { className: "stat-box", children: [_jsxs("div", { className: "stat-value", children: ["Round ", detail.currentRound] }), _jsx("div", { className: "stat-label", children: "Current" })] }), _jsxs("div", { className: "stat-box", children: [_jsxs("div", { className: "stat-value", children: [detail.paidCount, "/", detail.numberOfSlots] }), _jsx("div", { className: "stat-label", children: "Paid" })] }), _jsxs("div", { className: "stat-box", children: [_jsxs("div", { className: "stat-value", children: ["\u20B1", detail.collectedAmount.toLocaleString()] }), _jsx("div", { className: "stat-label", children: "Collected" })] })] })] }), _jsx("div", { style: { padding: '0 20px 16px' }, children: _jsx("div", { className: "tab-group", children: ['payments', 'members', 'history'].map((tab) => (_jsx("button", { className: `tab-pill ${activeTab === tab ? 'active' : ''}`, onClick: () => setActiveTab(tab), children: tab.charAt(0).toUpperCase() + tab.slice(1) }, tab))) }) }), activeTab === 'payments' && (_jsx(PaymentsTab, { payments: payments, loading: loadingTab, currentRound: detail.currentRound, isOrganizer: isOrganizer, onMarkPaid: handleMarkPaid, onPayClick: () => setShowPaymentInfo(true) })), activeTab === 'members' && (_jsx(MembersTab, { members: members, loading: loadingTab, currentRound: detail.currentRound, isOrganizer: isOrganizer, onAddMember: () => setShowAddMember(true) })), activeTab === 'history' && (_jsx(HistoryTab, { history: history, loading: loadingTab })), showPaymentInfo && (_jsx(PaymentInfoSheet, { organizerGCash: detail.organizerGCash, organizerMaya: detail.organizerMaya, contributionAmount: detail.contributionAmount, onClose: () => setShowPaymentInfo(false) })), showAddMember && (_jsx(AddMemberModal, { numberOfSlots: detail.numberOfSlots, onClose: () => setShowAddMember(false), onAddMember: handleAddMember }))] }));
}
