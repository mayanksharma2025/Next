// app/page.tsx
import { cookies } from "next/headers";
import { Suspense } from "react";
import UserSetter from "./components/UserSetter";

export default function Page() {
  return (
    <main style={{ padding: 20 }}>
      <h1>Cache + Suspense Demo</h1>
      <UserSetter />

      <Suspense fallback={<p>Loading user...</p>}>
        <Wrapper />
      </Suspense>
    </main>
  );
}

// 🔴 Runtime component (NOT cached)
async function Wrapper() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return <p>No userId cookie found</p>;
  }

  return <CachedUser userId={userId} />;
}

// 🟢 Cached component
async function CachedUser({ userId }: { userId: string }) {
  "use cache";
  // console.log("userId", userId);
  const res = await fetch(`http://localhost:4000/users/${userId}`, {
    // optional: ensure fresh fetch behavior during dev
    cache: "no-store",
  });

  if (!res.ok) {
    return <p>User not found</p>;
  }

  const user = await res.json();

  return (
    <div>
      <h2>Cached User</h2>
      <p>Name: {user.name}</p>
      <p>User ID: {user.id}</p>
    </div>
  );
}
