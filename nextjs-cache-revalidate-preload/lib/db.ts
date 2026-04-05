// lib/db.ts
import { unstable_cache } from "next/cache";

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
