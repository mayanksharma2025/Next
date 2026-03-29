"use server";

import { addPost } from "@/lib/db";
import { revalidateTag, updateTag } from "next/cache";

export async function addPostWithRevalidate(formData: FormData): Promise<void> {
  const title = formData.get("title") as string;

  await addPost(title);

  revalidateTag("posts", "default");
}

export async function addPostWithUpdate(formData: FormData): Promise<void> {
  const title = formData.get("title") as string;

  await addPost(title);

  updateTag("posts");
}
