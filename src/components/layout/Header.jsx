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
                <div className="flex items-start justify-between mb-3">
                    {/* Left: Date/Time and Phone */}
                    <div className="flex-1 flex flex-col justify-start items-start gap-2">
                        <DateTimeClock />
                        <a
                            href="tel:+94112345678"
                            className="flex items-center gap-1 text-lg text-primary-gray-300 hover:text-primary-white transition-colors"
                        >
                            <span className="font-larger">+94 11 234 5678</span>
                        </a>
                    </div>

                    {/* Center: Logo and Slogan */}
                    <Link to="/" className="flex flex-col items-center flex-1">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-widest text-primary-white hover:text-primary-gray-200 transition-colors text-center uppercase whitespace-nowrap">
                            DARK&nbsp;&nbsp;ROOM
                        </h1>
                        <p className="text-xs md:text-sm text-primary-gray-300 tracking-wide mt-1 italic text-center">
                            Reality Doesn't Need a Filter
                        </p>
                    </Link>

                    {/* Right: Auth Buttons & Donate */}
                    <div className="flex-1 flex flex-col justify-start items-end gap-2">
                        <button
                            onClick={onOpenDonation}
                            className="btn btn-primary text-xs md:text-lg px-8 py-2 font-bold animate-pulse hover:animate-none flex items-center justify-center gap-2"
                            style={{
                                background: 'linear-gradient(135deg, #DC2626, #991B1B)',
                                boxShadow: '0 8px 20px rgba(220, 38, 38, 0.4)',
                            }}
                        >
                            <span className="text-xl"></span>
                            <span>DONATE</span>
                        </button>

                        <Link
                            to="/register"
                            className="btn btn-primary text-xs md:text-lg px-10 py-2 font-bold animate-pulse hover:animate-none"
                            style={{
                                background: 'linear-gradient(135deg, #000000, #1a1a1a)',
                                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                            }}
                        >
                            REGISTER
                        </Link>
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
