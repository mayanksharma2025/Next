import Image from 'next/image'

// app/gallery/page.tsx
export const revalidate = 60 // ISR every 60 seconds

async function getImages() {
  const res = await fetch(`${process.env.SITE_URL}/api/images`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) return []
  return res.json()
}

export default async function GalleryPage() {
  const images = await getImages()

  return (
    <main className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
      {images.map((img: any) => {
        const base = img.public_id.split('/').pop()
        const urlBase = img.url.replace(/\.(jpg|jpeg|png)$/i, '') // strip extension

        return (
          <picture key={img.id}>
            {/* AVIF */}
            <source srcSet={`${urlBase}.avif`} type="image/avif" />
            {/* WebP */}
            <source srcSet={`${urlBase}.webp`} type="image/webp" />
            {/* Fallback */}
            <Image
              src={img.url}
              alt={base}
              width={img.width}
              height={img.height}
              className="rounded-lg shadow"
              loading="lazy"
              style={{ width: '100%', height: 'auto' }}
            />
          </picture>
        )
      })}
    </main>
  )
}

{
  /*
1️⃣ Gallery Page (app/gallery/page.tsx)

   Ye page Cloudinary se images fetch karta hai (/api/images se).

   Har image ke liye <picture> tag use kiya hai:

   Browser pehle AVIF check karta hai, agar nahi hai → WebP → nahi toh original JPG/PNG.

   loading="lazy" se images tabhi load hoti hain jab user scroll kare.

   revalidate = 60 → ISR: page 60 sec ke baad automatically refresh ho sakta hai.

   Result: Fast, modern format images + fallback + lazy loading.

2️⃣ API Route (app/api/images/route.ts)

   Cloudinary API ko call karta hai aur JSON return karta hai.

   Har image ka info: id, public_id, url, width, height, format.

   Cache-Control header lagaya hai: browser/CDN 60 sec tak cache kare.

   Result: Gallery ke liye JSON data ready.

3️⃣ Middleware (middleware.ts)

   Cache-Control headers set karta hai /gallery aur /cdn ke liye.

   Fonts ko bhi 1 saal (immutable) cache karne ke liye headers set kiye.

   Result: Browser/edge caching improve, page aur images fast load.

4️⃣ Next Config (next.config.js)

   Cloudinary images ko allow kiya hai remote pattern me.

   AVIF/WebP rewrites bhi yahin define hain (agar browser support kare toh automatically serve ho).

   Headers aur rewrites ka proper setup:

   Images: 7 din cache (immutable)

   API proxy: /api/users → external API

Result: Production ready, modern image formats, caching, rewrites sab handle ho gaye.

💡 Summary:

   API → Cloudinary se data fetch karta hai.

   Gallery page → <picture> + lazy load → browser format ke hisaab se serve karta hai.

   Middleware → caching headers lagata hai.

   Config → Cloudinary images allow + rewrites + cache headers.
   
 */
}
