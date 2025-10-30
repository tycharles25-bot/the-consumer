// Simple in-memory store for MVP preview (resets on server restart)
export type User = { id: string; phone: string; email?: string; balanceCents: number; pendingCents: number; payoutVerified?: boolean; payoutEmail?: string };
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
};

export const db = {
  users: new Map<string, User>(),
  advertisers: new Map<string, Advertiser>(),
  creatives: new Map<string, Creative>(),
  dayViews: new Map<string, { date: string; c: number }>()
};

export function incUserDaily(userId: string) {
  const today = new Date().toISOString().slice(0,10);
  const rec = db.dayViews.get(userId);
  if (!rec || rec.date !== today) db.dayViews.set(userId, { date: today, c: 0 });
  const cur = db.dayViews.get(userId)!;
  cur.c++;
  return cur.c;
}


