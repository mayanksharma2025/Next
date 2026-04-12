"use client";

import { useState, useTransition } from "react";

type Props = {
  onSubmit: (form: FormData) => Promise<void>;
  defaultValues?: {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
  };
};

export function TaskForm({ onSubmit, defaultValues }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        startTransition(() => onSubmit(formData));
      }}
      className="space-y-4 text-white hover:shadow-lg hover:border-slate-300 transition-all duration-200"
    >
      <input
        name="title"
        defaultValue={defaultValues?.title}
        placeholder="Title"
        required
        className="w-full border p-2 rounded"
      />

      <textarea
        name="description"
        defaultValue={defaultValues?.description}
        placeholder="Description"
        className="w-full border p-2 rounded"
      />

      <select
        name="status"
        className="w-full border p-2 rounded text-blue-500"
        defaultValue={defaultValues?.status ?? "pending"}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In-progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        name="priority"
        className="w-full border p-2 rounded text-blue-500"
        defaultValue={defaultValues?.priority ?? "low"}
      >
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>

      <button
        disabled={pending}
        className="bg-black rounded-full px-4 py-3 border border-blue-600 shrink-0 text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline transition"
      >
        {pending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

// 5. ✅ Optional (Better Optimistic UX)
// import { useRouter } from "next/navigation";

// const router = useRouter();

// startTransition(async () => {
//   await onSubmit(formData);
//   router.push("/tasks"); // feels instant
// });
