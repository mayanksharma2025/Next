"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ThemeButton() {
  const router = useRouter();
  const [theme, setLocalTheme] = useState("light");

  const setTheme = async (newTheme: string) => {
    setLocalTheme(newTheme); // instant UI update

    await fetch("/api/set-theme", {
      method: "POST",
      body: JSON.stringify({ theme: newTheme }),
    });

    router.refresh();
  };

  return (
    <div className="space-y-3">
      <p>Current: {theme}</p>

      <button
        className="bg-white p-4 border my-2 text-black"
        onClick={() => setTheme("light")}
      >
        Light
      </button>
      <button className=" p-4 border my-2 " onClick={() => setTheme("dark")}>
        Dark
      </button>
    </div>
  );
}
