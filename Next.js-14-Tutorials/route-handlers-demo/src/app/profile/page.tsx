import { cookies } from 'next/headers'

export default function ProfilePage() {
  const data = cookies().get('30041995') as string | undefined
  return (
    <div>
      Profile details
      <h1>{data as string}</h1>
    </div>
  )
}
