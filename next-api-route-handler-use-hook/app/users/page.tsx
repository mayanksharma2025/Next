// app/users/page.tsx
import { revalidatePath } from 'next/cache'
import UserList from '../_components/UserList'
import { User } from '../types'

export const revalidate = 10 // ISR: regenerate every 10s

async function getUsers(): Promise<User[]> {
  const res = await fetch('http://localhost:3000/api/users')
  return res.json()
}

export default async function UsersPage() {
  const users = await getUsers()

  async function revalidate() {
    'use server'
    revalidatePath('/users')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users (ISR)</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <UserList handleRevalidate={revalidate} />
    </div>
  )
}

{
  /* 
      What revalidatePath actually does

      Invalidates the server cache

      Forces Server Components to re-run

      Regenerates HTML on the next navigation or refresh

      What it does NOT do

      ❌ Does not touch client state

      ❌ Does not re-run useEffect

      ❌ Does not re-render mounted Client Components

      ❌ Does not push updates to the browser

      Once a Client Component is mounted:

      It is fully owned by the browser.

      The server cannot “reach into” the client and re-render it.
      
     Server Components first: all data fetching happens server-side.

     Client Components only for interactivity (forms, button clicks).

     Streaming/Suspense: partial content renders immediately.

     TypeScript advanced types: interface, Omit, generics, function return types.

     SSR / ISR: controlled caching via revalidate and fetch options.
 */
}
