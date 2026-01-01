import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../../lib/db";
import { User } from "../../../../models/User";
import { requireEmail, requireString } from "../../../../lib/validation";

export async function POST(req: Request) {
    const body = await req.json();


    // const { email, password } = await req.json();

    // if (!email || !password) {
    //     return NextResponse.json(
    //         { error: "Missing fields" },
    //         { status: 400 }
    //     );
    // }


    const email = requireEmail(body.email);
    const password = requireString(body.password, "Password", 8);
    console.log({ email, password })
    await connectDB();

    const exists = await User.findOne({ email });
    if (exists) {
        return NextResponse.json(
            { error: "User already exists" },
            { status: 409 }
        );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await User.create({ email, passwordHash });

    return NextResponse.json({ success: true }, { status: 201 });
}
