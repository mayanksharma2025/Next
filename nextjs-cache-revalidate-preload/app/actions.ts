// app/actions.ts
"use server";

import { revalidateTag, revalidatePath } from "next/cache";

// 🔹 update user → tag based
export async function updateUser() {
  await fetch("http://localhost:4000/users/u1", {
    method: "PATCH",
    body: JSON.stringify({ name: "Updated Aman" }),
  });

  (revalidateTag as any)("user");
}

// 🔹 add post → tag based
export async function addPost() {
  await fetch("http://localhost:4000/posts", {
    method: "POST",
    body: JSON.stringify({
      id: Date.now().toString(),
      title: "New Post",
    }),
  });

  (revalidateTag as any)("posts");
}

// 🔹 full page reset
export async function resetPage() {
  revalidatePath("/");
}
