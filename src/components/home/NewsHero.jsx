import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const NewsHero = ({ posts }) => {
    if (!posts || posts.length === 0) return null;

    const mainPost = posts[0];
    const subPosts = posts.slice(1, 5); // Take up to 4 more posts

    return (
        <section className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 lg:gap-1 h-auto lg:h-[600px]">
                {/* Main Hero Card (Left - Spans 8 cols) */}
                <div className="lg:col-span-8 h-[300px] md:h-[400px] lg:h-full relative overflow-hidden group">
                    <Link to={`/post/${mainPost.slug}`} className="block w-full h-full">
                        <div className="absolute inset-0 bg-primary-gray-900">
                            <img
                                src={mainPost.featuredImage}
                                alt={mainPost.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-60"
                            />
                        </div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10">
                            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-white uppercase bg-red-600 w-fit">
                                {mainPost.categoryName}
                            </span>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-lg text-sinhala">
                                {mainPost.title}
                            </h2>
                            <div className="flex items-center text-gray-300 text-sm md:text-base mt-2 space-x-4">
                                <span>{mainPost.publishedAt ? formatDistanceToNow(new Date(mainPost.publishedAt), { addSuffix: true }) : 'Just now'}</span>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Sub Grid (Right - Spans 4 cols) */}
                <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 grid-rows-4 gap-1 h-auto lg:h-full">
                    {subPosts.map((post) => (
                        <div key={post.id} className="relative overflow-hidden group h-[200px] lg:h-auto row-span-1">
                            <Link to={`/post/${post.slug}`} className="block w-full h-full">
                                <div className="absolute inset-0 bg-primary-gray-900">
                                    <img
                                        src={post.featuredImage}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-60"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4">
                                    <span className="text-xs font-bold text-red-500 mb-1 uppercase tracking-wider">
                                        {post.categoryName}
                                    </span>
                                    <h3 className="text-base md:text-lg font-bold text-white line-clamp-2 drop-shadow-md group-hover:text-red-400 transition-colors text-sinhala">
                                        {post.title}
                                    </h3>
                                    <span className="text-gray-400 text-xs mt-1">
                                        {post.publishedAt ? formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true }) : 'Just now'}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsHero;
