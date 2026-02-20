import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiX } from 'react-icons/hi';
import SocialIcons from '../common/SocialIcons';
import SearchBar from '../common/SearchBar';

const MobileMenu = ({ isOpen, onClose, navLinks }) => {
    const location = useLocation();

    // Close menu when route changes
    useEffect(() => {
        onClose();
    }, [location.pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[2000] bg-black text-white overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A]">
                <span style={{ fontFamily: "'Anton', sans-serif", fontSize: '24px', letterSpacing: '1px' }}>
                    DARK ROOM
                </span>
                <button
                    onClick={onClose}
                    className="text-white hover:text-gray-300 transition-colors focus:outline-none"
                    aria-label="Close menu"
                >
                    <HiX size={32} />
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-6">
                <ul className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                to={link.path}
                                className="block text-2xl font-bold uppercase tracking-wide hover:text-[var(--accent-orange)] transition-colors"
                                style={{ fontFamily: 'sans-serif' }}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Search Bar - styled for mobile black theme */}
            <div className="px-6 py-4 border-t border-[#2A2A2A]">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search news..."
                        className="w-full bg-[#1A1A1A] text-white border border-[#333333] p-3 rounded-none focus:border-[var(--accent-orange)] focus:outline-none"
                    />
                </div>
            </div>

            {/* Social Icons */}
            <div className="px-6 py-6 border-t border-[#2A2A2A]">
                <p className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Follow Us</p>
                <div className="flex space-x-4">
                    {/* Reusing SocialIcons but ensuring they look good on dark bg */}
                    <div className="invert filter brightness-0 brightness-200">
                        {/* Simple hack to make dark icons white if they aren't already, 
                             or we can just render them directly if we know they are capable of being styled */}
                        <SocialIcons />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
