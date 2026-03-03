import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// File routes require authentication
router.post('/upload', requireAuth, (req, res) => res.status(200).json({ data: { url: 'dummy_url' } }));

export default router;
