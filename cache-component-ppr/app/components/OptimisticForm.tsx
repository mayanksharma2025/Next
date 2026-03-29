"use client";

import { useOptimistic, useTransition } from "react";
import { addPostWithUpdate } from "../action";
import { Post } from "@/types/post";

export default function OptimisticForm({ posts }: any) {
  const [isPending, startTransition] = useTransition();

  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    posts,
    (state, newPost) => [...state, newPost],
  );

  return (
    <>
      <ul>
        {optimisticPosts.map((p: Post) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>

      <form
        action={(formData) => {
          const title = formData.get("title");

          // 1. optimistic update
          addOptimisticPost({
            id: "temp-" + Date.now(),
            title,
          });

          // 2. server sync
          startTransition(() => {
            addPostWithUpdate(formData);
          });
        }}
      >
        <input name="title" className="border" />
        <button disabled={isPending}>{isPending ? "Adding..." : "Add"}</button>
      </form>
    </>
  );
}
