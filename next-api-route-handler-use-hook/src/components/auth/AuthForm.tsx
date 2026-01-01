'use client'

import { useState } from 'react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'

interface AuthFormProps {
  title: string
  submitLabel: string
  onSubmit: (formData: FormData) => Promise<void>
}

export function AuthForm({ title, submitLabel, onSubmit }: AuthFormProps) {
  const [loading, setLoading] = useState(false)

  async function action(formData: FormData) {
    setLoading(true)
    try {
      console.log(formData.get('email'))
      await onSubmit(formData)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      action={action}
      className="w-full max-w-md rounded-lg bg-white p-6 shadow"
    >
      <h1 className="mb-6 text-2xl font-semibold text-center">{title}</h1>

      <div className="space-y-4">
        <Input name="email" placeholder="Email" required />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
      </div>

      <Button className="mt-6" disabled={loading}>
        {loading ? 'Please wait...' : submitLabel}
      </Button>
    </form>
  )
}
