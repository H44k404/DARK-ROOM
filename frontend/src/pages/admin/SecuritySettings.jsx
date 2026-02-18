import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { HiShieldCheck, HiOutlineQrcode, HiCheckCircle, HiLockClosed } from 'react-icons/hi';

const SecuritySettings = () => {
    const [twoFactorData, setTwoFactorData] = useState(null);
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const user = await api.get('/auth/me');
                setIsEnabled(user.twoFactorEnabled);
            } catch (err) { }
        };
        checkStatus();
    }, []);

    const handleSetup = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await api.post('/auth/setup-2fa');
            setTwoFactorData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/auth/verify-2fa', { token });
            setSuccess('2FA enabled successfully!');
            setIsEnabled(true);
            setTwoFactorData(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card shadow-md border-2 border-primary-black p-6">
            <div className="flex items-center gap-3 mb-6">
                <HiShieldCheck className="text-3xl text-primary-black" />
                <h2 className="text-xl font-bold uppercase tracking-tight">Two-Factor Authentication (2FA)</h2>
            </div>

            {isEnabled ? (
                <div className="bg-green-50 border-2 border-green-600 p-6 flex flex-col items-center text-center">
                    <HiCheckCircle className="text-6xl text-green-600 mb-4" />
                    <h3 className="text-xl font-bold text-green-800 mb-2 uppercase">2FA IS ACTIVE</h3>
                    <p className="text-sm text-green-700 max-w-md">
                        Your account is protected with an extra layer of security. Every login requires a code from your authenticator app.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    <p className="text-primary-gray-600">
                        Secure your account with TOTP (Time-based One-Time Password). You'll need an app like Google Authenticator or Authy.
                    </p>

                    {!twoFactorData ? (
                        <button
                            onClick={handleSetup}
                            disabled={loading}
                            className="btn btn-primary px-8 flex items-center gap-2"
                        >
                            <HiLockClosed />
                            {loading ? 'Generating...' : 'Setup Multi-Factor Auth'}
                        </button>
                    ) : (
                        <div className="space-y-6 animate-fade-in">
                            <div className="flex flex-col md:flex-row gap-8 items-center bg-primary-gray-50 p-6 border-2 border-dashed border-primary-black">
                                <div className="bg-white p-4 border-2 border-primary-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <img src={twoFactorData.qrCode} alt="QR Code" className="w-48 h-48" />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-2 font-bold uppercase text-xs">
                                        <HiOutlineQrcode /> Step 1: Scan this code
                                    </div>
                                    <p className="text-sm text-primary-gray-600">
                                        Open your authenticator app and scan the QR code. Or enter the secret manually:
                                    </p>
                                    <div className="bg-white px-4 py-2 font-mono text-sm border-2 border-primary-black break-all">
                                        {twoFactorData.secret}
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleVerify} className="space-y-4">
                                <div className="flex items-center gap-2 font-bold uppercase text-xs">
                                    Step 2: Enter verification code
                                </div>
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        value={token}
                                        onChange={(e) => setToken(e.target.value)}
                                        placeholder="000 000"
                                        maxLength="6"
                                        className="input border-2 border-primary-black text-center text-2xl tracking-widest font-bold max-w-[200px]"
                                        required
                                    />
                                    <button type="submit" disabled={loading} className="btn btn-primary px-8">
                                        {loading ? 'Verifying...' : 'Enable 2FA'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}

            {error && <div className="mt-4 p-3 bg-red-50 border-2 border-red-600 text-red-600 font-bold text-sm uppercase">{error}</div>}
            {success && <div className="mt-4 p-3 bg-green-50 border-2 border-green-600 text-green-600 font-bold text-sm uppercase">{success}</div>}
        </div>
    );
};

export default SecuritySettings;
