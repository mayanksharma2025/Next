"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export function ProjectSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const currentSearch = searchParams.get("search") || "";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const value = (form.search as any).value;

        startTransition(() => {
          router.push(`/projects?search=${value}`);
        });
      }}
      className="flex gap-2"
    >
      <input
        name="search"
        defaultValue={currentSearch}
        placeholder="Search projects..."
        className="border p-2 rounded w-full"
      />

      <button type="submit" className="bg-black text-white px-4 rounded">
        {pending ? "..." : "Search"}
      </button>
    </form>
  );
}
