'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '../../hooks/useUsers'
import UserProfile from '../../../components/UserProfile'
import UserForm from '../../../components/UserForm'
import Loader from '../../../components/Loader'

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: user, isLoading } = useUser(Number(id))
  const [showForm, setShowForm] = useState(false)

  if (isLoading) return <Loader message="Loading user..." />
  if (!user) return <div className="text-center py-8">User not found</div>

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancel Edit' : 'Edit User'}
      </button>

      {showForm ? (
        <UserForm user={user} onClose={() => setShowForm(false)} />
      ) : (
        <UserProfile userId={user.id} />
      )}
    </div>
  )
}
