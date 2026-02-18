import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { formatDate } from '../../utils/helpers';
import { HiTrash, HiUserAdd, HiMail, HiShieldCheck } from 'react-icons/hi';

const UserManagement = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'editor'
    });

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const data = await api.get('/users/staff');
            setStaff(data);
        } catch (err) {
            setError('Failed to load team members');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await api.post('/users/add', formData);
            setSuccess(`Successfully added ${formData.username} as ${formData.role}`);
            setFormData({ username: '', email: '', password: '', role: 'editor' });
            fetchStaff();
        } catch (err) {
            setError(err.message || 'Failed to add team member');
        }
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to remove ${name} from the team?`)) {
            try {
                await api.delete(`/users/${id}`);
                setSuccess('Member removed successfully');
                fetchStaff();
            } catch (err) {
                setError('Failed to remove member');
            }
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-primary-black">Team Management</h1>

            {/* Add Member Form */}
            <div className="card p-6 border-2 border-primary-black">
                <div className="flex items-center gap-2 mb-6">
                    <HiUserAdd className="text-2xl text-primary-black" />
                    <h2 className="text-xl font-bold uppercase">Add New Team Member</h2>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="block text-xs font-bold uppercase mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="input border-2 border-primary-black"
                            placeholder="johndoe"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="input border-2 border-primary-black"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase mb-1">Temporary Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="input border-2 border-primary-black"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase mb-1">Appointed Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="input border-2 border-primary-black"
                        >
                            <option value="editor">Editor (Create Content)</option>
                            <option value="admin">Admin (Manage Content)</option>
                        </select>
                    </div>
                    <div className="lg:col-span-4 mt-2">
                        <button type="submit" className="btn btn-primary w-full md:w-auto px-8">
                            Add Member
                        </button>
                    </div>
                </form>

                {error && <div className="mt-4 p-3 bg-red-50 border-2 border-red-600 text-red-600 font-bold text-sm">{error}</div>}
                {success && <div className="mt-4 p-3 bg-green-50 border-2 border-green-600 text-green-600 font-bold text-sm">{success}</div>}
            </div>

            {/* Staff List */}
            <div className="card shadow-md border-2 border-primary-black overflow-hidden">
                <div className="bg-primary-black text-white p-4">
                    <h3 className="font-bold flex items-center gap-2">
                        <HiShieldCheck /> CURRENT TEAM MEMBERS
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-primary-gray-100 border-b-2 border-primary-black">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase">Member</th>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase">Role</th>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase">Joined</th>
                                <th className="px-6 py-4 text-right text-xs font-bold uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-primary-gray-200">
                            {loading ? (
                                <tr><td colSpan="4" className="p-8 text-center font-bold">Loading team...</td></tr>
                            ) : staff.length === 0 ? (
                                <tr><td colSpan="4" className="p-8 text-center font-bold">No registered team members.</td></tr>
                            ) : staff.map((member) => (
                                <tr key={member.id} className="hover:bg-primary-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-primary-black">{member.username}</div>
                                        <div className="text-xs text-primary-gray-500 flex items-center gap-1">
                                            <HiMail /> {member.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-[10px] font-bold uppercase border-2 ${member.role === 'admin' ? 'border-primary-black bg-primary-black text-white' : 'border-primary-black text-primary-black'
                                            }`}>
                                            {member.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-primary-gray-600">
                                        {formatDate(member.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(member.id, member.username)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-sm transition-colors border-2 border-transparent hover:border-red-600"
                                            title="Remove member"
                                        >
                                            <HiTrash className="text-xl" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
