'use client'

import React, { useState } from 'react'
import PostList from '../components/PostList'
import PostForm from '../components/PostForm'
import { useUsers } from './hooks/useUsers'
import Loader from '../components/Loader'
import Link from 'next/link'

export default function HomePage() {
  const { data: users, isLoading } = useUsers()
  const [showForm, setShowForm] = useState(false)

  if (isLoading) return <Loader message="Loading users..." />
  if (!users)
    return <div className="text-center text-red-500 py-8">No users found</div>

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link href={`/users`} aria-level={1}>
          <h1 className="text-2xl font-bold">Users</h1>
        </Link>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'New Post'}
        </button>
      </div>

      {showForm && (
        <PostForm users={users} onClose={() => setShowForm(false)} />
      )}
      <PostList users={users} />
    </div>
  )
}
