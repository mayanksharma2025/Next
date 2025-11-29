'use client'

import { useEffect, useRef, useState } from 'react'
import SmartImage from './SmartImage'
import Skeleton from './Skeleton'

export default function InfiniteGallery() {
  const [images, setImages] = useState<any[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    loadImages()
  }, [])

  async function loadImages() {
    setLoading(true)

    const res = await fetch(
      `/api/images?limit=12${cursor ? `&cursor=${cursor}` : ''}`
    )
    const json = await res.json()

    setImages((prev) => [...prev, ...json.images])
    setCursor(json.nextCursor)
    setLoading(false)
  }

  // Infinite scroll observer
  useEffect(() => {
    if (!loaderRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && cursor) {
          loadImages()
        }
      },
      { rootMargin: '300px' }
    )

    observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [cursor])

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <SmartImage
            key={img.id}
            src={img.src}
            blurDataURL={img.blur}
            alt=""
            width={img.width}
            height={img.height}
          />
        ))}
      </div>

      {/* Loader / Skeleton */}
      <div ref={loaderRef} className="flex justify-center w-full">
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {Array.from({ length: 6 }).map((_, i) => (
              // Provide fixed aspect ratio or approximate width/height
              <Skeleton key={i} width={500} height={500} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
