// lib/data.ts (unchanged base, + version awareness)
import { cacheTag } from "next/cache";

export async function getProjects() {
  "use cache";
  cacheTag("projects");

  const res = await fetch("http://localhost:4000/projects");
  return res.json();
}
