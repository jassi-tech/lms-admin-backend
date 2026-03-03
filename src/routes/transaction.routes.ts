import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// All transaction routes require authentication
router.get('/history', requireAuth, (req, res) => res.status(200).json({ rows: [], count: 0 }));
router.get('/admin/user-statistics', requireAuth, (req, res) => res.status(200).json({ data: [] }));
router.get('/admin/user-statistics/csv', requireAuth, (req, res) => res.status(200).json({ message: 'CSV generated' }));
router.get('/history/csv', requireAuth, (req, res) => res.status(200).json({ message: 'CSV generated' }));

export default router;
