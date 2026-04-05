// app/error/page.tsx
export const dynamic = "error";
export const fetchCache = "only-cache";

export default async function ErrorPage() {
  // ❌ this would throw if using no-store
  const products = await fetch("http://localhost:4000/products", {
    cache: "force-cache",
  }).then((res) => res.json());

  return (
    <div className="p-6">
      <h1 className="font-bold">Only Cache Allowed</h1>
      {products.map((p: any) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
