import React from 'react';
import { getLatestPosts } from '../services/mockData';
import PostGrid from '../components/post/PostGrid';
import AdBanner from '../components/common/AdBanner';

const Home = () => {
    const latestPosts = getLatestPosts(12);

    React.useEffect(() => {
        document.title = 'Dark Room | Sri Lankan News';
    }, []);

    return (
        <div className="py-8">
            <div className="container-custom">
                {/* Hero Section */}
                <section className="mb-12">
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
                <section className="mb-12">
                    <AdBanner size="leaderboard" variant="tech" />
                </section>

                {/* Latest Posts */}
                <section>
                    <PostGrid posts={latestPosts} featured={true} />
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
