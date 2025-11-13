# Render Deployment Guide

## Quick Setup Steps

1. **Sign up/Login**: Go to https://render.com and sign up/login

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repo (or deploy from public repo)
   - Select the `web` directory as the root

3. **Configure Build**:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment: Node

4. **Add Environment Variables** in Render dashboard:
   ```
   DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DB_NAME
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   OPENAI_API_KEY=sk-proj-...
   NEXT_PUBLIC_APP_NAME=The Consumer
   THEME_PRIMARY=#ff6a00
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   NEXTAUTH_SECRET=...
   NEXTAUTH_URL=https://consumer.net
   META_VERIFY_TOKEN=choose-a-secret-token
   META_APP_ID=...
  META_APP_SECRET=...
   META_ACCESS_TOKEN=...
   ```

5. **Deploy**: Click "Create Web Service"

## Database Setup
- Provision a PostgreSQL instance (Render, Supabase, Neon, etc.)
- Copy the connection string into `DATABASE_URL`
- Run migrations locally: `npx prisma migrate deploy`
- Optional: run the same on Render using a deploy hook or shell

## Meta (Instagram/Facebook) Webhook
- Set Meta app mode to **Live**
- Callback URL: `https://consumer.net/api/meta/webhook`
- Verify token: must match `META_VERIFY_TOKEN`
- Webhook events will be persisted in the `WebhookEvent` table

## After Deployment

1. **Get your Render URL** (e.g., `https://the-consumer.onrender.com`)

2. **Update Stripe Webhook**:
   - Go to Stripe Dashboard → Developers → Webhooks
   - Click "Add endpoint"
   - Enter: `https://YOUR-RENDER-URL.onrender.com/api/webhooks/stripe`
   - Select event: `checkout.session.completed`
   - Copy the new signing secret
   - Update `STRIPE_WEBHOOK_SECRET` in Render environment variables

3. **Custom Domain** (Optional):
   - In Render dashboard → Settings → Custom Domains
   - Add your Squarespace domain
   - Update DNS records in Squarespace

## Notes
- Render auto-deploys on git push
- Free tier works for testing (may sleep after inactivity)
- Upgrade to paid for always-on hosting

