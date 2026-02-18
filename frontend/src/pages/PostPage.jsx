import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import postService from '../services/postService';
import ShareButtons from '../components/common/ShareButtons';
import YouTubeEmbed from '../components/common/YouTubeEmbed';
import AudioPlayer from '../components/common/AudioPlayer';
import PostGrid from '../components/post/PostGrid';
import AdBanner from '../components/common/AdBanner';
import SocialFeeds from '../components/common/SocialFeeds';
import { formatDate, formatNumber, extractYouTubeID } from '../utils/helpers';
import { HiEye, HiClock } from 'react-icons/hi';
import DOMPurify from 'dompurify';

const PostPage = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Get post data
                const postData = await postService.getPostBySlug(slug);
                setPost(postData);

                // Increment view count is handled by backend

                // Get related posts (same category, exclude current)
                if (postData && postData.categoryId) {
                    const relatedResponse = await postService.getPosts({
                        category: postData.category.slug,
                        limit: 4
                    });
                    // Filter out the current post
                    setRelatedPosts(relatedResponse.filter(p => p.id !== postData.id).slice(0, 3));
                }
            } catch (err) {
                console.error('Error fetching post:', err);
                setError('Failed to load post');
            } finally {
                setLoading(false);
            }
        };

        // Scroll to top when slug changes
        window.scrollTo(0, 0);
        fetchData();
    }, [slug]);

    useEffect(() => {
        // Update page title and meta tags
        if (post) {
            document.title = `${post.title} | Dark Room`;
        }
    }, [post]);

    if (loading) {
        return (
            <div className="container-custom py-20 flex justify-center items-center h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-black"></div>
            </div>
        );
    }

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
        <article className="py-4 md:py-8">
            <div className="container-custom">
                {/* Leaderboard Ad - Top */}
                <div className="mb-8">
                    <AdBanner size="leaderboard" variant="business" />
                </div>

                {/* Two Column Layout - Content and Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Main Content - Left Column (2/3 width) */}
                    <div className="lg:col-span-2">
                        {/* Category Badge */}
                        {/* Category Badge */}
                        {post.categoryName && (
                            <div className="mb-4">
                                <span className="category-badge">{post.categoryName}</span>
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-black mb-6 !leading-[1.8] text-sinhala">
                            {post.title}
                        </h1>

                        {/* Meta Info - New Design */}
                        <div className="flex flex-wrap items-center gap-3 text-sm text-primary-gray-800 mb-6 pb-6 border-b border-primary-gray-200 font-sans tracking-wide">
                            <div className="flex items-center gap-1">
                                <span className="font-bold uppercase text-xs tracking-wider">AUTHOR:</span>
                                <span className="font-bold">{post.author?.name || post.author?.username || 'Editor'}</span>
                            </div>
                            <span className="text-gray-300">|</span>
                            <time dateTime={post.publishedAt} className="text-primary-gray-600">
                                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </time>
                            <span className="text-gray-300">|</span>
                            <span className="text-primary-gray-600">
                                {(() => {
                                    const html = post.content || '';
                                    const text = html.replace(/<[^>]*>?/gm, '');
                                    const wpm = 200;
                                    const words = text.trim().split(/\s+/).length;
                                    const time = Math.ceil(words / wpm);
                                    return time <= 1 ? 'Less than 1 min. read' : `${time} min read`;
                                })()}
                            </span>
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
                        {(post.postType === 'video' || post.videoUrl) && post.videoUrl && (
                            <div className="mb-8">
                                <YouTubeEmbed videoId={extractYouTubeID(post.videoUrl)} title={post.title} />
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
                            className="post-content post-content-serif mb-8 text-sinhala break-words"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
                        />

                        {/* In-Content Ad - Medium Rectangle */}
                        <div className="my-8">
                            <AdBanner size="medium-rectangle" variant="education" />
                        </div>

                        {/* Share Buttons (Bottom) */}
                        <div className="mb-12 pt-8 border-t border-primary-gray-200">
                            <ShareButtons url={currentUrl} title={post.title} />
                        </div>
                    </div>

                    {/* Sidebar - Right Column (1/3 width) */}
                    <aside className="sticky top-24">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl md:text-3xl font-bold text-primary-black font-serif">
                                You might also like
                            </h3>
                        </div>

                        <div className="flex flex-col gap-6">
                            {/* Ad Section */}
                            <div className="flex flex-col gap-6">
                                <AdBanner size="medium-rectangle" variant="subscription" />
                                <AdBanner size="medium-rectangle" variant="education" />
                            </div>

                            {/* Social Feeds */}
                            <div className="w-full">
                                <SocialFeeds latestVideoId={post.videoId} />
                            </div>
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
