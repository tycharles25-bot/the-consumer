# Google OAuth Setup

## Quick Setup Steps

1. **Go to Google Cloud Console**: https://console.cloud.google.com/

2. **Create OAuth Credentials**:
   - Navigate to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Name: "The Consumer"
   - Authorized redirect URIs:
     - Development: `http://localhost:3000/api/auth/callback/google`
     - Production: `https://YOUR-DOMAIN.com/api/auth/callback/google`
   - Click "Create"

3. **Copy Credentials**:
   - Copy "Client ID" and "Client Secret"

4. **Add to Environment Variables** (local):
   Create `.env.local` in the `web` directory:
   ```
   GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE
   GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE
   NEXTAUTH_SECRET=generate-a-random-string-here
   NEXTAUTH_URL=http://localhost:3000
   ```

5. **Add to Render** (production):
   In Render dashboard → Environment → Add:
   ```
   GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE
   GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE
   NEXTAUTH_SECRET=generate-a-random-string-here
   NEXTAUTH_URL=https://YOUR-DOMAIN.com
   ```

6. **Generate NEXTAUTH_SECRET**:
   Run: `openssl rand -base64 32`
   Or use any random string generator for production

## Notes
- Phone authentication (Twilio) has been removed
- Users now sign in with Google
- Apple Sign-In can be added later with proper certificates
- Users are automatically created in the database on first OAuth sign-in

