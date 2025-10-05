'use client'
// interface
interface User {
  id?: number
  name: string
  email: string
}

// A reusable Table component
interface TableProps<T> {
  data: T[]
  renderRow: (item: T) => React.ReactNode
}

function Table<T>({ data, renderRow }: TableProps<T>) {
  return (
    <table>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>{renderRow(item)}</tr>
        ))}
      </tbody>
    </table>
  )
}

// Usage with User
function Home() {
  return (
    <Table<User>
      data={[{ id: 1, name: 'Alice', email: 'alice@test.com' }]}
      renderRow={(user) => (
        <>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
        </>
      )}
    />
  )
}

export default Home
