// app/page.tsx
import { cacheLife, cacheTag } from "next/cache";
import { addUser } from "./actions";
import type { User } from "@/app/types/user";

export default function Page() {
  return (
    <main style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Users Dashboard</h1>

      {/* Add User Form */}
      <form action={addUser} style={{ marginBottom: 20 }}>
        <input
          name="name"
          placeholder="Enter user name"
          required
          style={{ padding: 8, marginRight: 10 }}
        />
        <button type="submit">Add User</button>
      </form>

      {/* Cached Users List */}
      <Users />
    </main>
  );
}

// 🟢 Cached Component with Tag
async function Users() {
  "use cache";

  cacheLife("minutes"); // cache duration
  cacheTag("users"); // 🔥 attach tag

  const res = await fetch("http://localhost:4000/users");
  const users: User[] = await res.json();

  return (
    <div>
      <h2>Users (Cached)</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}
