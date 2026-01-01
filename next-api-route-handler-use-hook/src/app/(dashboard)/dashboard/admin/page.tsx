import { getAdminUser, getCurrentUser } from 'lib/auth'
import { redirect } from 'next/navigation'
import { use } from 'react'
import { cookies } from 'next/headers'

async function fetchUsers(q = '', page = 1) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    throw new Error('Unauthorized')
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/admin/users?q=${q}&page=${page}`,
    {
      headers: {
        Cookie: `token=${token}`,
      },
      cache: 'no-store',
    }
  )

  if (!res.ok) {
    throw new Error('Unauthorized')
  }

  return res.json()
}

export default function AdminDashboard() {
  const { users } = use(fetchUsers())
  // Recommended  way to fetch data
  // const users = await getAdminUser()

  // if (!users) redirect('/login')

  return (
    <section className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Admin — Users</h1>
      {/* {JSON.stringify({ users })} */}
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
            <tr key={u._id} className="border-t text-center">
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
