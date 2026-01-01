'use client'

import { useOptimistic, useTransition } from 'react'
import toast from 'react-hot-toast'
import type { Todo } from '../../types/todo'

export default function TodosClient({
  initialTodos,
}: {
  initialTodos: Todo[]
}) {
  const [isPending, startTransition] = useTransition()

  const [todos, updateTodos] = useOptimistic(
    initialTodos,
    (state, action: any) => {
      switch (action.type) {
        case 'add':
          return [action.todo, ...state]
        case 'toggle':
          return state.map((t) =>
            t._id === action.id ? { ...t, completed: !t.completed } : t
          )
        case 'remove':
          return state.filter((t) => t._id !== action.id)
        default:
          return state
      }
    }
  )

  async function addTodo(title: string) {
    const temp = {
      _id: crypto.randomUUID(),
      title,
      completed: false,
    } as Todo

    startTransition(() => updateTodos({ type: 'add', todo: temp }))

    const res = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title }),
    })

    if (!res.ok) toast.error('Failed')
  }

  async function toggle(todo: Todo) {
    startTransition(() => updateTodos({ type: 'toggle', id: todo._id }))

    await fetch('/api/todos', {
      method: 'PATCH',
      body: JSON.stringify({
        id: todo._id,
        completed: !todo.completed,
      }),
    })
  }

  async function remove(id: string) {
    startTransition(() => updateTodos({ type: 'remove', id }))

    await fetch('/api/todos', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    })
  }

  return (
    <div className="space-y-3">
      <TodoInput onAdd={addTodo} />

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between rounded border p-3"
          >
            <label className="flex gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggle(todo)}
              />
              <span className={todo.completed ? 'line-through' : ''}>
                {todo.title}
              </span>
            </label>
            <button onClick={() => remove(todo._id)} className="text-red-500">
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TodoInput({ onAdd }: { onAdd: (t: string) => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const input = e.currentTarget.elements.namedItem(
          'title'
        ) as HTMLInputElement
        onAdd(input.value)
        input.value = ''
      }}
      className="flex gap-2"
    >
      <input
        name="title"
        required
        placeholder="New todo"
        className="flex-1 border px-3 py-2"
      />
      <button className="bg-blue-600 px-4 py-2 text-white">Add</button>
    </form>
  )
}
