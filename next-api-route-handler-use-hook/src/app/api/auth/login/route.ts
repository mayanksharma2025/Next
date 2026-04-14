import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { connectDB } from "lib/db";
import { User } from "models/User";
import { Session } from "models/Session";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  await connectDB();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // ✅ create session
  const sessionId = crypto.randomUUID();

  await Session.create({
    _id: sessionId,
    userId: user._id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  const res = NextResponse.json({ success: true });

  res.cookies.set("session", sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return res;
}
