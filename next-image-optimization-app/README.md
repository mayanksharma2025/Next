✅ Images fetched from an API (your own endpoint)
✅ Next.js 16 App Router
✅ Tailwind
✅ Fonts optimized (Inter + Lato)
✅ Perfect SEO (sitemap, robots, metadata)
✅ Perfect caching (Edge middleware)
✅ ISR
✅ AVIF/WebP automatic optimization without manually storing files

Below is the correct solution using only:

✔ Your Cloudinary URLs
✔ Next.js API Route (Server Component safe)
✔ Next.js Image Optimization

/scripts
download-and-convert.js <-- downloads Cloudinary images -> /public/images, converts to avif & webp
/public
/images <-- results go here: original + .avif + .webp
/fonts <-- your .woff2 fonts already
/app
/gallery
page.tsx <-- server-component gallery with ISR
/sitemap.xml
route.ts <-- dynamic sitemap route
/robots.txt
route.ts <-- robots.txt route
/middleware.ts <-- Edge middleware for cache headers
next.config.js <-- rewrites for Accept negotiation (avif->webp->jpg)

# in project root

npm install --save-dev sharp node-fetch@2 fs-extra

# or

yarn add -D sharp node-fetch@2 fs-extra

Notes:

You can tune quality or add resize calls (e.g. .resize({ width: 1600 })) for better file size depending on desired widths.

The script writes three files per image: .jpg (original), .webp, .avif. The gallery will prefer .avif → .webp → .jpg.

Run:

node scripts/download-and-convert.js
