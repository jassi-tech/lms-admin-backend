interface OtpEntry {
  otp: string;
  expiresAt: number;
}

const otpStore: Map<string, OtpEntry> = new Map();

export const generateOtp = (email: string, length: number = 6, expiryMinutes: number = 10): string => {
  // Dummy OTP for testing
  const otp = "123456";
  const expiresAt = Date.now() + expiryMinutes * 60 * 1000;
  
  otpStore.set(email, { otp, expiresAt });
  
  return otp;
};

export const verifyOtpCode = (email: string, code: string): boolean => {
  const entry = otpStore.get(email);
  
  if (!entry) return false;
  
  if (Date.now() > entry.expiresAt) {
    otpStore.delete(email);
    return false;
  }
  
  if (entry.otp === code) {
    otpStore.delete(email);
    return true;
  }
  
  return false;
};
