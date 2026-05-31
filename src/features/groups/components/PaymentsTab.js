import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { EmptyState } from '../../../components/EmptyState';
import { TabContentSkeleton } from '../../../components/Skeleton';
export function PaymentsTab({ payments, loading, currentRound, isOrganizer, onMarkPaid, onPayClick, }) {
    if (loading)
        return _jsx(TabContentSkeleton, {});
    return (_jsxs("div", { style: { padding: '0 20px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }, children: [_jsxs("p", { style: { fontSize: 13, color: 'var(--text2)', fontWeight: 600 }, children: ["ROUND ", currentRound, " PAYMENTS"] }), !isOrganizer && (_jsx("button", { className: "btn btn-outline", style: { width: 'auto', padding: '7px 14px', fontSize: 13 }, onClick: onPayClick, children: "Pay via GCash/Maya" }))] }), payments.length === 0 ? (_jsx(EmptyState, { message: "No payment records for this round yet." })) : (_jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 12 }, children: payments.map((p) => {
                    const initials = p.memberName.split(' ').map((n) => n[0]).join('').slice(0, 2);
                    return (_jsxs("div", { className: "card", style: { display: 'flex', alignItems: 'center', gap: 12 }, children: [_jsx("div", { className: "avatar", children: initials }), _jsxs("div", { style: { flex: 1 }, children: [_jsx("p", { style: { fontWeight: 600, fontSize: 15 }, children: p.memberName }), _jsx("p", { style: { fontSize: 12, color: 'var(--text2)', marginTop: 2 }, children: p.isPaid ? `Paid on ${new Date(p.paidAt).toLocaleDateString()}` : 'Not yet paid' })] }), p.isPaid ? (_jsx("span", { style: { fontSize: 20 }, children: "\u2713" })) : isOrganizer ? (_jsx("button", { className: "btn btn-primary", style: { width: 'auto', padding: '8px 14px', fontSize: 13 }, onClick: () => onMarkPaid(p.memberId), children: "Mark Paid" })) : (_jsx("span", { style: { fontSize: 13, color: 'var(--danger)', fontWeight: 600 }, children: "Pending" }))] }, p.memberId));
                }) }))] }));
}
