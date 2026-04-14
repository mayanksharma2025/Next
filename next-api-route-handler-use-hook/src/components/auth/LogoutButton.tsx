"use client";

import toast from "react-hot-toast";

export function LogoutButton() {
  async function logout() {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (res.ok) {
      toast.success("Logged out");
      window.location.replace("/login");
    } else {
      toast.error("Logout failed");
    }
  }

  return (
    <button
      onClick={logout}
      className="rounded bg-red-500 px-4 py-2 text-white"
    >
      Logout
    </button>
  );
}
