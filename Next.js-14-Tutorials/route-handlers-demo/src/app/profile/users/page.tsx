// app/page.js
// profile/users

export const dynamic = 'force-dynamic' // Always fetch fresh data

export default async function Page() {
  const res = await fetch('https://api.github.com/users', {
    cache: 'no-store',
  })
  const data = await res.json()

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">GitHub Users</h1>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white w-full max-w-5xl">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Avatar
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Profile URL
              </th>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((user: any) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="px-6 py-4">
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-10 h-10 rounded-full border"
                  />
                </td>
                <td className="px-6 py-4 font-medium">{user.login}</td>
                <td className="px-6 py-4 text-blue-600">
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {user.html_url}
                  </a>
                </td>
                <td className="px-6 py-4">{user.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
