"use client";

export default function ThemeButton() {
  const setTheme = async (theme: string) => {
    await fetch("/api/set-theme", {
      method: "POST",
      body: JSON.stringify({ theme }),
    });

    // reload to see updated cookie
    window.location.reload();
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={() => setTheme("light")}
        className="px-4 py-2 bg-gray-200 text-black"
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
