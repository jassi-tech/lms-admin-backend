"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtpCode = exports.generateOtp = void 0;
const otpStore = new Map();
const generateOtp = (email, length = 6, expiryMinutes = 10) => {
    // Dummy OTP for testing
    const otp = "123456";
    const expiresAt = Date.now() + expiryMinutes * 60 * 1000;
    otpStore.set(email, { otp, expiresAt });
    return otp;
};
exports.generateOtp = generateOtp;
const verifyOtpCode = (email, code) => {
    const entry = otpStore.get(email);
    if (!entry)
        return false;
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
exports.verifyOtpCode = verifyOtpCode;
