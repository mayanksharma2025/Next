// app/products/page.tsx
import FiltersServer from './components/FiltersServer'
import ProductsList from './components/ProductsList'
import PaginationServer from './components/PaginationServer'
import SkeletonGrid from './components/SkeletonGrid'

export default async function Page({ searchParams }: any) {
  const params =
    searchParams instanceof Promise ? await searchParams : searchParams

  const page = Number(params?.page ?? 1)
  const search = params?.search ?? ''
  const sort = params?.sort ?? ''
  const category = params?.category ?? 'all'

  const limit = 12
  const cursor = (page - 1) * limit

  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const res = await fetch(
    `${baseURL}/api/products?` +
      new URLSearchParams({
        limit: String(limit),
        cursor: String(cursor),
        search,
        sort,
        category,
      }).toString(),
    { cache: 'no-store' }
  )

  const data = await res.json()

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <FiltersServer search={search} sort={sort} category={category} />

      {/* SSR Products */}
      <ProductsList products={data.products} />

      {/* SSR Pagination */}
      <PaginationServer
        page={page}
        nextCursor={data.nextCursor}
        search={search}
        sort={sort}
        category={category}
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
