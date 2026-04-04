export async function getUsers() {
  const res = await fetch("http://localhost:3000/api/users", {
    cache: "force-cache",
    next: { tags: ["users"] },
  });
  return res.json();
}

export async function getOrgs() {
  const res = await fetch("http://localhost:3000/api/orgs", {
    cache: "force-cache",
    next: { tags: ["orgs"] },
  });
  return res.json();
}

export async function getProjects() {
  const res = await fetch("http://localhost:3000/api/projects", {
    cache: "force-cache",
    next: { tags: ["projects"] },
  });
  return res.json();
}
