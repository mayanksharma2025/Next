// app/page.tsx
export const dynamic = "auto";
export const fetchCache = "auto";

export default async function Page() {
  // 🔹 fetch caching
  const posts = await fetch("http://localhost:4000/posts", {
    cache: "force-cache",
  }).then((res) => res.json());

  // 🔹 DB caching via unstable_cache
  const user = await (await import("@/lib/db")).getCachedUser("u1");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* USER */}
      <div className="p-4 border rounded-lg">
        <h2 className="font-semibold">User</h2>
        <p>{user.name}</p>
      </div>

      {/* POSTS */}
      <div className="p-4 border rounded-lg">
        <h2 className="font-semibold">Posts (force-cache)</h2>
        {posts.map((p: any) => (
          <div key={p.id} className="text-sm">
            {p.title}
          </div>
        ))}
      </div>
    </div>
  );
}
