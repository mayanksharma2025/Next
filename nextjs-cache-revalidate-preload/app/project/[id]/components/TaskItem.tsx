import { getCachedTasks } from "@/lib/db";

export default async function TaskItem({
  projectId,
  taskId,
}: {
  projectId: string;
  taskId: string;
}) {
  // repeated call is deduped
  const tasks = await getCachedTasks(projectId);
  const task = tasks.find((t: any) => t.id === taskId);
  return <div className="text-md">• {task.title}</div>;
}
