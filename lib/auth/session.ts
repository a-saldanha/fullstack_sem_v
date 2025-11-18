// lib/auth/session.ts

import { cache } from "react";
import { auth } from "./config";
import { MockUser, findUserById } from "@/lib/data/mockStore";

/**
 * Get current session (cached for request lifecycle)
 * In this simplified JWT mode, we rely on the token existing.
 */
export const getSession = cache(async () => {
  // BetterAuth handles JWT verification internally when calling methods,
  // but for general use, we'll mimic checking authentication.
  
  // Since we are using JWTs, we'll rely on the NextAuth/BetterAuth middleware
  // to ensure the token is valid for Server Components to function.
  
  // In a real JWT flow, you might check the token validity here.
  // For simplicity, we assume if the middleware lets it through, a session exists.
  
  // We'll attempt to get the user from the token context if possible, 
  // otherwise, rely on Server Components/API routes to check authentication status
  // based on the state provided by the underlying library.
  
  // For this simple exercise, we'll just check if the session token exists in cookies
  // as a proxy for authentication state, which the middleware already checked.
  
  // NOTE: This mock logic is incomplete because we don't have the full BetterAuth context
  // of reading the token payload in a non-API route easily.
  // We return a placeholder object if authentication *should* exist.
  
  // In a real app, you'd call auth.api.getSession() or similar.
  
  // For now, we rely on the token existing (checked in middleware) and an
  // assumed user object being present in the nextjs request context if using 
  // an integrated provider like next-auth.
  
  const session = await auth.api.getSession(); // Try to get session from BetterAuth's API
  
  if (!session) return null;
  
  // Augment session with mock user data if necessary (since we aren't using a DB adapter)
  if (session.user && session.user.id) {
      const mockUser = findUserById(session.user.id);
      if (mockUser) {
          session.user.name = mockUser.name; // Ensure name is up-to-date from mock store
          session.user.role = mockUser.role;
      }
  }
  
  return session;
});

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  return session?.user ?? null;
});

export async function requireAuth() {
  const session = await getSession();
  
  if (!session || !session.user) {
    throw new Error("Unauthorized: Please log in.");
  }
  
  return session;
}
