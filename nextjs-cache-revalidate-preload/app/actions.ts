"use server";

import { revalidatePath, revalidateTag } from "next/cache";
type RevalidateTagType = Parameters<typeof revalidateTag>[0];

export async function addProject() {
  await fetch("http://localhost:3000/api/projects", {
    method: "POST",
  });

  (revalidateTag as any)("projects");
  //   revalidatePath("/");
}

export async function updateOrgPlan() {
  await fetch("http://localhost:3000/api/orgs/org1", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plan: "pro" }),
  });
  console.log("updateOrgPlan");

  (revalidateTag as any)("orgs");
}
