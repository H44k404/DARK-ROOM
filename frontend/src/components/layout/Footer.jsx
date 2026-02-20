import React from 'react';
import { Link } from 'react-router-dom';
import SocialIcons from '../common/SocialIcons';
import NewsletterForm from '../common/NewsletterForm';

const Footer = ({ onOpenDonation }) => {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'Support Us', onClick: onOpenDonation },
        { name: 'Privacy Policy', path: '/privacy' },
    ];

    return (
        <footer className="bg-primary-black text-primary-white mt-16 border-t-4 border-primary-black">
            <div className="container-custom py-12">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    {/* About */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-white">DARK ROOM</h3>
                        <p className="text-primary-gray-300 leading-relaxed mb-4">
                            Your trusted source for Sri Lankan news. Delivering accurate, timely, and comprehensive coverage in both Sinhala and English.
                        </p>
                        <SocialIcons />
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
                        <nav className="space-y-2">
                            {footerLinks.map((link) => (
                                link.onClick ? (
                                    <button
                                        key={link.name}
                                        onClick={link.onClick}
                                        className="block text-primary-gray-300 hover:text-white transition-colors text-left w-full"
                                    >
                                        {link.name}
                                    </button>
                                ) : (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className="block text-primary-gray-300 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                )
                            ))}
                        </nav>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <NewsletterForm />
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-primary-gray-800">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-primary-gray-400">
                            © {currentYear} Dark Room. All rights reserved.
                        </p>
                        <p className="text-sm text-primary-gray-400">
                            Website by KALANA VIMUKTHI
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
