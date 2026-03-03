import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.get('/admin/active-referrers', requireAuth, (req, res) => res.status(200).json({ rows: [], count: 0 }));
router.post('/add_wallet', requireAuth, (req, res) => res.status(200).json({ message: 'Wallet added' }));

export default router;
