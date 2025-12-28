// app/components/AddUserForm.tsx
'use client'
import { useReducer } from 'react'
import { User } from '../types'

type State = {
  name: string
  email: string
}

type Action =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'RESET' }

const initialState: State = { name: '', email: '' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload }
    case 'SET_EMAIL':
      return { ...state, email: action.payload }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export default function AddUserForm({
  onAdd,
}: {
  onAdd: (user: User) => void
}) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name: state.name, email: state.email }),
    })
    const newUser: User = await res.json()
    onAdd(newUser)
    dispatch({ type: 'RESET' })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        value={state.name}
        onChange={(e) =>
          dispatch({ type: 'SET_NAME', payload: e.target.value })
        }
        placeholder="Name"
        className="border p-2 rounded"
      />
      <input
        type="email"
        value={state.email}
        onChange={(e) =>
          dispatch({ type: 'SET_EMAIL', payload: e.target.value })
        }
        placeholder="Email"
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add User
      </button>
    </form>
  )
}

// ✅ Only client-side hooks for interactivity; everything else is server-side.
