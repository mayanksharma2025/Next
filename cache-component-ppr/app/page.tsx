// app/posts/page.tsx
import { cacheLife } from "next/cache";

export default async function PostsPage() {
  "use cache";
  cacheLife("hours");

  const res = await fetch("http://localhost:4000/posts");
  const posts = await res.json();

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((p: any) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </div>
  );
}

{
  /*
      🧠 Difference        vs       Data-level
      
      Data-level	                   UI-level
      reusable	                     tied to component
      flexible	                     simple
      best for shared logic	         best for page-level caching
  */
}
