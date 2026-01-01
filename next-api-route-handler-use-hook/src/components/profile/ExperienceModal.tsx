'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Modal } from '../ui/Modal'
import { nanoid } from 'nanoid'
import type { Experience } from '../../types/user'

export function ExperienceModal({ experience }: { experience?: Experience[] }) {
  const [open, setOpen] = useState(false)

  async function submit(formData: FormData) {
    const entry: Experience = {
      id: nanoid(),
      company: String(formData.get('company')),
      role: String(formData.get('role')),
      years: Number(formData.get('years')),
    }

    const res = await fetch('/api/users/me', {
      method: 'PUT',
      body: JSON.stringify({
        experience: [...(experience ?? []), entry],
      }),
    })

    res.ok ? toast.success('Experience added') : toast.error('Failed')

    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded bg-green-600 px-4 py-2 text-white mx-2"
      >
        Add Experience
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <form action={submit} className="space-y-3">
          <input name="company" placeholder="Company" required />
          <input name="role" placeholder="Role" required />
          <input name="years" type="number" placeholder="Years" required />
          <button className="w-full bg-green-600 py-2 text-white">Save</button>
        </form>
      </Modal>
    </>
  )
}
