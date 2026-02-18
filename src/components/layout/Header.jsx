import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocialIcons from '../common/SocialIcons';
import DateTimeClock from '../common/DateTimeClock';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onOpenDonation }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="bg-primary-black text-primary-white py-4 border-b-4 border-primary-white">
            <div className="container-custom">
                {/* Top Row: Date/Time, Logo, Auth Buttons */}
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-3 gap-4 md:gap-0">
                    {/* Left: Date/Time and Phone - Hidden on Mobile */}
                    <div className="hidden md:flex flex-1 flex-col justify-start items-start gap-2">
                        <DateTimeClock />
                        <a
                            href="tel:+94112345678"
                            className="flex items-center gap-1 text-lg text-primary-gray-300 hover:text-primary-white transition-colors"
                        >
                            <span className="font-larger">+94 11 234 5678</span>
                        </a>
                    </div>

                    {/* Center: Logo and Slogan */}
                    <Link to="/" className="flex flex-col items-center flex-1 w-full md:w-auto order-1 md:order-none">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-widest text-primary-white hover:text-primary-gray-200 transition-colors text-center uppercase whitespace-nowrap">
                            DARK ROOM
                        </h1>
                        <p className="text-xs md:text-sm text-primary-gray-300 tracking-wide mt-1 italic text-center">
                            Reality Doesn't Need a Filter
                        </p>
                    </Link>

                    {/* Right: Auth Buttons & Donate */}
                    <div className="flex-1 flex flex-row md:flex-col justify-center md:justify-end items-center md:items-end gap-3 md:gap-2 w-full md:w-auto order-2 md:order-none">
                        <button
                            onClick={onOpenDonation}
                            className="btn btn-primary text-sm md:text-lg px-6 md:px-8 py-2 font-bold animate-pulse hover:animate-none flex items-center justify-center gap-2"
                            style={{
                                background: 'linear-gradient(135deg, #DC2626, #991B1B)',
                                boxShadow: '0 8px 20px rgba(220, 38, 38, 0.4)',
                            }}
                        >
                            <span className="text-xl"></span>
                            <span>DONATE</span>
                        </button>

                        {!user && (
                            <Link
                                to="/register"
                                className="btn btn-primary text-sm md:text-lg px-6 md:px-10 py-2 font-bold animate-pulse hover:animate-none"
                                style={{
                                    background: 'linear-gradient(135deg, #000000, #1a1a1a)',
                                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                                }}
                            >
                                REGISTER
                            </Link>
                        )}

                        {user && (
                            <button
                                onClick={handleLogout}
                                className="btn btn-primary text-sm md:text-lg px-6 md:px-10 py-2 font-bold"
                                style={{
                                    background: 'linear-gradient(135deg, #000000, #1a1a1a)',
                                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                                }}
                            >
                                LOGOUT
                            </button>
                        )}
                    </div>
                </div>

                {/* Bottom Row: Social Icons - Centered */}
                <div className="flex justify-center pt-2 border-t border-primary-gray-800">
                    <SocialIcons />
                </div>
            </div>
        </header>
    );
};

export default Header;
