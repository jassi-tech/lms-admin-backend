import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { proxyMiddleware } from '../lib/personalApi';

const router = Router();

// All user management routes require authentication
router.get('/admin/profile/list', requireAuth, proxyMiddleware);
router.get('/admin/profile/list1', requireAuth, proxyMiddleware);
router.get('/admin/profile/user_profile/:userId', requireAuth, proxyMiddleware);
router.patch('/admin/user_status', requireAuth, proxyMiddleware);
router.patch('/admin/profile/profile_status', requireAuth, proxyMiddleware);
router.post('/admin/user_onboarded', requireAuth, proxyMiddleware);
router.get('/admin/profile/review_list', requireAuth, proxyMiddleware);

// Permission routes
router.get('/permissions', requireAuth, proxyMiddleware);
router.post('/permissions/user/:userId/permissions', requireAuth, proxyMiddleware);
router.get('/permissions/user/:userId/latest_permissions', requireAuth, proxyMiddleware);

export default router;
