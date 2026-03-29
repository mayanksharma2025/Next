"use client";

import { Post } from "@/types/post";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SWRPosts() {
  const { data: posts, mutate } = useSWR(
    "http://localhost:3000/api/posts",
    fetcher,
  );

  async function addPost(title: string) {
    // optimistic update
    mutate([...posts, { id: Date.now(), title }], false);

    // actual request
    await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      body: JSON.stringify({ title }),
    });

    // revalidate
    mutate();
  }

  if (!posts) return "Loading...";

  return (
    <>
      <ul>
        {posts.map((p: Post) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>

      <button onClick={() => addPost("New SWR Post")}>Add</button>
    </>
  );
}
