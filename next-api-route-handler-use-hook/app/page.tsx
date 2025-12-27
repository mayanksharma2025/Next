// 3. ISR (Incremental Static Regeneration)
// Use revalidate to define a cache duration.

// app/page.js
export const revalidate = 10 // regenerate page every 10 seconds

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  return res.json()
}

export default async function Page() {
  const posts = await getData()
  return (
    <div>
      <h1>Posts (ISR)</h1>
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

 Page is statically generated, but refreshed after revalidate seconds.

  */
}
