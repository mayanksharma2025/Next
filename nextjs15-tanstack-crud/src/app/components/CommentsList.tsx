import Link from 'next/link'
import { useFetch, UseFetchState } from '../hooks/useFetch'
import { ApiResponse, Comment } from '../types/api'

const CommentsList: React.FC<{ id: number; name: string; value: number }> = ({
  id,
  name,
  value,
}) => {
  const {
    data: comments,
    loading,
    error,
  }: UseFetchState<Comment[]> = useFetch<Comment[]>(
    'https://jsonplaceholder.typicode.com/comments'
  )

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      CommentsList
      {/* {JSON.stringify({ id, name, value })} */}
      {comments?.map((comment) => (
        <div key={comment.id}>
          <Link href={`/comment?postId=${comment.postId}`}>
            <h1>{comment.name}</h1>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default CommentsList
