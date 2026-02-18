import React from 'react';
import { FaFacebook, FaYoutube, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const FloatingSocialSidebar = () => {
    const socialLinks = [
        {
            name: 'Facebook',
            icon: FaFacebook,
            url: 'https://www.facebook.com/Darkroom94',
            color: 'hover:bg-[#1877F2]',
            ariaLabel: 'Visit our Facebook page',
        },
        {
            name: 'YouTube',
            icon: FaYoutube,
            url: 'https://www.youtube.com/@darkroomnews',
            color: 'hover:bg-[#FF0000]',
            ariaLabel: 'Visit our YouTube channel',
        },
        {
            name: 'TikTok',
            icon: FaTiktok,
            url: 'https://www.tiktok.com/@dark.room84?is_from_webapp=1&sender_device=pc',
            color: 'hover:bg-[#000000]',
            ariaLabel: 'Follow us on TikTok',
        },
        {
            name: 'X (Twitter)',
            icon: FaXTwitter,
            url: 'https://x.com/darkr66913?s=21',
            color: 'hover:bg-[#000000]',
            ariaLabel: 'Follow us on X (Twitter)',
        },
        {
            name: 'WhatsApp',
            icon: FaWhatsapp,
            url: 'https://whatsapp.com/channel/0029VbBjkZm89ina3UB2SB3e',
            color: 'hover:bg-[#25D366]',
            ariaLabel: 'Join our WhatsApp Channel',
        },
    ];

    return (
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
            {socialLinks.map((social) => (
                <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className={`
                        w-10 h-10 md:w-12 md:h-12 flex items-center justify-center 
                        bg-primary-black text-white 
                        transition-all duration-300 ease-in-out
                        ${social.color} hover:w-14 shadow-lg
                    `}
                >
                    <social.icon className="text-lg md:text-xl" />
                </a>
            ))}
        </div>
    );
};

export default FloatingSocialSidebar;
