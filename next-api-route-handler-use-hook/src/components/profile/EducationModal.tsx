'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Modal } from '../ui/Modal'
import { nanoid } from 'nanoid'
import type { Education } from '../../types/user'

export function EducationModal({ education }: { education?: Education[] }) {
  const [open, setOpen] = useState(false)

  async function submit(formData: FormData) {
    const entry: Education = {
      id: nanoid(),
      school: String(formData.get('school')),
      degree: String(formData.get('degree')),
      year: Number(formData.get('year')),
    }

    const res = await fetch('/api/users/me', {
      method: 'PUT',
      body: JSON.stringify({
        education: [...(education ?? []), entry],
      }),
    })

    res.ok ? toast.success('Education added') : toast.error('Failed')

    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Add Education
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <form action={submit} className="space-y-3">
          <input name="school" placeholder="School" required />
          <input name="degree" placeholder="Degree" required />
          <input name="year" type="number" placeholder="Year" required />
          <button className="w-full bg-blue-600 py-2 text-white">Save</button>
        </form>
      </Modal>
    </>
  )
}
