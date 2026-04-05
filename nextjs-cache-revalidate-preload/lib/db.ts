// lib/db.ts (simulate DB query layer)
import { unstable_cache } from "next/cache";

export async function getOrdersFromDB() {
  const res = await fetch("http://localhost:4000/orders");
  return res.json();
}

// 🔹 cache DB query (orders)
export const getCachedOrders = unstable_cache(
  async () => {
    return getOrdersFromDB();
  },
  ["orders"],
  {
    tags: ["orders"],
    revalidate: 30,
  },
);
