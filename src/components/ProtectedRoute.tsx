import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token, initializing } = useAuthContext();
  if (initializing) return null;
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
