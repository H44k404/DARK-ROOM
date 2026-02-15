import React, { createContext, useState, useEffect, useContext } from 'react';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '../utils/helpers';
import { getUserByEmail } from '../services/mockData';

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
            // Mock login - in production, this would call an API
            const user = getUserByEmail(email);

            if (user && user.password === password) {
                // Don't store password in context/local storage
                const { password: _, ...userWithoutPassword } = user;
                setLocalStorage('darkroom_user', userWithoutPassword);
                setUser(userWithoutPassword);
                return { success: true, user: userWithoutPassword };
            }

            return { success: false, error: 'Invalid email or password' };
        } catch (error) {
            return { success: false, error: error.message };
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
        setUser(null);
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
