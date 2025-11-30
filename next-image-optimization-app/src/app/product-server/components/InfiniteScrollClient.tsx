// app/products/components/InfiniteScrollClient.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import SmartImage from './SmartImage'

export default function InfiniteScrollClient({
  initialNextCursor,
  initialImages = [],
  search = '',
  sort = '',
  category = 'all',
}: {
  initialNextCursor: number | null
  initialImages?: any[]
  search?: string
  sort?: string
  category?: string
}) {
  const [cursor, setCursor] = useState<number | null>(initialNextCursor)
  const [images, setImages] = useState<any[]>(initialImages || [])
  const [loading, setLoading] = useState(false)
  const loaderRef = useRef<HTMLDivElement | null>(null)

  const loadMore = async () => {
    if (!cursor || loading) return
    setLoading(true)
    try {
      const params = new URLSearchParams({
        cursor: String(cursor),
        limit: '12',
        search,
        sort,
        category,
      })
      const res = await fetch(`/api/products?${params.toString()}`)
      const json = await res.json()
      setImages((s) => [
        ...s,
        ...(Array.isArray(json.images) ? json.images : []),
      ])
      setCursor(json.nextCursor ?? null)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!loaderRef.current) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore()
      },
      { rootMargin: '300px' }
    )
    obs.observe(loaderRef.current)
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor])

  return (
    <>
      {/* appended images (client side) */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-6">
          {images.map((p) => (
            <div
              key={`client-${p.id}`}
              className="border rounded-xl overflow-hidden shadow p-2"
            >
              <SmartImage
                src={p.src}
                blur={p.blur}
                width={600}
                height={600}
                alt={p.title}
              />
              <div className="p-4">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-gray-500">${p.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div ref={loaderRef} className="py-8 text-center">
        {loading
          ? 'Loading…'
          : cursor
          ? 'Scroll to load more'
          : 'No more items'}
      </div>
    </>
  )
}
