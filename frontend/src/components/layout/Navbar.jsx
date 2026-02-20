import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenu, HiX, HiSearch, HiMoon, HiSun } from 'react-icons/hi';
import { FaYoutube } from 'react-icons/fa';
import MobileMenu from './MobileMenu';
import useTheme from '../../hooks/useTheme';

const Navbar = ({ onOpenDonation }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Sri Lanka', path: '/category/sri-lanka' },
        { name: 'Political', path: '/category/political' },
        { name: 'International', path: '/category/international' },
        { name: 'Feature', path: '/category/feature' },
        { name: 'Other', path: '/category/other' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => {
        // Simple exact match for home, and startsWith for others to handle sub-routes if any
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <>
            <nav
                className={`fixed top-[140px] left-0 w-full z-[1000] header-bg-premium border-b border-[var(--border-subtle)] transition-shadow duration-300 ${isScrolled ? 'shadow-[0_2px_12px_rgba(0,0,0,0.6)]' : ''}`}
                style={{ height: '60px' }}
            >
                <div className="h-full max-w-[1280px] mx-auto px-6 flex items-center justify-between">

                    {/* LEFT: SEARCH & NAV LINKS (Desktop) */}
                    <div className="hidden lg:flex items-center h-full gap-8">

                        {/* Search Bar - Moved to Left */}
                        <div className="relative flex items-center">
                            {/* Always render the button (invisible when search open) to maintain layout width and prevent shift */}
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className={`text-adaptive hover:text-[var(--accent-red)] transition-colors flex items-center gap-2 ${isSearchOpen ? 'invisible' : ''}`}
                            >
                                <HiSearch size={22} />
                                <span className="text-xs font-bold uppercase tracking-wider hidden xl:block">Search</span>
                            </button>

                            {/* Absolutely positioned form expands LEFT from the button's right edge into the empty space */}
                            {isSearchOpen && (
                                <form
                                    onSubmit={handleSearchSubmit}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-white dark:bg-black z-50 p-1 rounded shadow-lg border border-gray-200 dark:border-gray-800 origin-right"
                                >
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="bg-transparent border-b border-[var(--accent-red)] text-adaptive placeholder-gray-500 focus:outline-none w-48 py-1 text-sm font-sans"
                                        placeholder="Search..."
                                        autoFocus
                                        onBlur={(e) => {
                                            setTimeout(() => {
                                                if (!searchQuery) setIsSearchOpen(false);
                                            }, 200);
                                        }}
                                    />
                                    <button type="submit" className="text-adaptive ml-2 hover:text-[var(--accent-red)] transition-colors">
                                        <HiSearch size={20} />
                                    </button>
                                </form>
                            )}
                        </div>

                        <div className="h-6 w-px bg-[#E5E5E5] dark:bg-[#333] mx-2"></div> {/* Separator */}

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`nav-link h-full flex items-center whitespace-nowrap ${isActive(link.path) ? 'active' : ''}`}
                            >
                                {link.name}
                            </Link>
                        ))}

                    </div>

                    {/* RIGHT: ACTION BUTTONS */}
                    <div className="flex items-center gap-3 h-full">

                        {/* Search Bar Removed from here */}

                        {/* MORE Dropdown - Moved Here */}
                        <div
                            className="relative h-full flex items-center mr-2"
                            onMouseEnter={() => setIsMoreOpen(true)}
                            onMouseLeave={() => setIsMoreOpen(false)}
                        >
                            <button
                                className={`nav-link h-full flex items-center gap-1 focus:outline-none ${isMoreOpen ? 'text-primary-black dark:text-white' : ''}`}
                            >
                                MORE
                                <svg
                                    className={`w-4 h-4 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isMoreOpen && (
                                <div className="absolute top-[100%] right-0 w-48 bg-white shadow-xl border border-gray-100 rounded-b-sm py-2 overflow-hidden z-50">
                                    <Link
                                        to="/register"
                                        className="block px-4 py-3 text-sm font-bold uppercase text-gray-700 hover:bg-gray-50 hover:text-[var(--accent-red)] transition-colors border-b border-gray-50 group"
                                    >
                                        <span className="dropdown-item-text">Register</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            onOpenDonation();
                                            setIsMoreOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-3 text-sm font-bold uppercase text-gray-700 hover:bg-gray-50 hover:text-[var(--accent-orange)] transition-colors group"
                                    >
                                        <span className="dropdown-item-text">Donate</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Watch Youtube */}
                        <a
                            href="https://www.youtube.com/@darkroom002"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-2 bg-[#FF0000] text-white font-bold text-sm uppercase tracking-wider rounded-md border-b-4 border-[#990000] hover:bg-[#CC0000] hover:border-[#800000] active:border-b-0 active:translate-y-1 transition-all shadow-lg"
                            style={{ height: '44px' }}
                        >
                            <FaYoutube size={20} />
                            <span>YOU TUBE</span>
                        </a>

                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="ml-2 w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition-colors hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'light' ? <HiMoon size={22} /> : <HiSun size={22} />}
                        </button>

                        {/* Mobile Menu Button (Visible on smaller screens) */}

                        {/* Mobile Menu Button (Visible on smaller screens) */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden ml-4 text-primary-black focus:outline-none"
                        >
                            <HiMenu size={24} />
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
