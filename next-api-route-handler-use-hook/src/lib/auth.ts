import { cookies } from "next/headers";
import { connectDB } from "./db";
import { Session } from "../models/Session";
import { User } from "../models/User";

export async function getUser() {
  const cookieStore = await cookies(); // ✅ MUST await

  const sessionId = cookieStore.get("session")?.value;

  if (!sessionId) return null;

  await connectDB();

  const session = await Session.findById(sessionId);

  if (!session) return null;

  if (session.expiresAt < new Date()) {
    await Session.deleteOne({ _id: sessionId });
    return null;
  }

  const user = await User.findById(session.userId).select("-password");

  return user;
}
