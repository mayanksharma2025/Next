import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  const pathname = req.nextUrl.pathname;

  // Public routes
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // Protected routes
  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
