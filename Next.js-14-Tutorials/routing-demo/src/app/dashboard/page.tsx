'use client'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard Home</h1>
      <p>Click a link to open modal:</p>
      <Link href="/paper/1">Paper 1</Link> &ensp;
      <Link href="/paper/2">Paper 2</Link> &ensp;
      <Link href="/paper/3">Paper 3</Link>
    </div>
  )
}

// 1️⃣ Folder Structure

// app/
//  ├─ paper/
//  │   └─ [id]/
//  │       └─ page.tsx        ← Full page view
//  ├─ dashboard/
//  │   ├─ layout.tsx           ← Dashboard layout
//  │   ├─ page.tsx             ← Dashboard home
//  │   └─ @modal/
//  │       └─ (.)paper/
//  │           └─ [id]/
//  │               └─ page.tsx  ← Intercepted modal

// 2️⃣ Full Page /paper/[id]/page.tsx

// app/paper/[id]/page.tsx
// export default function PaperFullPage({ params }: any) {
//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Full Page Paper {params.id}</h1>
//       <p>This is the normal full page view.</p>
//     </div>
//   )
// }

// 3️⃣ Dashboard Layout /dashboard/layout.tsx

// app/dashboard/layout.tsx
// export default function DashboardLayout({
//   children,
//   modal, // Must match @modal folder name
// }: {
//   children: React.ReactNode
//   modal: React.ReactNode
// }) {
//   return (
//     <div>
//       <header style={{ background: '#eee', padding: 10 }}>
//         <h1>Dashboard Header</h1>
//       </header>
//       <main style={{ padding: 20 }}>{children}</main>
//       {modal} {/* Intercepted modal renders here */}
//     </div>
//   )
// }

// 4️⃣ Dashboard Home /dashboard/page.tsx

// 'use client'
// import Link from 'next/link'

// export default function DashboardPage() {
//   return (
//     <div>
//       <h1>Dashboard Home</h1>
//       <p>Click a link to open modal:</p>
//       <Link href="/paper/1">Paper 1</Link> &ensp;
//       <Link href="/paper/2">Paper 2</Link> &ensp;
//       <Link href="/paper/3">Paper 3</Link>
//     </div>
//   )
// }

// 5️⃣ Intercepted Modal /dashboard/@modal/(.)paper/[id]/page.tsx

// 'use client'
// import { useRouter } from 'next/navigation'

// export default function PaperModal({ params }: any) {
//   const router = useRouter()

//   return (
//     <div
//       style={{
//         position: 'fixed',
//         inset: 0,
//         background: 'rgba(0,0,0,0.5)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//       onClick={() => router.back()}
//     >
//       <div
//         style={{
//           background: '#fff',
//           padding: 20,
//           minWidth: 300,
//           textAlign: 'center',
//         }}
//       >
//         <h2>Intercepted Modal Paper {params.id}</h2>
//         <p>Click anywhere outside to close</p>
//       </div>
//     </div>
//   )
// }

// 6️⃣ Expected Behavior

// | Action                 | Result                              |
// | ---------------------- | ----------------------------------- |
// | `/dashboard` visit     | Dashboard page                      |
// | Click link `/paper/1`  | Modal opens inside dashboard layout |
// | Refresh `/paper/1`     | Full page `/paper/[id]` loads       |
// | Click modal background | `router.back()` → back to dashboard |
