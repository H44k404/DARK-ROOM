import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { HiTrash, HiCheck, HiX, HiUserGroup, HiShieldCheck } from 'react-icons/hi';
import ConfirmationModal from '../../components/admin/ConfirmationModal';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [roleForm, setRoleForm] = useState({ role: '', designation: '' });

    const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: 'editor' });
    const [addSuccess, setAddSuccess] = useState('');
    const [addError, setAddError] = useState('');

    const [deleteUserId, setDeleteUserId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await api.get('/users/staff');
            setUsers(data);
        } catch (err) {
            setError('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        setAddError('');
        setAddSuccess('');
        try {
            await api.post('/users/add', newUser);
            setAddSuccess(`Successfully added ${newUser.username}`);
            setNewUser({ username: '', email: '', password: '', role: 'editor' });
            fetchUsers();
        } catch (err) {
            setAddError(err.message || 'Failed to add user');
        }
    };

    const handleDeleteClick = (id) => {
        setDeleteUserId(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!deleteUserId) return;

        try {
            await api.delete(`/users/${deleteUserId}`);
            setUsers(users.filter(u => u.id !== deleteUserId));
            setIsDeleteModalOpen(false);
            setDeleteUserId(null);
        } catch (err) {
            alert('Failed to delete user');
            setIsDeleteModalOpen(false);
        }
    };

    const startEdit = (user) => {
        setEditingUser(user.id);
        setRoleForm({ role: user.role, designation: user.designation || '' });
    };

    const cancelEdit = () => {
        setEditingUser(null);
        setRoleForm({ role: '', designation: '' });
    };

    const handleRoleUpdate = async (id) => {
        try {
            await api.put(`/users/${id}/role`, roleForm);
            // Optimistically update UI
            setUsers(users.map(u => u.id === id ? { ...u, role: roleForm.role, designation: roleForm.designation } : u));
            setEditingUser(null);
        } catch (err) {
            alert('Failed to update role');
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading users...</div>;

    return (
        <div className="p-6 md:p-10 max-w-full mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-primary-black mb-2 font-serif">Manage Team</h1>
                    <p className="text-gray-500">Control access levels and roles for your team members.</p>
                </div>
                <div className="bg-purple-100 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold text-purple-800">
                    <HiShieldCheck className="text-lg" /> Super Admin Area
                </div>
            </div>

            {/* Add User Form */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <HiUserGroup className="text-primary-black" /> Add New Team Member
                </h2>
                {addSuccess && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm font-medium">{addSuccess}</div>}
                {addError && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm font-medium">{addError}</div>}

                <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Username</label>
                        <input
                            type="text"
                            required
                            value={newUser.username}
                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-black focus:border-black"
                            placeholder="johndoe"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-black focus:border-black"
                            placeholder="email@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-black focus:border-black"
                            placeholder="••••••"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Role</label>
                        <select
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-black focus:border-black"
                        >
                            <option value="editor">Editor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-primary-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors md:col-span-4 lg:col-span-1"
                    >
                        Add Member
                    </button>
                </form>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg border border-red-100 mb-6">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Designation</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="font-bold text-gray-900">{user.username}</div>
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {editingUser === user.id ? (
                                        <select
                                            value={roleForm.role}
                                            onChange={(e) => setRoleForm({ ...roleForm, role: e.target.value })}
                                            className="bg-white border border-gray-200 rounded px-2 py-1 text-sm focus:ring-black focus:border-black font-medium"
                                        >
                                            <option value="user">User</option>
                                            <option value="editor">Editor</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    ) : (
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide
                                            ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                user.role === 'editor' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'}`}>
                                            {user.role}
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {editingUser === user.id ? (
                                        <input
                                            type="text"
                                            value={roleForm.designation}
                                            onChange={(e) => setRoleForm({ ...roleForm, designation: e.target.value })}
                                            placeholder="e.g. Senior Editor"
                                            className="bg-white border border-gray-200 rounded px-2 py-1 text-sm w-full focus:ring-black focus:border-black"
                                        />
                                    ) : (
                                        <span className="text-sm text-gray-600 italic">{user.designation || 'No designation'}</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {editingUser === user.id ? (
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleRoleUpdate(user.id)}
                                                className="text-green-600 hover:text-green-800 p-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                                                title="Save"
                                            >
                                                <HiCheck className="text-lg" />
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="text-gray-400 hover:text-gray-600 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                                title="Cancel"
                                            >
                                                <HiX className="text-lg" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-end gap-4">
                                            <button
                                                onClick={() => startEdit(user)}
                                                className="text-primary-black hover:text-gray-600 text-sm font-bold underline decoration-2 decoration-gray-200 hover:decoration-primary-black transition-all"
                                            >
                                                Edit Role
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(user.id)}
                                                className="text-gray-400 hover:text-red-600 transition-colors p-1"
                                                title="Remove User"
                                            >
                                                <HiTrash className="text-lg" />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && !loading && (
                            <tr>
                                <td colSpan="4" className="text-center py-12 text-gray-400">
                                    <HiUserGroup className="text-4xl mx-auto mb-3 opacity-30" />
                                    No other users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Remove Team Member"
                message="Are you sure you want to remove this user? This action cannot be undone and they will lose access immediately."
                confirmText="Remove User"
                isDanger={true}
            />
        </div>
    );
};

export default ManageUsers;
