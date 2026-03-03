import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// All course routes require authentication
router.get('/admin/:limit/:offset', requireAuth, (req, res) => res.status(200).json({ rows: [], count: 0 }));
router.get('/:id', requireAuth, (req, res) => res.status(200).json({ data: {} }));
router.patch('/update/details', requireAuth, (req, res) => res.status(200).json({ message: 'Course updated' }));
router.post('/assign-reviewer', requireAuth, (req, res) => res.status(200).json({ message: 'Reviewer assigned' }));
router.get('/revenue-sharing/:name', requireAuth, (req, res) => res.status(200).json({ data: {} }));
router.patch('/revenue-sharing/:name', requireAuth, (req, res) => res.status(200).json({ message: 'Revenue sharing updated' }));
router.get('/total/stats', requireAuth, (req, res) => res.status(200).json({ data: {} }));
router.get('/instructor/daily_stats', requireAuth, (req, res) => res.status(200).json({ data: [] }));
router.get('/top_rated/courses', requireAuth, (req, res) => res.status(200).json({ data: [] }));

export default router;
