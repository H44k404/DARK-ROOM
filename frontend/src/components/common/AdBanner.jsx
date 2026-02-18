import React from 'react';

/**
 * AdBanner Component - Displays simplified advertisement placeholders
 * 
 * @param {string} size - Ad size: 'leaderboard', 'banner', 'medium-rectangle', 'large-rectangle', 'square'
 * @param {string} className - Additional CSS classes
 */
const AdBanner = ({ size = 'banner', className = '' }) => {
    // Ad size configurations mapping to Tailwind classes for responsive behavior
    // Mobile first approach: Default to mobile size, then md: for desktop
    const sizeConfig = {
        'leaderboard': {
            // Mobile: 300x250 (Medium Rec is standard alternative) or scaled banner. 
            // Plan says "swapped for Medium Rectangle". 
            mobile: 'w-[300px] h-[250px]',
            desktop: 'md:w-[970px] md:h-[90px]',
            maxWidth: 'max-w-full'
        },
        'banner': {
            mobile: 'w-[300px] h-[250px]',
            desktop: 'md:w-[728px] md:h-[90px]',
            maxWidth: 'max-w-full'
        },
        'medium-rectangle': {
            mobile: 'w-[300px] h-[250px]',
            desktop: 'md:w-[300px] md:h-[250px]',
            maxWidth: 'max-w-full'
        },
        'large-rectangle': {
            mobile: 'w-[300px] h-[250px]',
            desktop: 'md:w-[336px] md:h-[280px]',
            maxWidth: 'max-w-full'
        },
        'square': {
            mobile: 'w-[300px] h-[300px]',
            desktop: 'md:w-[300px] md:h-[300px]',
            maxWidth: 'max-w-full'
        },
    };

    const config = sizeConfig[size] || sizeConfig.banner;
    const isSmallAd = size.includes('rectangle') || size === 'square';

    return (
        <div
            className={`ad-banner mx-auto ${className}`}
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <div
                className={`
                    relative overflow-hidden
                    ${config.mobile} ${config.desktop} ${config.maxWidth}
                    bg-white border border-gray-100 rounded-xl
                    hover:border-gray-200 transition-all duration-300
                    cursor-pointer group flex flex-col items-center justify-center
                    p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]
                `}
            >
                {/* Background Pattern - Subtle dots */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}></div>

                {/* Ad Content */}
                <div className="relative z-10 text-center flex flex-col items-center justify-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mb-1 group-hover:scale-110 transition-transform">
                        <span className="text-xs font-bold">Ad</span>
                    </div>
                    <h3 className="text-gray-400 font-bold tracking-tight text-sm md:text-base group-hover:text-gray-500 transition-colors">
                        Your Advertisement Here
                    </h3>
                    {!isSmallAd && (
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">
                            Reach our audience with a custom promotion.
                        </p>
                    )}
                </div>

                {/* Advertisement Label */}
                <div className="absolute bottom-2 right-3 text-[8px] font-bold text-gray-200 uppercase tracking-widest pointer-events-none">
                    Sponsored Concept
                </div>
            </div>
        </div>
    );
};

export default AdBanner;
