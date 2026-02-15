import React from 'react';
import { FaFacebook, FaWhatsapp, FaLink } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { shareOnFacebook, shareOnTwitter, shareOnWhatsApp, copyToClipboard } from '../../utils/helpers';

const ShareButtons = ({ url, title, className = '' }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopyLink = async () => {
        const success = await copyToClipboard(url);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const shareButtons = [
        {
            name: 'Facebook',
            icon: FaFacebook,
            onClick: () => shareOnFacebook(url),
            bgColor: 'hover:bg-[#1877F2]',
        },
        {
            name: 'X (Twitter)',
            icon: FaXTwitter,
            onClick: () => shareOnTwitter(url, title),
            bgColor: 'hover:bg-[#000000]',
        },
        {
            name: 'WhatsApp',
            icon: FaWhatsapp,
            onClick: () => shareOnWhatsApp(url, title),
            bgColor: 'hover:bg-[#25D366]',
        },
        {
            name: copied ? 'Copied!' : 'Copy Link',
            icon: FaLink,
            onClick: handleCopyLink,
            bgColor: 'hover:bg-primary-gray-700',
        },
    ];

    return (
        <div className={`flex flex-wrap items-center gap-3 ${className}`}>
            <span className="text-sm font-medium text-primary-gray-600">Share:</span>
            {shareButtons.map((button) => (
                <button
                    key={button.name}
                    onClick={button.onClick}
                    className={`share-btn ${button.bgColor} hover:text-primary-white group`}
                    aria-label={`Share on ${button.name}`}
                >
                    <button.icon className="text-lg" />
                    <span className="text-sm hidden sm:inline">{button.name}</span>
                </button>
            ))}
        </div>
    );
};

export default ShareButtons;
