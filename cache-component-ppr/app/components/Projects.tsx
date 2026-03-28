// app/components/Projects.tsx
import { cacheTag, cacheLife } from "next/cache";
import { getUserProjects } from "@/app/lib/api";
import type { UserWithProjects } from "@/app/types";

export async function Projects({ userId }: { userId: string }) {
  "use cache";

  cacheLife("minutes");

  // 🔥 per-user cache
  cacheTag(`projects-user-${userId}`);

  const data: UserWithProjects = await getUserProjects(userId);

  return (
    <div>
      <h2>{data.name}'s Projects</h2>

      {data.projects.length === 0 ? (
        <p>No projects yet</p>
      ) : (
        <ul>
          {data.projects.map((p) => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
