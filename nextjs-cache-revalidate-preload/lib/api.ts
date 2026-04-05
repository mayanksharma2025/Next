// lib/db.ts (simulate DB / ORM)
export async function getItemFromDB(id: string) {
  console.log("DB CALL:", id); // 👀 watch this in terminal

  const res = await fetch(`http://localhost:4000/items/${id}`);
  return res.json();
}

export async function checkIsAvailable() {
  await new Promise((r) => setTimeout(r, 1000));
  return true;
}
