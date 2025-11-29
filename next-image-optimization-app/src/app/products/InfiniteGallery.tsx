'use client'

import { useEffect, useRef, useState } from 'react'
import SmartImage from './SmartImage'
import Skeleton from './Skeleton'

export default function InfiniteGallery({ filters }: any) {
  const [images, setImages] = useState<any[]>([])
  const [cursor, setCursor] = useState<number | null>(0)
  const [loading, setLoading] = useState(true)

  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setImages([])
    setCursor(0)
    loadImages(0, true)
  }, [filters])

  async function loadImages(c = cursor, reset = false) {
    if (c === null) return

    setLoading(true)

    const params = new URLSearchParams({
      limit: '12',
      cursor: String(c),
      search: filters.search || '',
      sort: filters.sort || '',
      category: filters.category || 'all',
    })

    const res = await fetch(`/api/products?` + params.toString())
    const json = await res.json()

    setImages((prev) => (reset ? json.images : [...prev, ...json.images]))
    setCursor(json.nextCursor)

    setLoading(false)
  }

  useEffect(() => {
    if (!loaderRef.current) return

    const observer = new IntersectionObserver(
      (entry) => {
        if (entry[0].isIntersecting && cursor !== null) {
          loadImages()
        }
      },
      { rootMargin: '300px' }
    )

    observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [cursor, filters])

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  w-full">
        {images.map((img, i) => (
          <SmartImage
            key={`product-${img.id}-${i}`}
            src={img.src}
            width={img.width}
            height={img.height}
            blurDataURL={img.blur}
            title={img.title}
            category={img.category}
            price={img.price}
            description={img.description}
            discountPercentage={img.discountPercentage}
          />
        ))}
      </div>

      <div ref={loaderRef} className="flex justify-center">
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
