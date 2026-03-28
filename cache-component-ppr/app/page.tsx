// app/page.tsx
import { Suspense } from "react";
import { getSessionUser } from "@/app/lib/auth";
import { OrgInfo } from "./components/OrgInfo";
import { ProjectsSection } from "./components/ProjectsSection";
import UserSetter from "./components/UserSetter";

export default function Page() {
  return (
    <main style={{ padding: 20 }}>
      <h1>SaaS Dashboard</h1>
      <h2>Add User ID Either u1 or u2</h2>
      <UserSetter />
      <Suspense fallback={<p>Loading...</p>}>
        <Dashboard />
      </Suspense>
    </main>
  );
}

async function Dashboard() {
  const user = await getSessionUser();

  if (!user) return <p>Please login</p>;

  return (
    <>
      <OrgInfo orgId={user.orgId} />
      <ProjectsSection userId={user.id} orgId={user.orgId} />
    </>
  );
}
