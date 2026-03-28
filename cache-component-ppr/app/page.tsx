// app/page.tsx
import { cookies } from "next/headers";
import { Suspense } from "react";
import type { User } from "@/app/types/user";
import { fetchUser } from "@/app/lib/api";

export default function Page() {
  return (
    <main style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Runtime → Cached Bridge Demo</h1>

      <Suspense fallback={<p>Loading user...</p>}>
        <Wrapper />
      </Suspense>
    </main>
  );
}

// 🔴 Runtime Component (reads cookie)
async function Wrapper() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return (
      <div>
        <p>❌ No userId cookie found</p>
        <p>👉 Set cookie: userId=1</p>
      </div>
    );
  }

  return <CachedUser userId={userId} />;
}

// 🟢 Cached Component (PURE + DETERMINISTIC)
async function CachedUser({ userId }: { userId: string }) {
  "use cache";

  try {
    const user: User = await fetchUser(userId);

    return (
      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <h2>✅ Cached User Data</h2>
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    );
  } catch (error) {
    return <p>❌ Failed to load user</p>;
  }
}

{
  /*
    Chrome DevTools:
      Go to → Application
      Cookies → localhost:3000

      Add:

      Name: userId
      Value: 1
  */
}
