// app/components/SmartImage.tsx
import Image from 'next/image'

interface SmartImageProps {
  src: string
  width: number
  height: number
  blurDataURL: string
  alt?: string
}

export default function SmartImage({
  src,
  width,
  height,
  blurDataURL,
  alt = '',
}: SmartImageProps) {
  return (
    <div
      style={{ aspectRatio: `${width}/${height}` }}
      className="relative w-full overflow-hidden rounded-xl bg-gray-200"
    >
      <Image
        src={src}
        fill
        alt={alt}
        placeholder="blur"
        blurDataURL={blurDataURL}
        className="object-cover"
      />
    </div>
  )
}
