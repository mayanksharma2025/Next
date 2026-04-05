// app/auto/page.tsx (CHILD ⚠️ SAFE)
export const dynamic = "auto";
// ✅ allowed (does not break parent)

export default async function Page() {
  const data = await fetch("http://localhost:4000/products", {
    cache: "force-cache",
  }).then((r) => r.json());

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Auto (inherits static behavior)</h1>
      {data.map((p: any) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
