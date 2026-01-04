'use client'

import { useRouter } from 'next/navigation'
import { AuthForm } from './AuthForm'

export function Clientpage() {
  const router = useRouter()

  async function submit(formData: FormData) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(res.statusText || 'Invalid credentials')
    }

    // ✅ CLIENT-SIDE REDIRECT (THIS WAS MISSING)
    router.push('/dashboard')
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <AuthForm title="Login" submitLabel="Sign In" onSubmit={submit} />
    </main>
  )
}
