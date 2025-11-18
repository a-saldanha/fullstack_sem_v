// middleware.ts

import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth/config"; 

const PUBLIC_PATHS = ["/", "/login", "/register", "/api/auth"];
const AUTH_REQUIRED_PATHS = ["/dashboard", "/read", "/leaderboard", "/profile"];

function matchPath(path: string, prefixes: string[]): boolean {
  return prefixes.some((prefix) => path.startsWith(prefix));
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  if (pathname.startsWith("/api/auth")) {
    return response;
  }
  
  const sessionToken = request.cookies.get("better-auth.session_token")?.value;

  if (matchPath(pathname, AUTH_REQUIRED_PATHS) && !sessionToken) {
    // Redirect unauthenticated users to login
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }
  
  // For all other cases (public paths or authenticated paths), continue
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
