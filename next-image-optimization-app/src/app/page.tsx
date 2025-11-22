import Image from 'next/image'

const cloudUrls = [
  'https://res.cloudinary.com/my-media-mayank/image/upload/v1756136747/hleyh3rsayocytxkmgw6.jpg',
  'https://res.cloudinary.com/my-media-mayank/image/upload/v1756136791/onrh2qi3mmcmlt9qzkyf.jpg',
  'https://res.cloudinary.com/my-media-mayank/image/upload/v1755997759/wxjtxjpuizba3bahb4es.jpg',
  'https://res.cloudinary.com/my-media-mayank/image/upload/v1755995337/b9jmx254ae2vdayygffp.jpg',
  'https://res.cloudinary.com/my-media-mayank/image/upload/v1755861810/kjbx9e92k2stfxhj5khe.jpg',
  'https://res.cloudinary.com/my-media-mayank/image/upload/v1755861662/llolkfj6kauoo02ixkb5.jpg',
  'https://res.cloudinary.com/my-media-mayank/image/upload/v1755861659/raixnb3zqctoomksbvf9.jpg',
  'https://res.cloudinary.com/my-media-mayank/image/upload/v1755773019/uwvrttbhfnkxmy2souhp.jpg',
  'https://res.cloudinary.com/my-media-mayank/image/upload/v1755773005/rqftbg90cixkuoffnxnn.jpg',
  'https://res.cloudinary.com/my-media-mayank/image/upload/v1750006203/r1jtkohyv2ifwcndl4vv.jpg',
]

export default function Page() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-semibold mb-6">
        Optimized Cloudinary Images — Lighthouse-ready
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cloudUrls.map((url, i) => {
          // Apply Cloudinary optimization directly
          const optimizedUrl = url.replace(
            '/upload/',
            '/upload/f_auto,q_auto,w_1200,c_fill/'
          )

          return (
            <article key={i} className="rounded overflow-hidden shadow-sm">
              <Image
                src={optimizedUrl}
                alt={`Image ${i + 1}`}
                width={1200}
                height={800}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33.33vw"
                priority={i === 0} // LCP image
                style={{ width: '100%', height: 'auto' }}
              />
              <div className="p-4">
                <h3 className="font-semibold">Image {i + 1}</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Cloudinary optimized directly via URL.
                </p>
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}
