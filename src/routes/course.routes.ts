import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { proxyMiddleware } from '../lib/personalApi';

const router = Router();

// All course routes require authentication
router.get('/admin/:limit/:offset', requireAuth, proxyMiddleware);
router.get('/:id', requireAuth, proxyMiddleware);
router.patch('/update/details', requireAuth, proxyMiddleware);
router.post('/assign-reviewer', requireAuth, proxyMiddleware);
router.get('/revenue-sharing/:name', requireAuth, proxyMiddleware);
router.patch('/revenue-sharing/:name', requireAuth, proxyMiddleware);
router.get('/total/stats', requireAuth, proxyMiddleware);
router.get('/instructor/daily_stats', requireAuth, proxyMiddleware);
router.get('/top_rated/courses', requireAuth, proxyMiddleware);

export default router;
