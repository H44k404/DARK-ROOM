import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatNumber } from '../../utils/helpers';
import { HiEye, HiPlay, HiVolumeUp } from 'react-icons/hi';

const PostCard = ({ post, featured = false }) => {
    const cardClass = featured
        ? 'card card-hover group cursor-pointer h-full flex flex-col'
        : 'card card-hover group cursor-pointer h-full flex flex-col';

    // Use object-cover on a slightly smaller box so the image fills but is not too tall
    const imageClass = featured
        ? 'w-full h-56 md:h-64 lg:h-72 object-cover bg-gray-100'
        : 'w-full h-40 md:h-48 object-cover bg-gray-100';

    const titleClass = featured
        ? 'text-xl md:text-2xl lg:text-3xl font-bold text-primary-black group-hover:text-primary-gray-700 transition-colors line-clamp-3'
        : 'text-lg md:text-xl font-bold text-primary-black group-hover:text-primary-gray-700 transition-colors line-clamp-2';

    return (
        <Link to={`/post/${post.slug}`} className={cardClass}>
            {/* Featured Image */}
            <div className="relative overflow-hidden flex items-center justify-center bg-gray-100">
                <img
                    src={post.featuredImage}
                    alt={post.title}
                    className={`${imageClass} group-hover:scale-105 transition-transform duration-700 object-center`}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', maxHeight: '100%' }}
                />


                {/* Post Type Badge - Bottom Right */}
                {post.postType === 'video' && (
                    <div className="absolute bottom-3 right-3">
                        <span className="inline-block w-8 h-8 flex items-center justify-center bg-black/50 backdrop-blur-sm text-white rounded-full border border-white/20">
                            <HiPlay className="text-sm" />
                        </span>
                    </div>
                )}
                {post.postType === 'audio' && (
                    <div className="absolute bottom-3 right-3">
                        <span className="inline-block w-8 h-8 flex items-center justify-center bg-purple-600/80 backdrop-blur-sm text-white rounded-full">
                            <HiVolumeUp className="text-sm" />
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 flex-1 flex flex-col">
                {/* Title */}
                <h3 className={`${titleClass} text-sinhala`} style={{ paddingLeft: 12, paddingRight: 12 }}>{post.title}</h3>

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
