'use client'

import React, { useState } from 'react'
import PostList from '../components/PostList'
import PostForm from '../components/PostForm'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { User } from '../lib/types'
import Loader from '../components/Loader'
import Link from 'next/link'

export default function HomePage() {
  const [showForm, setShowForm] = useState(false)

  // Fetch all users for PostForm dropdown
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get('/api/users')
      return res.data
    },
  })

  if (isLoading) return <Loader message="Loading users..." />
  if (isError || !users)
    return (
      <div className="text-red-500 text-center py-8">Failed to load users</div>
    )

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

      {/* Post creation form */}
      {showForm && (
        <PostForm users={users} onClose={() => setShowForm(false)} />
      )}

      {/* List of posts */}
      <PostList users={users} />
    </div>
  )
}
