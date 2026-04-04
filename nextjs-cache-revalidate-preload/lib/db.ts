import fs from "fs/promises";
import path from "path";

const dbPath = path.join(process.cwd(), "db.json");

export async function readDB() {
  const data = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(data);
}

export async function writeDB(data: any) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

// lib/data.ts (Cache Components model)
import { cacheTag } from "next/cache";

export async function getUsers() {
  "use cache";
  cacheTag("users");

  const res = await fetch("http://localhost:4000/users");
  return res.json();
}

export async function getOrgs() {
  "use cache";
  cacheTag("orgs");

  const res = await fetch("http://localhost:4000/orgs");
  return res.json();
}

export async function getProjects() {
  "use cache";
  cacheTag("projects");

  const res = await fetch("http://localhost:4000/projects");
  return res.json();
}
