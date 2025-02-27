import { tokenName } from "@/constants";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define which paths are protected (require authentication)
  const isProtectedRoute = path.startsWith("/dashboard");

  // Get the token from the cookies
  const token = request.cookies.get(tokenName)?.value;

  console.log(token);

  // If trying to access a protected route without a token, redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If trying to access login/register while already logged in, redirect to dashboard
  if (path === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
