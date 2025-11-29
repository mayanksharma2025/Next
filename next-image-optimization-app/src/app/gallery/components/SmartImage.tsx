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
  const aspectRatio = (height / width) * 100

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700"
      style={{ paddingBottom: `${aspectRatio}%` }}
    >
      <Image
        src={src as any}
        alt={alt}
        fill
        placeholder="blur"
        blurDataURL={blurDataURL}
        className="object-cover"
      />
    </div>
  )
}
