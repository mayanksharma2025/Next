import { addPost, getPosts } from "@/lib/db";
import { NextResponse } from "next/server";
import { Post } from "@/types/post";

export async function GET() {
  const posts: Post[] = await getPosts();
  return NextResponse.json(posts);
}
export async function POST(req: Request) {
  const body = await req.json(); // ✅ get request body
  const title = body.title;

  await addPost(title); // ✅ call function

  const posts = await getPosts(); // ✅ return updated list

  return NextResponse.json(posts);
}
