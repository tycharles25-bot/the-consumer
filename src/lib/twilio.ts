import { env } from './env';

export async function requestOtp(phone: string) {
  // Mock OTP for development - in production, integrate with Twilio Verify API
  if (!env.twilio.sid || !env.twilio.token) {
    console.warn('Twilio not configured, returning mock OTP');
    return { success: true, sid: 'mock_' + Date.now() };
  }
  
  // TODO: Implement real Twilio Verify API integration
  return { success: true, sid: 'mock_' + Date.now() };
}

export async function verifyOtp(phone: string, code: string) {
  // Mock verification - in production, verify with Twilio
  if (!env.twilio.sid || !env.twilio.token) {
    console.warn('Twilio not configured, auto-approving OTP');
    return { success: true };
  }
  
  // TODO: Implement real Twilio Verify API verification
  // For now, accept any 6-digit code as valid in development
  return { success: code.length === 6 };
}

