'use client'

import { useState } from 'react'
import { ServerComponentOne } from './server-component-one'

export const ClientComponentOne = ({
  children,
  message,
  cb,
}: {
  children: React.ReactNode
  message: string
  cb: (value: string) => void
}) => {
  const [name, setName] = useState('Batman')

  return (
    <div>
      <h1 onClick={() => cb(message)}>
        ClientComponentOne {name} {message}
      </h1>
      {children}
    </div>
  )
}
