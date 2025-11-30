'use client'

import { useEffect, useRef, useState } from 'react'
import SmartImage from './SmartImage'
import { useSearchParams } from 'next/navigation'

export default function InfiniteScrollClient({
  initialNextCursor,
  initialImages = [],
}: {
  initialNextCursor: number | null
  initialImages?: any[]
}) {
  const params = useSearchParams()
  const search = params.get('search') || ''
  const sort = params.get('sort') || ''
  const category = params.get('category') || 'all'

  const [cursor, setCursor] = useState<number | null>(initialNextCursor)
  const [images, setImages] = useState<any[]>(initialImages)
  const [loading, setLoading] = useState(false)
  const [resetting, setResetting] = useState(false)

  const loaderRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // ⭐ FULL RESET WHEN FILTERS CHANGE

  useEffect(() => {
    setResetting(true)

    setImages([])

    // ✅ IMPORTANT: restart from initialNextCursor, NOT 0
    setCursor(initialNextCursor)

    setLoading(false)

    if (observerRef.current) observerRef.current.disconnect()

    const timer = setTimeout(() => {
      setResetting(false)
    }, 10)

    return () => clearTimeout(timer)
  }, [search, sort, category])

  // useEffect(() => {
  //   setResetting(true)
  //   setImages([])
  //   setCursor(0) // restart from 0 for new search
  //   setLoading(false)

  //   // Clear old observer immediately
  //   if (observerRef.current) observerRef.current.disconnect()

  //   // Small delay ensures state is applied before loading starts
  //   const timer = setTimeout(() => {
  //     setResetting(false)
  //   }, 50)

  //   return () => clearTimeout(timer)
  // }, [search, sort, category])

  // Load more items
  const loadMore = async () => {
    if (resetting) return // IMPORTANT: stops race condition
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

      const res = await fetch(`/api/products?${params.toString()}`)
      const json = await res.json()

      const newItems = Array.isArray(json.images) ? json.images : []

      setImages((prev) => [...prev, ...newItems])

      setCursor(json.nextCursor ?? null)
    } finally {
      setLoading(false)
    }
  }

  // ⭐ Re-attach observer AFTER reset finishes
  useEffect(() => {
    if (!loaderRef.current || resetting) return

    // kill old observer
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore()
      },
      { rootMargin: '300px' }
    )

    observerRef.current.observe(loaderRef.current)

    return () => observerRef.current?.disconnect()
  }, [cursor, resetting])

  return (
    <>
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
        {resetting
          ? ''
          : loading
          ? 'Loading…'
          : cursor !== null
          ? 'Scroll to load more'
          : 'No more items'}
      </div>
    </>
  )
}
