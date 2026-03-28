// lib/auth.ts
import { cookies } from "next/headers";
import type { User } from "@/app/types";

export async function getSessionUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) return null;

  const res = await fetch(`http://localhost:4000/users/${userId}`);
  if (!res.ok) return null;

  return res.json();
}
