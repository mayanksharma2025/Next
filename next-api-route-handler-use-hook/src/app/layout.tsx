import './globals.css'
import { ToastProvider } from '../components/providers/ToastProvider'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyJwt } from 'lib/jwt'
import { connectDB } from 'lib/db'
import { User } from 'models/User'

export const metadata = {
  title: 'NEXT16 TODOS APP',
  description: 'Enterprise Next.js 16 App',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const cookieStore = await cookies()
  // const token = cookieStore.get('token')?.value

  // if (!token) {
  //   redirect('/login')
  // }

  // const payload = verifyJwt(token)

  // await connectDB()

  // const user = await User.findById(payload.userId).select('-password')

  // if (!user) {
  //   redirect('/login')
  // }

  return (
    <html lang="en">
      <body>
        <ToastProvider />
        {children}
      </body>
    </html>
  )
}
