import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyJwt } from 'lib/jwt'

export const runtime = 'nodejs'

export default async function TodosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/login')
  }

  verifyJwt(token)

  return <>{children}</>
}
