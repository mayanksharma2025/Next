// app/actions.ts
"use server";

import { cookies } from "next/headers";

export async function toggleTheme() {
  const cookieStore = await cookies();
  const current = cookieStore.get("theme")?.value || "light";

  const nextTheme = current === "light" ? "dark" : "light";

  cookieStore.set("theme", nextTheme);

  // no return needed
}
