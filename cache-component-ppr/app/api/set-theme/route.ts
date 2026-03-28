import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { theme } = await req.json();

  const res = NextResponse.json({ success: true });

  res.cookies.set("theme", theme, {
    path: "/",
    httpOnly: false, // allow client read if needed
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return res;
}
