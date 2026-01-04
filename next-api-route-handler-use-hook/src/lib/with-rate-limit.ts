import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "../lib/rate-limit";

export function withRateLimit(
    handler: Function,
    options: {
        limit: number;
        windowMs: number;
    }
) {
    return async (req: NextRequest) => {
        const forwardedFor = req.headers.get("x-forwarded-for");
        const ip =
            forwardedFor?.split(",")[0]?.trim() ??
            req.headers.get("x-real-ip") ??
            "anonymous";

        const allowed = rateLimit(
            ip,
            options.limit,
            options.windowMs
        );

        if (!allowed) {
            return NextResponse.json(
                { error: "Too many requests" },
                { status: 429 }
            );
        }

        return handler(req);
    };
}

