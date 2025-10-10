'use client'

import React, { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Post, User } from '../app/lib/types'
import apiClient from '../app/lib/apiClient'

interface PostFormProps {
  post?: Post
  users: User[]
  onClose?: () => void
}

export default function PostForm({ post, users, onClose }: PostFormProps) {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState(post?.title || '')
  const [description, setDescription] = useState(post?.description || '')
  const [userId, setUserId] = useState<number>(
    post?.userId || users[0]?.id || 0
  )
  const [images, setImages] = useState<string[]>(post?.images || [])

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setDescription(post.description)
      setUserId(post.userId)
      setImages(post.images || [])
    }
  }, [post])

  const mutation = useMutation({
    mutationFn: (newPost: Partial<Post>) =>
      post
        ? apiClient.put(`/posts/${post.id}`, newPost)
        : apiClient.post('/posts', newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      if (onClose) onClose()
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({
      title,
      description,
      userId,
      images,
      createdAt: post?.createdAt || new Date().toISOString(),
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow space-y-4"
    >
      <h2 className="text-xl font-bold">
        {post ? 'Edit Post' : 'Create Post'}
      </h2>

      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          className="w-full border px-3 py-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">User</label>
        <select
          className="w-full border px-3 py-2 rounded"
          value={userId ?? users[0]?.id ?? ''}
          onChange={(e) => setUserId(Number(e.target.value))}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">
          Images (comma separated URLs)
        </label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={images.join(', ')}
          onChange={(e) =>
            setImages(e.target.value.split(',').map((url) => url.trim()))
          }
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {mutation.isPending
          ? 'Saving...'
          : post
          ? 'Update Post'
          : 'Create Post'}
      </button>
    </form>
  )
}
