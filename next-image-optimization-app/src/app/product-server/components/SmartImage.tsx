// app/products/components/SmartImage.tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function SmartImage({
  src,
  blur,
  width,
  height,
  alt = '',
}: {
  src: string
  blur?: string | null
  width: number
  height: number
  alt?: string
}) {
  const [loaded, setLoaded] = useState(false)

  // decide whether to use placeholder="blur"
  const useBlur = Boolean(blur && blur.length > 0)

  return (
    <div
      style={{ aspectRatio: `${width}/${height}` }}
      className="relative w-full overflow-hidden rounded-xl bg-gray-100"
    >
      {/* background blurred image or shimmer while main image loads */}
      <div
        aria-hidden
        className={`absolute inset-0 transition-opacity duration-700 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {useBlur ? (
          // server-provided small base64 or data URL
          // use img tag here to show immediately (no hydration mismatch)
          <img
            src={blur as string}
            alt=""
            aria-hidden
            className="w-full h-full object-cover blur-sm scale-105"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-[shimmer_1.2s_infinite]" />
        )}
      </div>

      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 50vw, 33vw"
        placeholder={useBlur ? 'blur' : undefined}
        blurDataURL={useBlur ? blur! : undefined}
        className={`object-cover w-full h-full transform transition-all duration-700 ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
