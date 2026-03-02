import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { proxyMiddleware } from '../lib/personalApi';

const router = Router();

// Referral & wallet routes — all protected
router.get('/referral/admin/active-referrers', requireAuth, proxyMiddleware);
router.post('/add_wallet', requireAuth, proxyMiddleware);

export default router;
