'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface InfiniteScrollWrapperProps {
  children: ReactNode
  nextCursor: number | null
}

export default function InfiniteScrollWrapper({
  children,
  nextCursor,
}: InfiniteScrollWrapperProps) {
  const loaderRef = useRef<HTMLDivElement | null>(null)
  const [cursor, setCursor] = useState(nextCursor)
  const [loading, setLoading] = useState(false)

  // Detect scroll to bottom
  useEffect(() => {
    if (!loaderRef.current || cursor === null) return

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && cursor !== null && !loading) {
          setLoading(true)

          // Reload the page with next cursor
          const params = new URLSearchParams({
            limit: '12',
            cursor: String(cursor),
          })

          const baseURL = window.location.origin
          const res = await fetch(
            `${baseURL}/api/products?${params.toString()}`
          )
          const data = await res.json()

          // Dispatch a custom event to notify parent server component
          window.dispatchEvent(
            new CustomEvent('loadMoreProducts', { detail: data })
          )

          setCursor(data.nextCursor)
          setLoading(false)
        }
      },
      { rootMargin: '300px' }
    )

    observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [cursor, loading])

  return (
    <>
      {children}
      <div ref={loaderRef} className="mt-6 flex justify-center">
        {loading && (
          <div className="h-16 w-16 rounded-full border-4 border-gray-300 border-t-blue-500 animate-spin" />
        )}
      </div>
    </>
  )
}
