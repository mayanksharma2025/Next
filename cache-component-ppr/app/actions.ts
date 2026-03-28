// app/actions.ts
"use server";

import { updateTag } from "next/cache";

export async function addUser(formData: FormData) {
  const name = formData.get("name") as string;

  if (!name) return;

  // Create new user
  await fetch("http://localhost:4000/users", {
    method: "POST",
    body: JSON.stringify({
      name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // 🔥 Invalidate cache
  updateTag("users");
}
