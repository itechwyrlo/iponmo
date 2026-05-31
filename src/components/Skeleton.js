import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Skeleton({ width = '100%', height = '16px', borderRadius = '8px' }) {
    return (_jsx("div", { style: {
            width,
            height,
            borderRadius,
            background: 'linear-gradient(90deg, var(--card2) 25%, var(--border) 50%, var(--card2) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.4s infinite',
        } }));
}
export function GroupCardSkeleton() {
    return (_jsxs("div", { className: "card", style: { display: 'flex', flexDirection: 'column', gap: 12 }, children: [_jsx(Skeleton, { height: "18px", width: "60%" }), _jsx(Skeleton, { height: "13px", width: "40%" }), _jsx("div", { style: { height: 1, background: 'var(--border)' } }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between' }, children: [_jsx(Skeleton, { height: "13px", width: "35%" }), _jsx(Skeleton, { height: "13px", width: "25%" })] })] }));
}
export function GroupDetailSkeleton() {
    return (_jsxs("div", { style: { padding: '54px 20px 20px' }, children: [_jsx(Skeleton, { height: "14px", width: "40px", borderRadius: "6px" }), _jsx("div", { style: { height: 16 } }), _jsx(Skeleton, { height: "26px", width: "50%" }), _jsx("div", { style: { height: 8 } }), _jsx(Skeleton, { height: "14px", width: "35%" }), _jsx("div", { style: { height: 20 } }), _jsxs("div", { style: { display: 'flex', gap: 10 }, children: [_jsxs("div", { style: { flex: 1, background: 'var(--card2)', borderRadius: 10, padding: 14 }, children: [_jsx(Skeleton, { height: "20px", width: "60%" }), _jsx("div", { style: { height: 6 } }), _jsx(Skeleton, { height: "11px", width: "50%" })] }), _jsxs("div", { style: { flex: 1, background: 'var(--card2)', borderRadius: 10, padding: 14 }, children: [_jsx(Skeleton, { height: "20px", width: "60%" }), _jsx("div", { style: { height: 6 } }), _jsx(Skeleton, { height: "11px", width: "50%" })] }), _jsxs("div", { style: { flex: 1, background: 'var(--card2)', borderRadius: 10, padding: 14 }, children: [_jsx(Skeleton, { height: "20px", width: "60%" }), _jsx("div", { style: { height: 6 } }), _jsx(Skeleton, { height: "11px", width: "50%" })] })] })] }));
}
export function TabContentSkeleton() {
    return (_jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 12, padding: '0 20px' }, children: [1, 2, 3].map((i) => (_jsxs("div", { className: "card", style: { display: 'flex', alignItems: 'center', gap: 12 }, children: [_jsx(Skeleton, { width: "38px", height: "38px", borderRadius: "50%" }), _jsxs("div", { style: { flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }, children: [_jsx(Skeleton, { height: "15px", width: "55%" }), _jsx(Skeleton, { height: "12px", width: "35%" })] }), _jsx(Skeleton, { height: "15px", width: "60px" })] }, i))) }));
}
