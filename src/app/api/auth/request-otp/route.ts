// Old Twilio-based OTP request route - deprecated  
// Kept for backward compatibility but will return error
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  return NextResponse.json({ 
    error: 'Phone authentication is no longer supported. Please use Google Sign-In instead.' 
  }, { status: 400 });
}
