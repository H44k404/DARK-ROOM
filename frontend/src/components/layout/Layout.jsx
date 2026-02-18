import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import BreakingNewsTicker from '../common/BreakingNewsTicker';
import DonationModal from '../common/DonationModal';
import FloatingSocialSidebar from '../common/FloatingSocialSidebar';
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
            <FloatingSocialSidebar />
            <Header onOpenDonation={openDonationModal} />
            <Navbar />
            <div>
                <BreakingNewsTicker label={tickerConfig.label} message={tickerConfig.message} enabled={tickerConfig.enabled} />
            </div>
            <main className="flex-1 bg-primary-white">
                {children}
            </main>
            <Footer onOpenDonation={openDonationModal} />
            <DonationModal isOpen={isDonationModalOpen} onClose={closeDonationModal} />
        </div>
    );
};

export default Layout;
