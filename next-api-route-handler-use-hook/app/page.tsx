// app/page.js
// 2. SSR (Server-Side Rendering) with fetch in App Router
// Next.js 16 encourages server components. Use export const revalidate = 0 for SSR (always fresh).

export const revalidate = 0 // SSR

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'no-store',
  })
  return res.json()
}

export default async function Page() {
  const posts = await getData()

  return (
    <div>
      <h1>Posts (SSR)</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

{
  /*
  ✅ Notes:
   cache: 'no-store' ensures fresh data on every request (SSR).
 */
}
