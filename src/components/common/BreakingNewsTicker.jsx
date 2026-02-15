import React from 'react';

const BreakingNewsTicker = ({ label, message, enabled }) => {
    if (!enabled) return null;

    // Use a default label if none provided
    const displayLabel = label || "BREAKING NEWS";

    const tickerContent = (
        <div className="flex items-center gap-12 whitespace-nowrap">
            {/* 3D-Style Label (Part of the scroll now) */}
            <div className="h-8 flex items-center px-6 bg-gradient-to-r from-orange-400 to-orange-600 shadow-lg skew-x-[-15deg] border-r-2 border-orange-700">
                <div className="skew-x-[15deg] flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]" />
                    <span className="text-black font-black italic tracking-tighter text-sm uppercase">
                        {displayLabel}
                    </span>
                </div>
            </div>

            <span className="text-white font-bold tracking-widest uppercase text-base">{message}</span>
            <span className="text-white/20 font-bold tracking-[0.4em] mx-4">///</span>
        </div>
    );

    return (
        <div className="relative w-full overflow-hidden bg-black h-12 flex items-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-b border-white/5">
            {/* Ticker Content - Using w-max and flex-nowrap for seamlessness */}
            <div className="flex animate-marquee-fast h-full items-center w-max">
                {/* Two identical sets for seamless translateX(-50%) loop */}
                <div className="flex items-center shrink-0 px-6 gap-12">
                    {[...Array(6)].map((_, i) => (
                        <React.Fragment key={`set1-${i}`}>
                            {tickerContent}
                        </React.Fragment>
                    ))}
                </div>
                <div className="flex items-center shrink-0 px-6 gap-12">
                    {[...Array(6)].map((_, i) => (
                        <React.Fragment key={`set2-${i}`}>
                            {tickerContent}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Glossy Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 to-transparent h-[40%]" />
            <div className="absolute bottom-0 inset-x-0 pointer-events-none bg-black/20 h-[20%]" />
        </div>
    );
};

export default BreakingNewsTicker;
