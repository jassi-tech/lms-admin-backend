"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.set('trust proxy', true);
// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        const allowedOrigins = process.env.ALLOWED_ORIGINS
            ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
            : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'];
        const isVercelProject = origin.includes('solocontrol') && origin.endsWith('.vercel.app');
        if (allowedOrigins.includes(origin) ||
            isVercelProject ||
            origin.startsWith('http://localhost:')) {
            callback(null, true);
        }
        else {
            console.log('[CORS] Blocked:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
// ─── BODY PARSERS ─────────────────────────────────────────────────────────────
// NOTE: file.routes uses fileProxyMiddleware which bypasses express.json; the
// parser below applies only to routes registered after this line.
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// ─── LOGGER ───────────────────────────────────────────────────────────────────
app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
// ─── HEALTH CHECK ─────────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
    res.json({
        message: 'LMS Admin API is running locally',
    });
});
// ─── ROUTES ───────────────────────────────────────────────────────────────────
app.use('/api/v1', routes_1.default);
// ─── GLOBAL ERROR HANDLER ─────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
    console.error('[SERVER_ERROR]', err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'production' ? 'Refer to logs' : err.stack,
    });
});
exports.default = app;
