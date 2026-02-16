import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import postService from '../../services/postService';
import { useAuth } from '../../context/AuthContext';
import RichTextEditor from '../../components/admin/RichTextEditor';
import { HiPlusCircle, HiArrowLeft, HiCloudUpload, HiGlobe, HiVideoCamera, HiMusicNote, HiPhotograph } from 'react-icons/hi';

const CreatePost = () => {
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
        videoId: '',
        audioId: '',
    });
    const [showPreview, setShowPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await postService.getCategories();
                setCategories(data);
            } catch (err) {
                console.error('Failed to fetch categories');
            }
        };
        fetchCategories();
        document.title = 'Create Post | Dark Room';
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            if (name === 'title' && !prev.slug) {
                newData.slug = value.toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s_-]+/g, '-')
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
        setError('');
        setLoading(true);

        try {
            await postService.createPost(formData);
            setSuccess(true);
            setTimeout(() => {
                navigate('/admin/manage-posts');
            }, 1500);
        } catch (err) {
            setError(err.message || 'Failed to create post');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <header className="flex items-center justify-between gap-4 border-b border-gray-100 pb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin/manage-posts')}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-primary-black transition-all border border-gray-100"
                    >
                        <HiArrowLeft />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-primary-black tracking-tight">Create Post</h1>
                        <p className="text-sm text-gray-500 mt-1">Compose and transmit a new article or media transmission.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setShowPreview(!showPreview)}
                        className={`px-6 py-2 rounded-2xl font-bold transition-all border ${showPreview
                            ? 'bg-primary-black text-white border-primary-black'
                            : 'bg-white text-primary-black border-gray-200 hover:border-primary-black'
                            }`}
                    >
                        {showPreview ? 'Edit Content' : 'Live Preview'}
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        form="post-form"
                        className="btn btn-primary px-8 rounded-2xl shadow-xl shadow-black/20"
                    >
                        {loading ? 'Transmitting...' : isSuperAdmin() ? 'Publish' : 'Submit Review'}
                    </button>
                </div>
            </header>

            {success && (
                <div className="bg-green-50 text-green-700 px-6 py-4 rounded-2xl border border-green-100 font-bold flex items-center gap-3 animate-slide-in">
                    <HiCloudUpload className="text-xl" />
                    <span>Post transmitted successfully. Redirecting to feed...</span>
                </div>
            )}

            {error && (
                <div className="bg-red-50 text-red-700 px-6 py-4 rounded-2xl border border-red-100 font-bold">
                    Transmission Error: {error}
                </div>
            )}

            <form id="post-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Editor Section */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-8">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Post Headline</label>
                            <textarea
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                rows="3"
                                className="w-full text-2xl md:text-3xl font-bold tracking-tight text-primary-black border-none bg-transparent placeholder-gray-200 focus:ring-0 px-0 resize-none overflow-hidden"
                                placeholder="ENTER THE LATEST DEVELOPMENTS HERE..."
                                onInput={(e) => {
                                    e.target.style.height = 'auto';
                                    e.target.style.height = e.target.scrollHeight + 'px';
                                }}
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Content Strategy</label>
                            <div className="bg-gray-50/50 rounded-2xl border border-gray-100 overflow-hidden ring-offset-4 focus-within:ring-2 ring-gray-100 transition-all">
                                <RichTextEditor
                                    value={formData.content}
                                    onChange={handleContentChange}
                                    placeholder="Begin transmission..."
                                />
                            </div>
                        </div>
                    </div>

                    {showPreview && (
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-slide-in">
                            <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 flex justify-between items-center">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Website Preview</span>
                                <span className="px-2 py-1 bg-primary-black text-white text-[9px] font-bold rounded uppercase tracking-tighter">Live Concept</span>
                            </div>
                            <div className="p-8 space-y-6">
                                {/* Category Badge */}
                                {formData.categoryId && (
                                    <span className="inline-block px-3 py-1 bg-primary-black text-white text-[10px] font-bold uppercase tracking-widest">
                                        {categories.find(c => c.id === parseInt(formData.categoryId))?.name || 'Channel'}
                                    </span>
                                )}

                                {/* Headline */}
                                <h2 className="text-4xl md:text-6xl font-bold text-primary-black leading-[0.9] tracking-tighter">
                                    {formData.title || 'YOUR HEADLINE WILL APPEAR HERE'}
                                </h2>

                                {/* Featured Image */}
                                {formData.featuredImage && (
                                    <div className="aspect-[16/9] w-full bg-gray-100 overflow-hidden rounded-xl border border-gray-100">
                                        <img
                                            src={formData.featuredImage}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    </div>
                                )}

                                {/* Content Render */}
                                <div
                                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-serif"
                                    dangerouslySetInnerHTML={{ __html: formData.content || '<p class="text-gray-300 italic">Content body will be rendered here...</p>' }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Configuration Section */}
                <aside className="lg:col-span-4 space-y-8">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6 sticky top-24">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Metadata Config</p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-tight mb-2">Channel</label>
                                <select
                                    name="categoryId"
                                    value={formData.categoryId}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-semibold text-primary-black focus:ring-primary-black focus:border-primary-black transition-all appearance-none cursor-pointer"
                                >
                                    <option value="">Select Channel</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-tight mb-2">Transmission Route (Slug)</label>
                                <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-mono text-gray-400">
                                    <HiGlobe className="text-gray-300" />
                                    <input
                                        type="text"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        className="bg-transparent border-none p-0 focus:ring-0 w-full text-primary-black"
                                        placeholder="url-route-here"
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-50" />

                        <div className="space-y-4">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Media Parameters</p>

                            <div className="grid grid-cols-3 gap-2">
                                {['article', 'video', 'audio'].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, postType: type })}
                                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${formData.postType === type
                                            ? 'bg-primary-black text-white border-primary-black shadow-lg shadow-black/10'
                                            : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300 hover:text-primary-black'
                                            }`}
                                    >
                                        {type === 'article' && <HiPhotograph className="text-lg" />}
                                        {type === 'video' && <HiVideoCamera className="text-lg" />}
                                        {type === 'audio' && <HiMusicNote className="text-lg" />}
                                        <span className="text-[10px] font-bold uppercase mt-1 tracking-tighter">{type}</span>
                                    </button>
                                ))}
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-tight mb-2">Source URL</label>
                                <textarea
                                    name="featuredImage"
                                    value={formData.featuredImage}
                                    onChange={handleChange}
                                    rows="2"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-mono text-primary-black focus:ring-primary-black"
                                    placeholder="https://images.unsplash.com/..."
                                />
                            </div>
                        </div>
                    </div>
                </aside>
            </form>
        </div>
    );
};

export default CreatePost;
