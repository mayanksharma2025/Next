// app/mixed/page.tsx
export const dynamic = "auto";
export const fetchCache = "default-no-store";

export default async function MixedPage() {
  // 🔹 no cache by default (because default-no-store)
  const products = await fetch("http://localhost:4000/products").then((res) =>
    res.json(),
  );

  // 🔹 explicitly cached
  const cachedProducts = await fetch("http://localhost:4000/products", {
    cache: "force-cache",
  }).then((res) => res.json());

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Mixed Cache Behavior</h1>

      <div>
        <h2>No Cache (default-no-store)</h2>
        {products.map((p: any) => (
          <div key={p.id}>{p.name}</div>
        ))}
      </div>

      <div>
        <h2>Forced Cache</h2>
        {cachedProducts.map((p: any) => (
          <div key={p.id}>{p.name}</div>
        ))}
      </div>
    </div>
  );
}
