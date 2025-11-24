import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
    matcher: ["/fonts/:path*", "/gallery/:path*", "/cdn/:path*"],
};

export function middleware(req: NextRequest) {
    const res = NextResponse.next();

    const url = req.nextUrl.pathname;

    if (url.startsWith("/fonts")) {
        res.headers.set(
            "Cache-Control",
            "public, max-age=31536000, immutable"
        );
    }

    if (url.startsWith("/gallery") || url.startsWith("/cdn")) {
        // console.log({ url })
        res.headers.set(
            "Cache-Control",
            "public, max-age=31536000, stale-while-revalidate"
        );
    }

    return res;
}
