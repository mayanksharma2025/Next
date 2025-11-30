'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [data, setData] = useState<{ message: string } | null>(null)

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then(setData)
  }, [])

  return <div>{data ? data.message : 'Loading...'}</div>
}
