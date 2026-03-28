🍪 10. Simulate Login

In browser DevTools → Cookies:

userId = u1 (admin)

or

userId = u2 (member)
🔍 11. End-to-End Flow
🔐 Auth
cookies → userId → fetch user → session

🧠 RBAC
role = admin → can create project
role = member → read-only

💳 Billing
Upgrade →
PATCH org →
updateTag("org-org1") →
UI refresh

🟢 Caching
Resource Tag
Org org-orgId
Projects projects-org-orgId

🔄 Invalidation
Action Invalidates
Create project projects-org-_
Upgrade plan org-_
🧠 Why This Is “Real SaaS”
✅ Multi-tenant isolation
cacheTag(`projects-org-${orgId}`)
✅ Fine-grained invalidation
Not global
Scoped per org

✅ Separation of concerns

| Layer   | Responsibility |
| ------- | -------------- |
| auth    | identity       |
| rbac    | permissions    |
| api     | data           |
| cache   | performance    |
| actions | mutation       |

✅ Scalable mental model
User → Org → Resources
↓
cache per tenant
⚠️ Production Upgrades

Replace:

json-server → Postgres + Prisma
manual auth → Auth.js / Clerk
fake billing → Stripe Webhooks
memory cache → Vercel Edge Cache

🚀 Final Insight

This architecture gives you:

SSR + ISR + Streaming + Per-tenant caching + Real-time invalidation

👉 That’s exactly how modern SaaS dashboards are built.
