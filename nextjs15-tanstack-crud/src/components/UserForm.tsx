'use client'

import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { User, Education, Experience } from '../app/lib/types'

interface UserFormProps {
  user?: User // Optional for editing
  onClose?: () => void // Callback after success
}

export default function UserForm({ user, onClose }: UserFormProps) {
  const queryClient = useQueryClient()

  // Form state
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [age, setAge] = useState<number>(user?.age || 18)
  const [phone, setPhone] = useState(user?.phone || '')
  const [photos, setPhotos] = useState<string[]>(user?.photos || [])
  const [educations, setEducations] = useState<Education[]>(
    user?.educations || []
  )
  const [experiences, setExperiences] = useState<Experience[]>(
    user?.experiences || []
  )

  interface MutationContext {
    previousUsers?: User[]
  }

  const mutation = useMutation<User, unknown, Partial<User>, MutationContext>({
    mutationFn: async (newUser) => {
      if (user?.id) {
        const res = await axios.put<User>(`/api/users/${user.id}`, newUser)
        return res.data
      } else {
        const res = await axios.post<User>('/api/users', newUser)
        return res.data
      }
    },
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: ['users'] })
      const previousUsers = queryClient.getQueryData<User[]>(['users'])

      if (!user?.id) {
        queryClient.setQueryData<User[]>(['users'], (old = []) => [
          ...old,
          { ...newUser, id: Math.random() } as User,
        ])
      }

      return { previousUsers }
    },
    onError: (_err, _newUser, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      if (onClose) onClose()
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({
      name,
      email,
      age,
      phone,
      photos,
      educations,
      experiences,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow space-y-4"
    >
      <h2 className="text-xl font-bold">
        {user ? 'Edit User' : 'Create User'}
      </h2>

      <div>
        <label className="block font-semibold mb-1">Name</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Email</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Age</label>
        <input
          type="number"
          className="w-full border px-3 py-2 rounded"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Phone</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">
          Photos (comma separated URLs)
        </label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={photos.join(', ')}
          onChange={(e) =>
            setPhotos(e.target.value.split(',').map((url) => url.trim()))
          }
        />
      </div>

      {/* You can extend inputs for educations & experiences similarly */}

      <button
        type="submit"
        disabled={mutation.isPending}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {mutation.isPending
          ? 'Saving...'
          : user
          ? 'Update User'
          : 'Create User'}
      </button>
    </form>
  )
}
