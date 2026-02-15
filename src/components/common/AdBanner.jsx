import React from 'react';

/**
 * AdBanner Component - Displays simplified advertisement placeholders
 * 
 * @param {string} size - Ad size: 'leaderboard', 'banner', 'medium-rectangle', 'large-rectangle', 'square'
 * @param {string} className - Additional CSS classes
 */
const AdBanner = ({ size = 'banner', className = '' }) => {
    // Ad size configurations
    const sizeConfig = {
        'leaderboard': { width: '970px', height: '90px', maxWidth: '100%' },
        'banner': { width: '728px', height: '90px', maxWidth: '100%' },
        'medium-rectangle': { width: '300px', height: '250px', maxWidth: '100%' },
        'large-rectangle': { width: '336px', height: '280px', maxWidth: '100%' },
        'square': { width: '300px', height: '300px', maxWidth: '100%' },
    };

    const currentSize = sizeConfig[size] || sizeConfig.banner;
    const isSmallAd = size === 'medium-rectangle' || size === 'large-rectangle' || size === 'square';

    return (
        <div
            className={`ad-banner mx-auto ${className}`}
            style={{
                maxWidth: currentSize.maxWidth,
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <div
                className={`
                    relative overflow-hidden w-full
                    bg-white border border-gray-100 rounded-xl
                    hover:border-gray-200 transition-all duration-300
                    cursor-pointer group flex flex-col items-center justify-center
                    p-6
                `}
                style={{
                    height: currentSize.height,
                    minHeight: currentSize.height,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                }}
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
