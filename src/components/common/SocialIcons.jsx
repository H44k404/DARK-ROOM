import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const SocialIcons = ({ className = '' }) => {
    const socialLinks = [
        {
            name: 'Facebook',
            icon: FaFacebook,
            url: 'https://facebook.com/darkroom',
            ariaLabel: 'Visit our Facebook page',
        },
        {
            name: 'YouTube',
            icon: FaYoutube,
            url: 'https://youtube.com/@darkroom',
            ariaLabel: 'Visit our YouTube channel',
        },
        {
            name: 'TikTok',
            icon: FaTiktok,
            url: 'https://tiktok.com/@darkroom',
            ariaLabel: 'Follow us on TikTok',
        },
        {
            name: 'X (Twitter)',
            icon: FaXTwitter,
            url: 'https://x.com/darkroom',
            ariaLabel: 'Follow us on X (Twitter)',
        },
    ];

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {socialLinks.map((social) => (
                <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="social-icon"
                >
                    <social.icon className="text-lg" />
                </a>
            ))}
        </div>
    );
};

export default SocialIcons;
