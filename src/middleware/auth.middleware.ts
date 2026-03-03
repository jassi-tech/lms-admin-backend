import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthUser } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

/**
 * Reads the 'token' cookie, verifies the JWT, and attaches the payload to req.user.
 * Returns 401 if the token is missing or invalid.
 */
export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.cookies?.admin_token;

    if (!token) {
      res.status(401).json({ message: 'Unauthorized request' });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    req.user = decoded;
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Session expired. Please log in again.' });
    } else {
      res.status(401).json({ message: 'Unauthorized request' });
    }
  }
};

/**
 * Attaches user to req.user if a valid token is present, but never blocks the request.
 */
export const optionalAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.cookies?.admin_token;
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
      req.user = decoded;
    }
  } catch {
    // silently ignore invalid tokens in optional auth
  }
  next();
};
