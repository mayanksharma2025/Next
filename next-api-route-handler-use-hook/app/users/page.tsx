// app/users/page.tsx
import UserList from '../_components/UserList'
import { User } from '../types'

export const revalidate = 10 // ISR: regenerate every 10s

async function getUsers(): Promise<User[]> {
  const res = await fetch('http://localhost:3000/api/users')
  return res.json()
}

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users (ISR)</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <UserList />
    </div>
  )
}

{
  /* 
     Server Components first: all data fetching happens server-side.

     Client Components only for interactivity (forms, button clicks).

     Streaming/Suspense: partial content renders immediately.

     TypeScript advanced types: interface, Omit, generics, function return types.

     SSR / ISR: controlled caching via revalidate and fetch options.
 */
}
