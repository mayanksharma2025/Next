// app/actions.ts (NEW invalidation model)
"use server";

import { updateTag } from "next/cache";

export async function addProject() {
  await fetch("http://localhost:4000/projects", {
    method: "POST",
    body: JSON.stringify({
      id: Date.now().toString(),
      orgId: "org1",
      title: "New Project",
    }),
  });

  updateTag("projects");
}

export async function updateOrgPlan() {
  await fetch("http://localhost:4000/orgs/org1", {
    method: "PATCH",
    body: JSON.stringify({ plan: "free" }),
  });

  updateTag("orgs");
}
