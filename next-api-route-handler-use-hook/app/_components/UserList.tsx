// app/components/UserList.tsx
'use client'
import { useEffect, useState } from 'react'
import { User } from '../types'
import AddUserForm from './AddUserForm'

export default function UserList({ handleRevalidate }: any) {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const res = await fetch('/api/users')
    const data: User[] = await res.json()
    setUsers(data)
  }

  const handleAdd = (user: User) => {
    setUsers((prev) => [...prev, user])
    handleRevalidate()
  }

  const handleDelete = async (id: number) => {
    await fetch(`/api/users?id=${id}`, { method: 'DELETE' })
    fetchUsers()
    handleRevalidate()
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Users (CSR)</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex justify-between mb-1">
            <span>
              {user.name} ({user.email})
            </span>
            <button
              onClick={() => handleDelete(user.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
        <AddUserForm onAdd={handleAdd} />
      </ul>
    </div>
  )
}
