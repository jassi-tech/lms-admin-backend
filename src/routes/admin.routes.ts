import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { proxyMiddleware } from '../lib/personalApi';

const router = Router();

// Admin dashboard & revenue routes — all protected
router.get('/dashboard/stats', requireAuth, proxyMiddleware);
router.get('/revenue-models', requireAuth, proxyMiddleware);
router.get('/active-users/count', requireAuth, proxyMiddleware);
router.get('/course/list_csv', requireAuth, proxyMiddleware);
router.get('/course_allocations/list_csv', requireAuth, proxyMiddleware);
router.get('/download/assignment', requireAuth, proxyMiddleware);
router.patch('/submit/drafts', requireAuth, proxyMiddleware);

export default router;
