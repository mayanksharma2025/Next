// app/conflict-fetch/page.tsx (CHILD ❌ FETCH CONFLICT)
export const dynamic = "force-static";
export const fetchCache = "only-no-store";
// ❗ static route but forbids cache

export default async function Page() {
  const data = await fetch("http://localhost:4000/products").then((r) =>
    r.json(),
  );

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl">❌ Static + No-Store Conflict</h1>
      {data.map((p: any) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
