// app/dynamic/page.tsx
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function DynamicPage() {
  const posts = await fetch("http://localhost:4000/posts").then((res) =>
    res.json(),
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Dynamic Page</h1>
      {posts.map((p: any) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </div>
  );
}
