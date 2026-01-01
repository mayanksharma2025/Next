import { use } from 'react'

async function fetchUsers(q = '', page = 1) {
  const res = await fetch(`/api/admin/users?q=${q}&page=${page}`, {
    cache: 'no-store',
  })
  return res.json()
}

export default function AdminDashboard() {
  const { users } = use(fetchUsers())

  return (
    <section className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Admin — Users</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u: any) => (
            <tr key={u._id} className="border-t">
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{new Date(u.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
