import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from '../db.js';
import { z } from 'zod';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import crypto from 'crypto';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password, twoFactorCode } = req.body;

    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(1),
        twoFactorCode: z.string().optional()
    });

    try {
        schema.parse({ email, password, twoFactorCode });
    } catch (e) {
        return res.status(400).json({ message: 'Invalid input', errors: e.errors });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Check if 2FA is enabled
            if (user.twoFactorEnabled) {
                if (!twoFactorCode) {
                    return res.status(200).json({ twoFactorRequired: true, userId: user.id });
                }

                const verified = speakeasy.totp.verify({
                    secret: user.twoFactorSecret,
                    encoding: 'base32',
                    token: twoFactorCode
                });

                if (!verified) {
                    return res.status(401).json({ message: 'Invalid 2FA code' });
                }
            }

            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Register a new user (For initial setup)
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    const schema = z.object({
        username: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
        role: z.string().optional()
    });

    try {
        schema.parse({ username, email, password, role });
    } catch (e) {
        return res.status(400).json({ message: 'Invalid input', errors: e.errors });
    }

    try {
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
                role: role || 'user'
            }
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user.id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    if (req.user) {
        res.json({
            _id: req.user.id,
            username: req.user.username,
            email: req.user.email,
            role: req.user.role,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Setup 2FA
// @route   POST /api/auth/setup-2fa
// @access  Private
const setup2FA = async (req, res) => {
    try {
        const secret = speakeasy.generateSecret({ name: `DarkRoom (${req.user.email})` });
        const dataURL = await QRCode.toDataURL(secret.otpauth_url);

        await prisma.user.update({
            where: { id: req.user.id },
            data: { twoFactorSecret: secret.base32 }
        });

        res.json({ qrCode: dataURL, secret: secret.base32 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Verify and enable 2FA
// @route   POST /api/auth/verify-2fa
// @access  Private
const verify2FA = async (req, res) => {
    const { token } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { id: req.user.id } });
        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token
        });

        if (verified) {
            await prisma.user.update({
                where: { id: req.user.id },
                data: { twoFactorEnabled: true }
            });
            res.json({ message: '2FA enabled successfully' });
        } else {
            res.status(400).json({ message: 'Invalid verification token' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Forgot Password
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetPasswordToken: resetToken,
                resetPasswordExpires
            }
        });

        // In production, send email. For now, log it.
        console.log(`Password reset token for ${email}: ${resetToken}`);
        console.log(`Reset link: http://localhost:3000/reset-password/${resetToken}`);

        res.json({ message: 'Password reset link sent to email (check console in development)' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password/:token
// @access  Public
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const user = await prisma.user.findFirst({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { gt: new Date() }
            }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null
            }
        });

        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { loginUser, getMe, registerUser, setup2FA, verify2FA, forgotPassword, resetPassword };
