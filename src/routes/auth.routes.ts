import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { proxyMiddleware } from '../lib/personalApi';

// -----------------------------------------------------------------------------
// Authentication routes are largely a thin proxy to the personal backend.
//
// * The front‑end (lms‑admin‑panel) handles the multi‑step sign‑in flow:
//   1. POST /api/v1/identity/admin/login    – accepts only { id, password }
//   2. If 2FA/OTP is enabled, the panel will subsequently call
//      /api/v1/identity/auth/verify_otp or /verify-2fa as appropriate.
//   3. Additional steps (forgot/reset password, enable/disable MFA, etc.)
//      are also driven from the panel and simply forwarded here.
//
// All actual business logic lives in the personal backend; this project
// just proxies requests so that the panel can talk to a single delegated
// service URL (PERSONAL_BACKEND_URL).
// -----------------------------------------------------------------------------

const router = Router();

// ─── PUBLIC AUTH ROUTES ───────────────────────────────────────────────────────
// These do NOT require an existing session.
router.post('/login', proxyMiddleware);
router.post('/refresh_token', proxyMiddleware);
router.post('/verify_otp', proxyMiddleware);
router.post('/forgot_password', proxyMiddleware);
router.patch('/update_password', proxyMiddleware);
router.post('/resend_otp', proxyMiddleware);

// ─── PROTECTED AUTH ROUTES ────────────────────────────────────────────────────
// These require a valid JWT cookie.
router.post('/logout', requireAuth, proxyMiddleware);
router.patch('/change_password', requireAuth, proxyMiddleware);
router.patch('/toggle_2fa', requireAuth, proxyMiddleware);
router.delete('/skip_mfa', requireAuth, proxyMiddleware);
router.post('/forget_2fa_Key', requireAuth, proxyMiddleware);

// ─── PROTECTED PROFILE & COUNTRY ROUTES ──────────────────────────────────────
router.get('/user_profile', requireAuth, proxyMiddleware);
router.get('/all', requireAuth, proxyMiddleware);

export default router;
