"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Admin dashboard & revenue routes — all protected
router.get('/dashboard/stats', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({
    data: {
        students: 0,
        instructors: 0,
        reviewers: 0,
        active_courses: 0,
        total_revenue: 0,
        total_payout: 0
    }
}));
router.get('/revenue-models', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ data: [] }));
router.get('/active-users/count', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ count: 0 }));
router.get('/course/list_csv', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ message: 'CSV generated' }));
router.get('/course_allocations/list_csv', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ message: 'CSV generated' }));
router.get('/download/assignment', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ message: 'Download started' }));
router.patch('/submit/drafts', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ message: 'Drafts submitted' }));
exports.default = router;
