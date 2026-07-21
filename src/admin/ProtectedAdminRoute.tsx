import { Navigate, Outlet } from 'react-router-dom';
import LoadingState from '../components/LoadingState';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function ProtectedAdminRoute() {
  const { session, isAdmin, loading } = useAdminAuth();

  if (loading) return <LoadingState label="Checking admin access..." />;
  if (!session) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) return <Navigate to="/admin/login?unauthorized=1" replace />;

  return <Outlet />;
}
