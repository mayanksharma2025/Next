import { connectDB } from '../lib/mongodb'
import { User } from '../models/User'
import CreateUserForm from '../_components/create-user-form'
import { editUser, deleteUser } from '../actions/user.actions'
import UserRow from '../_components/user-row'
import { serializeUser } from '../lib/serialize-user'

export const revalidate = 30

async function fetchUsers() {
  await connectDB()
  const users = await User.find().lean()
  return users.map(serializeUser)
}

export default async function UsersPage() {
  const users = await fetchUsers()

  return (
    <section className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Users</h1>

      <CreateUserForm />

      <ul className="space-y-3">
        {users.map((user) => (
          <UserRow key={String(user.id)} user={user} />
        ))}
      </ul>
    </section>
  )
}
