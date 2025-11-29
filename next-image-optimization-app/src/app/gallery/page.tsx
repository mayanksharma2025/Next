import Image from 'next/image'
import SmartImage from './components/SmartImage'

export const revalidate = 60 // ISR

async function getImages() {
  const res = await fetch(`${process.env.SITE_URL}/api/images`, {
    next: { revalidate: 60 },
  })
  return res.json()
}

export default async function GalleryPage() {
  const images = await getImages()

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {images.map((img: any) => (
        <div key={img.id} className="rounded-xl overflow-hidden shadow">
          <SmartImage
            src={img.url}
            alt=""
            width={img.width}
            height={img.height}
            blurDataURL={img.blurData}
          />
          <p className="font-opensans font-medium text-2xl text-teal-400">
            {img.id}
          </p>
        </div>
      ))}
    </main>
  )
}

{
  /* 
🔥 This Finally Gives You:
🎉 Final Result
🔥 Skeleton appears instantly
🔥 Blur placeholder under it
🔥 Real image fades in
🔥 Perfect CLS, perfect Lighthouse
🔥 ISR static + revalidate
🔥 No AWS, no local DB
🔥 100% Cloudinary-driven

*/
}
