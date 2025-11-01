import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { db } from '@/lib/store';

// Note: Apple provider requires additional setup, using Google for now
// Apple Sign-In can be added later with proper certificates

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    // Apple Provider would go here with credentials
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Create user in database if they don't exist
      if (user.email) {
        const userId = user.email; // Use email as user ID
        if (!db.users.get(userId)) {
          db.users.set(userId, {
            id: userId,
            phone: userId, // Will store email instead of phone
            email: user.email,
            balanceCents: 0,
            pendingCents: 0,
            verified: true,
            verificationStatus: 'approved'
          });
          console.log(`✅ Created new user from OAuth: ${userId}`);
        }
      }
      return true;
    },
    async session({ session, token }) {
      // Customize session object
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

