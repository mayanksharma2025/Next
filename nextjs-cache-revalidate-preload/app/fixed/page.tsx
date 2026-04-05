// app/fixed/page.tsx (CHILD 2 - FIX ✅)
export const fetchCache = "default-no-store";
// ✅ matches parent → no conflict

export default async function Page() {
  const data = await fetch("http://localhost:4000/products").then((r) =>
    r.json(),
  );

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl">Fixed (No Conflict)</h1>
      {data.map((p: any) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
