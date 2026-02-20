import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { HiPlay } from 'react-icons/hi';

const PostCard = ({ post }) => {
    // Helper for category badge color
    const getBadgeStyle = (type) => {
        const typeLower = type?.toLowerCase() || '';
        if (['analysis', 'eyewitness'].includes(typeLower)) return { background: '#1a73e8' }; // Blue
        if (['exclusive', 'breaking', 'live'].includes(typeLower)) return { background: '#E4002B' }; // Red
        if (typeLower === 'video') return { background: 'rgba(0,0,0,0.8)' }; // Black opacity
        return { background: '#FF6900' }; // Default Orange
    };

    // Determine badge text and style
    // The user says "Badge on image (category label like ANALYSIS, EYEWITNESS...) comes from a 'badge' or 'tag' field"
    // I will check for a 'badge' property, or fallback to postType if it matches, or nothing.
    const badgeText = post.badge || post.postType; // adjusting based on available data assumption
    const showBadge = !!badgeText;
    const badgeStyle = getBadgeStyle(badgeText);

    return (
        <article className="group flex flex-col h-full border-b border-[#2A2A2A] pb-[16px]">
            <Link to={`/post/${post.slug}`} className="block overflow-hidden relative aspect-video mb-[10px] rounded-xl">
                {/* Image with Zoom Effect */}
                <img
                    src={post.featuredImage}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Badge on Image */}
                {showBadge && (
                    <div
                        className="absolute bottom-0 left-0 text-white uppercase tracking-[0.5px]"
                        style={{
                            ...badgeStyle,
                            fontSize: '10px',
                            padding: '4px 8px',
                        }}
                    >
                        {badgeText}
                    </div>
                )}
            </Link>

            {/* Headline */}
            <h3
                className="mb-[8px] group-hover:underline decoration-primary-black underline-offset-2 text-adaptive"
                style={{
                    fontFamily: "'Abhaya Libre', serif",
                    fontSize: '18px', // Increased slightly for readability with lighter weight
                    fontWeight: '400',
                    lineHeight: '1.4',
                    margin: '10px 0 8px 0'
                }}
            >
                <Link to={`/post/${post.slug}`}>
                    {post.title}
                </Link>
            </h3>

            {/* Meta Row (Time | Category) */}
            <div className="flex items-center text-[13px] mt-auto">
                <span className="text-primary-gray-600 dark:text-gray-500">
                    {post.publishedAt ? formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true }) : ''}
                </span>
                <span className="mx-[6px] text-gray-300 dark:text-gray-600">|</span>
                <Link
                    to={`/category/${post.categoryName?.toLowerCase()}`}
                    className="hover:underline text-[var(--accent-orange)] font-semibold"
                    style={{
                        textDecoration: 'none'
                    }}
                >
                    {post.categoryName || 'News'}
                </Link>
            </div>
        </article>
    );
};

export default PostCard;
