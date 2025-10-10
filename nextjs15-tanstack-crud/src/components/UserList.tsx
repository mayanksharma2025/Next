'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import UserCard from './UserCard'
import { User } from '../lib/types'
import Loader from './Loader'

interface UserListProps {
  onEdit?: (user: User) => void
}

export default function UserList({ onEdit }: UserListProps) {
  const { data, isLoading, isError } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get('/api/users')
      return res.data
    },
  })

  if (isLoading) return <Loader message="Loading users..." />
  if (isError)
    return (
      <div className="text-center py-8 text-red-500">Failed to load users</div>
    )

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {data?.map((user) => (
        <UserCard key={user.id} user={user} onEdit={onEdit} />
      ))}
    </div>
  )
}
