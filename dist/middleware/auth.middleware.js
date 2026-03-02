"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';
/**
 * Reads the 'token' cookie, verifies the JWT, and attaches the payload to req.user.
 * Returns 401 if the token is missing or invalid.
 */
const requireAuth = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            res.status(401).json({ message: 'Unauthorized request' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        if (err.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Session expired. Please log in again.' });
        }
        else {
            res.status(401).json({ message: 'Unauthorized request' });
        }
    }
};
exports.requireAuth = requireAuth;
/**
 * Attaches user to req.user if a valid token is present, but never blocks the request.
 */
const optionalAuth = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            req.user = decoded;
        }
    }
    catch {
        // silently ignore invalid tokens in optional auth
    }
    next();
};
exports.optionalAuth = optionalAuth;
