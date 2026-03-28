// app/components/OrgInfo.tsx
import { cacheTag, cacheLife } from "next/cache";
import { getOrg } from "@/app/lib/api";
import { upgradePlan } from "../actions";

export async function OrgInfo({ orgId }: { orgId: string }) {
  "use cache";

  cacheLife("hours");
  cacheTag(`org-${orgId}`);

  const org = await getOrg(orgId);

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Organization</h2>
      <p>Name: {org.name}</p>
      <p>Plan: {org.plan}</p>

      {org.plan === "free" && (
        <form action={upgradePlan.bind(null, orgId)}>
          <button>Upgrade to Pro</button>
        </form>
      )}
    </div>
  );
}
