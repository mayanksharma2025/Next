// app/actions.ts
"use server";

import { updateTag } from "next/cache";

export async function addUser(formData: FormData) {
  const name = formData.get("name") as string;

  if (!name) return;

  // Create new user
  await fetch("http://localhost:4000/users", {
    method: "POST",
    body: JSON.stringify({
      name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // 🔥 Invalidate cache
  updateTag("users");
}

// app/actions.ts
// 'use server'

// import { updateTag } from 'next/cache'

export async function addProject(formData: FormData) {
  const title = formData.get("title") as string;
  const userId = formData.get("userId") as string;

  if (!title || !userId) return;

  await fetch("http://localhost:4000/projects", {
    method: "POST",
    body: JSON.stringify({ title, userId }),
    headers: { "Content-Type": "application/json" },
  });

  // 🔥 fine-grained invalidation
  updateTag(`projects-user-${userId}`);
}

// // app/actions.ts
// "use server";

// import { updateTag } from "next/cache";

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const orgId = formData.get("orgId") as string;

  if (!title || !orgId) return;

  await fetch("http://localhost:4000/projects", {
    method: "POST",
    body: JSON.stringify({ title, orgId }),
    headers: { "Content-Type": "application/json" },
  });

  // 🔥 invalidate only this org
  updateTag(`projects-org-${orgId}`);
}

export async function upgradePlan(orgId: string) {
  // simulate billing success
  await fetch(`http://localhost:4000/orgs/${orgId}`, {
    method: "PATCH",
    body: JSON.stringify({ plan: "pro" }),
    headers: { "Content-Type": "application/json" },
  });

  updateTag(`org-${orgId}`);
}
