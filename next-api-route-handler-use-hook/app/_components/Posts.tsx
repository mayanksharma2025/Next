// app/components/Posts.tsx
import { Post } from '../types'

export default async function Posts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: { revalidate: 10 },
  })
  const posts: Post[] = await res.json()

  return (
    <ul>
      {posts.slice(0, 10).map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

{
  /*  
   next: { revalidate: 10 } can be used inside fetch in server components.
  */
}
