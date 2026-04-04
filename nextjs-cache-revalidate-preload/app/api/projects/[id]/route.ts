import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const dbPath = path.join(process.cwd(), "db.json");

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  // ✅ unwrap params
  const { id } = await context.params;

  const { title } = await req.json();

  const data = await fs.readFile(dbPath, "utf-8");
  const json = JSON.parse(data);

  // ✅ match ID correctly (string-safe)
  const index = json.posts.findIndex((p: any) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  json.posts[index].title = title;

  await fs.writeFile(dbPath, JSON.stringify(json, null, 2));

  return NextResponse.json(json.posts[index]);
}
