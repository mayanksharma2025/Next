// app/users/page.tsx
import type { User } from '../types'
import { createUser, deleteUser, editUser } from '../actions/user.actions'

export const revalidate = 30

async function fetchUsers(): Promise<User[]> {
  const res = await fetch('http://localhost:3000/api/users', {
    next: { revalidate: 30 },
  })
  return res.json()
}

export default async function UsersPage() {
  const users = await fetchUsers()

  return (
    <section className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Users</h1>

      {/* CREATE */}
      <form action={createUser} className="flex flex-col gap-2 mb-6">
        <input
          name="name"
          className="border p-2 rounded"
          placeholder="Name"
          required
        />
        <input
          name="email"
          className="border p-2 rounded"
          placeholder="Email"
          required
        />
        <button className="bg-blue-500 text-white p-2 rounded">Create</button>
      </form>

      {/* READ + UPDATE + DELETE */}
      <ul className="space-y-3">
        {users.map((user) => (
          <li key={user.id} className="border p-3 rounded">
            {/* UPDATE */}
            <form action={editUser} className="flex gap-2 mb-2">
              <input type="hidden" name="id" value={user.id} />

              <input
                name="name"
                defaultValue={user.name}
                className="border p-1 rounded flex-1"
                required
              />

              <input
                name="email"
                defaultValue={user.email}
                className="border p-1 rounded flex-1"
                required
              />

              <button className="bg-green-500 text-white px-3 rounded">
                Save
              </button>
            </form>

            {/* DELETE */}
            <form action={deleteUser}>
              <input type="hidden" name="id" value={user.id} />
              <button className="text-red-500 text-sm">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </section>
  )
}
