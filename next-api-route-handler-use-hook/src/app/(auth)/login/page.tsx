import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { connectDB } from '../../../lib/db'
import { User } from '../../../models/User'
import { signJwt } from '../../../lib/jwt'
import { AuthForm } from '../../../components/auth/AuthForm'

export default function LoginPage() {
  async function submit(formData: FormData) {
    'use server'

    const email = String(formData.get('email'))
    const password = String(formData.get('password'))

    await connectDB()

    const user = await User.findOne({ email })
    if (!user) throw new Error('Invalid credentials')

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) throw new Error('Invalid credentials')

    const token = signJwt({
      userId: user._id.toString(),
      role: user.role,
    })

    const cookieStore = await cookies()
    cookieStore.set('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    })
    redirect('/dashboard')
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <AuthForm title="Login" submitLabel="Sign In" onSubmit={submit} />
    </main>
  )
}
