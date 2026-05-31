import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
export function ProtectedRoute({ children }) {
    const { token, initializing } = useAuthContext();
    if (initializing)
        return null;
    if (!token)
        return _jsx(Navigate, { to: "/login", replace: true });
    return _jsx(_Fragment, { children: children });
}
