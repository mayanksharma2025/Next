// app/actions.ts (optimistic-safe mutations + versioning)
"use server";

import { updateTag } from "next/cache";

export async function addProjectOptimistic(input: {
  tempId: string;
  title: string;
}) {
  // simulate network latency (race visibility)
  await new Promise((r) => setTimeout(r, 800));

  // simulate random failure (rollback test)
  const shouldFail = Math.random() < 0.3;
  if (shouldFail) {
    return { ok: false };
  }

  const realId = Date.now().toString();

  await fetch("http://localhost:4000/projects", {
    method: "POST",
    body: JSON.stringify({
      id: realId,
      orgId: "org1",
      title: input.title,
      version: Date.now(), // version for race handling
    }),
  });

  updateTag("projects");

  return { ok: true, realId };
}
