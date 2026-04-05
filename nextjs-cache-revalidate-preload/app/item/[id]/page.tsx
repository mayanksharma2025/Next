// app/item/[id]/page.tsx
import { getItem, preload } from "@/lib/db";
import { checkIsAvailable } from "@/lib/api";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 🔹 PRELOAD (starts DB call early)
  preload(id);

  // simulate another blocking task
  const isAvailable = await checkIsAvailable();

  return isAvailable ? <Item id={id} /> : <div>Not available</div>;
}

// 🔹 COMPONENT USING SAME DATA
async function Item({ id }: { id: string }) {
  const item = await getItem(id);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{item.name}</h1>

      {/* 🔹 CALL AGAIN (deduplicated) */}
      <SubComponent id={id} />
    </div>
  );
}

// 🔹 SECOND CALL SAME DATA
async function SubComponent({ id }: { id: string }) {
  const item = await getItem(id);

  return <p className="text-sm">Again: {item.name}</p>;
}
