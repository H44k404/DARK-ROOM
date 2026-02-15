import React, { useState } from 'react';
import { validateEmail } from '../../utils/helpers';

const NewsletterForm = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(''); // 'success', 'error', or ''
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setStatus('error');
            setMessage('Please enter a valid email address');
            return;
        }

        try {
            // Mock newsletter subscription - in production, this would call an API
            // await api.subscribeNewsletter(email);

            setStatus('success');
            setMessage('Thank you for subscribing!');
            setEmail('');

            setTimeout(() => {
                setStatus('');
                setMessage('');
            }, 5000);
        } catch (error) {
            setStatus('error');
            setMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="w-full max-w-md">
            <h3 className="text-lg font-bold text-primary-white mb-3">Subscribe to Newsletter</h3>
            <p className="text-sm text-primary-gray-300 mb-4">
                Get the latest news delivered to your inbox
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-primary-white text-primary-black border-2 border-primary-white rounded-sm focus:outline-none focus:ring-2 focus:ring-primary-gray-400 min-h-[44px]"
                    required
                />
                <button
                    type="submit"
                    className="btn btn-secondary whitespace-nowrap"
                >
                    Subscribe
                </button>
            </form>

            {message && (
                <p className={`mt-3 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default NewsletterForm;
