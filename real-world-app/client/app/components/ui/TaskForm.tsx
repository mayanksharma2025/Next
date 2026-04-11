"use client";

import { useState } from "react";

type Props = {
  onSubmit: (form: FormData) => void;
  defaultValues?: {
    title?: string;
    description?: string;
  };
};

export function TaskForm({ onSubmit, defaultValues }: Props) {
  const [loading, setLoading] = useState(false);

  return (
    <form
      action={async (formData) => {
        setLoading(true);
        await onSubmit(formData);
      }}
      className="space-y-4"
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

      <select name="status" className="w-full border p-2 rounded">
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="DONE">DONE</option>
      </select>

      <select name="priority" className="w-full border p-2 rounded">
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>

      <button
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
