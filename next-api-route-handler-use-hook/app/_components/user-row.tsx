'use client'

import { useActionState } from 'react'
import { editUser, deleteUser, ActionState } from '../actions/user.actions'

const initialState: ActionState = {}

type UserRowProps = {
  user: {
    id: string
    name: string
    email: string
  }
}

export default function UserRow({ user }: UserRowProps) {
  const [_, editAction] = useActionState(editUser, initialState)
  const [__, deleteAction] = useActionState(deleteUser, initialState)

  return (
    <li className="border p-3 rounded my-4">
      <form action={editAction} className="flex gap-4 mb-2">
        {/* THIS MUST EXIST */}
        <input type="hidden" name="id" value={user.id} />

        <input name="name" defaultValue={user.name} required />
        <input name="email" defaultValue={user.email} required />

        <button className="bg-green-500 text-white px-3 rounded">Save</button>
      </form>

      <form action={deleteAction}>
        {/* THIS MUST EXIST */}
        <input type="hidden" name="id" value={user.id} />
        <button className="text-red-500">Delete</button>
      </form>
    </li>
  )
}
