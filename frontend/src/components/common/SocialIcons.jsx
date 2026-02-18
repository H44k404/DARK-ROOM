import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaYoutube, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const SocialIcons = ({ className = '' }) => {
    const socialLinks = [
        {
            name: 'Facebook',
            icon: FaFacebook,
            url: 'https://www.facebook.com/Darkroom94',
            ariaLabel: 'Visit our Facebook page',
        },
        {
            name: 'YouTube',
            icon: FaYoutube,
            url: 'https://www.youtube.com/@darkroomnews',
            ariaLabel: 'Visit our YouTube channel',
        },
        {
            name: 'TikTok',
            icon: FaTiktok,
            url: 'https://www.tiktok.com/@dark.room84?is_from_webapp=1&sender_device=pc',
            ariaLabel: 'Follow us on TikTok',
        },
        {
            name: 'X (Twitter)',
            icon: FaXTwitter,
            url: 'https://x.com/darkr66913?s=21',
            ariaLabel: 'Follow us on X (Twitter)',
        },
        {
            name: 'WhatsApp',
            icon: FaWhatsapp,
            url: 'https://whatsapp.com/channel/0029VbBjkZm89ina3UB2SB3e',
            ariaLabel: 'Join our WhatsApp Channel',
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
