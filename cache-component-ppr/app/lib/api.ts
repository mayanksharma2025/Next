// app/lib/api.ts
import { cacheLife } from "next/cache";
import { User } from "@/app/types/user";
import { Project, UserWithProjects } from "@/app/types";
import type { Org } from "@/app/types";

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

export async function getUserProjects(
  userId: string,
): Promise<UserWithProjects> {
  try {
    const res = await fetch(
      `http://localhost:4000/users/${userId}?_embed=projects`,
    );

    if (!res.ok) {
      console.warn("API failed:", res.status);

      // ✅ return fallback instead of throwing
      return {
        id: userId,
        name: "Unknown User",
        projects: [],
      };
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);

    // ✅ fallback for network errors
    return {
      id: userId,
      name: "Offline User",
      projects: [],
    };
  }
}

// export async function getUserProjects(
//   userId: string,
// ): Promise<UserWithProjects> {
//   const res = await fetch(
//     `http://localhost:4000/users/${userId}?_embed=projects`,
//   );
//   console.log({ res });

//   if (!res.ok) throw new Error("Failed to fetch projects");

//   return res.json();
// }

export async function getOrg(orgId: string): Promise<Org> {
  const res = await fetch(`http://localhost:4000/orgs/${orgId}`);
  if (!res.ok) throw new Error("Org fetch failed");
  return res.json();
}

export async function getProjects(orgId: string): Promise<Project[]> {
  const res = await fetch(`http://localhost:4000/projects?orgId=${orgId}`);
  if (!res.ok) throw new Error("Projects fetch failed");
  return res.json();
}
