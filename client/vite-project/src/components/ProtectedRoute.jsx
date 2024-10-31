import { Navigate, Outlet } from 'react-router-dom';
export const ProtectedRoute = ({ user, children, redirectTo = '/login' }) => {
    if (!user) {
        return <Navigate to="/login" />;
    }
    return children ? children : <Outlet />;
};
