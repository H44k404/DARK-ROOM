import React from 'react';
import { FaYoutube, FaFacebookF, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const SocialFollowCard = () => {
    const socialChannels = [
        {
            name: 'YOUTUBE',
            icon: <FaYoutube />,
            stats: '1.2M Subscribers',
            link: 'https://www.youtube.com/@darkroom002'
        },
        {
            name: 'FB PAGE',
            icon: <FaFacebookF />,
            stats: '850K Followers',
            link: 'https://facebook.com'
        },
        {
            name: 'TIKTOK',
            icon: <FaTiktok />,
            stats: '2.5M Followers',
            link: 'https://tiktok.com'
        },
        {
            name: 'WHATSAPP',
            icon: <FaWhatsapp />,
            stats: 'Join Channel',
            link: 'https://whatsapp.com'
        }
    ];

    return (
        <div className="w-full mt-6">
            <div className="flex flex-col gap-3">
                {socialChannels.map((channel) => (
                    <a
                        key={channel.name}
                        href={channel.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-5 py-4 bg-white dark:bg-black border-l-4 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-[#111] transition-colors group shadow-sm"
                    >
                        <div className="text-black dark:text-white text-2xl mr-4 group-hover:scale-110 transition-transform">
                            {channel.icon}
                        </div>
                        <span className="text-black dark:text-white text-sm font-bold tracking-wider uppercase">
                            {channel.stats}
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default SocialFollowCard;
