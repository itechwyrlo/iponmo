import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
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
    return (_jsxs("div", { className: "screen", children: [_jsxs("div", { className: "page-header", style: { paddingBottom: 0 }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }, children: [_jsxs("div", { children: [_jsxs("p", { style: { fontSize: 13, color: 'var(--text2)', fontWeight: 600 }, children: ["Kumusta, ", user?.email, " \uD83D\uDC4B"] }), _jsx("h1", { style: { fontSize: 26, marginTop: 2 }, children: "My Groups" })] }), _jsx("div", { className: "avatar", style: { width: 44, height: 44, fontSize: 16 }, children: user?.email.charAt(0).toUpperCase() })] }), _jsxs("div", { className: "stat-row", style: { marginTop: 20 }, children: [_jsxs("div", { className: "stat-box", children: [_jsxs("div", { className: "stat-value", children: ["\u20B1", totalContributed.toLocaleString()] }), _jsx("div", { className: "stat-label", children: "Total Collected" })] }), _jsxs("div", { className: "stat-box", children: [_jsx("div", { className: "stat-value", children: groups.length }), _jsx("div", { className: "stat-label", children: "Active Groups" })] }), _jsxs("div", { className: "stat-box", children: [_jsx("div", { className: "stat-value", style: { color: pendingCount > 0 ? 'var(--danger)' : 'var(--success)' }, children: pendingCount }), _jsx("div", { className: "stat-label", children: "Pending" })] })] })] }), _jsx("div", { style: { height: 20 } }), _jsxs("div", { className: "scroll-container", children: [loading && (_jsxs(_Fragment, { children: [_jsx(GroupCardSkeleton, {}), _jsx(GroupCardSkeleton, {}), _jsx(GroupCardSkeleton, {})] })), !loading && error && (_jsx(EmptyState, { message: "Could not load groups. Check your connection and try again." })), !loading && !error && groups.length === 0 && (_jsx(EmptyState, { message: "No groups yet. Create one to get started." })), !loading && !error && groups.map((group) => (_jsx(GroupCard, { group: group, currentUserId: user?.userId ?? '', onSelect: (id) => navigate(`/groups/${id}`) }, group.id)))] }), _jsx("button", { className: "fab", onClick: () => setShowCreate(true), children: "+" }), showCreate && (_jsx(CreateGroupModal, { onClose: () => setShowCreate(false), onCreated: refetch }))] }));
}
