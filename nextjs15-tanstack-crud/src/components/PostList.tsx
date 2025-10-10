'use client'

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Post, User } from '../lib/types'
import Loader from './Loader'
import PostForm from './PostForm'

interface PostListProps {
  users: User[]
}

export default function PostList({ users }: PostListProps) {
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [showForm, setShowForm] = useState(false)

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axios.get('/api/posts')
      return res.data
    },
  })

  if (isLoading) return <Loader message="Loading posts..." />
  if (isError)
    return (
      <div className="text-red-500 text-center py-8">Failed to load posts</div>
    )

  return (
    <div className="space-y-4">
      {/* List of posts */}
      {posts?.map((post) => (
        <div
          key={post.id}
          className="border p-4 rounded shadow bg-white flex justify-between items-start"
        >
          <div>
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-gray-600">{post.description}</p>
          </div>
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => {
              setEditingPost(post)
              setShowForm(true)
            }}
          >
            Edit
          </button>
        </div>
      ))}

      {/* Edit or create form */}
      {showForm && (
        <div className="mt-4">
          <PostForm
            post={editingPost || undefined}
            users={users}
            onClose={() => {
              setShowForm(false)
              setEditingPost(null)
            }}
          />
        </div>
      )}
    </div>
  )
}
