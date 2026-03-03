import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// KYC verification// All kyc routes require authentication
router.get('/kyc-list/:limit/:offset', requireAuth, (req, res) => res.status(200).json({ rows: [], count: 0 }));

export default router;
