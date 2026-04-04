// lib/data.ts (SERVER ONLY)
export async function getOrg() {
  const res = await fetch("http://localhost:4000/orgs/org1", {
    cache: "force-cache",
    next: { tags: ["org"] },
  });
  return res.json();
}

export async function getProjects() {
  const res = await fetch("http://localhost:4000/projects", {
    cache: "force-cache",
    next: { tags: ["projects"] },
  });
  return res.json();
}
