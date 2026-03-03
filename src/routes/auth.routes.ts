import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import * as authController from '../controllers/auth.controller';

const router = Router();

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
router.post('/logout', requireAuth, authController.logout);
router.patch('/change_password', requireAuth, (req, res) => res.status(200).json({ message: 'Password changed' }));
router.patch('/toggle_2fa', requireAuth, (req, res) => res.status(200).json({ 
  message: '2FA toggled',
  qrImgUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/LMSAdmin:admin%40example.com?secret=DUMMYSECRET',
  secret: 'DUMMYSECRET'
}));
router.delete('/skip_mfa', requireAuth, authController.skipMfa);
router.post('/forget_2fa_Key', requireAuth, (req, res) => res.status(200).json({ message: '2FA key forgotten' }));

// Simplified profile routes
router.get('/user_profile', requireAuth, authController.getProfile);
router.get('/all', requireAuth, (req, res) => res.status(200).json({ rows: [], count: 0 }));

export default router;
