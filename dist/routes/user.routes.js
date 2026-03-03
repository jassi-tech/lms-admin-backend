"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// All user management routes require authentication
router.get('/admin/profile/list', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ rows: [], count: 0 }));
router.get('/admin/profile/list1', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ rows: [], count: 0 }));
router.get('/admin/profile/user_profile/:userId', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ data: {} }));
router.patch('/admin/user_status', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ message: 'Status updated' }));
router.patch('/admin/profile/profile_status', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ message: 'Profile status updated' }));
router.post('/admin/user_onboarded', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ message: 'User onboarded' }));
router.get('/admin/profile/review_list', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ rows: [], count: 0 }));
// Permission routes
router.get('/permissions', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ data: [] }));
router.post('/permissions/user/:userId/permissions', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ message: 'Permissions updated' }));
router.get('/permissions/user/:userId/latest_permissions', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ data: [] }));
exports.default = router;
