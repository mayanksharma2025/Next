import React from 'react'
import { useFetch } from '../hooks/useFetch'
import { Todo, RequiredTodo, PartialUser } from '../types/api'

const TodoList: React.FC = () => {
  const {
    data: todos,
    loading,
    error,
  } = useFetch<Todo[]>('https://jsonplaceholder.typicode.com/todos')

  if (loading) return <p>Loading todos...</p>
  if (error) return <p>Error: {error}</p>

  // Utility types in action:
  const example: RequiredTodo = {
    id: 1,
    title: 'Example todo',
    completed: false,
    userId: 99,
  }

  const partialUser: PartialUser = {
    name: 'John Doe', // only partial info
  }

  return (
    <div>
      <h2>✅ Todos</h2>
      <ul>
        {todos?.slice(0, 5).map((t) => (
          <li key={t.id}>
            {t.title} — {t.completed ? '✔️ Done' : '⏳ Pending'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
