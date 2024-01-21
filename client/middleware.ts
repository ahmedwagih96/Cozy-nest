import { isAuthenticated } from "@/services/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware function to handle authentication and redirection
export default async function middleware(req: NextRequest) {
  // Check user authentication status
  const auth = await isAuthenticated();
  if (
    !auth &&
    (req.nextUrl.pathname.startsWith("/my-hotels") ||
      req.nextUrl.pathname.startsWith("/my-bookings") ||
      req.nextUrl.pathname.startsWith("/booking"))
  ) {
    // Redirect to the root ("/")
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  if (
    auth &&
    (req.nextUrl.pathname.startsWith("/sign-in") ||
      req.nextUrl.pathname.startsWith("/register"))
  ) {
    // Redirect to the root ("/")
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

// Configuration object specifying the routes for the middleware
export const config = {
  matcher: [
    "/my-hotels/:path*",
    "/sign-in",
    "/register",
    "/my-bookings",
    "/booking/:path*",
  ],
};
