import Image from 'next/image'
import Link from 'next/link'

type User = {
  id: number
  node_id: string
  login: string
  avatar_url: string
  html_url: string
  user_view_type: string
}

export default async function UsersPage() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const response = await fetch('https://api.github.com/users', {
      cache: 'no-store', // important
    })
    if (!response.ok) {
      return (
        <div>
          <h1>Error Bro</h1>
        </div>
      )
    }
    const users = await response.json()
    // if (users) throw new Error('my Error')
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 p-4">
        {users?.map((user: User) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 bg-white shadow rounded-lg text-gray-600"
          >
            <div className="flex flex-col space-y-1">
              <h2 className="text-lg font-semibold">{user.node_id}</h2>
              <p className="text-sm ">{user.login}</p>
            </div>
            <div className="flex flex-col space-y-1 items-end">
              <Link href={user.html_url}>
                <Image
                  src={user.avatar_url}
                  alt={user.login}
                  className="object-cover aspect-circle"
                  width={25}
                  height={25}
                  unoptimized
                />
              </Link>
              <div className="text-md">{user.user_view_type}</div>
            </div>
          </div>
        ))}
      </div>
    )
  } catch (err: unknown | any) {
    return <div className="text-md">Beta Error hai {err.message}</div>
  }
}
