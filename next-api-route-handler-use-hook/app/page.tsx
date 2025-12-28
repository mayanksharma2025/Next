// app/page.tsx
import { Suspense } from 'react'
import Posts from '../app/_components/Posts'

export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Streaming Posts</h1>
      <Suspense fallback={<p>Loading posts...</p>}>
        <Posts />
      </Suspense>
    </div>
  )
}

{
  /* 
 ✅ Notes:

 Suspense allows partial rendering while server fetch is streaming.
 ✅ Server-rendered with Suspense streaming, no client hooks.
  */
}
