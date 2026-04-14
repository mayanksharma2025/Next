import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "lib/db";
import { Session } from "models/Session";

export async function POST() {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get("session")?.value;

  // ✅ delete session from DB
  if (sessionId) {
    await connectDB();
    await Session.deleteOne({ _id: sessionId });
  }

  // ✅ clear cookie properly
  cookieStore.set("session", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0), // 🔥 VERY IMPORTANT
  });

  return NextResponse.json({ success: true });
}
