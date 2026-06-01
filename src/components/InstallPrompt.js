import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
export default function InstallPrompt() {
    const [installEvent, setInstallEvent] = useState(null);
    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setInstallEvent(e);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);
    if (!installEvent)
        return null;
    const handleInstall = async () => {
        await installEvent.prompt();
        const { outcome } = await installEvent.userChoice;
        if (outcome === 'accepted')
            setInstallEvent(null);
    };
    return (_jsxs("div", { style: {
            position: 'fixed',
            bottom: 80,
            left: 16,
            right: 16,
            background: '#1e1c2e',
            border: '1px solid #2e2b45',
            borderRadius: 16,
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1000,
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        }, children: [_jsxs("div", { children: [_jsx("p", { style: { margin: 0, fontWeight: 700, color: '#f0eeff' }, children: "Install IponMo" }), _jsx("p", { style: { margin: 0, fontSize: 13, color: '#a5a2d9' }, children: "Add to your home screen" })] }), _jsxs("div", { style: { display: 'flex', gap: 8 }, children: [_jsx("button", { onClick: () => setInstallEvent(null), style: { background: 'transparent', border: '1px solid #2e2b45', borderRadius: 8, padding: '8px 12px', color: '#a5a2d9', cursor: 'pointer' }, children: "Later" }), _jsx("button", { onClick: handleInstall, style: { background: '#f4a535', border: 'none', borderRadius: 8, padding: '8px 16px', color: '#0f0e17', fontWeight: 700, cursor: 'pointer' }, children: "Install" })] })] }));
}
