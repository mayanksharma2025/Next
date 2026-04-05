// lib/db.ts (simulate DB / ORM)
import { unstable_cache } from "next/cache";
import { cache } from "react";
import "server-only";
import { getItemFromDB } from "./api";

// 🔹 DEDUPLICATION
export const getItem = cache(async (id: string) => {
  return getItemFromDB(id);
});

// 🔹 PRELOAD
export const preload = (id: string) => {
  void getItem(id);
};

export async function getPostsFromDB() {
  const res = await fetch("http://localhost:4000/posts");
  return res.json();
}
// 🔹 unstable_cache with revalidate
export const getCachedPosts = unstable_cache(
  async () => {
    return getPostsFromDB();
  },
  ["posts"],
  {
    tags: ["posts"],
    revalidate: 20, // ⏱ revalidate every 20s
  },
);
