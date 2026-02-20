import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/helpers';
import { useAuth } from '../../hooks/useAuth';

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        document.title = 'Admin Login | Dark Room';
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (!validatePassword(formData.password)) {
            setError('Password must be at least 8 characters');
            return;
        }

        setLoading(true);
        const result = await login(formData.email, formData.password);
        setLoading(false);

        if (result.success) {
            // Check if user has admin access
            const userRole = result.user.role;
            if (userRole === 'super_admin' || userRole === 'admin' || userRole === 'editor') {
                navigate('/admin/dashboard');
            } else {
                // Regular users cannot access admin login
                setError('Access denied. This login is for administrators only.');
                // Optionally logout the user
                // logout();
            }
        } else {
            setError(result.error || 'Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-primary-gray-50">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block mb-4">
                        <h1 className="text-4xl font-bold text-primary-black">DARK ROOM</h1>
                    </Link>
                    <h2 className="text-2xl font-bold text-primary-black mb-2">Admin Login</h2>
                    <p className="text-primary-gray-600">Access the administration panel</p>
                </div>

                {/* Login Card */}
                <div className="card p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-primary-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="input text-primary-black"
                                placeholder="admin@darkroom.lk"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-primary-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="input text-primary-black"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full"
                        >
                            {loading ? 'Signing in...' : 'Sign In to Admin Panel'}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-primary-gray-50 rounded-sm">
                        <p className="text-xs text-primary-gray-600 mb-2 font-medium">Demo Admin Credentials:</p>
                        <div className="space-y-2">
                            <div>
                                <p className="text-xs text-primary-gray-700 font-semibold">Super Admin:</p>
                                <p className="text-xs text-primary-gray-600">superadmin@darkroom.lk / admin123</p>
                            </div>
                            <div>
                                <p className="text-xs text-primary-gray-700 font-semibold">Admin:</p>
                                <p className="text-xs text-primary-gray-600">admin@darkroom.lk / admin123</p>
                            </div>
                            <div>
                                <p className="text-xs text-primary-gray-700 font-semibold">Editor:</p>
                                <p className="text-xs text-primary-gray-600">editor@darkroom.lk / editor123</p>
                            </div>
                        </div>
                    </div>

                    {/* Warning */}
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-sm">
                        <p className="text-xs text-yellow-800">
                            🔒 This is the admin login. Regular users should use the <Link to="/register" className="underline font-semibold">newsletter registration</Link> instead.
                        </p>
                    </div>
                </div>

                {/* Back to website */}
                <div className="mt-6 text-center">
                    <Link to="/" className="text-sm text-primary-gray-600 hover:text-primary-black transition-colors">
                        ← Back to website
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
