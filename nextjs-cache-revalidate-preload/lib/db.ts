// lib/db.ts (simulate DB layer)
import { unstable_cache } from "next/cache";
export async function getUserFromDB(id: string) {
  const res = await fetch(`http://localhost:4000/users/${id}`);
  return res.json();
}

// 🔹 unstable_cache (non-fetch caching)
export const getCachedUser = unstable_cache(
  async (id: string) => {
    return getUserFromDB(id);
  },
  ["user"],
  {
    tags: ["user"],
    revalidate: 60,
  },
);
