'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Modal } from '../ui/Modal'
import type { Address } from '../../types/user'

export function AddressModal({ address }: { address?: Address }) {
  const [open, setOpen] = useState(false)

  async function submit(formData: FormData) {
    const payload: Address = {
      city: String(formData.get('city')),
      country: String(formData.get('country')),
    }

    const res = await fetch('/api/users/me', {
      method: 'PUT',
      body: JSON.stringify({
        address: payload,
      }),
    })

    res.ok ? toast.success('Address updated') : toast.error('Failed')

    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded bg-indigo-600 px-4 py-2 text-white"
      >
        Edit Address
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <form action={submit} className="space-y-3">
          <input name="city" defaultValue={address?.city} placeholder="City" />
          <input
            name="country"
            defaultValue={address?.country}
            placeholder="Country"
          />
          <button className="w-full bg-indigo-600 py-2 text-white">Save</button>
        </form>
      </Modal>
    </>
  )
}
