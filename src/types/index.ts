import { Request } from 'express';

/**
 * Authenticated user payload attached after JWT verification.
 */
export interface AuthUser {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * Standardised API error shape returned by the personal backend.
 */
export interface ApiError {
  message: string | string[];
  statusCode?: number;
  error?: string;
}

/**
 * Augment Express Request to carry the decoded JWT user.
 */
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
