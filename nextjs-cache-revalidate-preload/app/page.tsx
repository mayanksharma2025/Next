// app/page.tsx (CHILD ❌ CONFLICT)
export const dynamic = "force-dynamic";
// ❗ child: fully dynamic

export default async function Page() {
  const data = await fetch("http://localhost:4000/products").then((r) =>
    r.json(),
  );

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Conflict: Static vs Dynamic</h1>
      {data.map((p: any) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
