import fs from "fs/promises";
import path from "path";
import { DB, Post } from "@/types/post";

const dbPath = path.join(process.cwd(), "db.json");

export async function getPosts(): Promise<Post[]> {
  const data = await fs.readFile(dbPath, "utf-8");
  const json: DB = JSON.parse(data);
  return json.posts;
}

export async function addPost(title: string): Promise<void> {
  const data = await fs.readFile(dbPath, "utf-8");
  const json: DB = JSON.parse(data);

  const newPost: Post = {
    id: Date.now(),
    title,
  };

  json.posts.push(newPost);

  await fs.writeFile(dbPath, JSON.stringify(json, null, 2));
}
