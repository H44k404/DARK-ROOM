import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockPosts } from '../../services/mockData';
import { formatDate, formatNumber } from '../../utils/helpers';
import { HiEye, HiPencil, HiTrash, HiExternalLink, HiSearch, HiFilter, HiDocumentText } from 'react-icons/hi';

const ManagePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        let filtered = [...mockPosts];
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(p => p.categoryName.toLowerCase() === categoryFilter.toLowerCase());
        }
        if (searchTerm) {
            filtered = filtered.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        setPosts(filtered);
        setLoading(false);
    }, [categoryFilter, searchTerm]);

    const handleDelete = (postId) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            setPosts(posts.filter(post => post.id !== postId));
        }
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-primary-black tracking-tight">Content Library</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and monitor all your outgoing transmissions across all channels.</p>
                </div>
                <Link to="/admin/create-post" className="btn btn-primary px-8 rounded-2xl shadow-xl shadow-black/10">
                    Create New Post
                </Link>
            </header>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96 group">
                    <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-black transition-colors" />
                    <input
                        type="text"
                        placeholder="Search transmissions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm font-semibold focus:ring-2 ring-gray-50 transition-all shadow-sm"
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-48 group">
                        <HiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-black transition-colors" />
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm font-semibold focus:ring-2 ring-gray-50 transition-all shadow-sm appearance-none cursor-pointer"
                        >
                            <option value="all">All Channels</option>
                            <option value="sri lanka">Sri Lanka</option>
                            <option value="political">Political</option>
                            <option value="feature">Feature</option>
                            <option value="international">International</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto min-w-full">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-50">
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Transmission Details</th>
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Channel</th>
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Metric (Views)</th>
                                <th className="px-8 py-5 text-right text-[10px] font-bold uppercase tracking-widest text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {posts.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-200">
                                                <HiDocumentText className="text-3xl" />
                                            </div>
                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No transmissions found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                posts.map((post) => (
                                    <tr key={post.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-1">
                                                <h3 className="font-bold text-primary-black text-sm tracking-tight group-hover:text-blue-600 transition-colors">
                                                    {post.title}
                                                </h3>
                                                <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                                    <span>{formatDate(post.publishedAt)}</span>
                                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                    <span>{post.postType}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-lg bg-blue-50 text-blue-600 border border-blue-100/50">
                                                {post.categoryName}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-xs font-bold text-gray-600 tabular-nums">
                                                <HiEye className="text-lg text-gray-300" />
                                                <span>{formatNumber(post.viewCount)}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Link
                                                    to={`/post/${post.slug}`}
                                                    target="_blank"
                                                    className="p-2.5 text-gray-400 hover:text-primary-black hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100 hover:shadow-sm"
                                                    title="View on Site"
                                                >
                                                    <HiExternalLink className="text-lg" />
                                                </Link>
                                                <button className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100 hover:shadow-sm" title="Edit">
                                                    <HiPencil className="text-lg" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100 hover:shadow-sm"
                                                    title="Delete"
                                                >
                                                    <HiTrash className="text-lg" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Showing {posts.length} Active Transmissions
                    </p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-primary-black transition-all shadow-sm disabled:opacity-50" disabled>Previous</button>
                        <button className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-primary-black transition-all shadow-sm disabled:opacity-50" disabled>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagePosts;
