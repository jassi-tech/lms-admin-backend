import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import courseRoutes from './course.routes';
import kycRoutes from './kyc.routes';
import adminRoutes from './admin.routes';
import transactionRoutes from './transaction.routes';
import fileRoutes from './file.routes';
import referralRoutes from './referral.routes';

const router = Router();

// Identity & Auth grouping (Supports LMS Panel expectations)
router.use('/identity/auth', authRoutes);
router.use('/identity/admin', authRoutes); 
router.use('/identity/profile', authRoutes);
router.use('/identity/users', userRoutes);
router.use('/identity/kyc', kycRoutes);
router.use('/identity/referral', referralRoutes);
router.use('/identity/country', authRoutes); // For /country/all

// Feature-based grouping
router.use('/admin', adminRoutes);
router.use('/courses', courseRoutes);
router.use('/transactions', transactionRoutes);
router.use('/file', fileRoutes);

export default router;
