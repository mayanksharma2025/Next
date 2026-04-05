// app/override/page.tsx (CHILD ✅ FORCE OVERRIDE)
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
// ✅ force overrides parent safely

export default async function Page() {
  const data = await fetch("http://localhost:4000/products").then((r) =>
    r.json(),
  );

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl">✅ Forced Dynamic Override</h1>
      {data.map((p: any) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
