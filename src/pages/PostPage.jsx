import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostBySlug, incrementViewCount, getRelatedPosts } from '../services/mockData';
import ShareButtons from '../components/common/ShareButtons';
import YouTubeEmbed from '../components/common/YouTubeEmbed';
import AudioPlayer from '../components/common/AudioPlayer';
import PostGrid from '../components/post/PostGrid';
import AdBanner from '../components/common/AdBanner';
import { formatDate, formatNumber } from '../utils/helpers';
import { HiEye, HiClock } from 'react-icons/hi';
import DOMPurify from 'dompurify';

const PostPage = () => {
    const { slug } = useParams();
    const [post, setPost] = React.useState(null);
    const [relatedPosts, setRelatedPosts] = React.useState([]);

    useEffect(() => {
        // Scroll to top when post changes
        window.scrollTo(0, 0);

        // Get post data
        const postData = getPostBySlug(slug);
        if (postData) {
            setPost(postData);
            // Increment view count
            incrementViewCount(postData.id);
            // Get related posts
            const related = getRelatedPosts(postData.id, postData.categoryId);
            setRelatedPosts(related);
        }
    }, [slug]);

    useEffect(() => {
        // Update page title and meta tags
        if (post) {
            document.title = `${post.title} | Dark Room`;
        }
    }, [post]);

    if (!post) {
        return (
            <div className="container-custom py-12">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-primary-gray-800">Post not found</h2>
                    <p className="mt-4 text-primary-gray-600">The post you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    const currentUrl = window.location.href;

    return (
        <article className="py-8">
            <div className="container-custom">
                {/* Leaderboard Ad - Top */}
                <div className="mb-8">
                    <AdBanner size="leaderboard" variant="business" />
                </div>

                {/* Two Column Layout: Main Content + Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content Column */}
                    <div className="lg:col-span-8">
                        {/* Category Badge */}
                        <div className="mb-4">
                            <span className="category-badge">{post.categoryName}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-black mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-primary-gray-600 mb-6 pb-6 border-b border-primary-gray-200">
                            <div className="flex items-center gap-2">
                                <HiClock className="text-lg" />
                                <time dateTime={post.publishedAt}>
                                    {formatDate(post.publishedAt, post.language)}
                                </time>
                            </div>
                            <div className="flex items-center gap-2">
                                <HiEye className="text-lg" />
                                <span>{formatNumber(post.viewCount)} views</span>
                            </div>
                        </div>

                        {/* Featured Image */}
                        {post.postType !== 'audio' && post.postType !== 'video' && (
                            <div className="mb-8 rounded-sm overflow-hidden">
                                <img
                                    src={post.featuredImage}
                                    alt={post.title}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        )}

                        {/* YouTube Video (for video posts or articles with video) */}
                        {(post.postType === 'video' || post.videoId) && post.videoId && (
                            <div className="mb-8">
                                <YouTubeEmbed videoId={post.videoId} title={post.title} />
                            </div>
                        )}

                        {/* Audio Player (for audio posts) */}
                        {post.postType === 'audio' && post.audioId && (
                            <div className="mb-8">
                                <AudioPlayer audioId={post.audioId} title={post.title} />
                            </div>
                        )}

                        {/* Share Buttons */}
                        <div className="mb-8 pb-8 border-b border-primary-gray-200">
                            <ShareButtons url={currentUrl} title={post.title} />
                        </div>

                        {/* Post Content */}
                        <div
                            className="post-content max-w-4xl mb-8"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
                        />

                        {/* In-Content Ad - Medium Rectangle */}
                        <div className="my-8 lg:hidden">
                            <AdBanner size="medium-rectangle" variant="education" />
                        </div>

                        {/* Share Buttons (Bottom) */}
                        <div className="mb-12 pt-8 border-t border-primary-gray-200">
                            <ShareButtons url={currentUrl} title={post.title} />
                        </div>
                    </div>

                    {/* Sidebar Column - Sticky Ads */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-24 space-y-6">
                            {/* Sidebar Ad 1 */}
                            <AdBanner size="medium-rectangle" variant="education" />

                            {/* Sidebar Ad 2 */}
                            <AdBanner size="large-rectangle" variant="subscription" />

                            {/* Sidebar Ad 3 */}
                            <AdBanner size="square" variant="tourism" />
                        </div>
                    </aside>
                </div>

                {/* Large Banner Ad - Before Related Posts */}
                <div className="my-12">
                    <AdBanner size="banner" variant="tech" />
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl md:text-3xl font-bold text-primary-black mb-6">
                            Related Articles
                        </h2>
                        <PostGrid posts={relatedPosts} />
                    </div>
                )}
            </div>
        </article>
    );
};

export default PostPage;
