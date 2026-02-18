import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import MobileMenu from './MobileMenu';
import SearchBar from '../common/SearchBar';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Sri Lanka', path: '/category/sri-lanka' },
        { name: 'Political', path: '/category/political' },
        { name: 'Feature', path: '/category/feature' },
        { name: 'International', path: '/category/international' },
        { name: 'Other', path: '/category/other' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'About Us', path: '/about' },
    ];

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <>
            <nav className="bg-primary-white border-b-2 border-primary-black sticky top-0 z-40 shadow-sm">
                <div className="container-custom">
                    <div className="flex items-center justify-center h-14 md:h-16">
                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`px-4 py-2 text-sm font-medium uppercase tracking-wide transition-all duration-300 rounded-full ${link.name === 'Sri Lanka'
                                        ? 'px-6 py-3 text-base font-bold' // 👈 LARGER SIZE FOR SRI LANKA
                                        : ''
                                        } ${isActive(link.path)
                                            ? 'bg-primary-black text-primary-white shadow-lg'
                                            : 'text-primary-black hover:bg-primary-gray-100 hover:shadow-md'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {/* Search Bar - Desktop */}
                            <div className="ml-4 pl-4 border-l-2 border-primary-gray-300">
                                <SearchBar />
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden touch-target flex items-center justify-center text-primary-black hover:bg-primary-gray-100 rounded-full transition-colors"
                            aria-label="Open menu"
                        >
                            <HiMenu className="text-2xl" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                navLinks={navLinks}
            />
        </>
    );
};

export default Navbar;
