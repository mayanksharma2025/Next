"use client";

import { Post } from "@/types/post";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SWRDemo() {
  const { data: posts, mutate } = useSWR("/api/posts", fetcher);

  if (!posts) return <p>Loading...</p>;

  async function addPostHandler() {
    const newPost = { id: Date.now(), title: "SWR Post " + Date.now() };

    // optimistic update
    mutate([...posts, newPost], false);

    // server update
    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title: newPost.title }),
    });

    // revalidate
    mutate();
  }

  return (
    <div className="space-y-5 my-3">
      <h2>SWR (Client Cache)</h2>

      <ul>
        {posts.map((p: Post) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>

      <button onClick={addPostHandler} className="border p-4 rounded-md">
        Add SWR Post
      </button>
    </div>
  );
}
