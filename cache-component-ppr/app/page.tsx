import { Post } from "@/types/post";
import { addPostWithUpdate } from "./action";
import { Suspense } from "react";
import { AddPostForm } from "./components/AddPostForm";
import { cacheLife } from "next/cache";

export async function getCachedPosts(): Promise<Post[]> {
  "use cache";
  cacheLife("minutes"); // Product data updated multiple times per day
  const res = await fetch("http://localhost:3000/api/posts", {
    next: { tags: ["posts"] },
  });

  if (!res.ok) return [];

  return res.json();
}

async function Posts() {
  const posts = await getCachedPosts();

  return (
    <>
      <h1>Posts</h1>

      <ul>
        {posts.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </>
  );
}

export default async function Page() {
  return (
    <div style={{ padding: 20 }}>
      <Suspense fallback={<p>Loading...</p>}>
        <Posts />
      </Suspense>
      <hr />

      <h2>Add Post (revalidateTag)</h2>
      {/* <form action={addPostWithRevalidate}>
        <input name="title" placeholder="Title" />
        <button type="submit">Add (Revalidate)</button>
      </form> */}
      <AddPostForm />

      <h2>Add Post (updateTag)</h2>
      <form action={addPostWithUpdate}>
        <input name="title" placeholder="Title" />
        <button type="submit">Add (Update)</button>
      </form>

      <p style={{ marginTop: 20 }}>
        <strong>Try this:</strong>
        <br />
        - Add using revalidateTag → UI updates for client form
        <br />- Add using updateTag → UI updates instantly
      </p>
    </div>
  );
}
