import React, { useEffect, useState } from 'react';
import postService from '../../services/postService';
import { formatNumber } from '../../utils/helpers';
import { HiEye, HiDocumentText, HiUsers, HiPlay, HiVolumeUp, HiTrendingUp } from 'react-icons/hi';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalPosts: 0,
        totalViews: 0,
        typeStats: { article: 0, video: 0, audio: 0 },
        topPosts: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await postService.getStats();
                setStats(data);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { name: 'Total Posts', value: stats.totalPosts, icon: HiDocumentText, color: 'text-blue-600', bg: 'bg-blue-50' },
        { name: 'Total Views', value: formatNumber(stats.totalViews), icon: HiEye, color: 'text-green-600', bg: 'bg-green-50' },
        { name: 'Active Readers', value: '124', icon: HiUsers, color: 'text-purple-600', bg: 'bg-purple-50' }, // Placeholder for now
    ];

    const typeStatCards = [
        { name: 'Articles', value: stats.typeStats?.article || 0, icon: HiDocumentText, color: 'text-blue-600' },
        { name: 'Videos', value: stats.typeStats?.video || 0, icon: HiPlay, color: 'text-red-600' },
        { name: 'Audio', value: stats.typeStats?.audio || 0, icon: HiVolumeUp, color: 'text-purple-600' },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-black"></div>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            <header>
                <h1 className="text-4xl font-bold text-primary-black tracking-tight">Overview</h1>
                <p className="text-base text-gray-500 mt-1">Monitor your channel's performance and recent transmissions.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between gap-4">
                            <div className={`${stat.bg} w-14 h-14 rounded-2xl flex items-center justify-center`}>
                                <stat.icon className={`text-3xl ${stat.color}`} />
                            </div>
                            <div className="flex-1 text-right">
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.name}</p>
                                <p className="text-4xl font-extrabold text-primary-black tracking-tight">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Content Breakdown */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-primary-black tracking-tight uppercase">Distribution</h2>
                        <HiTrendingUp className="text-gray-400 text-xl" />
                    </div>
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm divide-y divide-gray-50 overflow-hidden">
                        {typeStatCards.map((stat) => (
                            <div key={stat.name} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <stat.icon className={`text-2xl ${stat.color}`} />
                                    <span className="text-base font-bold text-gray-600 uppercase tracking-tight">{stat.name}</span>
                                </div>
                                <span className="text-xl font-bold text-primary-black">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Performing Posts */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-primary-black tracking-tight uppercase">Top Transmissions</h2>
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
                        {stats.topPosts && stats.topPosts.length > 0 ? (
                            stats.topPosts.map((post, index) => (
                                <div key={post.id} className="p-6 flex items-center gap-6 hover:bg-gray-50/80 transition-colors group">
                                    <div className="text-2xl font-bold text-gray-200 group-hover:text-primary-black transition-colors min-w-[24px]">
                                        0{index + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-primary-black line-clamp-1 text-base tracking-tight group-hover:text-gray-600 transition-colors">{post.title}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md">
                                                {post.category?.name || 'Uncategorized'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500 font-bold text-sm tabular-nums">
                                        <HiEye className="text-xl text-gray-400" />
                                        <span>{formatNumber(post.viewCount)}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-6 text-center text-gray-500">No posts available</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
