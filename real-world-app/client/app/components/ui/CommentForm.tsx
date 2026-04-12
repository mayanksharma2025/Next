"use client";

import { useState, useTransition } from "react";

export function CommentForm({
  taskId,
  onAdd,
}: {
  taskId: string;
  onAdd: (content: string) => Promise<void>;
}) {
  const [content, setContent] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!content.trim()) return;

        const value = content;
        setContent(""); // ✅ optimistic clear

        startTransition(() => onAdd(value));
      }}
      className="flex gap-2 text-white hover:shadow-lg hover:border-slate-300 transition-all duration-200"
    >
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add comment..."
        className="flex-1 border p-4 rounded"
      />

      <button disabled={pending} className="bg-white text-black px-4 rounded">
        {pending ? "..." : "Add"}
      </button>
    </form>
  );
}
