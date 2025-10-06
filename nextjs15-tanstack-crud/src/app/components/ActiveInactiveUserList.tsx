import React from 'react'

type Status = 'active' | 'inactive' | 'pending'
type ActiveStatus = Extract<Status, 'active' | 'pending'>
type InactiveStatus = Exclude<Status, 'active'>

interface User {
  id: number
  name: string
  status: Status
}

interface StatusBadgeProps {
  status: Status
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'active':
      return <span className="text-green-600">🟢 Active</span>
    case 'pending':
      return <span className="text-yellow-600">🟡 Pending</span>
    case 'inactive':
      return <span className="text-gray-500">⚫ Inactive</span>
    default:
      return null
  }
}

export const ActiveUserList: React.FC<{ users: User[] }> = ({ users }) => {
  const activeUsers = users.filter(
    (u): u is User & { status: ActiveStatus } =>
      u.status === 'active' || u.status === 'pending'
  )

  return (
    <div>
      <h2>Active Users</h2>
      {activeUsers.map((user) => (
        <div key={user.id}>
          {user.name} — <StatusBadge status={user.status} />
        </div>
      ))}
    </div>
  )
}

export const InactiveUserList: React.FC<{ users: User[] }> = ({ users }) => {
  const inactiveUsers = users.filter(
    (u): u is User & { status: InactiveStatus } => u.status !== 'active'
  )

  return (
    <div>
      <h2>Inactive Users</h2>
      {inactiveUsers.map((user) => (
        <div key={user.id}>
          {user.name} — <StatusBadge status={user.status} />
        </div>
      ))}
    </div>
  )
}

// ✅ React Component
const UserLists: React.FC = () => {
  const users: User[] = [
    { id: 1, name: 'Alice', status: 'active' },
    { id: 2, name: 'Bob', status: 'inactive' },
    { id: 3, name: 'Charlie', status: 'pending' },
    { id: 4, name: 'Diana', status: 'active' },
  ]
  const activeUsers = users.filter(
    (u): u is User & { status: ActiveStatus } =>
      u.status === 'active' || u.status === 'pending'
  )
  const inactiveUsers = users.filter(
    (u): u is User & { status: InactiveStatus } => u.status !== 'active'
  )

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1>👥 User Status Example</h1>

      {/* Active Users */}
      <section>
        <h2>🟢 Active / Pending Users</h2>
        <ul>
          {activeUsers.map((user) => (
            <li key={user.id}>
              {user.name} — <strong>{user.status}</strong>
            </li>
          ))}
        </ul>
      </section>

      {/* Inactive Users */}
      <section>
        <h2>⚫ Inactive / Pending Users</h2>
        <ul>
          {inactiveUsers.map((user) => (
            <li key={user.id}>
              {user.name} — <strong>{user.status}</strong>
            </li>
          ))}
        </ul>
      </section>
      <ActiveUserList {...{ users }} />
    </div>
  )
}

export default UserLists
