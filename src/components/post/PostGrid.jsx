import React from 'react';
import PostCard from './PostCard';

const PostGrid = ({ posts, featured = false }) => {
    if (!posts || posts.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-primary-gray-500 text-lg">No posts found</p>
            </div>
        );
    }

    // If featured, show first post as large featured post
    if (featured && posts.length > 0) {
        const [featuredPost, ...remainingPosts] = posts;

        return (
            <div className="space-y-8">
                {/* Featured Post */}
                <PostCard post={featuredPost} featured={true} />

                {/* Remaining Posts Grid */}
                {remainingPosts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {remainingPosts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Regular grid layout
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostGrid;
