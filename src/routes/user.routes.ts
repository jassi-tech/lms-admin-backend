import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// All user management routes require authentication
router.get('/admin/profile/list', requireAuth, (req, res) => res.status(200).json({ rows: [], count: 0 }));
router.get('/admin/profile/list1', requireAuth, (req, res) => res.status(200).json({ rows: [], count: 0 }));
router.get('/admin/profile/user_profile/:userId', requireAuth, (req, res) => res.status(200).json({ data: {} }));
router.patch('/admin/user_status', requireAuth, (req, res) => res.status(200).json({ message: 'Status updated' }));
router.patch('/admin/profile/profile_status', requireAuth, (req, res) => res.status(200).json({ message: 'Profile status updated' }));
router.post('/admin/user_onboarded', requireAuth, (req, res) => res.status(200).json({ message: 'User onboarded' }));
router.get('/admin/profile/review_list', requireAuth, (req, res) => res.status(200).json({ rows: [], count: 0 }));

// Permission routes
router.get('/permissions', requireAuth, (req, res) => res.status(200).json({ data: [] }));
router.post('/permissions/user/:userId/permissions', requireAuth, (req, res) => res.status(200).json({ message: 'Permissions updated' }));
router.get('/permissions/user/:userId/latest_permissions', requireAuth, (req, res) => res.status(200).json({ data: [] }));

export default router;
