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
   STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_KEY_HERE
   OPENAI_API_KEY=sk-proj-YOUR_KEY_HERE
   NEXT_PUBLIC_APP_NAME=The Consumer
   THEME_PRIMARY=#ff6a00
   ```

5. **Deploy**: Click "Create Web Service"

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

