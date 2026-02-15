import React from 'react';
import { mockPosts, getPostTypeStats } from '../../services/mockData';
import { formatNumber } from '../../utils/helpers';
import { HiEye, HiDocumentText, HiUsers, HiPlay, HiVolumeUp, HiTrendingUp } from 'react-icons/hi';

const Dashboard = () => {
    const totalPosts = mockPosts.length;
    const totalViews = mockPosts.reduce((sum, post) => sum + post.viewCount, 0);
    const topPosts = [...mockPosts].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5);
    const postTypeStats = getPostTypeStats();

    const stats = [
        { name: 'Total Posts', value: totalPosts, icon: HiDocumentText, color: 'text-blue-600', bg: 'bg-blue-50' },
        { name: 'Total Views', value: formatNumber(totalViews), icon: HiEye, color: 'text-green-600', bg: 'bg-green-50' },
        { name: 'Active Readers', value: '1,240', icon: HiUsers, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    const typeStats = [
        { name: 'Articles', value: postTypeStats.article, icon: HiDocumentText, color: 'text-blue-600' },
        { name: 'Videos', value: postTypeStats.video, icon: HiPlay, color: 'text-red-600' },
        { name: 'Audio', value: postTypeStats.audio, icon: HiVolumeUp, color: 'text-purple-600' },
    ];

    return (
        <div className="space-y-10">
            <header>
                <h1 className="text-3xl font-bold text-primary-black tracking-tight">Overview</h1>
                <p className="text-sm text-gray-500 mt-1">Monitor your channel's performance and recent transmissions.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between gap-4">
                            <div className={`${stat.bg} w-14 h-14 rounded-2xl flex items-center justify-center`}>
                                <stat.icon className={`text-2xl ${stat.color}`} />
                            </div>
                            <div className="flex-1 text-right">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.name}</p>
                                <p className="text-3xl font-extrabold text-primary-black tracking-tight">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Content Breakdown */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-primary-black tracking-tight uppercase">Distribution</h2>
                        <HiTrendingUp className="text-gray-400" />
                    </div>
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm divide-y divide-gray-50 overflow-hidden">
                        {typeStats.map((stat) => (
                            <div key={stat.name} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <stat.icon className={`text-xl ${stat.color}`} />
                                    <span className="text-sm font-bold text-gray-600 uppercase tracking-tight">{stat.name}</span>
                                </div>
                                <span className="text-lg font-bold text-primary-black">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Performing Posts */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-lg font-bold text-primary-black tracking-tight uppercase">Top Transmissions</h2>
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
                        {topPosts.map((post, index) => (
                            <div key={post.id} className="p-6 flex items-center gap-6 hover:bg-gray-50/80 transition-colors group">
                                <div className="text-xl font-bold text-gray-200 group-hover:text-primary-black transition-colors min-w-[24px]">
                                    0{index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-primary-black line-clamp-1 text-sm tracking-tight group-hover:text-gray-600 transition-colors">{post.title}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md">{post.categoryName}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 font-bold text-xs tabular-nums">
                                    <HiEye className="text-lg text-gray-400" />
                                    <span>{formatNumber(post.viewCount)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
