import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostsByCategory, mockCategories } from '../services/mockData';
import PostGrid from '../components/post/PostGrid';
import AdBanner from '../components/common/AdBanner';

const Category = () => {
    const { slug } = useParams();
    const [posts, setPosts] = React.useState([]);
    const [categoryName, setCategoryName] = React.useState('');

    useEffect(() => {
        // Get category name
        const category = mockCategories.find(cat => cat.slug === slug);
        if (category) {
            setCategoryName(category.name);
            document.title = `${category.name} | Dark Room`;
        }

        // Get posts for this category
        const categoryPosts = getPostsByCategory(slug);
        setPosts(categoryPosts);

        // Scroll to top
        window.scrollTo(0, 0);
    }, [slug]);

    return (
        <div className="py-8">
            <div className="container-custom">
                {/* Category Header */}
                <div className="mb-8 pb-6 border-b-2 border-primary-black">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-black">
                        {categoryName}
                    </h1>
                    <p className="mt-3 text-lg text-primary-gray-600">
                        {posts.length} {posts.length === 1 ? 'article' : 'articles'}
                    </p>
                </div>

                {/* Leaderboard Ad - Below Header */}
                <div className="mb-8">
                    <AdBanner size="leaderboard" variant="tech" />
                </div>

                {/* Posts Grid */}
                {posts.length > 0 ? (
                    <PostGrid posts={posts} />
                ) : (
                    <div className="text-center py-12">
                        <p className="text-xl text-primary-gray-500">
                            No articles found in this category yet.
                        </p>
                    </div>
                )}

                {/* Large Banner Ad - Bottom */}
                <div className="mt-12">
                    <AdBanner size="banner" variant="business" />
                </div>
            </div>
        </div>
    );
};

export default Category;
