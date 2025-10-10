'use client'

import React, { useState } from 'react'
import UserList from '../../components/UserList'
import UserForm from '../../components/UserForm'
import { User } from '../../lib/types'

export default function UsersPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6">
      {/* Create User Button */}
      <button
        onClick={() => {
          setEditingUser(null) // clear edit
          setShowForm(true)
        }}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Create New User
      </button>

      {/* User Form */}
      {showForm && (
        <UserForm
          user={editingUser || undefined}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* List of users */}
      <UserList
        onEdit={(user: User) => {
          setEditingUser(user)
          setShowForm(true)
        }}
      />
    </div>
  )
}
