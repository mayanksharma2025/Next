import { redirect } from 'next/navigation'
import { cookies, headers } from 'next/headers'
import bcrypt from 'bcryptjs'
import { connectDB } from '../../../lib/db'
import { User } from '../../../models/User'
import { signJwt } from '../../../lib/jwt'
import { AuthForm } from '../../../components/auth/AuthForm'
import { auditLog } from 'lib/audit'
import { Clientpage } from 'components/auth/Clientpage'

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

    // ✅ HEADERS MUST BE AWAITED
    const h = await headers()

    // ✅ AUDIT LOG
    await auditLog({
      action: 'USER_LOGIN',
      userId: user._id.toString(),
      role: user.role,
      ip: h.get('x-forwarded-for') ?? 'unknown',
      userAgent: h.get('user-agent') ?? 'unknown',
    })

    // ✅ COOKIES ARE SYNC
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
      <AuthForm title="Login Server" submitLabel="Sign In" onSubmit={submit} />
      <Clientpage />
    </main>
  )
}
