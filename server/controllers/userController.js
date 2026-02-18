import prisma from '../db.js';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// @desc    Get all staff (admins and editors)
// @route   GET /api/users/staff
// @access  Private (Super Admin)
export const getStaff = async (req, res) => {
    try {
        if (req.user.role !== 'super_admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const staff = await prisma.user.findMany({
            where: {
                role: { in: ['admin', 'editor'] }
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                name: true,
                createdAt: true
            }
        });

        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a new team member
// @route   POST /api/users/add
// @access  Private (Super Admin)
export const addStaffMember = async (req, res) => {
    const { username, email, password, role } = req.body;

    const schema = z.object({
        username: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
        role: z.enum(['admin', 'editor'])
    });

    try {
        schema.parse({ username, email, password, role });
    } catch (e) {
        return res.status(400).json({ message: 'Invalid input', errors: e.errors });
    }

    try {
        if (req.user.role !== 'super_admin') {
            return res.status(403).json({ message: 'Only Super Admin can add team members' });
        }

        const userExists = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                role
            }
        });

        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a staff member
// @route   DELETE /api/users/:id
// @access  Private (Super Admin)
export const deleteStaffMember = async (req, res) => {
    try {
        if (req.user.role !== 'super_admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const { id } = req.params;
        await prisma.user.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Staff member removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                username: true,
                email: true,
                name: true,
                role: true,
                bio: true,
                profileImage: true,
                designation: true,
                createdAt: true
            }
        });

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id }
        });

        if (user) {
            user.name = req.body.name || user.name;
            user.bio = req.body.bio || user.bio;
            user.profileImage = req.body.profileImage || user.profileImage;

            // Allow email update, but check for uniqueness if changed
            if (req.body.email && req.body.email !== user.email) {
                const emailExists = await prisma.user.findUnique({ where: { email: req.body.email } });
                if (emailExists) {
                    res.status(400);
                    throw new Error('Email already in use');
                }
                user.email = req.body.email;
            }

            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedUser = await prisma.user.update({
                where: { id: req.user.id },
                data: {
                    name: user.name,
                    email: user.email,
                    bio: user.bio,
                    profileImage: user.profileImage,
                    password: user.password
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    name: true,
                    role: true,
                    bio: true,
                    profileImage: true,
                    designation: true
                }
            });

            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user role (Super Admin only)
// @route   PUT /api/users/:id/role
// @access  Private (Super Admin)
export const updateUserRole = async (req, res) => {
    try {
        if (req.user.role !== 'super_admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const { id } = req.params;
        const { role, designation } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                role,
                designation
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                designation: true
            }
        });

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
