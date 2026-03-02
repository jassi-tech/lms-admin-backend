import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import routes from './routes';

dotenv.config();

const app = express();

app.set('trust proxy', true);

// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const allowedOrigins = process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
        : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'];
      const isVercelProject = origin.includes('solocontrol') && origin.endsWith('.vercel.app');

      if (
        allowedOrigins.includes(origin) ||
        isVercelProject ||
        origin.startsWith('http://localhost:')
      ) {
        callback(null, true);
      } else {
        console.log('[CORS] Blocked:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

// ─── BODY PARSERS ─────────────────────────────────────────────────────────────
// NOTE: file.routes uses fileProxyMiddleware which bypasses express.json; the
// parser below applies only to routes registered after this line.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── LOGGER ───────────────────────────────────────────────────────────────────
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ─── HEALTH CHECK ─────────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({
    message: 'LMS Admin API (Delegated) is running',
    target: process.env.PERSONAL_BACKEND_URL,
  });
});

// ─── ROUTES ───────────────────────────────────────────────────────────────────
app.use('/api/v1', routes);

// ─── GLOBAL ERROR HANDLER ─────────────────────────────────────────────────────
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[SERVER_ERROR]', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? 'Refer to logs' : err.stack,
  });
});

export default app;
