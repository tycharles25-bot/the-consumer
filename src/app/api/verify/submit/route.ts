import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/store';

export async function POST(req: NextRequest) {
  const { fullName, dateOfBirth, idType, idNumber } = await req.json();
  
  if (!fullName || !dateOfBirth || !idType || !idNumber) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  // Get user from session (simplified - in production use proper session management)
  const cookies = req.headers.get('cookie');
  const sessUid = cookies?.split('sess_uid=')[1]?.split(';')[0];
  
  if (!sessUid) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const user = db.users.get(sessUid);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Update user with verification data
  user.verificationData = {
    fullName,
    dateOfBirth,
    idType,
    idNumber,
    submittedAt: new Date().toISOString()
  };
  user.verificationStatus = 'pending';
  user.verified = false;

  db.users.set(sessUid, user);

  // In production, here you would:
  // 1. Encrypt the sensitive data
  // 2. Send it to a verification service (like Stripe Identity, Onfido, etc.)
  // 3. Store just a reference ID, not the actual data
  // For now, we'll simulate approval for testing

  console.log(`🔐 Verification submitted for user ${sessUid}`);

  return NextResponse.json({ success: true, status: 'pending' });
}


