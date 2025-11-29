// components/SmartImage.tsx
import Image from 'next/image'

export default function SmartImage({ src, blur, width, height, alt }: any) {
  // console.log({ blur })
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      placeholder={blur ? 'blur' : undefined}
      blurDataURL={blur || undefined}
      className="rounded-lg"
      priority
    />
  )
}
