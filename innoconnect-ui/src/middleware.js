/**
 * @author Tom Shortridge
 *
 * Controls access across pages
 */
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const secret = process.env.AUTH_SECRET;

  // Validates token from the user
  const token = await getToken({
    req,
    secret,
  });

  // Redirects to login if the token is invalid
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

// Matcher for protected paths
export const config = {
  matcher: [
    "/api/users/protected/:path*",
    "/api/projects/:path*",
    "/api/inventor-matching/:path*",
    "/ui/:path*",
  ],
};
