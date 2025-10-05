'use client'

import { useEffect, useState } from 'react'

type User = {
  id: number
  name: string
  email: string
}

interface ApiResponse<T> {
  data: T
  status: number
  error?: string
}

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (url)
      fetch(url)
        .then((res) => res.json())
        .then((json) => setData(json))
        .finally(() => setLoading(false))
  }, [url])

  return { data, loading }
}

const UserPage = () => {
  const { data: users, loading } = useFetch<User[]>(
    'https://jsonplaceholder.typicode.com/users'
  )

  if (loading) return <div>Loading...</div>

  return (
    <ul>
      {users?.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  )
}

export default UserPage
