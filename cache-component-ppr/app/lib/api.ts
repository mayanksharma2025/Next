// app/lib/api.ts
import { cacheLife } from "next/cache";
import { User } from "@/app/types/user";

export async function getUsers() {
  "use cache";
  cacheLife("minutes"); // cache for some time

  const res = await fetch("http://localhost:4000/users");
  return res.json();
}

export async function fetchUser(userId: string): Promise<User> {
  const res = await fetch(`http://localhost:4000/users/${userId}`, {
    cache: "no-store", // avoid browser caching confusion
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}
