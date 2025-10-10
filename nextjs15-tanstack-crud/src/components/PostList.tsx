'use client'

import React, { useState } from 'react'
import { usePosts, useDeletePost } from '../app/hooks/usePosts'
import { Post, User } from '../app/lib/types'
import Loader from './Loader'
import PostForm from './PostForm'

interface PostListProps {
  users: User[]
}

export default function PostList({ users }: PostListProps) {
  const { data: posts, isLoading } = usePosts()
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [showForm, setShowForm] = useState(false)
  const deleteMutation = useDeletePost()

  if (isLoading) return <Loader message="Loading posts..." />

  return (
    <div className="space-y-4">
      {posts?.map((post) => (
        <div
          key={post.id}
          className="border p-4 rounded shadow bg-white flex justify-between items-start"
        >
          <div>
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-gray-600">{post.description}</p>
          </div>
          <div>
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => {
                setEditingPost(post)
                setShowForm(true)
              }}
            >
              Edit
            </button>
            <button
              className="ml-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              disabled={deleteMutation.isPending}
              onClick={() => {
                if (confirm('Are you sure you want to delete this post?')) {
                  deleteMutation.mutate(post.id)
                }
              }}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      ))}

      {showForm && editingPost && (
        <PostForm
          post={editingPost}
          users={users}
          onClose={() => {
            setShowForm(false)
            setEditingPost(null)
          }}
        />
      )}
    </div>
  )
}
