'use client'
import React from 'react'
import { useFetch, UseFetchState } from '../hooks/useFetch'
import { User, UserPreview } from '../types/api'

const UserList: React.FC = () => {
  const {
    data: users,
    loading,
    error,
  }: UseFetchState<User[]> = useFetch<User[]>(
    'https://jsonplaceholder.typicode.com/users'
  )

  if (loading) return <p>Loading users...</p>
  if (error) return <p>Error: {error}</p>

  // Use a Utility Type: Pick -> UserPreview
  const previews: UserPreview[] =
    users?.map(({ id, name, email }) => ({ id, name, email })) || []

  return (
    <div>
      <h2>👤 Users</h2>
      <ul>
        {previews.map((u) => (
          <li key={u.id}>
            {u.name} — {u.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList
