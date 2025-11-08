import { cookies } from 'next/headers'

export default function ProfilePage() {
  const data = cookies().get('30041995') as {
    name: string
    value: string
  } | null
  return (
    <div className="relative min-h-[50rem]">
      Profile details
      <h1>{data?.name}</h1>
      <h1 className="text-3xl text-slate-400 text-uppercase">{data?.value}</h1>
    </div>
  )
}
