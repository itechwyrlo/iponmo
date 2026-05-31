import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { EmptyState } from '../../../components/EmptyState';
import { TabContentSkeleton } from '../../../components/Skeleton';
export function MembersTab({ members, loading, currentRound, isOrganizer, onAddMember }) {
    if (loading)
        return _jsx(TabContentSkeleton, {});
    return (_jsxs("div", { style: { padding: '0 20px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }, children: [_jsx("p", { style: { fontSize: 13, color: 'var(--text2)', fontWeight: 600 }, children: "PAYOUT ORDER" }), isOrganizer && (_jsx("button", { className: "btn btn-outline", style: { width: 'auto', padding: '7px 14px', fontSize: 13 }, onClick: onAddMember, children: "+ Add Member" }))] }), members.length === 0 ? (_jsx(EmptyState, { message: "No members have been added yet." })) : (_jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 12 }, children: [...members].sort((a, b) => a.payoutOrder - b.payoutOrder).map((m) => {
                    const isCurrent = m.payoutOrder === currentRound;
                    return (_jsxs("div", { className: "card", style: {
                            display: 'flex', alignItems: 'center', gap: 12,
                            border: isCurrent ? '1px solid var(--primary)' : undefined,
                        }, children: [_jsx("div", { style: {
                                    width: 32, height: 32, borderRadius: '50%',
                                    background: isCurrent ? 'rgba(244,165,53,0.15)' : 'var(--card2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 800, fontSize: 14,
                                    color: isCurrent ? 'var(--primary)' : 'var(--text3)',
                                }, children: m.payoutOrder }), _jsx("div", { className: "avatar", children: m.fullName.charAt(0) }), _jsxs("div", { style: { flex: 1 }, children: [_jsx("p", { style: { fontWeight: 600 }, children: m.fullName }), _jsx("p", { style: { fontSize: 12, color: 'var(--text2)' }, children: isCurrent ? 'Current recipient' : `Turn #${m.payoutOrder}` })] }), isCurrent && _jsx("span", { style: { color: 'var(--primary)', fontSize: 18 }, children: "\uD83C\uDFC6" })] }, m.userId));
                }) }))] }));
}
