"use client";

import { useState, useTransition } from "react";

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
  const [pending, startTransition] = useTransition();

  return (
    <div className="border p-3 rounded space-y-2">
      {editing ? (
        <>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <div className="flex gap-2">
            <button
              onClick={() => {
                startTransition(async () => {
                  await onUpdate(comment.id, value);
                  setEditing(false);
                });
              }}
              className="text-green-600 text-sm"
            >
              Save
            </button>

            <button
              onClick={() => setEditing(false)}
              className="text-gray-500 text-sm"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-sm">{comment.content}</p>

          <div className="flex justify-between text-xs text-gray-500">
            <span>— {comment.author.name}</span>

            <div className="flex gap-2">
              <button
                onClick={() => setEditing(true)}
                className="text-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() => startTransition(() => onDelete(comment.id))}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
