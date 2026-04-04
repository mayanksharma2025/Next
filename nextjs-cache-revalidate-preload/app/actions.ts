// app/actions.ts (SERVER ACTIONS ONLY)
"use server";

import { revalidateTag } from "next/cache";

export async function upgradePlan() {
  await fetch("http://localhost:4000/orgs/org1", {
    method: "PATCH",
    body: JSON.stringify({ plan: "pro" }),
  });

  (revalidateTag as any)("org");
}

export async function addProjectServer() {
  await fetch("http://localhost:4000/projects", {
    method: "POST",
    body: JSON.stringify({
      id: Date.now().toString(),
      orgId: "org1",
      title: "New Project",
    }),
  });

  (revalidateTag as any)("projects");
}
