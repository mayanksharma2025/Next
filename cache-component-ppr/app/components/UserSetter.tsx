"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserSetter() {
  const [userId, setUserId] = useState("");
  const router = useRouter();

  const handleSetUser = async () => {
    if (!userId) return;

    await fetch("/api/set-user", {
      method: "POST",
      body: JSON.stringify({ userId }),
    });

    // ✅ refresh server components (no full reload)
    router.refresh();
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter User ID"
        style={{ padding: 8, marginRight: 10 }}
      />

      <button onClick={handleSetUser} style={{ padding: 8 }}>
        Set User
      </button>
    </div>
  );
}
