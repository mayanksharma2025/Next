import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../../lib/db";
import { User } from "../../../../models/User";
import { signJwt } from "../../../../lib/jwt";
import {
    requireEmail,
    requireString,
} from "../../../../lib/validation";

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

    console.log({ token })

    const response = NextResponse.json({ success: true });

    response.cookies.set("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        // sameSite: "strict",
        path: "/",
    });

    return response;
}

export async function POST(req: Request) {
    return loginHandler(req);
}





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