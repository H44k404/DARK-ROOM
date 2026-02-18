import React, { useState } from 'react';
import { validateEmail } from '../utils/helpers';
import { sendContactMessage } from '../services/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    React.useEffect(() => {
        document.title = 'Contact Us | Dark Room';
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            setStatus('error');
            setStatusMessage('Please enter a valid email address');
            return;
        }

        try {
            await sendContactMessage(formData);
            setStatus('success');
            setStatusMessage('Thank you for your message! We will get back to you soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });

            setTimeout(() => {
                setStatus('');
                setStatusMessage('');
            }, 5000);
        } catch (error) {
            console.error('Contact form error:', error);
            setStatus('error');
            setStatusMessage(error.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className="py-12">
            <div className="container-custom max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold text-primary-black mb-8">
                    Contact Us
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-2xl font-bold text-primary-black mb-6">Get in Touch</h2>
                        <div className="space-y-4 text-primary-gray-700">
                            <p className="leading-relaxed">
                                We'd love to hear from you. Whether you have a question, feedback, or a story tip, feel free to reach out to us.
                            </p>

                            <div>
                                <h3 className="font-bold text-primary-black mb-2">Email</h3>
                                <a href="mailto:contact@darkroom.lk" className="text-primary-black hover:underline">
                                    contact@darkroom.lk
                                </a>
                            </div>

                            <div>
                                <h3 className="font-bold text-primary-black mb-2">News Tips</h3>
                                <a href="mailto:tips@darkroom.lk" className="text-primary-black hover:underline">
                                    tips@darkroom.lk
                                </a>
                            </div>

                            <div>
                                <h3 className="font-bold text-primary-black mb-2">Follow Us</h3>
                                <p>Stay connected with us on social media for the latest updates.</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h2 className="text-2xl font-bold text-primary-black mb-6">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {statusMessage && (
                                <div className={`p-4 rounded-md ${status === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
                                    <div className="flex items-start gap-3">
                                        <div className={`p-1 mt-0.5 rounded-full ${status === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
                                            {status === 'success' ? (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm mb-1">{status === 'success' ? 'Message Sent Successfully' : 'Submission Failed'}</p>
                                            <p className="text-sm">{statusMessage}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-primary-gray-700 mb-2">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="input"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-primary-gray-700 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="input"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-primary-gray-700 mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="input"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-primary-gray-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="6"
                                    className="textarea"
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-full">
                                Send Message
                            </button>


                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
