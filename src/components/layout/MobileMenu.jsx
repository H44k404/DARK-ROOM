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

    const isActive = (path) => {
        return location.pathname === path;
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-primary-black bg-opacity-50 z-50 lg:hidden"
                onClick={onClose}
            />

            {/* Menu Panel */}
            <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-primary-white z-50 lg:hidden shadow-2xl overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b-2 border-primary-black bg-primary-black text-primary-white">
                    <h2 className="text-xl font-bold">DARK ROOM</h2>
                    <button
                        onClick={onClose}
                        className="touch-target flex items-center justify-center text-primary-white hover:bg-primary-gray-800 rounded-full transition-colors"
                        aria-label="Close menu"
                    >
                        <HiX className="text-2xl" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="py-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`block px-6 py-4 text-base font-medium border-l-4 transition-all duration-200 ${isActive(link.path)
                                ? 'border-primary-black bg-primary-gray-100 text-primary-black'
                                : 'border-transparent text-primary-gray-700 hover:bg-primary-gray-50 hover:border-primary-gray-300'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Search Bar */}
                <div className="px-6 py-4 border-t border-primary-gray-200">
                    <p className="text-sm font-medium text-primary-gray-600 mb-3">Search</p>
                    <SearchBar placeholder="Search news..." />
                </div>

                {/* Social Icons */}
                <div className="px-6 py-6 border-t border-primary-gray-200">
                    <p className="text-sm font-medium text-primary-gray-600 mb-3">Follow Us</p>
                    <SocialIcons />
                </div>
            </div>
        </>
    );
};

export default MobileMenu;
