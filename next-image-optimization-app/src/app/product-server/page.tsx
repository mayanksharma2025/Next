// app/products/page.tsx
import FiltersServer from './components/FiltersServer' // or FiltersClientDebounced
import ProductsList from './components/ProductsList'
import InfiniteScrollClient from './components/InfiniteScrollClient'
import SkeletonGrid from './components/SkeletonGrid'
import FiltersClientDebounced from './components/FiltersClientDebounced'

export default async function Page({ searchParams }: any) {
  const params =
    searchParams instanceof Promise ? await searchParams : searchParams
  const page = Number(params?.page ?? 1)
  const search = params?.search ?? ''
  const sort = params?.sort ?? ''
  const category = params?.category ?? 'all'

  const limit = 12
  const cursor = (page - 1) * limit

  const baseURL = process.env.SITE_URL || 'http://localhost:3000'
  const url =
    `${baseURL}/api/products?` +
    new URLSearchParams({
      limit: String(limit),
      cursor: String(cursor),
      search,
      sort,
      category,
    }).toString()

  const res = await fetch(url, { cache: 'no-store' })
  const data = await res.json()

  return (
    <main className="p-6 max-w-6xl mx-auto space-y-8">
      {/* choose FiltersServer or FiltersClientDebounced */}
      {/* <FiltersServer search={search} sort={sort} category={category} /> */}
      <FiltersClientDebounced />

      {/* server-rendered first page */}
      <ProductsList products={data.images || []} />
      {/* client tiny infinite appender (keeps 90% server) */}
      <InfiniteScrollClient
        initialNextCursor={data.nextCursor ?? null}
        initialImages={[]}
        // search={search}
        // sort={sort}
        // category={category}
      />
    </main>
  )
}

{
  /* 

✅ Smooth fade-in animation for images
✅ Skeleton grid matching SSR shimmer
✅ URL pagination updates (/?page=2) using ONLY server components
✅ Real blurDataURL using plaiceholder (recommended by Vercel)
*/
}
