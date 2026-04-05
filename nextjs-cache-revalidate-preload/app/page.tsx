// app/page.tsx (CHILD ❌ FULL CONFLICT)
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
// ❗ tries to be fully dynamic

export default async function Page() {
  const data = await fetch("http://localhost:4000/products").then((r) =>
    r.json(),
  );

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl">❌ Static vs Dynamic + Cache Conflict</h1>
      {data.map((p: any) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
