export const revalidate = 280 // ISR: regenerate every 280s
export const dynamic = 'force-static' // Force static page

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: { revalidate: 280 }, // Match page revalidate
    cache: 'force-cache', // Force static fetch
  })
  return res.json()
}

export default async function Page() {
  const posts = await getData()
  const time = new Date().toISOString()

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

{
  /* 
  npm run start

  Open browser → check timestamp

  Refresh immediately → timestamp same

  Wait 280s → refresh → timestamp updates


✅ Why this works:

Layout static → child page static

Page dynamic = 'force-static' → static render forced

Fetch uses next: { revalidate: 280 } → matches page ISR

Browser will serve cached static page until 280s expire → ISR triggers regeneration

*/
}
