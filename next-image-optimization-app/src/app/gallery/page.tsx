// app/gallery/page.tsx
import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import React from 'react'

export const revalidate = 3600 // ISR: re-generate page every hour

async function getImages() {
  // Reads files from /public/images and returns a unique list of base names
  const imagesDir = path.join(process.cwd(), 'public', 'images')
  let files: string[] = []
  try {
    files = fs.readdirSync(imagesDir)
  } catch (e) {
    return []
  }
  // extract base names (without extension) and only keep unique sets that have at least jpg/webp/avif
  const baseNames = new Set<string>()
  for (const f of files) {
    const match = f.match(/^(.+?)\.(jpg|jpeg|png|webp|avif)$/i)
    if (match) baseNames.add(match[1])
  }
  return Array.from(baseNames)
}

export default async function GalleryPage() {
  const images = await getImages()

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">
        Gallery — pre-generated AVIF/WebP
      </h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((base) => {
          // Request the image without extension — next.config.js rewrites will serve avif/webp/jpg per Accept
          const src = `/images/${base}`
          return (
            <article key={base} className="rounded overflow-hidden shadow-sm">
              <picture>
                {/* Fallback logic handled by rewrites too, but keep <Image> as final */}
                <source srcSet={`${src}.avif`} type="image/avif" />
                <source srcSet={`${src}.webp`} type="image/webp" />
                {/* Leave img tag to be rendered by next/image below */}
                <Image
                  src={src}
                  alt={base}
                  width={1200}
                  height={800}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </picture>
              {JSON.stringify(src)}
              <div className="p-3">
                <h3 className="font-medium">{base}</h3>
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}
