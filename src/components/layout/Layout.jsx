import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import BreakingNewsTicker from '../common/BreakingNewsTicker';
import DonationModal from '../common/DonationModal';
import { getLocalStorage } from '../../utils/helpers';

const Layout = ({ children }) => {
    const location = useLocation();
    const [tickerConfig, setTickerConfig] = useState({ enabled: false, message: '' });
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

    useEffect(() => {
        const savedConfig = getLocalStorage('darkroom_ticker_config');
        if (savedConfig) {
            setTickerConfig(savedConfig);
        }
    }, [location]);

    const openDonationModal = () => setIsDonationModalOpen(true);
    const closeDonationModal = () => setIsDonationModalOpen(false);


    return (
        <div className="min-h-screen flex flex-col">
            <Header onOpenDonation={openDonationModal} />
            <Navbar />
            <div className="mt-3">
                <BreakingNewsTicker message={tickerConfig.message} enabled={tickerConfig.enabled} />
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
