"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const personalApi_1 = require("../lib/personalApi");
const router = (0, express_1.Router)();
// All course routes require authentication
router.get('/api/v1/courses/admin/:limit/:offset', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.get('/api/v1/courses/:id', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.patch('/api/v1/courses/update/details', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.post('/api/v1/courses/assign-reviewer', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.get('/api/v1/courses/revenue-sharing/:name', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.patch('/api/v1/courses/revenue-sharing/:name', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.get('/api/v1/courses/total/stats', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.get('/api/v1/courses/instructor/daily_stats', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.get('/api/v1/courses/top_rated/courses', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
exports.default = router;
