// app/products/components/SmartImage.tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'

interface SmartImageProps {
  src: string
  width: number
  height: number
  blurDataURL?: string
  alt?: string
}
// ✅ STEP 2 — SEO + PREFETCH + SERVER IMAGE COMPONENT
export default function SmartImage({
  src,
  width,
  height,
  blurDataURL,
  alt = '',
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      style={{ aspectRatio: `${width}/${height}` }}
      className="relative w-full overflow-hidden rounded-xl bg-gray-200"
    >
      {!loaded && (
        <div className="absolute inset-0">
          {/* simple shimmer fallback while client hydrates */}
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-[shimmer_1.2s_infinite]" />
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        fill
        onLoadingComplete={() => setLoaded(true)}
        placeholder={blurDataURL ? 'blur' : undefined}
        blurDataURL={blurDataURL}
        className={`object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
