import { getCachedTasks } from "@/lib/db";
import TaskItem from "./TaskItem";

export default async function TasksList({ id }: { id: string }) {
  const tasks = await getCachedTasks(id);
  return (
    <div className="p-4 border rounded space-y-2">
      <h2 className="font-semibold">Tasks</h2>
      {tasks.map((t: any) => (
        <TaskItem key={t.id} projectId={id} taskId={t.id} />
      ))}
    </div>
  );
}
