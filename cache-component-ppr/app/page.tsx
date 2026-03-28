// app/page.tsx
import { Suspense } from "react";
import { cookies } from "next/headers";
import { cacheLife } from "next/cache";
import { toggleTheme } from "./actions";

export default function Page() {
  return (
    <main style={{ padding: 20, fontFamily: "sans-serif" }}>
      {/* Static */}
      <h1>Dashboard</h1>

      {/* Cached */}
      <Users />

      {/* Dynamic */}
      <Suspense fallback={<p>Loading preferences...</p>}>
        <UserPrefs />
      </Suspense>
    </main>
  );
}

// 🟢 Cached Component
async function Users() {
  "use cache";
  cacheLife("hours");

  const res = await fetch("http://localhost:4000/users");
  const users: { id: string; name: string }[] = await res.json();

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Users (Cached)</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}

// 🔴 Dynamic Component
async function UserPrefs() {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "light";

  return (
    <div style={{ marginTop: 20 }}>
      <h2>User Preferences (Dynamic)</h2>

      <p>
        Current Theme: <strong>{theme}</strong>
      </p>

      {/* Server Action Form */}
      <form action={toggleTheme}>
        <button
          type="submit"
          style={{
            padding: "8px 12px",
            cursor: "pointer",
            marginTop: 10,
          }}
        >
          Toggle Theme
        </button>
      </form>
    </div>
  );
}

{
  /*
  What You Will See

    Initial Load:
    Users → instantly visible (cached)
    Theme → "light" (default)

    Click Button:

    Form triggers Server Action
    Cookie updates (theme=dark)
    Page refreshes
    Theme updates ✅


    🧠 What’s Happening Internally
      🟢 Users Component
        'use cache'
        Runs at build/request once
        Cached for hours
        Same for all users

      🔴 UserPrefs Component
        cookies()
        Runs on EVERY request
        Cannot be cached
        Personalized

      🔁 Button Flow
        Click →
        Server Action →
        cookie updated →
        Next.js re-renders →
        UserPrefs runs again →


        ⚡ Important Insight

        👉 Only UserPrefs re-runs, NOT Users

        This is Partial Prerendering (PPR) in action:

        | Part  | Behavior              |
        | ----- | --------------------- |
        | Users | cached (static shell) |
        | Theme | dynamic (streamed)    |

  
  */
}
