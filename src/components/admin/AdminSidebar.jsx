import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HiHome, HiDocumentText, HiLogout, HiPlusCircle, HiSpeakerphone, HiCog, HiExternalLink } from 'react-icons/hi';
import { useAuth } from '../../hooks/useAuth';
import { ROLE_DISPLAY_NAMES } from '../../utils/helpers';

const AdminSidebar = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: HiHome, roles: ['super_admin', 'admin', 'editor'] },
        { name: 'Create Post', path: '/admin/create-post', icon: HiPlusCircle, roles: ['super_admin', 'admin', 'editor'] },
        { name: 'Manage Posts', path: '/admin/manage-posts', icon: HiDocumentText, roles: ['super_admin', 'admin', 'editor'] },
        { name: 'Breaking News Ticker', path: '/admin/manage-ticker', icon: HiSpeakerphone, roles: ['super_admin', 'admin'] },
        { name: 'Settings', path: '/admin/settings', icon: HiCog, roles: ['super_admin', 'admin'] },
    ];

    const filteredMenuItems = menuItems.filter(item => item.roles.includes(user?.role));

    const isActivePath = (path) => location.pathname === path;

    return (
        <aside className="w-72 bg-white border-r border-gray-100 h-screen sticky top-0 flex flex-col shadow-sm">
            <div className="p-8 pb-4">
                <Link to="/" className="text-2xl font-bold tracking-widest text-primary-black hover:opacity-80 transition-opacity uppercase">
                    DARK&nbsp;&nbsp;ROOM
                </Link>
                <div className="flex items-center gap-2 mt-2 text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <p className="text-[10px] font-bold uppercase tracking-widest">Management System</p>
                </div>
            </div>

            <div className="px-6 mb-8">
                <Link
                    to="/"
                    className="flex items-center justify-between gap-3 px-4 py-3 bg-gray-50 rounded-xl text-gray-600 hover:bg-gray-100 transition-all border border-gray-100 group shadow-sm"
                >
                    <div className="flex items-center gap-3">
                        <HiExternalLink className="text-lg text-gray-400 group-hover:text-primary-black transition-colors" />
                        <span className="text-sm font-semibold">View Website</span>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 px-6 space-y-1">
                <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Core Controls</p>
                {filteredMenuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${isActivePath(item.path)
                            ? 'bg-primary-black text-white shadow-lg shadow-black/10'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-primary-black'
                            }`}
                    >
                        <item.icon className={`text-xl ${isActivePath(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-primary-black'}`} />
                        <span className="text-sm font-semibold tracking-tight">{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-6 mt-auto space-y-4">
                <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary-black flex items-center justify-center text-white font-bold text-xs ring-4 ring-white shadow-md">
                            {user?.name?.charAt(0)}
                        </div>
                        <div className="min-w-0">
                            <p className="font-bold text-xs text-primary-black truncate">{user?.name}</p>
                            <p className="text-[10px] text-gray-400 truncate tracking-tight">{ROLE_DISPLAY_NAMES[user?.role]}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 px-4 py-2 w-full rounded-xl bg-white border border-gray-200 text-gray-600 text-[11px] font-bold hover:bg-gray-50 hover:text-red-600 transition-all shadow-sm"
                    >
                        <HiLogout />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;
