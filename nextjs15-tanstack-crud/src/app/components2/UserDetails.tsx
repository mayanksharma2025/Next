import React, { useEffect, useState } from 'react'
import { getUserById, User } from '../hooks/users'

const UserDetails: React.FC<{ id: number }> = ({ id }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    getUserById(id).then((res) => {
      if (!res.error) setUser(res.data)
    })
  }, [id])

  if (!user) return <p>Loading user...</p>

  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  )
}

export default UserDetails
