real production caching control:
👉 cacheTag + updateTag = manual cache invalidation
✅ Cached users list (cacheTag)
✅ Add user (Server Action)
✅ Cache invalidation (updateTag)
✅ json-server backend
✅ TypeScript

What Happens (IMPORTANT)
🟢 First Load
Users() runs →
fetch API →
result cached with tag "users"

➕ Add New User
Enter name
Submit form
Server Action runs →
POST /users →
updateTag("users") 🔥

🔄 After Mutation
Cache is invalidated
Next render:
Users() runs AGAIN
Fresh data fetched
UI updated ✅
🧠 Deep Insight (Interview Level)
Without updateTag

❌ Problem:

Users cached →
new user added →
UI still shows old data
With updateTag

✅ Solution:

invalidate("users") →
force re-fetch →
fresh UI
⚡ Internal Model
Cache Entry:
{
key: Users(),
tag: "users",
data: [...]
}
When you call:
updateTag('users')

➡️ Next.js:

delete all cache entries with tag "users"

🔥 Real Production Use Cases

| Use Case     | Tag          |
| ------------ | ------------ |
| Products     | "products"   |
| Cart         | "cart"       |
| Posts        | "posts"      |
| User Profile | `user-${id}` |

⚠️ Common Mistakes
❌ Forgetting cacheTag
updateTag('users') // won't work if no cacheTag
❌ Overusing single tag
cacheTag('data') // too generic
❌ Not revalidating after mutation
🚀 Next Level (Highly Recommended)

If you want real mastery, next:

🔥 Granular caching
cacheTag(`user-${id}`)
🔥 Partial invalidation
only update one user
not whole list
🔥 Combine with:
Suspense
streaming
optimistic UI

<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### 1️⃣ Clone or Create the Project

npx create-next-app@latest nextjs14-tanstack-crud
cd nextjs14-tanstack-crud

### 2️⃣ Install Dependencies

npm install next react react-dom \
@tanstack/react-query @tanstack/react-query-devtools \
axios tailwindcss postcss autoprefixer \
clsx json-server typescript

### 3️⃣ Initialize TailwindCSS

npx tailwindcss init -p

## Then make sure your tailwind.config.js looks like:

module.exports = {
content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
theme: { extend: {} },
plugins: [],
}

### Then start your mock backend:

npm run json-server

### 6️⃣ (Optional) Add .env.local

NEXT_PUBLIC_JSON_SERVER_URL=http://localhost:3001

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->
