import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children, requiredRole = null }) => {
    const { isAuthenticated, user, loading, hasAdminAccess, isSuperAdmin, isAdmin, isEditor } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner w-12 h-12"></div>
            </div>
        );
    }

    // Check if user is authenticated
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    // Check role-based access
    if (requiredRole) {
        let hasAccess = false;

        switch (requiredRole) {
            case 'super_admin':
                hasAccess = isSuperAdmin();
                break;
            case 'admin':
                hasAccess = isSuperAdmin() || isAdmin();
                break;
            case 'editor':
                hasAccess = isSuperAdmin() || isAdmin() || isEditor();
                break;
            case 'any_admin':
                hasAccess = hasAdminAccess();
                break;
            default:
                hasAccess = true;
        }

        if (!hasAccess) {
            // Redirect to home page if user doesn't have required role
            return <Navigate to="/" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
