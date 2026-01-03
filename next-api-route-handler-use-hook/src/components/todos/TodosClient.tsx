'use client'

import { useOptimistic, useState, useTransition } from 'react'
import toast from 'react-hot-toast'
import type { Todo } from '../../types/todo'
import { createTodo, toggleTodo, deleteTodo } from '../../lib/actions/actions'

type Action =
  | { type: 'add'; todo: Todo }
  | { type: 'remove'; id: string }
  | { type: 'toggle'; id: string }

export default function TodosClient({
  initialTodos,
}: {
  initialTodos: Todo[]
}) {
  const [baseTodos, setBaseTodos] = useState(initialTodos)
  const [isPending, startTransition] = useTransition()

  const [optimisticTodos, updateOptimistic] = useOptimistic(
    baseTodos,
    (state: Todo[], action: Action) => {
      switch (action.type) {
        case 'add':
          return [action.todo, ...state]

        case 'remove':
          return state.filter((t) => t._id !== action.id)

        case 'toggle':
          return state.map((t) =>
            t._id === action.id ? { ...t, completed: !t.completed } : t
          )

        default:
          return state
      }
    }
  )

  /* ---------------- ADD ---------------- */
  async function addTodo(title: string) {
    const tempId = crypto.randomUUID()

    startTransition(() => {
      updateOptimistic({
        type: 'add',
        todo: { _id: tempId, title, completed: false },
      })
    })

    try {
      const saved = await createTodo(title)
      setBaseTodos((prev) => [saved, ...prev])
    } catch {
      toast.error('Failed to add todo')
      setBaseTodos((prev) => prev) // rollback trigger
    }
  }

  /* ---------------- TOGGLE ---------------- */
  async function toggle(todo: Todo) {
    startTransition(() => {
      updateOptimistic({ type: 'toggle', id: todo._id })
    })

    try {
      await toggleTodo(todo._id, !todo.completed)
      setBaseTodos((prev) =>
        prev.map((t) =>
          t._id === todo._id ? { ...t, completed: !t.completed } : t
        )
      )
    } catch {
      toast.error('Failed to update todo')
      setBaseTodos((prev) => prev) // rollback
    }
  }

  /* ---------------- DELETE ---------------- */
  async function remove(id: string) {
    startTransition(() => {
      updateOptimistic({ type: 'remove', id })
    })

    try {
      await deleteTodo(id)
      setBaseTodos((prev) => prev.filter((t) => t._id !== id))
    } catch {
      toast.error('Failed to delete todo')
      setBaseTodos((prev) => prev) // rollback
    }
  }

  return (
    <div className="space-y-3">
      <TodoInput onAdd={addTodo} />

      <ul className="space-y-2">
        {optimisticTodos.map((todo) => (
          <li key={todo._id} className="flex justify-between border p-3">
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

            <button onClick={() => remove(todo._id)} className="text-red-600">
              ×
            </button>
          </li>
        ))}
      </ul>

      {isPending && <p className="text-sm text-gray-400">Updating…</p>}
    </div>
  )
}

/* ---------------- INPUT ---------------- */
function TodoInput({ onAdd }: { onAdd: (t: string) => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const input = e.currentTarget.title as HTMLInputElement | any
        onAdd(input.value)
        input.value = ''
      }}
      className="flex gap-2"
    >
      <input
        name="title"
        required
        className="flex-1 border px-3 py-2"
        placeholder="New todo"
      />
      <button className="bg-blue-600 px-4 py-2 text-white">Add</button>
    </form>
  )
}
