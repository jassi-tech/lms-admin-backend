"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const authController = __importStar(require("../controllers/auth.controller"));
const router = (0, express_1.Router)();
// -----------------------------------------------------------------------------
// Authentication routes:
// Combined local management for LMS-specific login/OTP and 
// proxying for other personal backend operations.
// -----------------------------------------------------------------------------
// ─── PUBLIC AUTH ROUTES ───────────────────────────────────────────────────────
// Local implementation for LMS Admin Panel login flow
router.post('/login', authController.login);
router.post('/verify_otp', authController.verifyOtp);
router.post('/resend_otp', authController.resendOtp);
// Simplified handlers for other auth operations (returning 200/404 as needed)
router.post('/refresh_token', (req, res) => res.status(200).json({ status: 'ok' }));
router.post('/forgot_password', (req, res) => res.status(200).json({ message: 'Reset link sent' }));
router.patch('/update_password', (req, res) => res.status(200).json({ message: 'Password updated' }));
// ─── PROTECTED AUTH ROUTES ────────────────────────────────────────────────────
// These require a valid JWT cookie.
router.post('/logout', auth_middleware_1.requireAuth, authController.logout);
router.patch('/change_password', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ message: 'Password changed' }));
router.patch('/toggle_2fa', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({
    message: '2FA toggled',
    qrImgUrl: 'https://www.google.com/chart?chs=200x200&chld=M|0&cht=qr&chl=otpauth://totp/LMS:admin?secret=DUMMYSECRET&issuer=LMS',
    secret: 'DUMMYSECRET'
}));
router.delete('/skip_mfa', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ status: 'success' }));
router.post('/forget_2fa_Key', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ message: '2FA key forgotten' }));
// Simplified profile routes
router.get('/user_profile', auth_middleware_1.requireAuth, authController.getProfile);
router.get('/all', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ rows: [], count: 0 }));
exports.default = router;
