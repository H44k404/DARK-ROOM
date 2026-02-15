import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatNumber } from '../../utils/helpers';
import { HiEye, HiPlay, HiVolumeUp } from 'react-icons/hi';

const PostCard = ({ post, featured = false }) => {
    const cardClass = featured
        ? 'card card-hover group cursor-pointer h-full flex flex-col'
        : 'card card-hover group cursor-pointer h-full flex flex-col';

    const imageClass = featured
        ? 'w-full h-64 md:h-80 lg:h-96 object-cover'
        : 'w-full h-48 md:h-56 object-cover';

    const titleClass = featured
        ? 'text-2xl md:text-3xl lg:text-4xl font-bold text-primary-black group-hover:text-primary-gray-700 transition-colors line-clamp-3'
        : 'text-lg md:text-xl font-bold text-primary-black group-hover:text-primary-gray-700 transition-colors line-clamp-2';

    return (
        <Link to={`/post/${post.slug}`} className={cardClass}>
            {/* Featured Image */}
            <div className="relative overflow-hidden">
                <img
                    src={post.featuredImage}
                    alt={post.title}
                    className={`${imageClass} group-hover:scale-105 transition-transform duration-300`}
                    loading="lazy"
                />
                {/* Category Badge - Bottom Left */}
                <div className="absolute bottom-4 left-4">
                    <span className="category-badge shadow-lg text-base md:text-lg px-6 py-3 font-bold">{post.categoryName}</span>
                </div>

                {/* Post Type Badge - Bottom Right - Same style as category badge */}
                {post.postType === 'video' && (
                    <div className="absolute bottom-4 right-4">
                        <span className="inline-block px-6 py-3 text-base md:text-lg font-bold uppercase tracking-wide bg-red-600 text-white shadow-lg flex items-center gap-2">
                            <HiPlay className="text-xl" />
                            VIDEO
                        </span>
                    </div>
                )}
                {post.postType === 'audio' && (
                    <div className="absolute bottom-4 right-4">
                        <span className="inline-block px-6 py-3 text-base md:text-lg font-bold uppercase tracking-wide bg-purple-600 text-white shadow-lg flex items-center gap-2">
                            <HiVolumeUp className="text-xl" />
                            AUDIO
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 flex-1 flex flex-col">
                {/* Title */}
                <h3 className={titleClass}>{post.title}</h3>

                {/* Excerpt */}
                {post.excerpt && (
                    <p className={`mt-3 text-primary-gray-600 leading-relaxed ${featured ? 'line-clamp-3' : 'line-clamp-2'}`}>
                        {post.excerpt}
                    </p>
                )}

                {/* Meta Info */}
                <div className="mt-auto pt-4 flex items-center justify-between text-sm text-primary-gray-500">
                    <time dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt, post.language)}
                    </time>
                    <div className="flex items-center gap-1">
                        <HiEye className="text-base" />
                        <span>{formatNumber(post.viewCount)}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PostCard;
