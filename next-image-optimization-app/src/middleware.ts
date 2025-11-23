// middleware.ts (ROOT folder)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
    ],
};

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    console.log({ path })

    // -------------------------------
    // 1) STATIC IMAGES (CACHE 7 DAYS + SWR)
    // -------------------------------
    if (path.startsWith("/images/")) {
        const res = NextResponse.next();
        res.headers.set(
            "Cache-Control",
            "public, max-age=604800, stale-while-revalidate=86400"
        );
        return res;
    }

    // -------------------------------
    // 2) FONTS → CACHE 1 YEAR IMMUTABLE
    // -------------------------------
    if (path.startsWith("/fonts/") || path.endsWith(".woff2")) {
        const res = NextResponse.next();
        res.headers.set(
            "Cache-Control",
            "public, max-age=31536000, immutable"
        );
        return res;
    }

    // -------------------------------
    // 3) HTML PAGES → NO STORE
    // -------------------------------
    if (path === "/" || path.endsWith(".html") || !path.includes(".")) {
        const res = NextResponse.next();
        res.headers.set("Cache-Control", "no-store");
        return res;
    }

    // -------------------------------
    // 4) API ROUTES (cache 0, swr 5s)
    // -------------------------------
    if (path.startsWith("/api/")) {
        const res = NextResponse.next();
        res.headers.set("Cache-Control", "public, max-age=0, s-maxage=5");
        return res;
    }

    // -------------------------------
    // 5) SECURITY HEADERS (GLOBAL)
    // -------------------------------
    const res = NextResponse.next();
    res.headers.set("X-Frame-Options", "DENY");
    res.headers.set("X-Content-Type-Options", "nosniff");
    res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    // OPTIONAL CSP (Add if needed)
    // res.headers.set(
    //   "Content-Security-Policy",
    //   "default-src 'self'; img-src 'self' https: data:; object-src 'none'; frame-ancestors 'none';"
    // );

    return res;
}
