"use client";

import { useOptimistic, useTransition } from "react";
import { addPostWithUpdate } from "@/app/action";
import { Post } from "@/types/post";

export default function OptimisticUI({ posts }: any) {
  const [isPending, startTransition] = useTransition();

  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    posts,
    (state, newPost) => [...state, newPost],
  );

  return (
    <div className="space-y-5 my-3">
      <h2>Optimistic UI (updateTag)</h2>

      <ul>
        {optimisticPosts.map((p: Post) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>

      <form
        action={(formData) => {
          const title = formData.get("title");

          // optimistic update
          addOptimisticPost({ id: "temp-" + Date.now(), title });

          startTransition(() => {
            addPostWithUpdate(formData);
          });
        }}
      >
        <input
          name="title"
          placeholder="Optimistic title"
          className="p-2 mx-2"
        />
        <button disabled={isPending} className="border p-2 rounded-md">
          {isPending ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
}
