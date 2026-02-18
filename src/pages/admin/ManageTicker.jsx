import React, { useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '../../utils/helpers';
import BreakingNewsTicker from '../../components/common/BreakingNewsTicker';
import { HiLightningBolt, HiEye, HiSave, HiSpeakerphone, HiInformationCircle } from 'react-icons/hi';

const ManageTicker = () => {
    const [config, setConfig] = useState({ enabled: false, label: 'BREAKING NEWS', message: '' });
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedConfig = getLocalStorage('darkroom_ticker_config');
        if (savedConfig) {
            // Migration for old config structure
            setConfig({
                enabled: savedConfig.enabled ?? false,
                label: savedConfig.label ?? 'BREAKING NEWS',
                message: savedConfig.message ?? ''
            });
        }
        setLoading(false);
    }, []);

    const handleToggle = () => {
        setConfig({ ...config, enabled: !config.enabled });
    };

    const handleLabelChange = (e) => {
        setConfig({ ...config, label: e.target.value });
    };

    const handleMessageChange = (e) => {
        setConfig({ ...config, message: e.target.value });
    };

    const handleSave = () => {
        setLocalStorage('darkroom_ticker_config', config);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    if (loading) return <div className="p-8 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest animate-pulse">Synchronizing broadcast parameters...</div>;

    return (
        <div className="max-w-full mx-auto space-y-10">
            <header className="flex items-center justify-between gap-4 border-b border-gray-100 pb-8">
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 shadow-sm border border-red-100/50">
                        <HiLightningBolt className="text-3xl" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-primary-black tracking-tight">Crisis Broadcast</h1>
                        <p className="text-sm text-gray-500 mt-1">Configure and activate the real-time breaking news ticker across the platform.</p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    className="btn btn-primary px-10 rounded-2xl shadow-xl shadow-black/10 flex items-center gap-2"
                >
                    <HiSave className="text-xl" />
                    Update Broadcast
                </button>
            </header>

            {success && (
                <div className="bg-primary-black text-white px-8 py-5 rounded-3xl border border-black shadow-2xl shadow-black/20 font-bold flex items-center justify-between animate-slide-in">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-lg">✓</div>
                        <span className="tracking-tight">Broadcast parameters synchronized across all active terminals.</span>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Control Panel */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8">
                            <HiSpeakerphone className="text-8xl text-gray-50/50 -rotate-12" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="relative">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">Alert Label (e.g. BREAKING)</label>
                                <input
                                    type="text"
                                    value={config.label}
                                    onChange={handleLabelChange}
                                    className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-4 text-lg font-bold tracking-tight text-primary-black placeholder-gray-200 focus:ring-2 ring-orange-50 focus:border-orange-100 transition-all"
                                    placeholder="BREAKING NEWS"
                                />
                            </div>

                            <div className="relative">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 block">Transmission State</label>
                                <label className="flex items-center gap-6 cursor-pointer group">
                                    <div className={`w-20 h-10 rounded-full transition-all duration-500 relative ${config.enabled ? 'bg-orange-600 shadow-lg shadow-orange-100' : 'bg-gray-100'}`}>
                                        <input
                                            type="checkbox"
                                            checked={config.enabled}
                                            onChange={handleToggle}
                                            className="sr-only"
                                        />
                                        <div className={`absolute top-1 left-1 bg-white w-8 h-8 rounded-full shadow-md transition-all duration-500 transform ${config.enabled ? 'translate-x-10 scale-110' : 'translate-x-0'}`}></div>
                                    </div>
                                    <span className={`text-sm font-bold tracking-widest transition-colors duration-300 ${config.enabled ? 'text-orange-600' : 'text-gray-400 group-hover:text-primary-black'}`}>
                                        {config.enabled ? 'LIVE ACTIVE' : 'STANDBY'}
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">Message Payload (Unicode Supported)</label>
                            <textarea
                                value={config.message}
                                onChange={handleMessageChange}
                                rows="5"
                                className="w-full bg-gray-50/50 border border-gray-100 rounded-3xl p-6 text-xl md:text-2xl font-bold tracking-tight text-primary-black placeholder-gray-200 focus:ring-2 ring-orange-50 focus:border-orange-100 transition-all resize-none"
                                placeholder="ENTER CRITICAL UPDATES..."
                            />
                            <div className="flex items-center gap-2 mt-4 text-xs font-bold text-gray-400 uppercase tracking-tighter">
                                <HiInformationCircle className="text-lg text-orange-500" />
                                <span>Tip: Separate multiple updates with a forward slash ( / ) for visual distinction.</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview System */}
                <aside className="lg:col-span-4 space-y-8">
                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 space-y-6 sticky top-24">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Feed Monitor</p>
                            <HiEye className="text-gray-300" />
                        </div>

                        <div className="border border-gray-50 rounded-2xl p-4 bg-gray-50/30 min-h-[120px] flex items-center justify-center overflow-hidden relative">
                            {config.enabled ? (
                                <div className="w-full transform transition-all duration-700">
                                    <BreakingNewsTicker label={config.label} message={config.message} enabled={config.enabled} />
                                </div>
                            ) : (
                                <div className="text-center px-4">
                                    <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Receiver Offline</p>
                                    <p className="text-[10px] text-gray-400 mt-2 font-medium">Activate transmission to monitor live feed.</p>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between px-2 text-[10px] font-bold uppercase tracking-tighter">
                                <span className="text-gray-400">Protocol</span>
                                <span className="text-primary-black">SR-700 / X1</span>
                            </div>
                            <div className="flex items-center justify-between px-2 text-[10px] font-bold uppercase tracking-tighter">
                                <span className="text-gray-400">Encryption</span>
                                <span className="text-green-600">Active</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ManageTicker;
