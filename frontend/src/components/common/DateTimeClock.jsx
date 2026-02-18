import React, { useState, useEffect } from 'react';

const DateTimeClock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return date.toLocaleDateString('en-US', options);
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };

    return (
        <div className="text-left">
            <div className="text-xs md:text-sm text-primary-gray-300 font-medium">
                {formatDate(currentTime)}
            </div>
            <div className="text-sm md:text-base text-primary-white font-bold tracking-wide">
                {formatTime(currentTime)}
            </div>
        </div>
    );
};

export default DateTimeClock;
