import React, { useEffect } from 'react';
import YouTubeEmbed from './YouTubeEmbed';
import { FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa';

const SocialFeeds = ({ latestVideoId }) => {
    useEffect(() => {
        // Cleanup if needed
    }, []);

    return (
        <div className="space-y-8">
            {/* Facebook Card - Simplified */}
            <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-800 flex items-center gap-3 bg-gray-800">
                    <FaFacebook className="text-blue-500 text-xl" />
                    <h3 className="text-sm font-bold text-gray-100 uppercase tracking-wide">Facebook</h3>
                </div>
                <div className="p-6 text-center bg-gray-900">
                    <p className="text-gray-400 mb-4 text-sm">Follow us on Facebook for daily news and updates.</p>
                    <a
                        href="https://www.facebook.com/Darkroom94"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors text-sm"
                    >
                        <FaFacebook />
                        Follow Page
                    </a>
                    <p className="text-xs text-gray-500 mt-4">10,529 followers</p>
                </div>
            </div>

            {/* YouTube Card - Dark Theme */}
            <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-800 flex items-center gap-3 bg-gray-800">
                    <FaYoutube className="text-red-500 text-xl" />
                    <h3 className="text-sm font-bold text-gray-100 uppercase tracking-wide">YouTube</h3>
                </div>
                <div className="p-4 bg-gray-900">
                    {latestVideoId ? (
                        <YouTubeEmbed videoId={latestVideoId} title="Latest from YouTube" />
                    ) : (
                        <div className="text-center py-6">
                            <p className="text-gray-400 mb-4 text-sm">Watch our latest investigations and news reports.</p>
                            <a
                                href="https://www.youtube.com/@darkroomnews"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-colors text-sm"
                            >
                                <FaYoutube />
                                Subscribe Channel
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* TikTok Card - Dark Theme */}
            <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-800 flex items-center gap-3 bg-gray-800">
                    <FaTiktok className="text-gray-100 text-xl" />
                    <h3 className="text-sm font-bold text-gray-100 uppercase tracking-wide">TikTok</h3>
                </div>
                <div className="p-6 text-center bg-gray-900">
                    <p className="text-gray-400 mb-4 text-sm">Follow us for quick updates and behind-the-scenes.</p>
                    <a
                        href="https://www.tiktok.com/@dark.room84?is_from_webapp=1&sender_device=pc"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-700 text-white font-medium rounded-full hover:bg-gray-600 transition-colors text-sm"
                    >
                        <FaTiktok />
                        Follow on TikTok
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SocialFeeds;
