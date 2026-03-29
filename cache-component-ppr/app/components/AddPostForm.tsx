"use client";

import { useRouter } from "next/navigation";
import { addPostWithRevalidate } from "../action";

export function AddPostForm() {
  const router = useRouter();

  async function action(formData: FormData) {
    await addPostWithRevalidate(formData);

    // ✅ THIS replaces "updateTag"
    router.refresh();
  }

  return (
    <form action={action}>
      <input name="title" placeholder="Title" />
      <button type="submit">Add</button>
    </form>
  );
}
