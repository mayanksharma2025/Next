// app/projects/OptimisticProjects.tsx (CLIENT COMPONENT)
"use client";

import { useState, useTransition } from "react";
import { addProjectOptimistic } from "../actions";

import { resolveProjectsRace } from "@/lib/race-control";
import { useRealtimeProjects } from "./useRealtime";

type Project = {
  id: string;
  title: string;
  optimistic?: boolean;
};

export default function OptimisticProjects({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const [projects, setProjects] = useState(initialProjects);
  const [isPending, startTransition] = useTransition();

  async function handleAdd() {
    const tempId = "temp-" + Date.now();

    const optimisticProject: Project = {
      id: tempId,
      title: "New Project (optimistic)",
      optimistic: true,
    };

    // 1. OPTIMISTIC UI
    setProjects((prev) => [...prev, optimisticProject]);

    startTransition(async () => {
      const res = await addProjectOptimistic({
        tempId,
        title: "New Project",
      });

      if (!res.ok) {
        // 2. ROLLBACK
        setProjects((prev) => prev.filter((p) => p.id !== tempId));
        return;
      }

      // 3. RECONCILE (replace temp with real)
      setProjects((prev: any) =>
        prev.map((p: any) =>
          p.id === tempId
            ? { ...p, id: res.realId, title: "New Project", optimistic: false }
            : p,
        ),
      );
    });
  }

  // integrate race handling into OptimisticProjects.tsx

  //   useRealtimeProjects((incoming) => {
  //     setProjects((prev) => resolveProjectsRace(prev, incoming));
  //   });

  return (
    <div>
      <h2>Projects (Optimistic)</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-500 text-left">
            <tr>
              <th className="p-3">Title</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p: any) => (
              <tr key={p.id} className="border-t hover:bg-gray-800">
                <td className="p-3">
                  <div key={p.id} style={{ opacity: p.optimistic ? 0.5 : 1 }}>
                    {p.title} {p.optimistic && "(saving...)"}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleAdd}
        disabled={isPending}
        className="bg-green-600 text-white my-4 px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Add Project
      </button>
    </div>
  );
}
