import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const dbPath = path.join(process.cwd(), "db.json");

async function readDB() {
  const data = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(data);
}

async function writeDB(data: any) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const db = await readDB();
  return NextResponse.json(db.projects);
}

export async function POST() {
  const db = await readDB();

  const newProject = {
    id: Date.now().toString(),
    orgId: "org1",
    title: "New Project",
  };

  db.projects.push(newProject);
  await writeDB(db);

  return NextResponse.json(newProject);
}
