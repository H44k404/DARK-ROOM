import React, { createContext, useState, useEffect, useContext } from 'react';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '../utils/helpers';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on mount
        const savedUser = getLocalStorage('darkroom_user');
        if (savedUser) {
            setUser(savedUser);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const data = await api.post('/auth/login', { email, password });

            if (data.token) {
                setLocalStorage('darkroom_token', data.token);
                setLocalStorage('darkroom_user', data);
                setUser(data);
                return { success: true, user: data };
            }
            return { success: false, error: 'Login failed: No token received' };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message || 'Invalid email or password' };
        }
    };

    const register = async (email, password, name) => {
        try {
            // Mock registration - in production, this would call an API
            const newUser = {
                id: Date.now(),
                email,
                name,
                role: 'user',
            };
            setLocalStorage('darkroom_user', newUser);
            setUser(newUser);
            return { success: true, user: newUser };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        removeLocalStorage('darkroom_user');
        removeLocalStorage('darkroom_token');
        setUser(null);
    };

    const updateUser = (userData) => {
        setUser(prev => {
            const updated = { ...prev, ...userData };
            setLocalStorage('darkroom_user', updated);
            return updated;
        });
    };

    const isAdmin = () => {
        return user?.role === 'admin';
    };

    const isSuperAdmin = () => {
        return user?.role === 'super_admin';
    };

    const isEditor = () => {
        return user?.role === 'editor';
    };

    const hasAdminAccess = () => {
        return user?.role === 'super_admin' || user?.role === 'admin' || user?.role === 'editor';
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        isAdmin,
        isSuperAdmin,
        isEditor,
        hasAdminAccess,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
