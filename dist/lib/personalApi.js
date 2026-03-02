"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileProxyMiddleware = exports.proxyMiddleware = void 0;
const http_proxy_middleware_1 = require("http-proxy-middleware");
/**
 * General-purpose proxy middleware.
 *
 * IMPORTANT: Uses the `router` callback (called per-request) instead of a
 * static `target` string so that process.env.PERSONAL_BACKEND_URL is read
 * at request-time — AFTER dotenv.config() has run in app.ts.
 * A static target would capture the value at module-import time (before dotenv
 * has loaded) and always fall back to the default.
 */
exports.proxyMiddleware = (0, http_proxy_middleware_1.createProxyMiddleware)({
    changeOrigin: true,
    router: (_req) => process.env.PERSONAL_BACKEND_URL || 'http://localhost:5001',
    on: {
        proxyReq: http_proxy_middleware_1.fixRequestBody,
        error: (err, _req, res) => {
            console.error(`[PROXY_ERROR] ${err.message}`);
            res.status(502).json({ message: 'Bad gateway: could not reach backend service.' });
        },
    },
});
/**
 * File-upload proxy middleware.
 * Skips fixRequestBody so the raw multipart/form-data stream is forwarded
 * untouched to the personal backend.
 */
exports.fileProxyMiddleware = (0, http_proxy_middleware_1.createProxyMiddleware)({
    changeOrigin: true,
    router: (_req) => process.env.PERSONAL_BACKEND_URL || 'http://localhost:5001',
    on: {
        error: (err, _req, res) => {
            console.error(`[FILE_PROXY_ERROR] ${err.message}`);
            res.status(502).json({ message: 'Bad gateway: could not reach backend service.' });
        },
    },
});
