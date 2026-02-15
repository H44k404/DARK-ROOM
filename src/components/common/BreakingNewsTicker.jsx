import React from 'react';

const BreakingNewsTicker = ({ label, message, enabled }) => {
    if (!enabled) return null;

    // Use a default label if none provided
    const displayLabel = label || "BREAKING NEWS";

    const tickerContent = (
        <div className="flex items-center gap-8 whitespace-nowrap">
            <span className="text-white/40 font-bold tracking-[0.3em]">/</span>
            <span className="text-white font-bold tracking-tight uppercase">{message}</span>
            <span className="text-white/40 font-bold tracking-[0.3em]">/</span>
        </div>
    );

    return (
        <div className="relative w-full overflow-hidden bg-black h-12 flex items-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] border-b border-white/5">
            {/* 3D Label Box */}
            <div className="relative z-20 h-full flex items-center px-8 bg-gradient-to-r from-orange-400 to-orange-600 shadow-[5px_0_15px_rgba(0,0,0,0.3)] skew-x-[-15deg] -ml-4 mr-6 border-r-4 border-orange-700">
                <div className="skew-x-[15deg] flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]" />
                    <span className="text-black font-black italic tracking-tighter text-lg whitespace-nowrap">
                        {displayLabel}
                    </span>
                </div>
            </div>

            {/* Ticker Content */}
            <div className="flex-1 h-full flex items-center overflow-hidden">
                <div className="flex animate-marquee-fast h-full items-center min-w-full">
                    {/* We need two sets of content for the translateX(-50%) trick */}
                    <div className="flex items-center shrink-0">
                        {[1, 2, 3, 4].map((i) => (
                            <React.Fragment key={`set1-${i}`}>
                                {tickerContent}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="flex items-center shrink-0">
                        {[1, 2, 3, 4].map((i) => (
                            <React.Fragment key={`set2-${i}`}>
                                {tickerContent}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* Glossy Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 to-transparent h-[40%]" />
            <div className="absolute bottom-0 inset-x-0 pointer-events-none bg-black/20 h-[20%]" />
        </div>
    );
};

export default BreakingNewsTicker;
