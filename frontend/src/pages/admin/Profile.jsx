import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { HiUser, HiMail, HiLockClosed, HiCamera, HiIdentification, HiCheck, HiTrash } from 'react-icons/hi';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
        designation: '',
        profileImage: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showImageOptions, setShowImageOptions] = useState(false);

    // Auto-dismiss notifications
    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                setSuccess('');
                setError('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success, error]);

    // Upload State
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleUpload(files[0]);
        }
    };

    const handleFileSelect = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleUpload(files[0]);
        }
    };

    const handleUpload = async (file) => {
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file.');
            return;
        }

        setUploading(true);
        setError('');

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await api.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setFormData(prev => ({ ...prev, profileImage: response.data?.url || response.url }));
            setSuccess('Image uploaded successfully!');
        } catch (err) {
            console.error('Upload failed:', err);
            setError('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveProfilePhoto = (e) => {
        try {
            e.stopPropagation();
            setFormData(prev => ({ ...prev, profileImage: '' }));
            setShowImageOptions(false);
            setSuccess('Photo removed. Click Save Changes to confirm.');
        } catch (err) {
            console.error('Error removing photo:', err);
            setError('Failed to remove photo.');
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await api.get('/users/profile');
                setFormData({
                    name: data.name || '',
                    email: data.email || '',
                    bio: data.bio || '',
                    designation: data.designation || '',
                    profileImage: data.profileImage || '',
                    password: '',
                    confirmPassword: ''
                });
            } catch (err) {
                console.error('Failed to load profile', err);
                setError('Failed to load profile data.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
        const handleClickOutside = (event) => {
            if (showImageOptions && !event.target.closest('.group')) {
                setShowImageOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showImageOptions]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        if (formData.password && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setSaving(false);
            return;
        }

        try {
            const updateData = {
                name: formData.name,
                email: formData.email,
                bio: formData.bio,
                profileImage: formData.profileImage || null, // Explicitly set to null if empty
            };

            if (formData.password) {
                updateData.password = formData.password;
            }

            const response = await api.put('/users/profile', updateData);
            const updatedUser = response.data || response;
            updateUser(updatedUser); // Update global auth state
            setSuccess('Profile updated successfully!');

            // Clear password fields after successful update
            setFormData(prev => ({
                ...prev,
                password: '',
                confirmPassword: ''
            }));
        } catch (err) {
            console.error('Profile update error:', err);
            setError(err.response?.data?.message || err.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading profile...</div>;

    return (
        <div className="p-6 md:p-10 max-w-full mx-auto">
            <h1 className="text-3xl font-bold text-primary-black mb-2 font-serif">My Profile</h1>
            <p className="text-gray-500 mb-8">Manage your personal information and security settings.</p>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Profile Card */}
                <div className="w-full md:w-1/3">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                        <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-100 relative">
                            {formData.profileImage ? (
                                <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <HiUser className="text-5xl" />
                                </div>
                            )}
                        </div>
                        <h2 className="text-xl font-bold text-primary-black">{formData.name || user.username}</h2>
                        <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mt-1">{user.role}</p>
                        {formData.designation && <p className="text-xs text-gray-400 mt-1">{formData.designation}</p>}
                    </div>
                </div>

                {/* Edit Form */}
                <div className="w-full md:w-2/3">
                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                        {error && (
                            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm border border-red-100">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg text-sm border border-green-100 flex items-center gap-2">
                                <HiCheck className="text-lg" /> {success}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Display Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <HiUser className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-black focus:border-black transition-colors"
                                        placeholder="Your full name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <HiMail className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={user?.role !== 'super_admin'}
                                        title={user?.role !== 'super_admin' ? "Only Super Admin can change email addresses." : ""}
                                        className={`w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-black focus:border-black transition-colors ${user?.role !== 'super_admin' ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
                                        placeholder="name@example.com"
                                    />
                                </div>
                                {user?.role !== 'super_admin' && (
                                    <p className="text-[10px] text-gray-400 mt-1">Contact Super Admin to change email.</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Profile Image</label>

                            <div className="flex flex-col items-center">
                                <div
                                    className="relative group cursor-pointer w-32 h-32"
                                    onClick={() => setShowImageOptions(!showImageOptions)}
                                    title="Click to change profile photo"
                                >
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 relative">
                                        {formData.profileImage ? (
                                            <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                                                <HiUser className="text-6xl" />
                                            </div>
                                        )}

                                        {/* Overlay - WhatsApp Style */}
                                        <div className={`absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2 transition-opacity duration-200 ${showImageOptions ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                            <div className="flex flex-col items-center text-white">
                                                <HiCamera className="text-2xl mb-1" />
                                                <span className="text-[10px] uppercase tracking-wider font-bold">Change</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dropdown Options */}
                                    {showImageOptions && (
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden text-left animation-fade-in">
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    document.getElementById('profile-upload').click();
                                                    setShowImageOptions(false);
                                                }}
                                                className="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                                            >
                                                <HiCamera className="text-lg text-primary-black" />
                                                Upload Photo
                                            </button>
                                            {formData.profileImage && (
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveProfilePhoto}
                                                    className="w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                                                >
                                                    <HiTrash className="text-lg" />
                                                    Remove Photo
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    id="profile-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    disabled={uploading}
                                />
                                {uploading && <p className="text-xs text-gray-500 mt-2 animate-pulse">Uploading...</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Bio</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-black focus:border-black transition-colors resize-none"
                                placeholder="Tell us a little about yourself..."
                            />
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Change Password</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-2">New Password (Optional)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <HiLockClosed className="text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-black focus:border-black transition-colors"
                                            placeholder="••••••••"
                                            minLength="6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-2">Confirm Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <HiLockClosed className="text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-black focus:border-black transition-colors"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-primary-black text-white px-8 py-2.5 rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-black/20 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
