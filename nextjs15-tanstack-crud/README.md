This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# 1. Clone repo or create project

npx create-next-app@latest nextjs14-tanstack-crud
cd nextjs14-tanstack-crud

# 2. Install deps

npm install next react react-dom \
@tanstack/react-query @tanstack/react-query-devtools \
axios tailwindcss postcss autoprefixer \
clsx json-server typescript

# 3. Initialize Tailwind

npx tailwindcss init -p

# 4. Add db.json and files above

# 5. Start JSON Server

npm run json-server

# 6. Start Next.js

npm run dev

<!-- Project Structure -->

nextjs14-tanstack-crud/
│
├── app/
│ ├── api/
│ │ ├── posts/
│ │ │ └── route.ts # CRUD proxy for posts (ISR invalidate)
│ │ └── users/
│ │ └── route.ts # CRUD proxy for users (optional: GET/POST/PUT/DELETE)
│ │
│ ├── users/
│ │ ├── [id]/
│ │ │ └── page.tsx # Dynamic user profile page (details + posts)
│ │ └── page.tsx # List of all users
│ │
│ ├── styles/
│ │ └── globals.css # Tailwind base styles
│ │
│ ├── layout.tsx # Root layout (providers, metadata)
│ └── page.tsx # Home page (PostList + PostForm)
│
├── components/
│ ├── PostForm.tsx # Create/update post form (mutation, optimistic)
│ ├── PostList.tsx # Infinite query list (pagination, search, sort)
│ ├── UserCard.tsx # Small card showing user info and photo
│ ├── UserList.tsx # Paginated list of all users
│ ├── UserProfile.tsx # Detailed user view (educations, experiences, posts)
│ └── Loader.tsx # Generic loading spinner (for reuse)
│
├── lib/
│ ├── apiClient.ts # Axios client (JSON Server base)
│ ├── queryClient.tsx # TanStack Query client/provider
│ ├── types.ts # Shared TypeScript types (User, Post, etc.)
│ └── utils.ts # Small helpers (formatDate, etc.)
│
├── hooks/
│ ├── useUsers.ts # TanStack Query hooks for users (list, detail, create, update)
│ ├── usePosts.ts # TanStack Query hooks for posts
│ └── useDebounce.ts # Debounce helper for search inputs
│
├── public/
│ ├── images/
│ │ ├── user1-1.jpg
│ │ ├── user1-2.jpg
│ │ └── post1.jpg
│ └── favicon.ico
│
├── styles/
│ └── globals.css # Tailwind base (duplicate for fallback)
│
├── db.json # JSON Server DB (users, posts, photos, etc.)
│
├── tailwind.config.js # Tailwind configuration
├── postcss.config.js # PostCSS config
├── next.config.js # Next.js config
├── package.json # Dependencies & scripts
├── tsconfig.json # TypeScript config
├── .env.local # Optional environment variables
├── .gitignore # Git ignore list
└── README.md # Documentation

npx json-server --watch db.json --port 3001 --middlewares ./middlewares.js
