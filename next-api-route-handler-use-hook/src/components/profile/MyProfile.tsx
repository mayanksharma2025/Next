import { use } from 'react'
import type { UserEntity } from '../../types/user'
import { getCurrentUser } from 'lib/auth'
import { redirect } from 'next/navigation'

async function fetchMe(): Promise<UserEntity> {
  return fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/me`, {
    cache: 'no-store',
    credentials: 'include', // ✅ REQUIRED
  }).then((r) => r.json())
}

export default async function MyProfile() {
  // const user = use(fetchMe())

  // console.log({ user })
  const user = await getCurrentUser()

  if (!user) redirect('/login')

  return (
    <section className="rounded bg-white p-6 shadow space-y-2">
      <h2 className="text-xl font-semibold">My Profile</h2>

      <p>Email: {user.email}</p>
      <p>Name: {user.profile?.name ?? '—'}</p>

      <p>
        Address: {user.profile?.address?.city ?? '—'},{' '}
        {user.profile?.address?.country ?? '—'}
      </p>

      <p>Skills: {user.profile?.skills?.join(', ') ?? '—'}</p>
    </section>
  )
}

// import { use } from 'react'
// import type { UserEntity } from '../../types/user'

// async function fetchMe(): Promise<UserEntity> {
//   return fetch('/api/users/me', {
//     cache: 'no-store',
//   }).then((res) => res.json())
// }

// export default function MyProfile() {
//   const user = use(fetchMe())

//   return (
//     <section className="rounded bg-white p-6 shadow">
//       <h2 className="text-xl font-semibold mb-4">My Profile</h2>

//       <p className="text-sm text-gray-600">Email: {user.email}</p>

//       <p className="mt-2">Name: {user.profile?.name ?? 'Not set'}</p>

//       <p>Skills: {user.profile?.skills?.join(', ') ?? 'None'}</p>
//     </section>
//   )
// }
