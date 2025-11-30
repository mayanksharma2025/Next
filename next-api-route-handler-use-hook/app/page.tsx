export const revalidate = 120
export const dynamic = 'force-static'

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: { revalidate: 120 }, // Match page revalidate
    cache: 'force-cache',
  })
  return res.json()
}

let lastRevalidate = new Date().toISOString() // Keep track globally (for demo only)

export default async function Page() {
  const posts = await getData()
  const currentTime = new Date().toISOString()

  // Simple simulation of ISR regeneration
  // In real ISR, Next.js updates static cache in background
  const pageInfo = `
    Current request: ${currentTime} <br/>
    Last ISR regeneration: ${lastRevalidate} <br/>
    Revalidate interval: 120 sec
  `

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>Posts (ISR Debug)</h1>
      <div
        style={{ background: '#f0f0f0', padding: '1rem', marginBottom: '2rem' }}
        dangerouslySetInnerHTML={{ __html: pageInfo }}
      />
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


  1. currentTime will always change

Every request triggers this line:

new Date().toISOString()


So each time someone loads the page, currentTime will update, no matter if 120 seconds have passed or not.

2. lastRevalidate will NOT change

This value is set only once when the server starts:

let lastRevalidate = new Date().toISOString()


It never updates because:

Real ISR does not update your variables

It only refreshes the static file in Next.js cache

So lastRevalidate is only a demo value, not real ISR regeneration time.

3. Real ISR still works internally

Next.js will still:

Cache the page statically

Re-generate it after 120 seconds (in the background)

But your page does not display the real regeneration time.

4. The displayed timestamps are misleading

The user sees:

currentTime → always correct, always changing

lastRevalidate → incorrect, always the same

5. To show REAL ISR regeneration time, you must store it somewhere (DB, file, kv store, etc.)

Global variables won’t work because:

They don’t persist across ISR regeneration

They don’t update when Next.js rebuilds the static HTML

| Value                     | Expected Behavior                                 |
| ------------------------- | ------------------------------------------------- |
| **Current request**       | Changes after ISR interval (correct)              |
| **Last ISR regeneration** | Never changes (because it’s your static variable) |
| **ISR interval**          | Controls how often page regenerates               |

 */
}
