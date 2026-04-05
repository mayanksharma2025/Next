// app/page.tsx
export const dynamic = "auto";
export const fetchCache = "default-cache";

import { getCachedOrders } from "@/lib/db";

export default async function Page() {
  // 🔹 products (fetch cache)
  const products = await fetch("http://localhost:4000/products", {
    cache: "force-cache",
  }).then((res) => res.json());

  // 🔹 orders (DB cache)
  const orders = await getCachedOrders();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Store Dashboard</h1>

      {/* PRODUCTS */}
      <div className="p-4 border rounded">
        <h2 className="font-semibold">Products (cached fetch)</h2>
        {products.map((p: any) => (
          <div key={p.id}>
            {p.name} - ₹{p.price}
          </div>
        ))}
      </div>

      {/* ORDERS */}
      <div className="p-4 border rounded">
        <h2 className="font-semibold">Orders (unstable_cache)</h2>
        {orders.map((o: any) => (
          <div key={o.id}>
            Order: {o.id} → {o.productId}
          </div>
        ))}
      </div>
    </div>
  );
}
