import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { EmptyState } from '../../../components/EmptyState';
import { TabContentSkeleton } from '../../../components/Skeleton';
export function HistoryTab({ history, loading }) {
    if (loading)
        return _jsx(TabContentSkeleton, {});
    return (_jsxs("div", { style: { padding: '0 20px' }, children: [_jsx("p", { style: { fontSize: 13, color: 'var(--text2)', fontWeight: 600, marginBottom: 16 }, children: "PAYOUT HISTORY" }), history.length === 0 ? (_jsx(EmptyState, { message: "No payouts have been made yet." })) : (_jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 12 }, children: history.map((p, i) => (_jsxs("div", { className: "card", style: { display: 'flex', alignItems: 'center', gap: 12 }, children: [_jsx("div", { className: "avatar", style: { background: 'rgba(74,222,128,0.15)', color: 'var(--success)' }, children: "\u20B1" }), _jsxs("div", { style: { flex: 1 }, children: [_jsx("p", { style: { fontWeight: 600 }, children: p.memberName }), _jsxs("p", { style: { fontSize: 12, color: 'var(--text2)' }, children: ["Round ", p.round, " \u00B7 ", new Date(p.paidAt).toLocaleDateString()] })] }), _jsxs("span", { style: { fontFamily: 'Sora', fontWeight: 700, color: 'var(--success)', fontSize: 16 }, children: ["+\u20B1", p.amount.toLocaleString()] })] }, i))) }))] }));
}
