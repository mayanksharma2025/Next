// app/static/page.tsx (CHILD ✅ MATCH STATIC)
export const dynamic = "force-static";
// ✅ matches parent

export default async function Page() {
  const data = await fetch("http://localhost:4000/products", {
    cache: "force-cache",
  }).then((r) => r.json());

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Static OK</h1>
      {data.map((p: any) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
