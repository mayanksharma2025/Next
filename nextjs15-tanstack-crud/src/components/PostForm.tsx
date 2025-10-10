'use client'

import React, { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Post, User } from '../lib/types'

interface PostFormProps {
  post?: Post // optional, for editing
  users: User[] // for select dropdown
  onClose?: () => void
}

export default function PostForm({ post, users, onClose }: PostFormProps) {
  const queryClient = useQueryClient()

  // Initialize form state
  const [title, setTitle] = useState(post?.title || '')
  const [description, setDescription] = useState(post?.description || '')
  const [userId, setUserId] = useState<number>(
    post?.userId || users[0]?.id || 0
  )
  const [images, setImages] = useState<string[]>(post?.images || [])

  // Update state if post changes (for edit)
  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setDescription(post.description)
      setUserId(post.userId)
      setImages(post.images || [])
    }
  }, [post])

  interface MutationContext {
    previousPosts?: Post[]
  }

  const mutation = useMutation<Post, unknown, Partial<Post>, MutationContext>({
    mutationFn: async (newPost) => {
      if (post?.id) {
        const res = await axios.put<Post>(`/api/posts/${post.id}`, newPost)
        return res.data
      } else {
        const res = await axios.post<Post>('/api/posts', newPost)
        return res.data
      }
    },
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] })
      const previousPosts = queryClient.getQueryData<Post[]>(['posts'])

      if (!post?.id) {
        queryClient.setQueryData<Post[]>(['posts'], (old = []) => [
          ...old,
          {
            ...newPost,
            id: Math.random(),
            createdAt: new Date().toISOString(),
          } as Post,
        ])
      }

      return { previousPosts }
    },
    onError: (_err, _newPost, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts)
      }
    },
    onSettled: () => {
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

      {/* Title */}
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

      {/* Description */}
      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          className="w-full border px-3 py-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* User select */}
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

      {/* Images */}
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

      {/* Submit */}
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
