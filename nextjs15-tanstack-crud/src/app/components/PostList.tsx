import React from 'react'
import { useFetch } from '../hooks/useFetch'
import { Post, ReadonlyPost } from '../types/api'

const PostList: React.FC = () => {
  const {
    data: posts,
    loading,
    error,
  } = useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts')

  if (loading) return <p>Loading posts...</p>
  if (error) return <p>Error: {error}</p>

  // Readonly Utility Type Example
  const firstPost: ReadonlyPost | undefined = posts?.[0]
  // firstPost.title = "test"; ❌ cannot assign (readonly)

  return (
    <div>
      <h2>📰 Posts</h2>
      <ul>
        {posts?.slice(0, 5).map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong>
            <p>{p.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostList
