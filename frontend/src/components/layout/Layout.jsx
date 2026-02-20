import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BreakingNewsTicker from '../common/BreakingNewsTicker';
import DonationModal from '../common/DonationModal';
// import FloatingSocialSidebar from '../common/FloatingSocialSidebar';
import { getLocalStorage } from '../../utils/helpers';

const Layout = ({ children }) => {
    const location = useLocation();
    const [tickerConfig, setTickerConfig] = useState({ enabled: false, label: 'BREAKING NEWS', message: '' });
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

    useEffect(() => {
        const savedConfig = getLocalStorage('darkroom_ticker_config');
        if (savedConfig) {
            setTickerConfig({
                enabled: savedConfig.enabled ?? false,
                label: savedConfig.label ?? 'BREAKING NEWS',
                message: savedConfig.message ?? ''
            });
        }
    }, [location]);

    const openDonationModal = () => setIsDonationModalOpen(true);
    const closeDonationModal = () => setIsDonationModalOpen(false);


    return (
        <div className="min-h-screen flex flex-col relative">
// Floating Social Sidebar Removed

            {/* Top Logo Section (Centered Above Navbar) */}
            <div className="fixed top-0 left-0 w-full h-[140px] z-[1001] header-bg-premium flex items-center justify-center border-b border-[var(--border-subtle)]">
                <div className="flex flex-col justify-center items-center">
                    <Link to="/" className="flex flex-col items-center leading-none whitespace-nowrap group">
                        <span style={{ fontFamily: "'Monoton', cursive", fontSize: '70px', color: 'var(--text-white)', letterSpacing: '2px', fontWeight: '400' }}>
                            DARK ROOM
                        </span>
                        <span
                            className="text-center uppercase"
                            style={{
                                fontFamily: "'Courier Prime', 'Courier New', monospace",
                                fontSize: '18px',
                                color: 'var(--accent-red)',
                                marginTop: '4px',
                                letterSpacing: '1px',
                                fontWeight: '700' // Increased weight for visibility
                            }}
                        >
                            Reality Doesn't Need a Filter.
                        </span>
                    </Link>
                </div>
            </div>

            <Navbar onOpenDonation={openDonationModal} />
            <div className="pt-[200px]"> {/* 140px (top) + 60px (nav) */}
                <BreakingNewsTicker label={tickerConfig.label} message={tickerConfig.message} enabled={tickerConfig.enabled} />
            </div>
            <main className="flex-1 bg-[var(--bg-primary)]">
                {children}
            </main>
            <Footer onOpenDonation={openDonationModal} />
            <DonationModal isOpen={isDonationModalOpen} onClose={closeDonationModal} />
        </div>
    );
};

export default Layout;
