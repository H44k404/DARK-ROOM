import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import postService from '../services/postService';
import PostGrid from '../components/post/PostGrid';
import AdBanner from '../components/common/AdBanner';

const Category = () => {
    const { slug } = useParams();
    const [posts, setPosts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch posts for this category
                const response = await postService.getPosts({ category: slug });
                setPosts(response);

                // Set category name from the first post if available, 
                // otherwise we might need to fetch categories to get the name if no posts exist.
                if (response.length > 0 && response[0].category) {
                    setCategoryName(response[0].category.name);
                    document.title = `${response[0].category.name} | Dark Room`;
                } else {
                    // Fallback: Fetch all categories to find the name
                    // This is only needed if there are no posts
                    const categories = await postService.getCategories();
                    const cat = categories.find(c => c.slug === slug);
                    if (cat) {
                        setCategoryName(cat.name);
                        document.title = `${cat.name} | Dark Room`;
                    } else {
                        setCategoryName(slug); // Fallback to slug
                        document.title = `${slug} | Dark Room`;
                    }
                }
            } catch (error) {
                console.error('Error fetching category posts:', error);
            } finally {
                setLoading(false);
            }
        };

        window.scrollTo(0, 0);
        fetchData();
    }, [slug]);

    return (
        <div className="py-8">
            <div className="container-custom">
                {/* Category Header */}
                <div className="mb-8 pb-6 border-b-2 border-primary-black dark:border-white">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-adaptive">
                        {categoryName}
                    </h1>
                    <p className="mt-3 text-lg text-adaptive">
                        {posts.length} {posts.length === 1 ? 'article' : 'articles'}
                    </p>
                </div>

                {/* Leaderboard Ad - Below Header */}
                <div className="mb-8">
                    <AdBanner size="leaderboard" variant="tech" />
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="py-20 flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-black"></div>
                    </div>
                ) : (
                    <>
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
                    </>
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
