"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const personalApi_1 = require("../lib/personalApi");
const router = (0, express_1.Router)();
/**
 * File upload route.
 * Uses fileProxyMiddleware (no fixRequestBody) so that the raw multipart/form-data
 * stream is forwarded directly to the personal backend without body-parser interference.
 */
router.post('/api/v1/file/upload', auth_middleware_1.requireAuth, personalApi_1.fileProxyMiddleware);
exports.default = router;
