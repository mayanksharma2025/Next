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
  const [sending, setSending] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {/* ✅ optimistic preview */}
      {sending && (
        <div className="text-sm border p-2 rounded opacity-60 italic">
          {sending} (sending...)
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!content.trim()) return;

          const value = content;

          setContent(""); // clear input
          setSending(value); // ✅ show optimistic text

          startTransition(async () => {
            try {
              await onAdd(value);
            } finally {
              setSending(null); // remove after done
            }
          });
        }}
        className="flex gap-2"
      >
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add comment..."
          className="flex-1 border p-3 rounded"
        />

        <button
          disabled={pending}
          className="bg-black text-white px-4 rounded flex items-center gap-2"
        >
          {pending && <span className="animate-spin">⏳</span>}
          Add
        </button>
      </form>
    </div>
  );
}
