import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { HiPlay } from 'react-icons/hi';
import SocialFollowCard from './SocialFollowCard';

const NewsHero = ({ posts }) => {
    // Need at least 2 posts for the layout (Left Hero + Right Small Card)
    // The middle one is just text from the main post or a 3rd post? 
    // "MIDDLE TEXT COLUMN... Just the headline text... Below headline: meta row"
    // Usually Sky News "Top Stories" has one main story featured in the first two columns (Image + Text), 
    // or distinct stories. 
    // Based on user spec: "HERO LAYOUT (first row — 3 columns)"
    // 1. Lef Hero Image (48%)
    // 2. Middle Text (28%)
    // 3. Right Small Card (24%)
    // The user says "LEFT HERO CARD" has "Badge (e.g. EYEWITNESS)", "No card title below image".
    // "MIDDLE TEXT COLUMN" has "No image", "Just the headline text".
    // This implies the Left and Middle columns are likely the SAME story (Visual on left, Text on middle) 
    // OR two different stories. 
    // Given "No card title below image" on left, and "Just headline" in middle, it strongly suggests 
    // they represent the SAME main story split across two columns.

    if (!posts || posts.length === 0) return null;

    const mainPost = posts[0];
    const secondaryPost = posts[1]; // The one on the right

    // Helper for category color
    const getCategoryColor = (cat) => {
        // Just return default orange for now as per spec unless specific logic needed
        return 'var(--text-category)';
    };

    return (
        <section className="mt-[40px] mb-[24px]">
            {/* Section Heading */}
            <h2
                className="mb-[20px] text-3xl md:text-[56px] font-bold text-adaptive uppercase tracking-wider leading-none"
                style={{
                    marginBottom: '20px',
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontWeight: '400' // Bebas Neue is 400
                }}
            >
                TOP STORIES
            </h2>

            {/* Hero Layout Grid */}
            <div className="flex flex-col md:flex-row border-b border-[var(--border-subtle)] pb-[24px]">

                {/* 1. LEFT COLUMN: HERO IMAGE (48%) */}
                <div className="w-full md:w-[48%] relative group overflow-hidden rounded-xl">
                    <Link to={`/post/${mainPost.slug}`} className="block w-full h-full aspect-[16/10]">
                        <img
                            src={mainPost.featuredImage}
                            alt={mainPost.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Eyewitness/Category Badge */}
                        <div
                            className="category-badge absolute bottom-[12px] left-0 !bg-[#1a73e8]" // Keep blue color but use badge size
                        >
                            EYEWITNESS
                        </div>
                    </Link>
                </div>

                {/* 2. MIDDLE COLUMN: TEXT ONLY (28%) */}
                <div className="w-full md:w-[28%] px-[24px] flex flex-col justify-start mt-4 md:mt-0">
                    <Link to={`/post/${mainPost.slug}`} className="block group">
                        <h3
                            className="mb-[20px] group-hover:underline text-[42px] font-bold text-adaptive leading-[1.2]"
                            style={{
                                fontFamily: "'Gemunu Libre', sans-serif",
                            }}
                        >
                            {mainPost.title}
                        </h3>

                        {/* SUBHEADING */}
                        {mainPost.subHeading && (
                            <h4
                                className="mb-[16px] text-[var(--accent-red)] text-[24px] font-medium leading-[1.3]"
                                style={{
                                    fontFamily: "'Gemunu Libre', sans-serif",
                                }}
                            >
                                {mainPost.subHeading}
                            </h4>
                        )}

                        {/* EXCERPT */}
                        <p
                            className="mb-[16px] line-clamp-3 text-adaptive"
                            style={{
                                fontFamily: "'Noto Serif Sinhala', serif",
                                fontSize: '16px',
                                lineHeight: '1.6',
                                fontWeight: '400'
                            }}
                        >
                            {mainPost.excerpt
                                ? mainPost.excerpt
                                : (mainPost.content
                                    ? mainPost.content.replace(/<[^>]+>/g, '').substring(0, 250) + "..."
                                    : null)}
                        </p>

                        {/* READ MORE (SINHALA) */}
                        <div className="mb-[12px]">
                            <span
                                className="text-[var(--accent-red)] font-bold text-[15px] hover:underline flex items-center gap-1"
                                style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}
                            >
                                වැඩි විස්තර
                            </span>
                        </div>

                        <div className="flex items-center text-[13px] text-primary-gray-600 dark:text-gray-500">
                            <span>{mainPost.publishedAt ? formatDistanceToNow(new Date(mainPost.publishedAt)) + ' ago' : 'Just now'}</span>
                            <span className="mx-2 text-gray-400">|</span>
                            <span
                                className="text-[var(--text-category)] uppercase font-semibold text-[16px] cursor-pointer"
                            >
                                {mainPost.categoryName || 'News'}
                            </span>
                        </div>
                    </Link>
                </div>

                {/* 3. RIGHT COLUMN: SMALL CARD (24%) */}
                {secondaryPost && (
                    <div className="w-full md:w-[24%] mt-6 md:mt-0 pl-0 md:pl-4 border-t md:border-t-0 md:border-l border-[var(--border-subtle)] md:border-transparent">
                        {/* Added some separation logic for mobile/desktop */}
                        <Link to={`/post/${secondaryPost.slug}`} className="block group">
                            <div className="relative w-full aspect-video overflow-hidden">
                                <img
                                    src={secondaryPost.featuredImage}
                                    alt={secondaryPost.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Video Duration Badge */}
                                <div className="absolute bottom-0 left-0 flex items-center bg-black/70 text-white text-[11px] px-[6px] py-[2px]">
                                    <HiPlay className="mr-1" size={10} />
                                    <span>2:30</span> {/* Hardcoded for now as duration might not be in data */}
                                </div>
                            </div>
                            <h4
                                className="mt-[10px] group-hover:underline text-[20px] font-medium text-adaptive leading-[1.3]"
                                style={{
                                    fontFamily: "'Gemunu Libre', sans-serif",
                                }}
                            >
                                {secondaryPost.title}
                            </h4>
                            {/* Subheading for Secondary Post */}
                            {secondaryPost.subHeading && (
                                <h5
                                    className="mt-[4px] text-[var(--accent-red)] text-[16px] font-medium leading-[1.3]"
                                    style={{
                                        fontFamily: "'Gemunu Libre', sans-serif",
                                    }}
                                >
                                    {secondaryPost.subHeading}
                                </h5>
                            )}
                            <div className="flex items-center text-[13px] text-primary-gray-600 dark:text-gray-500 mt-2">
                                <span>{secondaryPost.publishedAt ? formatDistanceToNow(new Date(secondaryPost.publishedAt)) + ' ago' : 'Just now'}</span>
                                <span className="mx-2 text-gray-400">|</span>
                                <span className="text-[var(--text-category)] uppercase font-semibold text-[16px]">
                                    {secondaryPost.categoryName || 'News'}
                                </span>
                            </div>
                        </Link>

                        {/* Social Follow Card */}
                        <SocialFollowCard />
                    </div>
                )}
            </div>
        </section>
    );
};

export default NewsHero;
