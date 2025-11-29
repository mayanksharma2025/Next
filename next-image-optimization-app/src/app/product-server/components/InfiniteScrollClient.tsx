// app/products/components/InfiniteScrollClient.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import SmartImage from './SmartImage'

interface Product {
  id: number
  src: string
  width: number
  height: number
  title?: string
  price?: number
  category?: string
  description?: string
  blur?: string
}

export default function InfiniteScrollClient({
  initialNextCursor = null,
  search = '',
  sort = '',
  category = 'all',
}: {
  initialNextCursor: number | null
  search?: string
  sort?: string
  category?: string
}) {
  const [cursor, setCursor] = useState<number | null>(initialNextCursor)
  const [images, setImages] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const loaderRef = useRef<HTMLDivElement | null>(null)

  async function loadMore() {
    if (cursor === null || loading) return
    setLoading(true)

    try {
      const params = new URLSearchParams({
        cursor: String(cursor),
        limit: '12',
        search,
        sort,
        category,
      })

      const base = window.location.origin
      const res = await fetch(`${base}/api/products?${params.toString()}`)
      const json = await res.json()

      // json.images might be undefined; guard it
      const newItems: Product[] = Array.isArray(json.images) ? json.images : []
      setImages((prev) => [...prev, ...newItems])
      setCursor(json.nextCursor ?? null)
    } catch (err) {
      console.error('loadMore error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!loaderRef.current) return

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { rootMargin: '300px' }
    )

    obs.observe(loaderRef.current)
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor])

  return (
    <>
      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-6">
          {images.map((p) => (
            <div
              key={`client-${p.id}`}
              className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <SmartImage
                src={p.src}
                width={p.width || 600}
                height={p.height || 600}
                blurDataURL={p.blur}
                alt={p.title ?? ''}
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="text-gray-500 text-sm">{p.category}</p>
                <p className="mt-2 font-bold text-blue-600">${p.price}</p>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div ref={loaderRef} className="py-8 text-center">
        {loading ? (
          <span>Loading…</span>
        ) : cursor ? (
          <span>Scroll to load more</span>
        ) : (
          <span>No more products</span>
        )}
      </div>
    </>
  )
}
