import { readDB, writeDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const { plan } = await req.json();

  const db = await readDB();

  //   console.log("updateOrgPlan", id, plan);

  const org = db.orgs.find((o: any) => o.id === id);

  if (!org) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  org.plan = plan;

  await writeDB(db);

  return Response.json(org);
}
