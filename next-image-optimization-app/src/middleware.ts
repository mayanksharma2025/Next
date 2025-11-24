import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
    matcher: ["/fonts/:path*", "/_next/image", "/images/:path*"],
};

export function middleware(req: NextRequest) {
    const res = NextResponse.next();

    // Heavy caching for fonts
    if (req.nextUrl.pathname.startsWith("/fonts")) {
        res.headers.set("Cache-Control", "public, max-age=31536000, immutable");
    }

    // Heavy caching for optimized images
    if (req.nextUrl.pathname.startsWith("/_next/image")) {
        res.headers.set("Cache-Control", "public, max-age=31536000, immutable");
    }

    return res;
}
