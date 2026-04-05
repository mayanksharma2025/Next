// app/illegal/page.tsx (CHILD 4 - INVALID ❌)
export const fetchCache = "only-cache";
// ❌ conflicts with parent default-no-store

export default async function Page() {
  const data = await fetch("http://localhost:4000/products").then((r) =>
    r.json(),
  );

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl">Invalid Combination</h1>
      {data.map((p: any) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
