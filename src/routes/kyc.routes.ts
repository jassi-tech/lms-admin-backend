import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { proxyMiddleware } from '../lib/personalApi';

const router = Router();

// KYC verification routes — all protected
router.get('/kyc/kyc-list/:limit/:offset', requireAuth, proxyMiddleware);

export default router;
