'use client'

import React, { useState } from 'react'
import { useDeletePost, usePosts } from '../app/hooks/usePosts'
import { useRouter } from 'next/navigation'
import { Post, User } from '../app/lib/types'
import Loader from './Loader'
import PostForm from './PostForm'

interface PostListProps {
  users: User[]
}

export default function PostList({ users }: PostListProps) {
  const [page, setPage] = useState(1)
  const [limit] = useState(5) // Items per page
  const [sortBy, setSortBy] = useState<'title' | 'createdAt'>('createdAt')
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')

  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [showForm, setShowForm] = useState(false)
  const deleteMutation = useDeletePost()

  const {
    data: postsResponse,
    isLoading,
    isError,
  } = usePosts({ page, limit, sortBy, order })
  const router = useRouter()

  if (isLoading) return <Loader message="Loading posts..." />
  if (isError) return <div className="text-red-500">Failed to load posts.</div>

  console.log({ postsResponse })
  const posts = postsResponse?.data || []
  const totalPages = postsResponse ? Math.ceil(postsResponse.total / limit) : 1

  return (
    <div className="space-y-4">
      {/* Sorting Controls */}
      <div className="flex space-x-4 mb-4">
        <select
          className="border px-3 py-2 rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'title' | 'createdAt')}
        >
          <option value="createdAt">Created At</option>
          <option value="title">Title</option>
        </select>

        <select
          className="border px-3 py-2 rounded"
          value={order}
          onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Posts List */}
      {posts?.map((post: Post) => (
        <div
          key={post.id}
          className="border p-4 rounded shadow bg-white flex justify-between items-start"
        >
          <div>
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-gray-600">{post.description}</p>
            <p className="text-sm text-gray-400">
              User: {users.find((u) => u.id === post.userId)?.name || 'Unknown'}
            </p>
          </div>
          <div className="flex">
            <button
              className="px-3 py-1 mx-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => router.push(`/posts/${post.id}/edit`)}
            >
              Edit Post
            </button>
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
              className="ml-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => {
                if (confirm('Are you sure you want to delete this post?')) {
                  deleteMutation.mutate(post.id)
                }
              }}
            >
              Delete
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

      {/* Pagination */}
      <div className="flex space-x-2 mt-4">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Prev
        </button>
        <span className="px-3 py-1 border rounded">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}
