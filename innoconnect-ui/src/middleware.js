/**
 * @author Tom Shortridge
 */
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const secret = process.env.AUTH_SECRET;

  const token = await getToken({
    req,
    secret,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

export const config = {
  matcher: ["/api/users/protected/:path*", "/ui/:path*"],
};
