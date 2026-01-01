'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Modal } from '../ui/Modal'

export function EditProfileModal({ currentName }: { currentName?: string }) {
  const [open, setOpen] = useState(false)

  async function submit(formData: FormData) {
    const payload = {
      name: formData.get('name'),
      skills: [],
      education: [],
      experience: [],
    }

    const res = await fetch('/api/users/me', {
      method: 'PUT',
      body: JSON.stringify(payload),
    })

    res.ok ? toast.success('Profile updated') : toast.error('Update failed')

    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
      >
        Edit Profile
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <form action={submit} className="space-y-4">
          <input
            name="name"
            defaultValue={currentName}
            placeholder="Name"
            className="w-full border px-3 py-2"
          />
          <button className="w-full bg-blue-600 py-2 text-white">Save</button>
        </form>
      </Modal>
    </>
  )
}
