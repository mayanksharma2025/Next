// app/actions.ts
"use server";

import { revalidateTag, revalidatePath } from "next/cache";

// 🔹 update user setting (theme change)
export async function updateTheme() {
  await fetch("http://localhost:4000/users/u1", {
    method: "PATCH",
    body: JSON.stringify({ theme: "dark" }),
  });

  // only user data changes
  (revalidateTag as any)("user");
}

// 🔹 add activity log
export async function addActivity() {
  await fetch("http://localhost:4000/activities", {
    method: "POST",
    body: JSON.stringify({
      id: Date.now().toString(),
      userId: "u1",
      text: "Clicked button",
    }),
  });

  // only activity list changes
  (revalidateTag as any)("activities");
}

// 🔹 full page reset case (rare real-world)
export async function resetEverything() {
  await fetch("http://localhost:4000/users/u1", {
    method: "PATCH",
    body: JSON.stringify({ theme: "light" }),
  });

  // force entire page refresh
  revalidatePath("/");
}
