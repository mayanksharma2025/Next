import InfiniteGallery from './components/InfiniteGallery'

export const revalidate = 60

export default function GalleryPage() {
  return (
    <main className="p-6">
      <InfiniteGallery />
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
🔥 100% Cloudinary-driven

now we add Infinite Scroll using:

✔ Server Components for initial load
✔ API with pagination (Cloudinary paginated API)
✔ Client Component for infinite scroll
✔ Smooth Skeleton + Blur placeholders
✔ No AWS / No local DB
✔ Fully Cloudinary-powered


Infinite Scroll Client Component

This is the main part.
It:
✔ Loads initial images
✔ Observes scroll bottom
✔ Calls API to fetch next batch
✔ Shows skeleton while loading
✔ Uses SmartImage (blur + fade)


Next Feature?

Choose:

1️⃣ Individual Image Page (/gallery/[id]) with SEO
2️⃣ Cloudinary Responsive Breakpoints (320, 640, 1280)
3️⃣ Lazy hydration optimization (React.use + RSC)
4️⃣ Scroll restoration + URL cursor states
5️⃣ Tag Filters + Search

*/
}
