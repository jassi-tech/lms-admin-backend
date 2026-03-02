"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const personalApi_1 = require("../lib/personalApi");
const router = (0, express_1.Router)();
// All user management routes require authentication
router.get('/api/v1/identity/admin/profile/list', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.get('/api/v1/identity/admin/profile/list1', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.get('/api/v1/identity/admin/profile/user_profile/:userId', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.patch('/api/v1/identity/admin/user_status', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.patch('/api/v1/identity/admin/profile/profile_status', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.post('/api/v1/identity/admin/user_onboarded', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.get('/api/v1/identity/admin/profile/review_list', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
// Permission routes
router.get('/api/v1/identity/permissions', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.post('/api/v1/identity/permissions/user/:userId/permissions', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.get('/api/v1/identity/permissions/user/:userId/latest_permissions', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
exports.default = router;
