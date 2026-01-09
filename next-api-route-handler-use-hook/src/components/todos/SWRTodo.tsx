'use client'

import useSWR from 'swr'
import { Todo } from 'types/todo'

const fetcher = (url: string) =>
  fetch(url, {
    credentials: 'include', // ✅ send cookies
  }).then((res) => {
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json()
  })

export default function SWRTodo() {
  const { data, isLoading, error } = useSWR<Todo[]>('/api/swrtodo', fetcher, {
    refreshInterval: 120000, // 2 minutes
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">Failed to load todos</p>
  if (!data || data.length === 0)
    return <p className="text-gray-500">No todos found</p>

  return (
    <div className="space-y-3">
      {data.map((todo) => (
        <div
          key={todo._id}
          className="
            flex items-center justify-between
            rounded-lg border border-gray-200
            bg-white px-4 py-3
            shadow-sm
            hover:bg-gray-50
            transition
          "
        >
          <span
            className={`text-sm font-medium ${
              todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
          >
            {todo.title}
          </span>
        </div>
      ))}
    </div>
  )
}
