"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get('/admin/active-referrers', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ rows: [], count: 0 }));
router.post('/add_wallet', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ message: 'Wallet added' }));
exports.default = router;
