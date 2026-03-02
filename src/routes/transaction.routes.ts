import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { proxyMiddleware } from '../lib/personalApi';

const router = Router();

// Transaction history routes — all protected
router.get('/history', requireAuth, proxyMiddleware);
router.get('/history/csv', requireAuth, proxyMiddleware);
router.get('/admin/user-statistics', requireAuth, proxyMiddleware);
router.get('/admin/user-statistics/csv', requireAuth, proxyMiddleware);

export default router;
