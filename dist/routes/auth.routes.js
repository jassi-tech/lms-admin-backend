"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const personalApi_1 = require("../lib/personalApi");
const router = (0, express_1.Router)();
// ─── PUBLIC AUTH ROUTES ───────────────────────────────────────────────────────
// These do NOT require an existing session.
router.post('/api/v1/identity/admin/login', personalApi_1.proxyMiddleware);
router.post('/api/v1/identity/auth/refresh_token', personalApi_1.proxyMiddleware);
router.post('/api/v1/identity/auth/verify_otp', personalApi_1.proxyMiddleware);
router.post('/api/v1/identity/auth/forgot_password', personalApi_1.proxyMiddleware);
router.patch('/api/v1/identity/auth/update_password', personalApi_1.proxyMiddleware);
router.post('/api/v1/identity/auth/resend_otp', personalApi_1.proxyMiddleware);
// ─── PROTECTED AUTH ROUTES ────────────────────────────────────────────────────
// These require a valid JWT cookie.
router.post('/api/v1/identity/admin/logout', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.patch('/api/v1/identity/auth/change_password', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.patch('/api/v1/identity/auth/toggle_2fa', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.delete('/api/v1/identity/auth/skip_mfa', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.post('/api/v1/identity/auth/forget_2fa_Key', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
// ─── PROTECTED PROFILE & COUNTRY ROUTES ──────────────────────────────────────
router.get('/api/v1/identity/profile/user_profile', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.get('/api/v1/identity/country/all', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
exports.default = router;
