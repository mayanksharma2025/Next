import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/register"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("token")?.value;

  // السماح بالـ static files و next internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // لو مسجل دخول و رايح لصفحات auth
  if (token && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/tasks", req.url));
  }

  // لو مش مسجل دخول و رايح لصفحات محمية
  if (!token && !PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
