// app/AddProjectButton.tsx (ONLY CLIENT PART)
"use client";

import { useTransition } from "react";

export default function AddProjectButton({
  action,
}: {
  action: () => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => action())}
      disabled={isPending}
      className="bg-slate-600 p-3 rounded text-white cursor-pointer hover:bg-slate-700 transition"
    >
      {isPending ? "Adding..." : "Add Project"}
    </button>
  );
}
