// lib/race-control.ts (multi-user race strategy)
type Project = {
  id: string;
  title: string;
  version?: number;
};

// LAST WRITE WINS (version-based)
export function resolveProjectsRace(local: Project[], incoming: Project[]) {
  const map = new Map<string, Project>();

  for (const p of local) map.set(p.id, p);

  for (const incomingProject of incoming) {
    const existing = map.get(incomingProject.id);

    if (!existing) {
      map.set(incomingProject.id, incomingProject);
      continue;
    }

    const existingVersion = existing.version || 0;
    const incomingVersion = incomingProject.version || 0;

    // only update if newer
    if (incomingVersion > existingVersion) {
      map.set(incomingProject.id, incomingProject);
    }
  }

  return Array.from(map.values());
}
