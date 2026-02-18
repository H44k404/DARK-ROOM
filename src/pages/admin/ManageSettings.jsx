import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getLocalStorage, setLocalStorage } from '../../utils/helpers';
import { HiSave, HiCheck, HiCreditCard, HiLibrary, HiCurrencyDollar, HiInformationCircle, HiGlobeAlt } from 'react-icons/hi';

const ManageSettings = () => {
    const { user } = useAuth();
    const [config, setConfig] = useState({
        site: {
            siteName: 'Dark Room',
            contactEmail: 'contact@darkroom.lk',
            phoneNumber: '+94 11 234 5678'
        },
        paypal: { enabled: false, email: '', link: '' },
        bank: { enabled: false, bankName: '', accountName: '', accountNumber: '', branch: '', swiftCode: '', bankCountry: '', iban: '' },
        crypto: { enabled: false, btcAddress: '', ethAddress: '', usdtAddress: '', binancePayId: '' }
    });
    const [loading, setLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState(null); // 'saving', 'success', 'error'

    useEffect(() => {
        const savedGeneral = getLocalStorage('darkroom_general_config');
        const savedFinancial = getLocalStorage('darkroom_donation_config');

        setConfig(prev => ({
            ...prev,
            site: savedGeneral || prev.site,
            ...(savedFinancial || {})
        }));

        setLoading(false);
    }, []);

    const handleChange = (section, field, value) => {
        setConfig(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleSave = () => {
        setSaveStatus('saving');
        setTimeout(() => {
            setLocalStorage('darkroom_general_config', config.site);
            setLocalStorage('darkroom_donation_config', {
                paypal: config.paypal,
                bank: config.bank,
                crypto: config.crypto
            });
            setSaveStatus('success');
            setTimeout(() => setSaveStatus(null), 3000);
        }, 800);
    };

    if (loading) return <div className="p-8 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading secure configuration...</div>;

    return (
        <div className="max-w-full mx-auto space-y-10 mb-20">
            <header className="flex items-center justify-between gap-4 border-b border-gray-100 pb-8">
                <div>
                    <h1 className="text-3xl font-bold text-primary-black tracking-tight">Platform Settings</h1>
                    <p className="text-sm text-gray-500 mt-1">Configure brand identity and financial gateways.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saveStatus === 'saving'}
                    className="btn btn-primary px-10 rounded-2xl shadow-xl shadow-black/10 flex items-center gap-2"
                >
                    {saveStatus === 'saving' ? (
                        <span>Saving...</span>
                    ) : saveStatus === 'success' ? (
                        <>
                            <HiCheck className="text-xl text-green-400" />
                            <span>Synchronized</span>
                        </>
                    ) : (
                        <>
                            <HiSave className="text-xl opacity-50" />
                            <span>Save Changes</span>
                        </>
                    )}
                </button>
            </header>

            {/* General Settings */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col group">
                <div className="bg-gray-50/50 px-8 py-6 border-b border-gray-50 flex items-center gap-4 transition-colors group-hover:bg-primary-gray-50/30">
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-primary-black shadow-sm">
                        <HiGlobeAlt className="text-xl" />
                    </div>
                    <h2 className="text-lg font-bold text-primary-black tracking-tight">Public Identity</h2>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Site Name</label>
                        <input
                            type="text"
                            value={config.site.siteName}
                            onChange={(e) => handleChange('site', 'siteName', e.target.value)}
                            className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-semibold text-primary-black focus:ring-2 ring-primary-gray-100 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Contact Email</label>
                        <input
                            type="email"
                            value={config.site.contactEmail}
                            onChange={(e) => handleChange('site', 'contactEmail', e.target.value)}
                            className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-semibold text-primary-black focus:ring-2 ring-primary-gray-100 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Phone Number</label>
                        <input
                            type="text"
                            value={config.site.phoneNumber}
                            onChange={(e) => handleChange('site', 'phoneNumber', e.target.value)}
                            className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-semibold text-primary-black focus:ring-2 ring-primary-gray-100 transition-all"
                        />
                    </div>
                </div>
            </div>

            {user?.role === 'super_admin' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* PayPal Settings */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col group">
                        <div className="bg-gray-50/50 px-8 py-6 border-b border-gray-50 flex items-center justify-between transition-colors group-hover:bg-blue-50/30">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-blue-600 shadow-sm">
                                    <HiCreditCard className="text-xl" />
                                </div>
                                <h2 className="text-lg font-bold text-primary-black tracking-tight">PayPal Gateway</h2>
                            </div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Status</span>
                                <div className={`w-12 h-6 rounded-full transition-all duration-300 relative ${config.paypal.enabled ? 'bg-blue-600' : 'bg-gray-200'}`}>
                                    <input
                                        type="checkbox"
                                        checked={config.paypal.enabled}
                                        onChange={(e) => handleChange('paypal', 'enabled', e.target.checked)}
                                        className="sr-only"
                                    />
                                    <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-sm transition-all duration-300 transform ${config.paypal.enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                </div>
                            </label>
                        </div>
                        <div className="p-8 space-y-6 flex-1">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Merchant Email</label>
                                <input
                                    type="text"
                                    value={config.paypal.email}
                                    onChange={(e) => handleChange('paypal', 'email', e.target.value)}
                                    className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-semibold text-primary-black focus:ring-2 ring-blue-50 transition-all"
                                    placeholder="paypal@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Direct me Link</label>
                                <input
                                    type="text"
                                    value={config.paypal.link}
                                    onChange={(e) => handleChange('paypal', 'link', e.target.value)}
                                    className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-semibold text-primary-black focus:ring-2 ring-blue-50 transition-all font-mono"
                                    placeholder="https://paypal.me/yourname"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Crypto Settings */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col group">
                        <div className="bg-gray-50/50 px-8 py-6 border-b border-gray-50 flex items-center justify-between transition-colors group-hover:bg-yellow-50/30">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-yellow-600 shadow-sm">
                                    <HiCurrencyDollar className="text-xl" />
                                </div>
                                <h2 className="text-lg font-bold text-primary-black tracking-tight">Crypto Ledger</h2>
                            </div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Status</span>
                                <div className={`w-12 h-6 rounded-full transition-all duration-300 relative ${config.crypto.enabled ? 'bg-yellow-500' : 'bg-gray-200'}`}>
                                    <input
                                        type="checkbox"
                                        checked={config.crypto.enabled}
                                        onChange={(e) => handleChange('crypto', 'enabled', e.target.checked)}
                                        className="sr-only"
                                    />
                                    <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-sm transition-all duration-300 transform ${config.crypto.enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                </div>
                            </label>
                        </div>
                        <div className="p-8 space-y-6 flex-1">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">BTC Address</label>
                                <input
                                    type="text"
                                    value={config.crypto.btcAddress}
                                    onChange={(e) => handleChange('crypto', 'btcAddress', e.target.value)}
                                    className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-3.5 text-xs font-mono text-primary-black focus:ring-2 ring-yellow-50 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">ETH Address</label>
                                <input
                                    type="text"
                                    value={config.crypto.ethAddress}
                                    onChange={(e) => handleChange('crypto', 'ethAddress', e.target.value)}
                                    className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-3.5 text-xs font-mono text-primary-black focus:ring-2 ring-yellow-50 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Binance Pay ID</label>
                                <input
                                    type="text"
                                    value={config.crypto.binancePayId}
                                    onChange={(e) => handleChange('crypto', 'binancePayId', e.target.value)}
                                    className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-semibold text-primary-black focus:ring-2 ring-yellow-50 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bank Settings */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col group lg:col-span-2">
                        <div className="bg-gray-50/50 px-8 py-6 border-b border-gray-50 flex items-center justify-between transition-colors group-hover:bg-green-50/30">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-green-600 shadow-sm">
                                    <HiLibrary className="text-xl" />
                                </div>
                                <h2 className="text-lg font-bold text-primary-black tracking-tight">Bank Transfers</h2>
                            </div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Status</span>
                                <div className={`w-12 h-6 rounded-full transition-all duration-300 relative ${config.bank.enabled ? 'bg-green-600' : 'bg-gray-200'}`}>
                                    <input
                                        type="checkbox"
                                        checked={config.bank.enabled}
                                        onChange={(e) => handleChange('bank', 'enabled', e.target.checked)}
                                        className="sr-only"
                                    />
                                    <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-sm transition-all duration-300 transform ${config.bank.enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                </div>
                            </label>
                        </div>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Bank Name</label>
                                <input
                                    type="text"
                                    value={config.bank.bankName}
                                    onChange={(e) => handleChange('bank', 'bankName', e.target.value)}
                                    className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-semibold text-primary-black focus:ring-2 ring-green-50 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Account Holder</label>
                                <input
                                    type="text"
                                    value={config.bank.accountName}
                                    onChange={(e) => handleChange('bank', 'accountName', e.target.value)}
                                    className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-semibold text-primary-black focus:ring-2 ring-green-50 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Account Number</label>
                                <input
                                    type="text"
                                    value={config.bank.accountNumber}
                                    onChange={(e) => handleChange('bank', 'accountNumber', e.target.value)}
                                    className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-mono font-bold text-primary-black focus:ring-2 ring-green-50 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">SWIFT/BIC Code</label>
                                <input
                                    type="text"
                                    value={config.bank.swiftCode}
                                    onChange={(e) => handleChange('bank', 'swiftCode', e.target.value)}
                                    className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-mono font-bold text-primary-black focus:ring-2 ring-green-50 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">IBAN Code</label>
                                <input
                                    type="text"
                                    value={config.bank.iban}
                                    onChange={(e) => handleChange('bank', 'iban', e.target.value)}
                                    className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-mono font-bold text-primary-black focus:ring-2 ring-green-50 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Bank Country</label>
                                <input
                                    type="text"
                                    value={config.bank.bankCountry}
                                    onChange={(e) => handleChange('bank', 'bankCountry', e.target.value)}
                                    className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-semibold text-primary-black focus:ring-2 ring-green-50 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {user?.role === 'super_admin' && (
                <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-[2rem] flex items-start gap-4 shadow-sm">
                    <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                        <HiInformationCircle className="text-xl" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-blue-900 tracking-tight">Financial Security Notice</p>
                        <p className="text-xs text-blue-700 mt-0.5 leading-relaxed">
                            Data stored here is used to generate the donation UI on the public site. Ensure all addresses and accounts are double-verified before saving.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageSettings;
