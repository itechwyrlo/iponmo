import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useAuthContext } from '../context/AuthContext';
export function HomePage() {
    const { user, clearAuth } = useAuthContext();
    return (_jsxs("div", { style: { padding: 28 }, children: [_jsxs("h1", { children: ["Welcome, ", user?.email] }), _jsx("button", { className: "btn btn-outline", style: { marginTop: 20 }, onClick: () => clearAuth(), children: "Sign Out" })] }));
}
