'use client'
import { useFetch } from '../hooks/apiClient'
import { ApiResponse } from '../types/api'

interface User {
  id: number
  name: string
  email: string
}

const UserList2: React.FC = () => {
  const {
    data: users,
    status,
    error,
  }: ApiResponse<User[]> = useFetch<User[]>(
    'https://jsonplaceholder.typicode.com/users'
  )
  if (status === 0) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!users.length) return <p>No users found</p>

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} -{u.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList2
