'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getCommentByPostId } from '../hooks/users'
import { ApiResponse, Comment as CM } from '../types/api'

const Comment = ({ params }: any) => {
  const [comments, setComments] = useState<CM[] | null>(null)
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')

  useEffect(() => {
    if (postId) {
      getCommentByPostId(parseInt(postId)).then((comments) =>
        setComments(comments.data)
      )
    }
  }, [postId])

  console.log('Comment', params.route, postId, { comments })

  return (
    <div>
      <div>Comment Individual Page</div>
      {comments?.map((comment) => (
        <div key={comment.id}>
          <span>{comment.name}</span> - <span>{comment.email}</span> &ensp;
          <button aria-label="comment-label">
            <img
              src="/next.svg"
              alt="next-btn"
              width={80}
              height={80}
              style={{ maxHeight: '15px' }}
            />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Comment
