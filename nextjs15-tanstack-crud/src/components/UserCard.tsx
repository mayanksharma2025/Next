'use client'

import React from 'react'
import { User } from '../app/lib/types'
import Link from 'next/link'
import { useDeleteUser } from '@/app/hooks/useUsers'

interface UserCardProps {
  user: User
  onEdit?: (user: User) => void
}

export default function UserCard({ user, onEdit }: UserCardProps) {
  const deleteMutation = useDeleteUser()

  return (
    <div className="border p-4 rounded shadow bg-white flex justify-between items-center">
      <Link href={`/users/${user.id}`} className="flex-1">
        <h2 className="font-semibold text-lg">{user.name}</h2>
        <p className="text-gray-500 text-sm">{user.email}</p>
      </Link>

      {onEdit && (
        <div>
          <button
            className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => onEdit(user)}
          >
            Edit
          </button>
          <button
            className="ml-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            disabled={deleteMutation.isPending}
            onClick={() => {
              if (confirm('Are you sure you want to delete this user?')) {
                deleteMutation.mutate(user.id)
              }
            }}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      )}
    </div>
  )
}
