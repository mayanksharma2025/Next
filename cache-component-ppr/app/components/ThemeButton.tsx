"use client";

import { useRouter } from "next/navigation";

export default function ThemeButton() {
  const router = useRouter();

  const setTheme = async (theme: string) => {
    await fetch("/api/set-theme", {
      method: "POST",
      body: JSON.stringify({ theme }),
    });

    // ✅ Only refresh server components (no full reload)
    router.refresh();
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={() => setTheme("light")}
        className="px-4 py-2 bg-gray-200"
      >
        Light
      </button>

      <button
        onClick={() => setTheme("dark")}
        className="px-4 py-2 bg-black text-white"
      >
        Dark
      </button>
    </div>
  );
}
