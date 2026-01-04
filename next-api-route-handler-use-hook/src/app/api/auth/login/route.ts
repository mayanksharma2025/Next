import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../../lib/db";
import { User } from "../../../../models/User";
import { signJwt } from "../../../../lib/jwt";
import { auditLog } from "../../../../lib/audit";
import {
    requireEmail,
    requireString,
} from "../../../../lib/validation";
import { withRateLimit } from "lib/with-rate-limit";

async function loginHandler(req: Request) {
    const body = await req.json();

    const email = requireEmail(body.email);
    const password = requireString(body.password, "Password", 1);

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
        );
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
        );
    }

    const token = signJwt({
        userId: user._id.toString(),
        role: user.role,
    });

    // ✅ AUDIT LOG (successful login only)
    await auditLog({
        action: "USER_LOGIN",
        userId: user._id.toString(),
        role: user.role,
    });

    const response = NextResponse.json({ success: true });

    response.cookies.set("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });

    return response;
}


export const POST = withRateLimit(loginHandler, {
    limit: 3,
    windowMs: 60_000,
});


// Summary(Remember This)

// rateLimit() = counter logic

// withRateLimit() = middleware - style wrapper

// Use on auth APIs only

// Prevents brute force

// Required for security audits


// ✔ Why this is best

// One security boundary

// Reusable for mobile / external clients

// Centralized protection

// Cleaner mental model

// ✅ No rate limiting in the page
// ✅ Rate limiting ONLY in API




// export async function POST(req: Request) {
//     const { email, password } = await req.json();

//     await connectDB();

//     const user = await User.findOne({ email });
//     if (!user) {
//         return NextResponse.json(
//             { error: "Invalid credentials" },
//             { status: 401 }
//         );
//     }

//     const valid = await bcrypt.compare(password, user.passwordHash);
//     if (!valid) {
//         return NextResponse.json(
//             { error: "Invalid credentials" },
//             { status: 401 }
//         );
//     }

//     const token = signJwt({ userId: user._id.toString() });

//     const response = NextResponse.json({ success: true });
//     response.cookies.set("token", token, {
//         httpOnly: true,
//         sameSite: "strict",
//         path: "/",
//     });

//     return response;
// }