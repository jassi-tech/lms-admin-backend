import axios from 'axios';

const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_OTP_TEMPLATE_ID = process.env.EMAILJS_OTP_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

export const sendOtpEmail = async (email: string, otp: string, userName: string) => {
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
    const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error(`EmailJS responded with status ${response.status}: ${response.data}`);
    }

    return response.data;
  } catch (error: any) {
    console.error('Error sending email through EmailJS:', error.response?.data || error.message);
    throw new Error('Failed to send OTP email');
  }
};
