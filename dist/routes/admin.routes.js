"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const personalApi_1 = require("../lib/personalApi");
const router = (0, express_1.Router)();
// Admin dashboard & revenue routes — all protected
router.get('/api/v1/admin/dashboard/stats', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.get('/api/v1/admin/revenue-models', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.get('/api/v1/admin/active-users/count', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.get('/api/v1/admin/course/list_csv', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.get('/api/v1/admin/course_allocations/list_csv', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.get('/api/v1/admin/download/assignment', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.patch('/api/v1/admin/submit/drafts', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
exports.default = router;
