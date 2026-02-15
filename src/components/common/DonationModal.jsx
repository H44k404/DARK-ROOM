import React, { useState, useEffect } from 'react';
import { HiX, HiCreditCard, HiLibrary, HiCurrencyDollar, HiLightningBolt, HiCheckCircle, HiChevronRight } from 'react-icons/hi';
import { FaPaypal, FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import { getLocalStorage } from '../../utils/helpers';

const DonationModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('paypal');
    const [config, setConfig] = useState(null);

    useEffect(() => {
        if (isOpen) {
            const savedConfig = getLocalStorage('darkroom_donation_config');
            setConfig(savedConfig);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const navItems = [
        { id: 'paypal', label: 'PayPal / Cards', sub: 'Instant Global Payment', icon: HiCreditCard },
        { id: 'bank', label: 'Bank Transfer', sub: 'Institutional Support', icon: HiLibrary },
        { id: 'crypto', label: 'Digital Assets', sub: 'Decentralized Ledger', icon: HiCurrencyDollar },
    ];

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 sm:p-12 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="absolute inset-0" onClick={onClose} />

            <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-2xl shadow-indigo-500/10 min-h-[600px]">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-80 bg-slate-950 border-r border-slate-800 flex flex-col p-6 shrink-0">
                    <div className="flex items-center gap-4 mb-12 px-2">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <HiLightningBolt className="text-2xl text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white tracking-tight leading-none mb-1">Support Portal</h2>
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Darkroom v4.0.2</p>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full group flex items-start gap-4 p-4 rounded-xl transition-all text-left ${activeTab === item.id
                                        ? 'bg-indigo-600 shadow-lg shadow-indigo-500/20 text-white'
                                        : 'hover:bg-slate-900 text-slate-400 hover:text-white'
                                    }`}
                            >
                                <item.icon className={`text-2xl shrink-0 ${activeTab === item.id ? 'text-white' : 'text-slate-600 group-hover:text-indigo-400'}`} />
                                <div>
                                    <p className="text-sm font-bold tracking-tight leading-none mb-1">{item.label}</p>
                                    <p className={`text-[10px] font-medium leading-tight ${activeTab === item.id ? 'text-indigo-100/70' : 'text-slate-600'}`}>{item.sub}</p>
                                </div>
                                {activeTab === item.id && <HiChevronRight className="ml-auto text-lg self-center" />}
                            </button>
                        ))}
                    </nav>

                    <div className="mt-auto pt-6 border-t border-slate-900/50 px-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            Secure Environment
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col bg-slate-900 relative">
                    {/* Header */}
                    <div className="flex items-center justify-between p-8 border-b border-slate-800">
                        <div>
                            <h3 className="text-2xl font-bold text-white tracking-tight leading-none mb-2">
                                {navItems.find(t => t.id === activeTab).label}
                            </h3>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Authorized Transaction Channel</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                        >
                            <HiX className="text-2xl" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                        {!config ? (
                            <div className="h-full flex flex-col items-center justify-center">
                                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Establishing Secure Connection...</span>
                            </div>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {activeTab === 'paypal' && (
                                    <div className="max-w-xl mx-auto space-y-10 py-4">
                                        <div className="space-y-4">
                                            <h4 className="text-4xl font-extrabold text-white tracking-tighter leading-tight">
                                                Global Merchant Checkout
                                            </h4>
                                            <p className="text-lg font-medium text-slate-400 leading-relaxed">
                                                Support our mission instantly via PayPal or secondary credit card authorization. This channel is end-to-end encrypted.
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-6">
                                            {[
                                                { icon: FaPaypal, color: '#003087', bg: 'bg-white' },
                                                { icon: FaCcVisa, color: '#1A1F71', bg: 'bg-white' },
                                                { icon: FaCcMastercard, color: '#EB001B', bg: 'bg-white' }
                                            ].map((brand, i) => (
                                                <div key={i} className={`p-4 ${brand.bg} rounded-2xl shadow-lg border border-slate-200/10`}>
                                                    <brand.icon className="text-4xl" style={{ color: brand.color }} />
                                                </div>
                                            ))}
                                        </div>

                                        {config.paypal?.enabled ? (
                                            <div className="pt-6 space-y-6">
                                                <a
                                                    href={config.paypal.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-500 active:scale-[0.98] transition-all shadow-xl shadow-indigo-500/25"
                                                >
                                                    Authorize Donation
                                                    <HiChevronRight className="text-2xl" />
                                                </a>
                                                <div className="flex items-center gap-3 text-emerald-500 bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10">
                                                    <HiCheckCircle className="text-xl shrink-0" />
                                                    <span className="text-xs font-bold uppercase tracking-wide">PCI DSS Compliant Infrastructure Active</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-8 bg-slate-950 border border-slate-800 rounded-2xl text-center">
                                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Gateway Temporarily Unavailable</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'bank' && (
                                    <div className="max-w-2xl mx-auto py-4 space-y-10">
                                        <div className="space-y-4">
                                            <h4 className="text-4xl font-extrabold text-white tracking-tighter leading-tight">Institutional Transfer</h4>
                                            <p className="text-lg font-medium text-slate-400">Direct institutional support via global banking protocols.</p>
                                        </div>

                                        {config.bank?.enabled ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="col-span-full bg-slate-950 p-8 rounded-2xl border border-slate-800 group transition-all hover:border-indigo-500/30">
                                                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3">Master Account Number</p>
                                                    <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight tabular-nums select-all break-all">{config.bank.accountNumber}</p>
                                                </div>
                                                <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
                                                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Entity Holder</p>
                                                    <p className="text-sm font-bold text-white uppercase">{config.bank.accountName}</p>
                                                </div>
                                                <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
                                                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Providing Institution</p>
                                                    <p className="text-sm font-bold text-white uppercase">{config.bank.bankName}</p>
                                                </div>
                                                <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
                                                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">SWIFT / BIC Code</p>
                                                    <p className="text-sm font-bold text-white uppercase tabular-nums">{config.bank.swiftCode}</p>
                                                </div>
                                                <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
                                                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">IBAN Protocol</p>
                                                    <p className="text-sm font-bold text-white uppercase tabular-nums truncate">{config.bank.iban || 'N/A'}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-16 bg-slate-950 border border-slate-800 rounded-3xl text-center opacity-40">
                                                <HiLibrary className="text-3xl text-slate-700 mx-auto mb-4" />
                                                <p className="text-sm font-bold text-slate-600 uppercase tracking-widest">Bank Data Offline</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'crypto' && (
                                    <div className="max-w-2xl mx-auto py-4 space-y-10">
                                        <div className="space-y-4">
                                            <h4 className="text-4xl font-extrabold text-white tracking-tighter leading-tight">Digital Assets</h4>
                                            <p className="text-lg font-medium text-slate-400">Decentralized operations funding via major ledgers.</p>
                                        </div>

                                        {config.crypto?.enabled ? (
                                            <div className="space-y-4">
                                                {[
                                                    { l: 'Bitcoin (BTC)', v: config.crypto.btcAddress },
                                                    { l: 'Ethereum (ETH)', v: config.crypto.ethAddress },
                                                    { l: 'Binance Pay ID', v: config.crypto.binancePayId }
                                                ].filter(c => c.v).map((item, idx) => (
                                                    <div key={idx} className="group bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-all">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{item.l}</p>
                                                            <span className="text-[8px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 uppercase tracking-widest border border-emerald-500/10">Network Active</span>
                                                        </div>
                                                        <p className="text-md sm:text-lg font-mono text-white break-all leading-relaxed select-all">
                                                            {item.v}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="p-16 bg-slate-950 border border-slate-800 rounded-3xl text-center opacity-40">
                                                <HiCurrencyDollar className="text-3xl text-slate-700 mx-auto mb-4" />
                                                <p className="text-sm font-bold text-slate-600 uppercase tracking-widest">Ledger Offline</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationModal;
