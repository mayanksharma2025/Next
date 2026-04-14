import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "lib/db";
import { User } from "models/User";
import { requireEmail, requireString } from "lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = requireEmail(body.email);
    const password = requireString(body.password, "Password", 8);

    await connectDB();

    const exists = await User.findOne({ email });

    if (exists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await User.create({
      email,
      password: passwordHash, // ✅ FIXED
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: any) {
    console.error("REGISTER ERROR:", err);

    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 400 },
    );
  }
}
