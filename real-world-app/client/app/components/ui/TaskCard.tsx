import type { Task } from "@/types/task";
import Link from "next/link";

export function TaskCard({ task }: { task: Task }) {
  return (
    <Link
      href={`/tasks/${task.id}`}
      className="block border rounded-xl p-4 hover:shadow transition"
    >
      <h3 className="font-semibold text-lg">{task.title}</h3>
      <p className="text-sm text-gray-500">{task.description}</p>

      <div className="flex justify-between mt-3 text-xs">
        <span>{task.status}</span>
        <span>{task.priority}</span>
      </div>
    </Link>
  );
}
