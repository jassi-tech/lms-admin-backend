"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const personalApi_1 = require("../lib/personalApi");
const router = (0, express_1.Router)();
// Referral & wallet routes — all protected
router.get('/api/v1/identity/referral/admin/active-referrers', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
router.post('/api/v1/identity/add_wallet', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
exports.default = router;
