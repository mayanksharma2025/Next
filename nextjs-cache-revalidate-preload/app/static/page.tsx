// app/static/page.tsx
export const dynamic = "force-static";
export const fetchCache = "only-cache";

export default async function StaticPage() {
  const posts = await fetch("http://localhost:4000/posts").then((res) =>
    res.json(),
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Static Page</h1>
      {posts.map((p: any) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </div>
  );
}
