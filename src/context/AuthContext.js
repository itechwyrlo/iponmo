import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { logout as logoutService } from '../features/auth/services/authService';
import { configureApiFetch } from '../features/auth/services/apiFetch';
import { jwtDecode } from '../features/auth/utils/jwtDecode';
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem(USER_KEY);
        return stored ? JSON.parse(stored) : null;
    });
    const [initializing, setInitializing] = useState(true);
    const clearLocalAuth = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
    }, []);
    const saveAuth = useCallback((response, authUser) => {
        localStorage.setItem(TOKEN_KEY, response.accessToken);
        localStorage.setItem(USER_KEY, JSON.stringify(authUser));
        setToken(response.accessToken);
        setUser(authUser);
    }, []);
    async function clearAuth() {
        if (token) {
            await logoutService(token).catch(() => null);
        }
        clearLocalAuth();
    }
    useEffect(() => {
        configureApiFetch((accessToken, userId) => {
            const decoded = jwtDecode(accessToken);
            const authUser = { userId, email: decoded.email, role: decoded.role };
            saveAuth({ accessToken, userId }, authUser);
        }, clearLocalAuth);
        const storedToken = localStorage.getItem(TOKEN_KEY);
        if (!storedToken) {
            setInitializing(false);
            return;
        }
        const decoded = jwtDecode(storedToken);
        const nowSeconds = Date.now() / 1000;
        if (decoded.exp > nowSeconds) {
            setInitializing(false);
            return;
        }
        // Expired token on startup — attempt silent refresh via HTTP-only cookie
        fetch(`${BASE_URL}/api/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
        })
            .then(res => {
            if (!res.ok)
                throw new Error();
            return res.json();
        })
            .then(data => {
            const refreshDecoded = jwtDecode(data.accessToken);
            const authUser = {
                userId: data.userId,
                email: refreshDecoded.email,
                role: refreshDecoded.role,
            };
            saveAuth({ accessToken: data.accessToken, userId: data.userId }, authUser);
        })
            .catch(() => {
            clearLocalAuth();
        })
            .finally(() => {
            setInitializing(false);
        });
    }, [saveAuth, clearLocalAuth]);
    return (_jsx(AuthContext.Provider, { value: { token, user, initializing, saveAuth, clearAuth }, children: children }));
}
export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('useAuthContext must be used inside AuthProvider');
    return context;
}
