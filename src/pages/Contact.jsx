import React, { useState } from 'react';
import { validateEmail } from '../utils/helpers';

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
            // Mock form submission - in production, this would call an API
            setStatus('success');
            setStatusMessage('Thank you for your message! We will get back to you soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });

            setTimeout(() => {
                setStatus('');
                setStatusMessage('');
            }, 5000);
        } catch (error) {
            setStatus('error');
            setStatusMessage('Something went wrong. Please try again.');
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

                            {statusMessage && (
                                <p className={`text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                    {statusMessage}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
