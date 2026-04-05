// app/mixed/page.tsx (CHILD ⚠️ SAFE MIX)
export const dynamic = "auto";
export const fetchCache = "default-cache";
// ✅ compatible with parent (doesn't break rules)

export default async function Page() {
  const data = await fetch("http://localhost:4000/products", {
    cache: "force-cache",
  }).then((r) => r.json());

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl">⚠️ Mixed but Safe</h1>
      {data.map((p: any) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
