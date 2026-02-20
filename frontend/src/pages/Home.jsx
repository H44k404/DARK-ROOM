import React, { useState, useEffect, useCallback } from 'react';
import postService from '../services/postService';
import PostGrid from '../components/post/PostGrid';
import NewsHero from '../components/home/NewsHero';
import useNewsSocket from '../hooks/useNewsSocket';

const Home = () => {
    const [latestPosts, setLatestPosts] = useState([]);

    // Callback for handling new articles from socket
    const handleNewPost = useCallback((newPost) => {
        setLatestPosts((prevPosts) => {
            // Prevent duplicates
            if (prevPosts.some(p => p.id === newPost.id)) return prevPosts;

            // Add new post to start
            const updated = [newPost, ...prevPosts];
            return updated;
        });
    }, []);

    // Helper hook to listen to socket events
    useNewsSocket(handleNewPost);

    useEffect(() => {
        document.title = 'Dark Room | The Whole Story';

        const fetchLatest = async () => {
            try {
                // Fetch a good number of posts to fill the grid
                const data = await postService.getPosts({ limit: 50 });
                const mapped = data.map(p => ({
                    id: p.id,
                    title: p.title,
                    slug: p.slug,
                    excerpt: p.excerpt,
                    featuredImage: p.featuredImage,
                    postType: p.postType,
                    categoryName: p.category?.name || 'Uncategorized',
                    publishedAt: p.publishedAt,
                    viewCount: p.viewCount || 0,
                    // assume backend might not have 'badge' yet, so we default or use random for demo if needed
                    // or just rely on postType as we did in PostCard
                }));
                setLatestPosts(mapped);
            } catch (err) {
                console.error('Failed to fetch latest posts', err);
            }
        };

        fetchLatest();
    }, []);

    // Split posts for Hero (Top 2-3) and Grid (Rest)
    // Hero needs: Main (Left+Middle) + Secondary (Right) = 2 distinct posts minimum
    // But NewsHero logic uses posts[0] and posts[1].
    const heroPosts = latestPosts.slice(0, 2);
    const gridPosts = latestPosts.slice(2);

    return (
        <div className="bg-[var(--bg-primary)] min-h-screen">
            {/* Page Wrapper */}
            <div className="max-w-[1280px] mx-auto px-[24px] box-border">

                {/* News Hero Section */}
                {heroPosts.length > 0 && (
                    <NewsHero posts={heroPosts} />
                )}

                {/* News Card Grid (4 cols) with Ads */}
                {gridPosts.length > 0 && (
                    <PostGrid posts={gridPosts} />
                )}

            </div>
        </div>
    );
};

export default Home;
