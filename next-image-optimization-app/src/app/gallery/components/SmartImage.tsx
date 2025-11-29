'use client'

import Image from 'next/image'
import { useState } from 'react'
import { StaticImageData } from 'next/image'

interface SmartImageProps {
  src: string | StaticImageData | null | undefined
  alt: string
  blurDataURL?: string
  width: number
  height: number
}

export default function SmartImage({
  src,
  alt,
  blurDataURL,
  width,
  height,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 rounded-xl" />
      )}

      <Image
        src={src as any}
        alt={alt}
        width={width}
        height={height}
        blurDataURL={blurDataURL}
        placeholder="blur"
        className={`w-full h-auto rounded-xl transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
