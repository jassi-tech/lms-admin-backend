import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// Admin dashboard & revenue routes — all protected
router.get('/dashboard/stats', requireAuth, (req, res) => res.status(200).json({
  data: {
    students: 0,
    instructors: 0,
    reviewers: 0,
    active_courses: 0,
    total_revenue: 0,
    total_payout: 0
  }
}));
router.get('/revenue-models', requireAuth, (req, res) => res.status(200).json({ data: [] }));
router.get('/active-users/count', requireAuth, (req, res) => res.status(200).json({ count: 0 }));
router.get('/course/list_csv', requireAuth, (req, res) => res.status(200).json({ message: 'CSV generated' }));
router.get('/course_allocations/list_csv', requireAuth, (req, res) => res.status(200).json({ message: 'CSV generated' }));
router.get('/download/assignment', requireAuth, (req, res) => res.status(200).json({ message: 'Download started' }));
router.patch('/submit/drafts', requireAuth, (req, res) => res.status(200).json({ message: 'Drafts submitted' }));

export default router;
