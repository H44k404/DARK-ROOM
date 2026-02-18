import React, { useState, useEffect, useCallback } from 'react';
import postService from '../services/postService';
import PostGrid from '../components/post/PostGrid';
import AdBanner from '../components/common/AdBanner';
import NewsHero from '../components/home/NewsHero';
import useNewsSocket from '../hooks/useNewsSocket';

const Home = () => {
    const [latestPosts, setLatestPosts] = useState([]);

    // Callback for handling new articles from socket
    const handleNewPost = useCallback((newPost) => {
        setLatestPosts((prevPosts) => {
            // Prevent duplicates
            if (prevPosts.some(p => p.id === newPost.id)) return prevPosts;

            // Add new post to start and limit to 17 (5 for Hero + 12 for Grid)
            const updated = [newPost, ...prevPosts];
            return updated.slice(0, 17);
        });
    }, []);

    // Helper hook to listen to socket events
    useNewsSocket(handleNewPost);

    useEffect(() => {
        document.title = 'Dark Room | Sri Lankan News';

        const fetchLatest = async () => {
            try {
                // Fetch more posts to populate both Hero (5) and Grid (12)
                const data = await postService.getPosts({ limit: 17 });
                const mapped = data.map(p => ({
                    id: p.id,
                    title: p.title,
                    slug: p.slug,
                    excerpt: p.excerpt,
                    featuredImage: p.featuredImage,
                    postType: p.postType,
                    categoryName: p.category?.name || 'Uncategorized',
                    publishedAt: p.publishedAt,
                    viewCount: p.viewCount || 0
                }));
                setLatestPosts(mapped);
            } catch (err) {
                console.error('Failed to fetch latest posts', err);
            }
        };

        fetchLatest();
    }, []);

    return (
        <div className="py-4 md:py-8">
            <div className="container-custom">
                {/* Hero Section */}
                <section className="mb-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-black mb-4">
                            Latest News
                        </h1>
                        <p className="text-lg md:text-xl text-primary-gray-600 max-w-3xl mx-auto">
                            Stay informed with the latest news from Sri Lanka and around the world
                        </p>
                    </div>
                </section>

                {/* Leaderboard Ad - Top */}
                <section className="mb-8">
                    <AdBanner size="leaderboard" variant="tech" />
                </section>

                {/* News Hero (Bento Grid) - Top 5 Posts */}
                {latestPosts && latestPosts.length > 0 && (
                    <NewsHero posts={latestPosts.slice(0, 5)} />
                )}

                {/* Remaining Latest Posts - Grid */}
                <section>
                    {latestPosts && latestPosts.length > 5 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-primary-black mb-6 border-l-4 border-red-600 pl-4 text-sinhala">
                                More Headlines
                            </h2>
                            <PostGrid posts={latestPosts.slice(5)} featured={false} />
                        </div>
                    )}
                </section>

                {/* Large Banner Ad - Middle */}
                <section className="my-12">
                    <AdBanner size="banner" variant="tourism" />
                </section>

                {/* Medium Rectangle Ad - Bottom */}
                <section className="my-12">
                    <AdBanner size="medium-rectangle" variant="subscription" />
                </section>
            </div>
        </div>
    );
};

export default Home;
