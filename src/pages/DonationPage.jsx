import React, { useState, useEffect } from 'react';
import { HiLightningBolt, HiShieldCheck, HiChevronRight, HiCreditCard, HiLibrary, HiCurrencyDollar, HiCheckCircle } from 'react-icons/hi';
import { FaPaypal, FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import { getLocalStorage } from '../utils/helpers';

const DonationPage = () => {
    const [activeTab, setActiveTab] = useState('paypal');
    const [config, setConfig] = useState(null);

    useEffect(() => {
        const savedConfig = getLocalStorage('darkroom_donation_config');
        setConfig(savedConfig);
    }, []);

    const navItems = [
        { id: 'paypal', label: 'PayPal / Cards', sub: 'Instant Global Payment', icon: HiCreditCard },
        { id: 'bank', label: 'Bank Transfer', sub: 'Institutional Support', icon: HiLibrary },
        { id: 'crypto', label: 'Digital Assets', sub: 'Decentralized Ledger', icon: HiCurrencyDollar },
    ];

    if (!config) return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
            {/* Pro Hero Section */}
            <header className="relative pt-32 pb-20 overflow-hidden border-b border-slate-800 bg-slate-900">
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold tracking-widest uppercase mb-8">
                            <HiLightningBolt className="text-sm animate-pulse" />
                            Operations Funding Protocol
                        </div>
                        <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tighter leading-[0.95] mb-8">
                            Supporting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">Future of Truth.</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-medium text-slate-400 max-w-2xl leading-relaxed">
                            Ensuring the operational infrastructure of independent journalism in Sri Lanka through secure, transparent, and decentralized funding.
                        </p>
                    </div>
                </div>
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-indigo-600/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
            </header>

            <div className="container-custom py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start">
                    {/* Navigation Sidebar */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl shadow-indigo-500/5">
                            <nav className="space-y-2">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full group flex items-start gap-5 p-6 rounded-2xl transition-all text-left ${activeTab === item.id
                                                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20 translate-x-1'
                                                : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                                            }`}
                                    >
                                        <item.icon className={`text-3xl shrink-0 ${activeTab === item.id ? 'text-white' : 'text-slate-600 group-hover:text-indigo-400 transition-colors'}`} />
                                        <div>
                                            <p className="text-md font-bold tracking-tight mb-1">{item.label}</p>
                                            <p className={`text-xs font-medium leading-tight ${activeTab === item.id ? 'text-indigo-100/70' : 'text-slate-500'}`}>{item.sub}</p>
                                        </div>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col gap-6 shadow-xl shadow-indigo-500/5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-500">
                                    <HiShieldCheck className="text-2xl" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white tracking-tight">Encrypted Channel</p>
                                    <p className="text-xs font-medium text-slate-500">End-to-end security active</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                All donations are processed through legally compliant and technologically secure financial gateways.
                            </p>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-16 shadow-2xl shadow-indigo-500/5 min-h-[700px] relative overflow-hidden">
                        <div className="relative z-10">
                            {activeTab === 'paypal' && (
                                <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-500">
                                    <div className="space-y-4">
                                        <div className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold tracking-widest uppercase rounded-lg border border-indigo-500/10">
                                            Instant Clearing
                                        </div>
                                        <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter leading-tight">
                                            Merchant Checkout
                                        </h2>
                                        <p className="text-xl font-medium text-slate-400 max-w-xl">
                                            Quickly authorize your support through our global PayPal integration or credit card gateways.
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-6">
                                        {[
                                            { icon: FaPaypal, color: '#003087' },
                                            { icon: FaCcVisa, color: '#1A1F71' },
                                            { icon: FaCcMastercard, color: '#EB001B' }
                                        ].map((brand, i) => (
                                            <div key={i} className="bg-white p-5 rounded-3xl shadow-lg border border-slate-200/5 hover:scale-105 transition-transform">
                                                <brand.icon className="text-5xl" style={{ color: brand.color }} />
                                            </div>
                                        ))}
                                    </div>

                                    {config.paypal?.enabled ? (
                                        <div className="space-y-8 pt-8">
                                            <a
                                                href={config.paypal.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-4 bg-indigo-600 text-white px-12 py-6 rounded-3xl font-bold text-xl hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-500/30 group active:scale-95"
                                            >
                                                Authorize Now
                                                <HiChevronRight className="text-2xl transition-transform group-hover:translate-x-2" />
                                            </a>
                                            <div className="flex flex-wrap gap-8 items-center pt-10 border-t border-slate-800 text-slate-500 font-bold text-xs tracking-widest uppercase">
                                                <div className="flex items-center gap-2">
                                                    <HiCheckCircle className="text-indigo-500 text-lg" />
                                                    SSL Security
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <HiCheckCircle className="text-indigo-500 text-lg" />
                                                    Fraud Protected
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <HiCheckCircle className="text-indigo-500 text-lg" />
                                                    Direct Clearing
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-16 bg-slate-950 border border-slate-800 rounded-3xl text-center">
                                            <p className="text-xl font-bold text-slate-500 uppercase tracking-widest">Gateway Off-Peak</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'bank' && (
                                <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-500">
                                    <div className="space-y-4">
                                        <div className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold tracking-widest uppercase rounded-lg border border-indigo-500/10">
                                            Wire Protocol
                                        </div>
                                        <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter leading-tight">
                                            Institutional Wire
                                        </h2>
                                        <p className="text-xl font-medium text-slate-400">Standardized institutional banking data for global wire transfers.</p>
                                    </div>

                                    {config.bank?.enabled ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                            <div className="col-span-full bg-slate-950 p-10 rounded-[2rem] border border-slate-800 hover:border-indigo-500/30 transition-all shadow-xl">
                                                <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.3em] mb-4">Account Reference</p>
                                                <p className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter break-all tabular-nums select-all">{config.bank.accountNumber}</p>
                                            </div>
                                            <div className="bg-slate-950/50 p-8 rounded-3xl border border-slate-800 transition-colors hover:bg-slate-950">
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Entity Name</p>
                                                <p className="text-xl font-bold text-white uppercase">{config.bank.accountName}</p>
                                            </div>
                                            <div className="bg-slate-950/50 p-8 rounded-3xl border border-slate-800 transition-colors hover:bg-slate-950">
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Bank Institution</p>
                                                <p className="text-xl font-bold text-white uppercase">{config.bank.bankName}</p>
                                            </div>
                                            <div className="bg-slate-950/50 p-8 rounded-3xl border border-slate-800 transition-colors hover:bg-slate-950">
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">SWIFT / BIC</p>
                                                <p className="text-xl font-bold text-white tabular-nums">{config.bank.swiftCode}</p>
                                            </div>
                                            <div className="bg-slate-950/50 p-8 rounded-3xl border border-slate-800 transition-colors hover:bg-slate-950">
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">IBAN Standard</p>
                                                <p className="text-xl font-bold text-white tabular-nums truncate">{config.bank.iban || 'UNDEFINED'}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-20 bg-slate-950 border border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center opacity-40">
                                            <HiLibrary className="text-5xl text-slate-700 mb-6" />
                                            <p className="text-xl font-bold text-slate-600 uppercase tracking-widest">Bank Data Unavailable</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'crypto' && (
                                <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-500">
                                    <div className="space-y-4">
                                        <div className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold tracking-widest uppercase rounded-lg border border-indigo-500/10">
                                            Decentralized
                                        </div>
                                        <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter leading-tight">
                                            Blockchain Ledger
                                        </h2>
                                        <p className="text-xl font-medium text-slate-400">Support our decentralized operational funding networks.</p>
                                    </div>

                                    {config.crypto?.enabled ? (
                                        <div className="space-y-6 pt-4">
                                            {[
                                                { l: 'Bitcoin Address (BTC)', v: config.crypto.btcAddress },
                                                { l: 'Ethereum Address (ETH)', v: config.crypto.ethAddress },
                                                { l: 'Binance Pay ID', v: config.crypto.binancePayId }
                                            ].filter(c => c.v).map((item, idx) => (
                                                <div key={idx} className="group bg-slate-950 p-8 rounded-[2rem] border border-slate-800 hover:border-indigo-500/30 transition-all">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{item.l}</p>
                                                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase border border-emerald-500/10">Wallet Verified</span>
                                                    </div>
                                                    <p className="text-2xl md:text-3xl font-mono text-white break-all tracking-tight leading-none select-all">
                                                        {item.v}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-20 bg-slate-950 border border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center opacity-40">
                                            <HiCurrencyDollar className="text-5xl text-slate-700 mb-6" />
                                            <p className="text-xl font-bold text-slate-600 uppercase tracking-widest">Web3 Ledger Locked</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pro Footer Strip */}
            <div className="bg-slate-900 py-12 border-t border-slate-800 overflow-hidden">
                <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                    <span className="text-xs font-bold uppercase tracking-[0.4em]">Darkroom Security Protocol V4.02</span>
                    <div className="flex gap-12">
                        {navItems.map(item => (
                            <div key={item.id} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                                <item.icon className="text-lg" />
                                {item.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationPage;
