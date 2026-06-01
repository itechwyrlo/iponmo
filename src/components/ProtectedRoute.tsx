import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { GroupListPageSkeleton, GroupDetailSkeleton, ProfilePageSkeleton } from './Skeleton';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token, initializing } = useAuthContext();
  const { pathname } = useLocation();

  if (initializing) {
    if (/^\/groups\//.test(pathname)) return <GroupDetailSkeleton />;
    if (pathname === '/profile') return <ProfilePageSkeleton />;
    return <GroupListPageSkeleton />;
  }

  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
