"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpEmail = void 0;
const axios_1 = __importDefault(require("axios"));
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_OTP_TEMPLATE_ID = process.env.EMAILJS_OTP_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;
const sendOtpEmail = async (email, otp, userName) => {
    // Bypass for dummy OTP or missing config
    if (otp === '123456' || !EMAILJS_SERVICE_ID || !EMAILJS_OTP_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_PRIVATE_KEY) {
        console.log(`[DUMMY MODE] OTP for ${email} (${userName}): ${otp}`);
        return { status: 'dummy_success' };
    }
    const data = {
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_OTP_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
            to_email: email,
            to_name: userName,
            otp_code: otp,
        },
        accessToken: EMAILJS_PRIVATE_KEY,
    };
    try {
        const response = await axios_1.default.post('https://api.emailjs.com/api/v1.0/email/send', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status !== 200) {
            throw new Error(`EmailJS responded with status ${response.status}: ${response.data}`);
        }
        return response.data;
    }
    catch (error) {
        console.error('Error sending email through EmailJS:', error.response?.data || error.message);
        throw new Error('Failed to send OTP email');
    }
};
exports.sendOtpEmail = sendOtpEmail;
