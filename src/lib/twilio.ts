import { env } from './env';

export async function requestOtp(phone: string) {
  // Check if Twilio is configured
  if (!env.twilio.sid || !env.twilio.token || !env.twilio.verifySid) {
    console.error('Twilio not configured');
    return { success: false, error: 'Twilio not configured. Please add credentials to .env.local' };
  }
  
  try {
    // Send OTP via Twilio Verify API
    const response = await fetch(
      `https://verify.twilio.com/v2/Services/${env.twilio.verifySid}/Verifications`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${env.twilio.sid}:${env.twilio.token}`).toString('base64')}`
        },
        body: new URLSearchParams({
          To: phone,
          Channel: 'sms'
        })
      }
    );
    
    const data = await response.json();
    
    if (response.ok) {
      console.log(`✅ OTP sent to ${phone}`);
      return { success: true, sid: data.sid };
    } else {
      // Handle specific Twilio error codes
      let errorMessage = data.message || 'Failed to send OTP';
      
      // Common Twilio errors
      if (data.code === 60200 || errorMessage.includes('unverified')) {
        errorMessage = 'This phone number is not verified in Twilio. Please use a verified number or contact support.';
      } else if (data.code === 60203 || errorMessage.includes('max')) {
        errorMessage = 'Maximum number of attempts reached. Please try again later.';
      } else if (data.code === 60212 || errorMessage.includes('invalid')) {
        errorMessage = 'Invalid phone number format. Please use a valid US phone number.';
      }
      
      console.error('Failed to send OTP:', errorMessage);
      return { success: false, error: errorMessage };
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    return { success: false, error: 'Failed to send OTP' };
  }
}

export async function verifyOtp(phone: string, code: string) {
  // Check if Twilio is configured
  if (!env.twilio.sid || !env.twilio.token || !env.twilio.verifySid) {
    console.error('Twilio not configured');
    return { success: false, error: 'Twilio not configured. Please add credentials to .env.local' };
  }
  
  try {
    // Verify OTP via Twilio Verify API
    const response = await fetch(
      `https://verify.twilio.com/v2/Services/${env.twilio.verifySid}/VerificationCheck`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${env.twilio.sid}:${env.twilio.token}`).toString('base64')}`
        },
        body: new URLSearchParams({
          To: phone,
          Code: code
        })
      }
    );
    
    const data = await response.json();
    
    if (response.ok && data.status === 'approved') {
      console.log(`✅ OTP verified for ${phone}`);
      return { success: true };
    } else {
      console.warn('Invalid OTP:', data.message);
      return { success: false, error: data.message };
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return { success: false, error: 'Failed to verify OTP' };
  }
}

