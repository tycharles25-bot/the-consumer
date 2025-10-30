# Deployment Checklist for The Consumer

## ✅ What's Ready
- Stripe payment integration (test mode)
- OpenAI moderation
- Mock video uploads (no AWS required)
- All pages built and functional

## 🔑 Environment Variables Needed
Add these to your hosting platform's environment variables:

```
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_KEY_HERE
OPENAI_API_KEY=sk-proj-YOUR_KEY_HERE
NEXT_PUBLIC_APP_NAME=The Consumer
THEME_PRIMARY=#ff6a00
```

## 🌐 Production Webhook Setup

After deploying, update your Stripe webhook:
1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Enter your URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select event: `checkout.session.completed`
5. Copy the new signing secret and update `STRIPE_WEBHOOK_SECRET` in your hosting env

## 📦 Deployment Commands

```bash
npm run build    # Build production version
npm start        # Start production server
```

## 🚀 Hosting Options

**Recommended: Vercel** (best for Next.js)
```bash
npm install -g vercel
vercel deploy
```

**Alternative: Railway, Render, Fly.io**
- Follow their Next.js deployment guides
- Make sure to add all environment variables

## 📝 Post-Deployment

1. Test the full flow: Post → Upload → Pay with test card `4242 4242 4242 4242`
2. Verify webhook is receiving events in Stripe Dashboard
3. Check OpenAI moderation is working
4. Test all pages load correctly

## ⚠️ Important Notes

- Currently using Stripe TEST mode keys - switch to live keys for real payments
- Mock uploads are enabled - add AWS S3 credentials for real video storage
- Twilio OTP is mocked - configure for real phone verification
- Payout system not yet implemented - coming soon

