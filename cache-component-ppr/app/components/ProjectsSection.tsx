// app/components/ProjectsSection.tsx
import { cacheTag, cacheLife } from "next/cache";
import { getProjects } from "@/app/lib/api";
import { createProject } from "../actions";
import { getSessionUser } from "@/app/lib/auth";
import { canCreateProject } from "@/app/lib/rbac";

export async function ProjectsSection({
  userId,
  orgId,
}: {
  userId: string;
  orgId: string;
}) {
  const user = await getSessionUser();

  return (
    <div style={{ marginTop: 20 }}>
      <Projects orgId={orgId} />

      {user && canCreateProject(user.role) && (
        <form action={createProject}>
          <input type="hidden" name="orgId" value={orgId} />
          <input name="title" placeholder="New project" required />
          <button>Create</button>
        </form>
      )}
    </div>
  );
}

// 🟢 cached list
async function Projects({ orgId }: { orgId: string }) {
  "use cache";

  cacheLife("hours");
  cacheTag(`projects-org-${orgId}`);

  const projects = await getProjects(orgId);

  return (
    <>
      <h2>Projects</h2>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </>
  );
}
