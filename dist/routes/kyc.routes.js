"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const personalApi_1 = require("../lib/personalApi");
const router = (0, express_1.Router)();
// KYC verification routes — all protected
router.get('/api/v1/identity/kyc/kyc-list/:limit/:offset', auth_middleware_1.requireAuth, personalApi_1.proxyMiddleware);
exports.default = router;
