import React from 'react';

const AudioPlayer = ({ audioId, title }) => {
    return (
        <div className="relative w-full bg-primary-gray-900 rounded-sm overflow-hidden">
            <div className="aspect-video md:aspect-[21/9]">
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${audioId}?rel=0`}
                    title={title || 'Audio Player'}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                />
            </div>
            <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-sm text-sm font-medium">
                🎧 Audio
            </div>
        </div>
    );
};

export default AudioPlayer;
