export async function getProject(id: string) {
  const res = await fetch(`http://localhost:4000/projects/${id}`, {
    cache: "force-cache",
    next: { revalidate: 60 },
  });
  return res.json();
}

export async function getTasks(projectId: string) {
  const res = await fetch(
    `http://localhost:4000/tasks?projectId=${projectId}`,
    { cache: "force-cache", next: { revalidate: 60 } },
  );
  return res.json();
}

// simulate a slow permission check
export async function slowPermissionCheck() {
  await new Promise((r) => setTimeout(r, 1000));
  return true;
}
