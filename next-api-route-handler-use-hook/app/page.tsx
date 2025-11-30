// app/page.js
// Use revalidate to define a cache duration.
export const revalidate = 200
export const dynamic = 'force-static'

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'force-cache', // 🔥 important
    // next: { revalidate: 200 }, // ✔ match with page revalidate
  })
  return res.json()
}

export default async function Page() {
  const posts = await getData()
  const time = new Date().toISOString() // timestamp

  return (
    <div>
      <h1>Posts (ISR)</h1>
      <p>Page generated at: {time}</p>

      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

// ✅ Notes:

// Page is statically generated, but refreshed after revalidate seconds.

// page revalidate: 280 sec
// fetch revalidate: 60 sec
// dynamic = force-static
// If ANY fetch has revalidate < page revalidate
// => Route becomes dynamic
// then its cause timestamp changes on refresh par change.

// set NEXT_DEBUG_FUNCTIONS=1 && npm run build
