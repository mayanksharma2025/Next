// app/components/Posts.tsx
import { use } from 'react'
import { Post } from '../types'

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: { revalidate: 10 },
  })
  return res.json()
}

export default function Posts() {
  const posts = use(fetchPosts()) // server component hook

  return (
    <ul className="p-5 flex flex-wrap h-120">
      {posts.slice(0, 10).map((post) => (
        <li
          key={post.id}
          className="
        bg-[#cfc5c5]
        m-5
        px-16
        py-5
        text-base
        font-semibold
        flex-[1_1_25%]
        text-black
      "
        >
          {post.title}
        </li>
      ))}
    </ul>
  )
}

{
  /*  

  ✅ Highlights:

  Full server rendering.

  Streaming compatible.

  TypeScript-safe.

  use() eliminates the need for useEffect or async component wrapper.

  Key Takeaways for Server Component + use()

  use() resolves Promises directly in server components.

  Combine with Suspense for streaming data.

  Keep forms or interactivity in small client components only.

  Use ISR / revalidate with fetch + next options.

  Avoid useState, useEffect entirely in server components.

   next: { revalidate: 10 } can be used inside fetch in server components.
  */
}
