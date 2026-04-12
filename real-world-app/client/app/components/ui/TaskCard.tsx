import type { Task } from "@/types/task";
import Link from "next/link";

export function TaskCard({ task }: { task: Task }) {
  return (
    <div className="flex justify-between items-start gap-3">
      {/* CARD */}
      <Link
        href={`/tasks/${task.id}`}
        className="group block flex-1 border border-slate-200 rounded-2xl p-5 bg-white hover:shadow-lg hover:border-slate-300 transition-all duration-200"
      >
        {/* Title */}
        <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition">
          {task.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-500 mt-1 line-clamp-2">
          {task.description}
        </p>

        {/* Bottom Meta */}
        <div className="flex justify-between items-center mt-4 text-xs">
          {/* Status Badge */}
          <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
            {task.status}
          </span>

          {/* Priority Badge */}
          <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 font-semibold">
            {task.priority}
          </span>
        </div>
      </Link>

      {/* EDIT BUTTON */}
      <Link
        href={`/tasks/form?id=${task.id}`}
        className="bg-white rounded-full px-3 py-1 border border-blue-600 shrink-0 text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline transition"
      >
        Edit
      </Link>
    </div>
  );
}
