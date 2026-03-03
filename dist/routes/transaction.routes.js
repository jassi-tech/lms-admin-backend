"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// All transaction routes require authentication
router.get('/history', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ rows: [], count: 0 }));
router.get('/admin/user-statistics', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ data: [] }));
router.get('/admin/user-statistics/csv', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ message: 'CSV generated' }));
router.get('/history/csv', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ message: 'CSV generated' }));
exports.default = router;
