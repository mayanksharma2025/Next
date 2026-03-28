// app/page.tsx
import { Suspense } from "react";
import { cookies } from "next/headers";
import { Projects } from "./components/Projects";
import { AddProjectForm } from "./components/AddProjectForm";
import UserSetter from "./components/UserSetter";

export default function Page() {
  return (
    <main style={{ padding: 20 }}>
      <h1>SaaS Dashboard</h1>

      <Suspense fallback={<p>Loading dashboard...</p>}>
        <Dashboard />
      </Suspense>
    </main>
  );
}

// 🔴 Runtime layer
async function Dashboard() {
  const userId = (await cookies()).get("userId")?.value;

  if (!userId) return <p>No user logged in</p>;

  return (
    <>
      <UserSetter />
      <AddProjectForm userId={userId} />
      <Projects userId={userId} />
    </>
  );
}
