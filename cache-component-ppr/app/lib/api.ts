// app/lib/api.ts
import { cacheLife } from "next/cache";

export async function getUsers() {
  "use cache";
  cacheLife("minutes"); // cache for some time

  const res = await fetch("http://localhost:4000/users");
  return res.json();
}
