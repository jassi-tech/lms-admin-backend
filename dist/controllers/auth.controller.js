"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendOtp = exports.getProfile = exports.logout = exports.verifyOtp = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_data_json_1 = __importDefault(require("../data/auth.data.json"));
const emailService_1 = require("../lib/emailService");
const otpManager_1 = require("../lib/otpManager");
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';
const NODE_ENV = process.env.NODE_ENV || 'development';
const login = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    const admin = auth_data_json_1.default.allowedAdmins.find((a) => a.email === email);
    if (!admin) {
        // For security, we might want to return a generic message or actually block access
        return res.status(403).json({ message: 'Access denied' });
    }
    try {
        const otp = (0, otpManager_1.generateOtp)(email, auth_data_json_1.default.config.otpLength, auth_data_json_1.default.config.otpExpiryMinutes);
        // In development, log the OTP for easy testing
        if (NODE_ENV === 'development') {
            console.log(`[DEV] OTP for ${email}: ${otp}`);
        }
        await (0, emailService_1.sendOtpEmail)(email, otp, admin.name);
        res.status(200).json({
            message: 'OTP sent successfully',
            requiresOtp: true
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Failed to send OTP' });
    }
};
exports.login = login;
const verifyOtp = async (req, res) => {
    const { email, otp, mfaOtp } = req.body;
    const code = otp || mfaOtp;
    if (!email || !code) {
        return res.status(400).json({ message: 'Email and OTP/MFA code are required' });
    }
    const isValid = (0, otpManager_1.verifyOtpCode)(email, code);
    if (!isValid) {
        return res.status(401).json({ message: 'Invalid or expired OTP' });
    }
    const admin = auth_data_json_1.default.allowedAdmins.find((a) => a.email === email);
    // Create JWT token
    const token = jsonwebtoken_1.default.sign({ id: email, email, role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
    res.cookie('token', token, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    res.status(200).json({
        message: 'Login successful',
        user: { email, role: 'admin', name: admin?.name },
        data: { userId: email } // Frontend expects res.data.data.userId
    });
};
exports.verifyOtp = verifyOtp;
const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};
exports.logout = logout;
const getProfile = async (req, res) => {
    const email = req.user?.email;
    const admin = auth_data_json_1.default.allowedAdmins.find((a) => a.email === email);
    if (!admin) {
        return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json({
        data: {
            email: admin.email,
            name: admin.name,
            role: 'admin'
        }
    });
};
exports.getProfile = getProfile;
const resendOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    const admin = auth_data_json_1.default.allowedAdmins.find((a) => a.email === email);
    if (!admin) {
        return res.status(403).json({ message: 'Access denied' });
    }
    try {
        const otp = (0, otpManager_1.generateOtp)(email, auth_data_json_1.default.config.otpLength, auth_data_json_1.default.config.otpExpiryMinutes);
        if (NODE_ENV === 'development') {
            console.log(`[DEV] Resent OTP for ${email}: ${otp}`);
        }
        await (0, emailService_1.sendOtpEmail)(email, otp, admin.name);
        res.status(200).json({ message: 'OTP resent successfully' });
    }
    catch (error) {
        console.error('Resend OTP error:', error);
        res.status(500).json({ message: 'Failed to resend OTP' });
    }
};
exports.resendOtp = resendOtp;
