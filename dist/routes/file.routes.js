"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// File routes require authentication
router.post('/upload', auth_middleware_1.requireAuth, (req, res) => res.status(200).json({ data: { url: 'dummy_url' } }));
exports.default = router;
