"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const personalApi_1 = require("../lib/personalApi");
const router = (0, express_1.Router)();
// Transaction history routes — all protected
router.get('/api/v1/transactions/history', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.get('/api/v1/transactions/history/csv', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.get('/api/v1/transactions/admin/user-statistics', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.get('/api/v1/transactions/admin/user-statistics/csv', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
exports.default = router;
