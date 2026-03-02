import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { RequestHandler } from 'express';

/**
 * General-purpose proxy middleware.
 *
 * IMPORTANT: Uses the `router` callback (called per-request) instead of a
 * static `target` string so that process.env.PERSONAL_BACKEND_URL is read
 * at request-time — AFTER dotenv.config() has run in app.ts.
 * A static target would capture the value at module-import time (before dotenv
 * has loaded) and always fall back to the default.
 */
export const proxyMiddleware: RequestHandler = createProxyMiddleware({
  changeOrigin: true,
  router: (_req) => process.env.PERSONAL_BACKEND_URL || 'http://localhost:5001',
  on: {
    proxyReq: (proxyReq, req: any) => {
      // If express.json() has already parsed the body, fixRequestBody will re-stream it
      if (req.body) {
        fixRequestBody(proxyReq, req);
      }
    },
    error: (err, _req, res: any) => {
      console.error(`[PROXY_ERROR] ${(err as Error).message}`);
      res.status(502).json({ message: 'Bad gateway: could not reach backend service.' });
    },
  },
}) as unknown as RequestHandler;

/**
 * File-upload proxy middleware.
 * Skips fixRequestBody so the raw multipart/form-data stream is forwarded
 * untouched to the personal backend.
 */
export const fileProxyMiddleware: RequestHandler = createProxyMiddleware({
  changeOrigin: true,
  router: (_req) => process.env.PERSONAL_BACKEND_URL || 'http://localhost:5001',
  on: {
    error: (err, _req, res: any) => {
      console.error(`[FILE_PROXY_ERROR] ${(err as Error).message}`);
      res.status(502).json({ message: 'Bad gateway: could not reach backend service.' });
    },
  },
}) as unknown as RequestHandler;
