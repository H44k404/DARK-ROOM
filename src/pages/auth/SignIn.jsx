import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validateEmail } from '../../utils/helpers';

const SignIn = () => {
    const [formData, setFormData] = useState({ email: '', password: '', twoFactorCode: '' });
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);
    const [show2FA, setShow2FA] = useState(false);
    const [showForgot, setShowForgot] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');

    const { login, forgotPassword } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        document.title = 'Sign In | Dark Room';
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setInfo('');

        setLoading(true);
        const result = await login(formData.email, formData.password, formData.twoFactorCode);
        setLoading(false);

        if (result.success) {
            if (result.twoFactorRequired) {
                setShow2FA(true);
                return;
            }

            // Redirect based on user role
            const userRole = result.user.role;
            if (userRole === 'super_admin' || userRole === 'admin' || userRole === 'editor') {
                navigate('/admin/dashboard');
            } else {
                navigate('/');
            }
        } else {
            setError(result.error || 'Invalid credentials');
        }
    };

    const handleForgotSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(forgotEmail)) {
            setError('Please enter a valid email');
            return;
        }
        setLoading(true);
        const result = await forgotPassword(forgotEmail);
        setLoading(false);
        if (result.success) {
            setInfo('If an account exists, a reset link has been sent (check console in dev).');
            setShowForgot(false);
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="min-h-[calc(100vh-400px)] flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary-black mb-2">
                        {show2FA ? 'Verification' : 'Sign In'}
                    </h1>
                    <p className="text-primary-gray-600">
                        {show2FA ? 'Enter your 2FA code' : 'Welcome back to Dark Room'}
                    </p>
                </div>

                <div className="card p-8 shadow-xl border-2 border-primary-black">
                    {showForgot ? (
                        <form onSubmit={handleForgotSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-primary-black mb-2 uppercase tracking-tight">
                                    Account Email
                                </label>
                                <input
                                    type="email"
                                    value={forgotEmail}
                                    onChange={(e) => setForgotEmail(e.target.value)}
                                    required
                                    className="input border-2 border-primary-black focus:ring-0"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <button type="submit" disabled={loading} className="btn btn-primary w-full">
                                    {loading ? 'Sending...' : 'Send Reset Link'}
                                </button>
                                <button type="button" onClick={() => setShowForgot(false)} className="text-sm font-bold hover:underline">
                                    Back to Login
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {!show2FA ? (
                                <>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-bold text-primary-black mb-2 uppercase tracking-tight">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="input border-2 border-primary-black focus:ring-0"
                                            placeholder="admin@darkroom.lk"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label htmlFor="password" className="block text-sm font-bold text-primary-black uppercase tracking-tight">
                                                Password
                                            </label>
                                            <button type="button" onClick={() => setShowForgot(true)} className="text-xs font-bold hover:underline">
                                                Forgot?
                                            </button>
                                        </div>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            className="input border-2 border-primary-black focus:ring-0"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <label htmlFor="twoFactorCode" className="block text-sm font-bold text-primary-black mb-2 uppercase tracking-tight">
                                        6-Digit Security Code
                                    </label>
                                    <input
                                        type="text"
                                        id="twoFactorCode"
                                        name="twoFactorCode"
                                        value={formData.twoFactorCode}
                                        onChange={handleChange}
                                        required
                                        maxLength="6"
                                        className="input border-2 border-primary-black focus:ring-0 text-center text-2xl tracking-widest"
                                        placeholder="000000"
                                        autoFocus
                                    />
                                    <p className="mt-2 text-xs text-primary-gray-500">
                                        Open your authenticator app to get the code.
                                    </p>
                                </div>
                            )}

                            {error && (
                                <div className="bg-red-50 border-2 border-red-600 text-red-600 px-4 py-3 font-bold text-sm">
                                    {error}
                                </div>
                            )}

                            {info && (
                                <div className="bg-blue-50 border-2 border-blue-600 text-blue-600 px-4 py-3 font-bold text-sm">
                                    {info}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary w-full py-4 text-lg"
                            >
                                {loading ? 'Processing...' : show2FA ? 'Verify Code' : 'Sign In'}
                            </button>

                            {show2FA && (
                                <button type="button" onClick={() => setShow2FA(false)} className="w-full text-sm font-bold hover:underline">
                                    Cancel & Try Again
                                </button>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignIn;
