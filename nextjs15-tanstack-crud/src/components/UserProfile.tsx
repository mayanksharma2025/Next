'use client'

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { User, Post } from '../lib/types'
import PostForm from './PostForm'
import Loader from './Loader'

interface UserProfileProps {
  userId: number
}

export default function UserProfile({ userId }: UserProfileProps) {
  const [showForm, setShowForm] = useState(false)

  // Fetch user data
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useQuery<User>({
    queryKey: ['user', userId],
    queryFn: async () => {
      const res = await axios.get(`/api/users/${userId}`)
      return res.data
    },
  })

  // Fetch posts by this user
  const {
    data: posts,
    isLoading: postsLoading,
    isError: postsError,
  } = useQuery<Post[]>({
    queryKey: ['posts', userId],
    queryFn: async () => {
      const res = await axios.get('/api/posts')
      return res.data.filter((post: Post) => post.userId === userId)
    },
  })

  if (userLoading || postsLoading)
    return <Loader message="Loading user and posts..." />
  if (userError || postsError)
    return (
      <div className="text-red-500 text-center py-8">Error loading data</div>
    )
  if (!user) return <div className="text-center py-8">User not found</div>

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* User Info */}
      <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-6">
        <img
          src={user.photos?.[0] || '/images/default-user.jpg'}
          alt={user.name}
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-500">
            Age: {user.age} | Phone: {user.phone}
          </p>
        </div>
      </div>

      {/* Educations */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="font-semibold text-lg mb-2">Education</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          {user.educations.map((edu, idx) => (
            <li key={idx}>
              {edu.degree} at {edu.school} ({edu.year})
            </li>
          ))}
        </ul>
      </div>

      {/* Experiences */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="font-semibold text-lg mb-2">Experience</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          {user.experiences.map((exp, idx) => (
            <li key={idx}>
              {exp.role} @ {exp.company} ({exp.from} - {exp.to})
            </li>
          ))}
        </ul>
      </div>

      {/* Posts */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Posts</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {showForm ? 'Cancel' : 'New Post'}
          </button>
        </div>

        {/* New Post Form */}
        {showForm && (
          <PostForm users={[user]} onClose={() => setShowForm(false)} />
        )}

        {/* List of posts */}
        <div className="space-y-4 mt-4">
          {posts?.length ? (
            posts.map((post) => (
              <div key={post.id} className="border p-4 rounded">
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No posts yet</p>
          )}
        </div>
      </div>
    </div>
  )
}
