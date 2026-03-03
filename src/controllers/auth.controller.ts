import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authData from '../data/auth.data.json';
import { sendOtpEmail } from '../lib/emailService';
import { generateOtp, verifyOtpCode } from '../lib/otpManager';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';
const NODE_ENV = process.env.NODE_ENV || 'development';

export const login = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const admin = (authData.allowedAdmins as any[]).find((a: any) => a.email === email);

  if (!admin) {
    // For security, we might want to return a generic message or actually block access
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const otp = generateOtp(email, authData.config.otpLength, authData.config.otpExpiryMinutes);
    
    // In development, log the OTP for easy testing
    if (NODE_ENV === 'development') {
      console.log(`[DEV] OTP for ${email}: ${otp}`);
    }

    await sendOtpEmail(email, otp, admin.name);
    
    res.status(200).json({ 
      message: 'OTP sent successfully',
      requiresOtp: true,
      data: { email }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp, mfaOtp } = req.body;
  const code = otp || mfaOtp;

  if (!email || !code) {
    return res.status(400).json({ message: 'Email and OTP/MFA code are required' });
  }

  const isValid = verifyOtpCode(email, code);

  if (!isValid) {
    return res.status(401).json({ message: 'Invalid or expired OTP' });
  }

  const admin = (authData.allowedAdmins as any[]).find((a: any) => a.email === email);
  
  // Create JWT token
  const token = jwt.sign(
    { id: email, email, role: 'admin' },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  // NOTE: httpOnly is false so that js-cookie in SimpleGuard can read admin_token
  res.cookie('admin_token', token, {
    httpOnly: false,
    secure: NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });

  res.status(200).json({
    message: 'Login successful',
    user: { email, role: 'admin', name: admin?.name },
    data: { userId: email } // Frontend expects res.data.data.userId
  });
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('admin_token');
  res.status(200).json({ message: 'Logged out successfully' });
};

export const skipMfa = async (req: Request, res: Response) => {
  // MFA skip - session already established via admin_token cookie from verifyOtp
  // Just confirm success so the frontend can navigate to dashboard
  res.status(200).json({ message: 'MFA skipped', status: 'success' });
};

export const getProfile = async (req: Request, res: Response) => {
  const email = (req as any).user?.email;
  const admin = (authData.allowedAdmins as any[]).find((a: any) => a.email === email);
  
  if (!admin) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  res.status(200).json({
    data: {
      email: admin.email,
      name: admin.name,
      role: 'admin'
    }
  });
};

export const resendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const admin = (authData.allowedAdmins as any[]).find((a: any) => a.email === email);

  if (!admin) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const otp = generateOtp(email, authData.config.otpLength, authData.config.otpExpiryMinutes);
    
    if (NODE_ENV === 'development') {
      console.log(`[DEV] Resent OTP for ${email}: ${otp}`);
    }

    await sendOtpEmail(email, otp, admin.name);
    
    res.status(200).json({ message: 'OTP resent successfully' });
  } catch (error: any) {
    console.error('Resend OTP error:', error);
    res.status(500).json({ message: 'Failed to resend OTP' });
  }
};
