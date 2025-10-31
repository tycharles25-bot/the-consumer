// Simple in-memory store for MVP preview (resets on server restart)
export type User = { 
  id: string; 
  phone: string; 
  email?: string; 
  balanceCents: number; 
  pendingCents: number; 
  payoutVerified?: boolean; 
  payoutEmail?: string;
  verified?: boolean;
  verificationStatus?: 'pending' | 'approved' | 'rejected';
  verificationData?: {
    fullName?: string;
    dateOfBirth?: string;
    idType?: 'drivers_license' | 'passport' | 'state_id';
    idNumber?: string;
    submittedAt?: string;
  };
};
export type Advertiser = { id: string; name: string; balanceCents: number };
export type QuizQuestion = {
  type: 'tf' | 'mc';
  question: string;
  // For true/false use options ['True','False'] and correctIndex 0|1
  options: string[];
  correctIndex: number;
};

export type Creative = {
  id: string;
  advertiserId: string;
  videoUrl: string;
  title?: string;
  description?: string;
  status: 'pending' | 'approved' | 'rejected' | 'paused';
  payoutPer?: number;
  advertiserUrl?: string;
  quiz?: { q1: QuizQuestion; q2: QuizQuestion };
  thumbnail?: string;
  analytics?: {
    totalViews: number;
    totalQuizAttempts: number;
    totalCorrect: number;
    averageScore: number;
  };
};

// Create a unique instance ID to verify we're using the same db object
const DB_INSTANCE_ID = `db_${Date.now()}_${Math.random().toString(36).slice(2)}`;

export const db = {
  _instanceId: DB_INSTANCE_ID, // Debug: verify same instance
  users: new Map<string, User>(),
  advertisers: new Map<string, Advertiser>(),
  creatives: new Map<string, Creative>(),
  dayViews: new Map<string, { date: string; c: number }>(),
  completedAds: new Map<string, Set<string>>() // userId -> Set of creativeIds they've earned from
};

export function incUserDaily(userId: string) {
  const today = new Date().toISOString().slice(0,10);
  const rec = db.dayViews.get(userId);
  if (!rec || rec.date !== today) db.dayViews.set(userId, { date: today, c: 0 });
  const cur = db.dayViews.get(userId)!;
  cur.c++;
  return cur.c;
}


