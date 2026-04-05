// lib/data.ts
export async function getUser() {
  const res = await fetch("http://localhost:4000/users/u1", {
    cache: "force-cache",
    next: { tags: ["user"] },
  });
  return res.json();
}

export async function getActivities() {
  const res = await fetch("http://localhost:4000/activities", {
    cache: "force-cache",
    next: { tags: ["activities"] },
  });
  return res.json();
}
