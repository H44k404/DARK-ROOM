import React from 'react';

const BreakingNewsTicker = ({ message, enabled }) => {
    if (!enabled) return null;

    // Duplicate content for seamless scrolling
    const tickerContent = (
        <>
            <span className="ticker-label">🔴 BREAKING NEWS</span>
            <span className="ticker-separator"> / </span>
            <span className="ticker-message">{message}</span>
            <span className="ticker-separator"> / </span>
        </>
    );

    return (
        <div className="breaking-news-ticker">
            <div className="ticker-wrapper">
                <div className="ticker-content">
                    {tickerContent}
                    {tickerContent}
                    {tickerContent}
                    {tickerContent}
                </div>
            </div>
        </div>
    );
};

export default BreakingNewsTicker;
