'use client'

import { useActionState } from 'react'
import { createUser, type ActionState } from '../actions/user.actions'

const initialState: ActionState = {}

export default function CreateUserForm() {
  const [state, action, isPending] = useActionState(createUser, initialState)

  return (
    <form action={action} className="flex flex-col gap-2 mb-6">
      <input name="name" placeholder="Name" required className="border p-2" />

      <input name="email" placeholder="Email" required className="border p-2" />

      {state.error && <p className="text-red-500 text-sm">{state.error}</p>}

      {state.success && (
        <p className="text-green-600 text-sm">User created successfully</p>
      )}

      <button
        disabled={isPending}
        className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
      >
        {isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  )
}
