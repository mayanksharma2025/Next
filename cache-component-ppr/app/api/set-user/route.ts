import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await req.json();

  const res = NextResponse.json({ success: true });

  res.cookies.set("userId", userId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return res;
}
