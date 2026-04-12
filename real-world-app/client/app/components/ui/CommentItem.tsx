"use client";

import { useState } from "react";

export function CommentItem({
  comment,
  onUpdate,
  onDelete,
}: {
  comment: any;
  onUpdate: (id: string, content: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(comment.content);
  const [optimisticContent, setOptimisticContent] = useState(comment.content);
  const [loading, setLoading] = useState<"edit" | "delete" | null>(null);
  const [deleted, setDeleted] = useState(false);

  if (deleted) return null;

  return (
    <div
      className={`border p-3 rounded space-y-2 transition-all duration-200 ${
        loading ? "opacity-50 scale-[0.98] pointer-events-none" : ""
      }`}
    >
      {editing ? (
        <>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <div className="flex gap-2">
            {/* SAVE */}
            <button
              onClick={async () => {
                const old = optimisticContent;

                setOptimisticContent(value);
                setEditing(false);
                setLoading("edit");

                try {
                  await onUpdate(comment.id, value);
                } catch {
                  setOptimisticContent(old);
                } finally {
                  setLoading(null);
                }
              }}
              className="bg-black text-white px-3 py-1 rounded flex items-center gap-2"
            >
              {loading === "edit" && <Spinner />}
              Save
            </button>

            <button onClick={() => setEditing(false)} className="text-gray-500">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-sm">{optimisticContent}</p>

          <div className="flex justify-between text-xs text-gray-500">
            <span>— {comment.author.name}</span>

            <div className="flex gap-3 items-center">
              {/* EDIT */}
              <button
                onClick={() => setEditing(true)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>

              {/* DELETE (MATCHES EDIT UX) */}
              <button
                onClick={async () => {
                  setLoading("delete");

                  try {
                    await onDelete(comment.id);

                    // ✅ delay removal for smooth UX
                    setTimeout(() => {
                      setDeleted(true);
                    }, 150);
                  } catch {
                    setLoading(null);
                  }
                }}
                className="text-red-500 hover:underline flex items-center gap-2"
              >
                {loading === "delete" && <Spinner />}
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
  );
}
