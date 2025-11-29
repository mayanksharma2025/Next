'use client'

import Image from 'next/image'
import { useState } from 'react'
import Shimmer from './Shimmer'

export default function SmartImage({
  src,
  width,
  height,
  blurDataURL,
  alt = '',
  title = 'product title',
  category,
  price,
  description,
  discountPercentage,
}: any) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      style={{ aspectRatio: `${width}/${height}` }}
      className="relative w-full overflow-hidden rounded-xl bg-gray-200"
    >
      {!loaded && <Shimmer className="absolute inset-0" />}

      <Image
        src={src}
        fill
        alt={alt}
        onLoad={() => setLoaded(true)}
        placeholder="blur"
        blurDataURL={blurDataURL}
        className={`object-cover transition-opacity ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Title */}
      <h2 className="text-lg font-semibold mt-3">{title}</h2>

      {/* Category */}
      <span className="text-sm text-gray-500 capitalize">{category}</span>

      {/* Description */}
      <p className="text-sm mt-2 text-gray-600 line-clamp-3">{description}</p>

      {/* Price + Discount */}
      <div className="mt-4 flex items-center gap-2">
        <p className="text-xl font-bold">${price}</p>
        <span className="px-2 py-1 rounded-md text-xs bg-red-100 text-red-600">
          -{discountPercentage}%
        </span>
      </div>
    </div>
  )
}
