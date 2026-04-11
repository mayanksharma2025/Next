// lib/auth.ts
import { cookies } from "next/headers";

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value ?? null;
}

export async function setToken(token: string) {
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
}

export async function clearToken() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}
