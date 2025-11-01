import Stripe from 'stripe';
import { env } from './env';

export function getStripe() {
  if (!env.stripeSecretKey || env.stripeSecretKey.startsWith('pk_')) {
    throw new Error('STRIPE_SECRET_KEY must be a secret key (sk_test_...)');
  }
  return new Stripe(env.stripeSecretKey, { apiVersion: '2024-06-20' } as any);
}




