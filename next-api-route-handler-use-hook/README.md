2️⃣ INSTALLATION (CLEAN START)
Create project
npx create-next-app@latest next16-enterprise-app

Choose exactly:

✔ TypeScript
✔ ESLint
✔ Tailwind CSS
✔ App Router
✔ src/ directory
✔ Import alias (@/\*)

Enter project
cd next16-enterprise-app

Additional dependencies
npm install mongoose jsonwebtoken bcryptjs react-hot-toast

Dev dependencies
npm install -D @types/jsonwebtoken

3️⃣ INITIAL FILE STRUCTURE (PHASE 0)

This is the base skeleton.
No business logic yet.

src/
├── app/
│ ├── (auth)/
│ │ ├── login/
│ │ │ └── page.tsx
│ │ └── register/
│ │ └── page.tsx
│ │
│ ├── (dashboard)/
│ │ ├── dashboard/
│ │ │ ├── admin/
│ │ │ │ └── page.tsx
│ │ │ └── page.tsx
│ │
│ ├── api/
│ │ ├── auth/
│ │ │ ├── login/
│ │ │ │ └── route.ts
│ │ │ ├── register/
│ │ │ │ └── route.ts
│ │ │ └── logout/
│ │ │ └── route.ts
│ │ │
│ │ ├── users/
│ │ │ ├── route.ts
│ │ │ └── me/
│ │ │ └── route.ts
│ │ │
│ │ └── todos/
│ │ └── route.ts
│ │
│ ├── layout.tsx
│ ├── page.tsx
│ └── middleware.ts
│
├── components/
│ ├── ui/
│ │ ├── Button.tsx
│ │ ├── Input.tsx
│ │ └── Modal.tsx
│ │
│ ├── auth/
│ │ └── AuthForm.tsx
│ │
│ ├── dashboard/
│ │ ├── UserCard.tsx
│ │ └── TodoList.tsx
│ │
│ └── providers/
│ └── ToastProvider.tsx
│
├── lib/
│ ├── db.ts
│ ├── jwt.ts
│ ├── auth.ts
│ ├── rbac.ts
│ ├── rateLimit.ts
│ └── audit.ts
│
├── models/
│ ├── User.ts
│ └── Todo.ts
│
├── types/
│ ├── auth.ts
│ ├── user.ts
│ ├── todo.ts
│ └── pagination.ts
│
├── styles/
│ └── globals.css
│
└── middleware.ts

4️⃣ WHAT EACH MAJOR FOLDER IS FOR (VERY IMPORTANT)
app/

Routing, pages, API routes, middleware
Server Components by default

components/

Only UI and interaction logic
No DB, no fetch logic here

lib/

Infrastructure layer
(DB, JWT, RBAC, rate-limit, audit)

models/

Mongoose schemas
Database-only responsibility

types/

Strict TypeScript contracts
DTOs, entities, API responses

5️⃣ PHASE PLAN (SIMPLE & LINEAR)

We will not jump ahead again.

Phase 1 — Auth (Register, Login, Logout, Middleware)
Phase 2 — User Profile (Self-edit, Admin view)
Phase 3 — Todos CRUD (Optimistic updates)
Phase 4 — Education, Experience, Skills (Nested modals)
Phase 5 — Search, Pagination, Caching
Phase 6 — Audit logs, Rate limiting, Hardening
