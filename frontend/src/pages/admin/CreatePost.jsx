import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import postService from '../../services/postService';
import { useAuth } from '../../context/AuthContext';
import RichTextEditor from '../../components/admin/RichTextEditor';
import { HiPlusCircle, HiArrowLeft, HiCloudUpload, HiGlobe, HiVideoCamera, HiMusicNote, HiPhotograph, HiX } from 'react-icons/hi';
import { extractYouTubeID } from '../../utils/helpers';
import ImageUpload from '../../components/admin/ImageUpload';

const CreatePost = () => {
    const { id } = useParams(); // Get post ID from URL if editing
    const navigate = useNavigate();
    const { user, isSuperAdmin } = useAuth();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        categoryId: '',
        language: 'si',
        featuredImage: '',
        postType: 'article',
        videoUrl: '',
        audioUrl: '',
    });
    const [showPreview, setShowPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch categories
                const cats = await postService.getCategories();
                setCategories(cats);

                // Fetch post if in edit mode
                if (id) {
                    setLoading(true);
                    const post = await postService.getPostById(id);
                    setFormData({
                        title: post.title,
                        slug: post.slug,
                        excerpt: post.excerpt || '',
                        content: post.content,
                        categoryId: post.categoryId,
                        language: post.language || 'si',
                        featuredImage: post.featuredImage || '',
                        postType: post.postType,
                        videoUrl: post.videoUrl || '',
                        audioUrl: post.audioUrl || '',
                    });
                    setLoading(false);
                    document.title = 'Edit Post | Dark Room';
                } else {
                    document.title = 'Create Post | Dark Room';
                }
            } catch (err) {
                console.error('Failed to fetch data', err);
                setError('Failed to load data. Please try again.');
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            // Only auto-generate slug in create mode, or if slug is empty
            if (name === 'title' && (!prev.slug || !id)) {
                newData.slug = value.toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\p{L}\p{N}-]/gu, '')
                    .replace(/-+/g, '-')
                    .replace(/^-+|-+$/g, '');
            }
            return newData;
        });
        setError('');
    };

    const handleContentChange = (value) => {
        setFormData({ ...formData, content: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent double submission
        if (loading) {
            console.warn('Form already submitting, ignoring duplicate submission');
            return;
        }

        setError('');
        setLoading(true);

        const sanitizedSlug = formData.slug
            ? formData.slug.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\p{L}\p{N}-]/gu, '').replace(/-+/g, '-').replace(/^-+|-+$/g, '')
            : '';

        if (!sanitizedSlug) {
            setError('Invalid slug. Please check the title or enter a custom URL slug.');
            setLoading(false);
            return;
        }

        if (!formData.categoryId) {
            setError('Please select a category before submitting.');
            setLoading(false);
            return;
        }

        const stringCategoryId = formData.categoryId.toString();
        const parsedCategoryId = parseInt(stringCategoryId);

        if (isNaN(parsedCategoryId) || parsedCategoryId === 0) {
            setError('Invalid category selected. Please choose a valid category.');
            setLoading(false);
            return;
        }

        const submissionData = {
            title: formData.title,
            slug: sanitizedSlug,
            excerpt: formData.excerpt,
            content: formData.content,
            featuredImage: formData.featuredImage,
            postType: formData.postType,
            categoryId: parsedCategoryId,
            videoUrl: formData.videoUrl,
            audioUrl: formData.audioUrl,
        };

        console.log('Submitting post with data:', submissionData);

        try {
            if (id) {
                await postService.updatePost(id, submissionData);
                setSuccess(true);
            } else {
                await postService.createPost(submissionData);
                setSuccess(true);
            }
            setTimeout(() => {
                navigate('/admin/manage-posts');
            }, 1500);
        } catch (err) {
            setError(err.message || `Failed to ${id ? 'update' : 'create'} post`);
            setLoading(false);
        }
    };

    return (
        <div className="h-[calc(100vh-64px)] overflow-hidden flex flex-col bg-white">
            {/* Header Toolbar */}
            <header className="px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white z-10">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin/manage-posts')}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-primary-black transition-all"
                    >
                        <HiArrowLeft className="text-xl" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-primary-black tracking-tight flex items-center gap-2">
                            {id ? 'Edit Transmission' : 'Create Transmission'}
                            {loading && <span className="text-xs font-normal text-gray-400 animate-pulse">Processing...</span>}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg mr-4">
                        {['article', 'video', 'audio'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFormData({ ...formData, postType: type })}
                                className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase transition-all flex items-center gap-2 ${formData.postType === type
                                    ? 'bg-white text-primary-black shadow-sm'
                                    : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                {type === 'article' && <HiPhotograph />}
                                {type === 'video' && <HiVideoCamera />}
                                {type === 'audio' && <HiMusicNote />}
                                {type}
                            </button>
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        form="post-form"
                        className="btn btn-primary px-6 py-2 rounded-xl text-sm shadow-xl shadow-black/20"
                    >
                        {loading ? 'Transmitting...' : id ? 'Update Transmission' : isSuperAdmin() ? 'Publish' : 'Submit Review'}
                    </button>
                </div>
            </header>

            {/* Main Workspace - Split Screen */}
            <div className="flex-1 flex overflow-hidden">
                {/* LEFT COLUMN: Editor & Settings */}
                <div className="w-3/5 overflow-y-auto border-r border-gray-200">
                    <form id="post-form" onSubmit={handleSubmit} className="p-8 space-y-8 max-w-none mx-auto">

                        {success && (
                            <div className="bg-green-50 text-green-700 px-6 py-4 rounded-xl border border-green-100 font-medium flex items-center gap-3 animate-slide-in">
                                <HiCloudUpload className="text-xl" />
                                <span>Transmission successful. Redirecting...</span>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 text-red-700 px-6 py-4 rounded-xl border border-red-100 font-medium">
                                Error: {error}
                            </div>
                        )}

                        {/* Title Input */}
                        <div className="space-y-2">
                            <textarea
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                rows="1"
                                ref={(el) => {
                                    if (el) {
                                        el.style.height = 'auto';
                                        el.style.height = el.scrollHeight + 'px';
                                    }
                                }}
                                className="w-full text-3xl md:text-4xl font-bold tracking-tight text-primary-black border-none bg-transparent placeholder-gray-300 focus:ring-0 px-0 resize-none overflow-hidden leading-tight text-sinhala"
                                placeholder="Enter Headline..."
                                onInput={(e) => {
                                    e.target.style.height = 'auto';
                                    e.target.style.height = e.target.scrollHeight + 'px';
                                }}
                            />
                            {/* Auto-generated Slug feedback */}
                            <div className="text-xs text-gray-400 font-mono pl-1">
                                darkroom.lk/post/<span className="text-primary-black">{formData.slug || 'automatic-slug-generation'}</span>
                            </div>
                            {/* Hidden slug input for manual override if needed (can be exposed in settings) */}
                        </div>

                        {/* Formatting Toolbar wrapper for sticky effect could go here */}
                        <div className="min-h-[500px]">
                            <RichTextEditor
                                value={formData.content}
                                onChange={handleContentChange}
                                placeholder="Begin transmission sequence..."
                            />
                        </div>

                        {/* Metadata / Settings Compact Section */}
                        <div className="bg-gray-50 rounded-2xl p-6 space-y-6 border border-gray-100">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Metadata Configuration</h3>

                            {/* Category Selection */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Category *</label>
                                <select
                                    name="categoryId"
                                    value={formData.categoryId}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-black focus:border-black"
                                >
                                    <option value="">-- Select a Category --</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Featured Image - Show for Article/Audio or Video (as thumbnail) */}
                            <div className="grid grid-cols-1 gap-6">
                                {formData.postType === 'video' && (
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">YouTube Video URL</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                name="videoUrl"
                                                value={formData.videoUrl}
                                                onChange={handleChange}
                                                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-black focus:border-black"
                                                placeholder="https://www.youtube.com/watch?v=..."
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const videoId = extractYouTubeID(formData.videoUrl);
                                                    if (videoId) {
                                                        const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                                                        setFormData(prev => ({ ...prev, featuredImage: thumbUrl }));
                                                    } else {
                                                        setError('Invalid YouTube URL');
                                                    }
                                                }}
                                                className="px-3 py-2 bg-red-600 text-white rounded-lg text-xs font-bold uppercase hover:bg-red-700 transition-colors whitespace-nowrap"
                                            >
                                                Use Thumbnail
                                            </button>
                                        </div>
                                        <p className="text-[10px] text-gray-400 mt-1">Paste the full YouTube link here.</p>
                                    </div>
                                )}

                                {/* Audio URL Input - Available for all types (or specifically when needed) */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Audio URL (YouTube)</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            name="audioUrl"
                                            value={formData.audioUrl}
                                            onChange={handleChange}
                                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-black focus:border-black"
                                            placeholder="https://www.youtube.com/watch?v=..."
                                        />
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-1">Add a YouTube link to embed as an audio player.</p>
                                </div>

                                <div>
                                    <ImageUpload
                                        label={formData.postType === 'video' ? 'Video Thumbnail (Optional)' : 'Featured Image'}
                                        id="featuredImage"
                                        currentImage={formData.featuredImage}
                                        onUpload={(url) => setFormData(prev => ({ ...prev, featuredImage: url }))}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* RIGHT COLUMN: Live Website Preview */}
                <div className="w-2/5 bg-gray-50 overflow-y-auto border-l border-gray-200 flex flex-col">
                    <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-6 py-2 border-b border-gray-100 flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <span>Live Preview</span>
                        <div className="flex gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500"></span>
                            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                            <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        </div>
                    </div>

                    {/* Simulation of PostPage */}
                    <div className="p-8 max-w-none mx-auto w-full origin-top transform transition-transform duration-300">
                        <article className="bg-white shadow-sm rounded-sm p-8 min-h-[80vh] border border-gray-100">
                            {/* Category */}
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 bg-primary-black text-white text-xs font-semibold uppercase tracking-wide">
                                    {categories.find(c => c.id === parseInt(formData.categoryId))?.name || 'Category'}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-primary-black mb-6 !leading-[1.8] text-sinhala">
                                {formData.title || 'Your Headline Here'}
                            </h1>

                            {/* Meta Info Simulation */}
                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-6 pb-6 border-b border-gray-100 font-sans">
                                <span>JUST NOW</span>
                                <span>•</span>
                                <span>0 VIEWS</span>
                            </div>

                            {/* Video Preview */}
                            {formData.postType === 'video' && formData.videoUrl && (
                                <div className="mb-8">
                                    <div className="relative w-full pb-[56.25%] bg-black">
                                        <iframe
                                            className="absolute top-0 left-0 w-full h-full"
                                            src={`https://www.youtube.com/embed/${extractYouTubeID(formData.videoUrl)}`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            )}

                            {/* Audio Preview */}
                            {formData.audioUrl && (
                                <div className="mb-8">
                                    <div className="relative w-full bg-gray-100 rounded-sm overflow-hidden p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 bg-gray-800 rounded-full flex items-center justify-center text-white">
                                                <HiMusicNote />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-xs font-bold uppercase text-gray-500 mb-1">Audio Preview</div>
                                                <div className="text-sm font-medium truncate">{formData.audioUrl}</div>
                                            </div>
                                        </div>
                                        {/* We could embed the actual player here too if desired, but a placeholder is safer for performace in edit mode */}
                                    </div>
                                </div>
                            )}

                            {/* Featured Image (if not video or if video has thumbnail) */}
                            {formData.featuredImage && formData.postType !== 'video' && (
                                <div className="mb-8 rounded-sm overflow-hidden">
                                    <img
                                        src={formData.featuredImage}
                                        alt="Preview"
                                        className="w-full h-auto object-cover"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                </div>
                            )}

                            {/* Content - Using exact classes from PostPage */}
                            <div
                                className="post-content post-content-serif mb-8 text-sinhala break-words text-lg leading-relaxed text-gray-800"
                                dangerouslySetInnerHTML={{ __html: formData.content || '<p class="text-gray-400 italic">Start writing to see content...</p>' }}
                            />
                        </article>

                        <div className="mt-8 text-center text-gray-400 text-xs uppercase tracking-widest">
                            End of Transmission Preview
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
