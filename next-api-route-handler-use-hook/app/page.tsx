// 4. Streaming / React 18 Suspense with Next.js 16
// Next.js 16 supports React 18 streaming using Server Components.

// app/page.js
import { Suspense } from 'react'
import Posts from './_components/Posts'

export default function Page() {
  return (
    <div>
      <h1>Streaming Posts</h1>
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

  */
}
