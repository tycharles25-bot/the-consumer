import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/store';

export async function GET(req: NextRequest) {
  const cookies = req.headers.get('cookie');
  const sessUid = cookies?.split('sess_uid=')[1]?.split(';')[0];
  
  if (!sessUid) {
    return NextResponse.json({ verified: false });
  }

  const user = db.users.get(sessUid);
  if (!user) {
    return NextResponse.json({ verified: false });
  }

  return NextResponse.json({
    verified: user.verified || false,
    status: user.verificationStatus || null,
    fullName: user.verificationData?.fullName || null,
    dateOfBirth: user.verificationData?.dateOfBirth || null,
    idType: user.verificationData?.idType || null
  });
}

