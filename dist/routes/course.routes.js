"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// All course routes require authentication
router.get('/admin/:limit/:offset', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ rows: [], count: 0 }));
router.get('/:id', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ data: {} }));
router.patch('/update/details', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ message: 'Course updated' }));
router.post('/assign-reviewer', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ message: 'Reviewer assigned' }));
router.get('/revenue-sharing/:name', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ data: {} }));
router.patch('/revenue-sharing/:name', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ message: 'Revenue sharing updated' }));
router.get('/total/stats', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ data: {} }));
router.get('/instructor/daily_stats', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ data: [] }));
router.get('/top_rated/courses', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ data: [] }));
exports.default = router;
