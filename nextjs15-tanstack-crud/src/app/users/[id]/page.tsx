'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import UserProfile from '../../../components/UserProfile'
import UserForm from '../../../components/UserForm'
import Loader from '../../../components/Loader'
import { User } from '../../../lib/types'

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [showForm, setShowForm] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  // Fetch the user
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<User>({
    queryKey: ['user', id],
    queryFn: async () => {
      const res = await axios.get(`/api/users/${id}`)
      return res.data
    },
    enabled: !!id,
  })

  if (isLoading) return <Loader message="Loading user..." />
  if (isError)
    return <div className="text-center text-red-500 py-8">{String(error)}</div>
  if (!user) return <div className="text-center py-8">User not found</div>

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => {
          setCurrentUser(user)
          setShowForm(true)
        }}
      >
        {showForm ? 'Cancel Edit' : 'Edit User'}
      </button>

      {showForm && currentUser ? (
        <UserForm user={currentUser} onClose={() => setShowForm(false)} />
      ) : (
        <UserProfile userId={user.id} />
      )}
    </div>
  )
}
