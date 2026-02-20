import React, { useRef, useEffect, useState } from 'react';

const BreakingNewsTicker = ({ label, message, enabled }) => {
    if (!enabled) return null;

    const displayLabel = label || "BREAKING NEWS";

    // Split message by slash for multiple items if present, or just use message
    const newsItems = message ? message.split('/').map(item => item.trim()).filter(item => item) : [];
    const content = newsItems.length > 0 ? newsItems : [message];

    return (
        <div className="w-full bg-black h-12 flex items-center shadow-lg border-b border-white/10 relative overflow-hidden z-[999]">
            {/* Static Label */}
            <div className="h-full bg-red-700 px-6 flex items-center justify-center relative z-20 shrink-0">
                <span className="text-white font-black italic tracking-tighter text-lg uppercase select-none">
                    {displayLabel}
                </span>
                {/* Slanted edge for a premium feel (optional, keeping it simple as requested but adding a subtle touch) */}
                <div className="absolute right-[-12px] top-0 h-full w-[24px] bg-red-700 transform skew-x-[-20deg] z-10"></div>
            </div>

            {/* Scrolling Content Area */}
            <div className="flex-1 h-full flex items-center overflow-hidden relative z-10 pl-8">
                <div className="animate-marquee whitespace-nowrap flex items-center">
                    {/* Repeat content enough times to fill smooth scroll */}
                    {[...Array(4)].map((_, groupIndex) => (
                        <div key={`group-${groupIndex}`} className="flex items-center">
                            {content.map((item, i) => (
                                <React.Fragment key={`item-${groupIndex}-${i}`}>
                                    <span className="text-white font-medium tracking-widest uppercase text-xl mx-8">
                                        {item}
                                    </span>
                                    <span className="text-red-600 text-xl mx-2">•</span>
                                </React.Fragment>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Add marquee animation style if not globally present, ensuring it works */}
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default BreakingNewsTicker;
