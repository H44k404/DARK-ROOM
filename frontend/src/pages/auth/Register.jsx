import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validatePassword } from '../../utils/helpers';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        document.title = 'Register | Dark Room';
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name.trim()) {
            setError('Please enter your name');
            return;
        }

        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (!validatePassword(formData.password)) {
            setError('Password must be at least 8 characters');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        const result = await register(formData.email, formData.password, formData.name);
        setLoading(false);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.error || 'Registration failed');
        }
    };

    return (
        <div className="min-h-[calc(100vh-400px)] flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-adaptive mb-2">Register</h1>
                    <p className="text-adaptive-secondary">Subscribe to our newsletter for the latest news updates</p>
                </div>

                <div className="card p-8 bg-adaptive-card border-adaptive shadow-sm rounded-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-adaptive-secondary mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="input w-full px-4 py-3 rounded-md border border-adaptive bg-adaptive-input text-adaptive focus:ring-2 focus:ring-[var(--accent-red)] focus:border-transparent outline-none transition-all"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-adaptive-secondary mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="input w-full px-4 py-3 rounded-md border border-adaptive bg-adaptive-input text-adaptive focus:ring-2 focus:ring-[var(--accent-red)] focus:border-transparent outline-none transition-all"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-adaptive-secondary mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="input w-full px-4 py-3 rounded-md border border-adaptive bg-adaptive-input text-adaptive focus:ring-2 focus:ring-[var(--accent-red)] focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-adaptive-secondary mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="input w-full px-4 py-3 rounded-md border border-adaptive bg-adaptive-input text-adaptive focus:ring-2 focus:ring-[var(--accent-red)] focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[var(--accent-red)] hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>


                    <div className="mt-6 p-4 bg-adaptive-input border border-adaptive rounded-md">
                        <p className="text-xs text-adaptive-secondary">
                            By registering, you'll receive email notifications about our latest news updates and exclusive content.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
