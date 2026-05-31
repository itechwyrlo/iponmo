import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { AuthUser, LoginResponse, RefreshResponse } from '../features/auth/types/auth.types';
import { logout as logoutService } from '../features/auth/services/authService';
import { configureApiFetch } from '../features/auth/services/apiFetch';
import { jwtDecode } from '../features/auth/utils/jwtDecode';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface AuthContextValue {
  token: string | null;
  user: AuthUser | null;
  initializing: boolean;
  saveAuth: (response: LoginResponse, user: AuthUser) => void;
  clearAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY)
  );
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? (JSON.parse(stored) as AuthUser) : null;
  });
  const [initializing, setInitializing] = useState(true);

  const clearLocalAuth = useCallback((): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const saveAuth = useCallback((response: LoginResponse, authUser: AuthUser): void => {
    localStorage.setItem(TOKEN_KEY, response.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(authUser));
    setToken(response.accessToken);
    setUser(authUser);
  }, []);

  async function clearAuth(): Promise<void> {
    if (token) {
      await logoutService(token).catch(() => null);
    }
    clearLocalAuth();
  }

  useEffect(() => {
    configureApiFetch(
      (accessToken: string, userId: string) => {
        const decoded = jwtDecode(accessToken);
        const authUser: AuthUser = { userId, email: decoded.email, role: decoded.role };
        saveAuth({ accessToken, userId }, authUser);
      },
      clearLocalAuth
    );

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
        if (!res.ok) throw new Error();
        return res.json() as Promise<RefreshResponse>;
      })
      .then(data => {
        const refreshDecoded = jwtDecode(data.accessToken);
        const authUser: AuthUser = {
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

  return (
    <AuthContext.Provider value={{ token, user, initializing, saveAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used inside AuthProvider');
  return context;
}
