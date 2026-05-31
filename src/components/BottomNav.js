import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const navItems = [
    { key: 'home', label: 'Home', icon: '⌂' },
    { key: 'profile', label: 'Profile', icon: '○' },
];
export function BottomNav({ active, onChange }) {
    return (_jsx("nav", { className: "bottom-nav", children: navItems.map((item) => (_jsxs("button", { className: `nav-item ${active === item.key ? 'active' : ''}`, onClick: () => onChange(item.key), children: [_jsx("span", { style: { fontSize: 20 }, children: item.icon }), item.label] }, item.key))) }));
}
