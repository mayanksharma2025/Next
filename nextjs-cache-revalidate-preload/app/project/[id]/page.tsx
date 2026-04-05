import { getCachedProject, getCachedTasks, preloadProjectPage } from "@/lib/db";
import { slowPermissionCheck } from "@/lib/api";
import ProjectHeader from "./components/ProjectHeader";
import TasksList from "./components/TasksList";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  // preload everything
  preloadProjectPage(id);

  const hasAccess = await slowPermissionCheck();
  if (!hasAccess) return <div className="p-4 text-red-500">No Access</div>;

  return (
    <div className="p-6 space-y-6">
      <ProjectHeader id={id} />
      <TasksList id={id} />
    </div>
  );
}

// http://localhost:3000/project/pr1

// ✅ Features you now see in action:

// Deduplication – repeated calls to getCachedTasks → only 1 fetch.
// Preloading – preloadProjectPage removes waterfall for page + tasks.
// Time-based revalidation – fetch uses next: { revalidate: 60 }.
// Server-side only – no client code, fully SEO-friendly.
// Nested components – project + tasks + items all deduped.
