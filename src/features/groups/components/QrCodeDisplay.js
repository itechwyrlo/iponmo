import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { QRCodeSVG } from 'qrcode.react';
export function QrCodeDisplay({ value, label, size = 160 }) {
    return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }, children: [_jsx("div", { style: { background: 'white', padding: 12, borderRadius: 12 }, children: _jsx(QRCodeSVG, { value: value, size: size }) }), _jsx("p", { style: { fontSize: 12, color: 'var(--text2)', textAlign: 'center' }, children: label })] }));
}
