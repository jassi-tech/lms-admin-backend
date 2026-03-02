import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { fileProxyMiddleware } from '../lib/personalApi';

const router = Router();

/**
 * File upload route.
 * Uses fileProxyMiddleware (no fixRequestBody) so that the raw multipart/form-data
 * stream is forwarded directly to the personal backend without body-parser interference.
 */
router.post('/upload', requireAuth, fileProxyMiddleware);

export default router;
