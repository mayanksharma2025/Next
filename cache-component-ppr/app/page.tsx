// app/page.tsx
import { Suspense } from "react";

async function LiveUsers() {
  const res = await fetch("http://localhost:4000/users");
  const users = await res.json();

  return (
    <ul>
      {users.map((u: any) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <>
      <h1>Streaming Example</h1>

      <Suspense fallback={<p>Loading users...</p>}>
        <LiveUsers />
      </Suspense>
    </>
  );
}

{
  /* 
  🧠 Behavior
    Initial HTML → fallback
    Data → streamed later
    No caching at all
  
  */
}
