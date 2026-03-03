"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// KYC verification// All kyc routes require authentication
router.get('/kyc-list/:limit/:offset', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ rows: [], count: 0 }));
exports.default = router;
