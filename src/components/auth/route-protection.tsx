import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '@/lib/auth';

interface RouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute = ({ children }: RouteProps) => {
  return !isAuthenticated() ? <Navigate to="/login" replace /> : (children || <Outlet />);
};

export const PublicOnlyRoute = ({ children }: RouteProps) => {
  return isAuthenticated() ? <Navigate to="/" replace /> : (children || <Outlet />);
};