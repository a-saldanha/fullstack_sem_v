// lib/auth/config.ts

import { betterAuth } from "better-auth";

// NOTE: Since we are using a mock store, we must use JWT strategy 
// and handle user creation/session payload manually in callbacks.

export const auth = betterAuth({
  session: {
    strategy: "jwt", // Use JWTs instead of DB sessions for simplicity
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Simplified: Skip email verification
  },
  
  socialProviders: {
    // Disabled for simplicity
  },
  
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    generateId: () => {
      // Use simple random UUID generator
      return crypto.randomUUID();
    },
  },
  
  callbacks: {
    async session({ session, token }) {
      // Attach user ID and role from the JWT token
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub, // Assuming BetterAuth puts user ID in token.sub
          role: "USER", // Hardcode to USER role
        },
      };
    },
    async jwt({ token, user }) {
        // This runs on sign-in. If 'user' object is available (e.g., from register), use it.
        if (user) {
            token.sub = user.id;
        }
        return token;
    }
  },
});

export type Session = typeof auth.$Infer.Session;
