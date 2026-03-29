import { getPosts } from "@/lib/db";
import { NextResponse } from "next/server";
import { Post } from "@/types/post";

export async function GET() {
  const posts: Post[] = await getPosts();
  return NextResponse.json(posts);
}
