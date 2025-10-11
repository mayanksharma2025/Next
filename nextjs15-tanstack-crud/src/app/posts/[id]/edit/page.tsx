'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { usePost } from '../../../hooks/usePosts'
import { useUsers } from '../../../hooks/useUsers'
import PostForm from '../../../../components/PostForm'
import Loader from '../../../../components/Loader'

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  //   const postId = Number(id)
  const postId = String(id)

  const { data: post, isLoading: postLoading } = usePost(postId)
  const { data: users, isLoading: usersLoading } = useUsers()

  if (postLoading || usersLoading) return <Loader message="Loading..." />
  if (!post) return <div className="text-center py-8">Post not found</div>
  if (!users) return <div className="text-center py-8">Users not found</div>

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <PostForm
        post={post}
        users={users}
        onClose={() => router.push('/')} // Redirect after edit
      />
    </div>
  )
}
