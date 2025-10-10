'use client'

import React, { useState } from 'react'
import UserList from '../../components/UserList'
import UserForm from '../../components/UserForm'
import { useUsers } from '../hooks/useUsers'
import Loader from '../../components/Loader'
import { User } from '../lib/types'

export default function UsersPage() {
  const { data: users, isLoading } = useUsers()
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  if (isLoading) return <Loader message="Loading users..." />
  if (!users)
    return <div className="text-center text-red-500 py-8">No users found</div>

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6">
      <button
        onClick={() => {
          setEditingUser(null)
          setShowForm(true)
        }}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Create New User
      </button>

      {showForm && (
        <UserForm
          user={editingUser || undefined}
          onClose={() => setShowForm(false)}
        />
      )}

      <UserList
        onEdit={(user: User) => {
          setEditingUser(user)
          setShowForm(true)
        }}
      />
    </div>
  )
}
