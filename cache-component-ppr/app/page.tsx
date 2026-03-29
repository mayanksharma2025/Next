import OptimisticUI from "./components/OptimisticUI";
import SWRDemo from "./components/SWRDemo";

async function getPosts() {
  "use cache";
  const res = await fetch("http://localhost:3000/api/posts", {
    next: { tags: ["posts"] },
  });
  return res.json();
}

export default async function Page() {
  const posts = await getPosts();

  return (
    <div style={{ padding: 20 }}>
      <h1>Next.js Cache vs SWR Demo</h1>

      <OptimisticUI posts={posts} />

      <hr />

      <SWRDemo />

      <hr />

      <p>
        <b>Observe:</b>
        <br />
        - Optimistic UI updates instantly + stays consistent (updateTag)
        <br />
        - SWR updates instantly but is client-side only
        <br />
      </p>
    </div>
  );
}

// ==============================
// WHAT YOU LEARN FROM THIS
// ==============================
// 1. Optimistic UI + updateTag = instant + consistent server state
// 2. SWR = instant but client-only cache
// 3. revalidateTag would NOT update UI instantly
// ==============================
