// app/products/page.tsx
import FiltersServer from './components/FiltersServer'
import ProductsList from './components/ProductsList'
import InfiniteScrollServer from './components/InfiniteScrollServer'
import { Suspense } from 'react'

interface PageProps {
  searchParams?: { [key: string]: string | undefined } | undefined
}

export default async function Page({ searchParams }: PageProps) {
  // If searchParams is a promise (Next.js 16+)
  const params =
    searchParams instanceof Promise ? await searchParams : searchParams

  const page = Number(params?.page ?? 1)
  const search = params?.search ?? ''
  const sort = params?.sort ?? ''
  const category = params?.category ?? 'all'

  const limit = 12
  const cursor = (page - 1) * limit

  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
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
    <main className="p-6 max-w-6xl mx-auto">
      <Suspense fallback={<div>Loading filters...</div>}>
        <FiltersServer search={search} sort={sort} category={category} />
      </Suspense>

      <Suspense fallback={<div>Loading products...</div>}>
        <ProductsList products={data.products} />
      </Suspense>

      <InfiniteScrollServer
        nextCursor={data.nextCursor}
        currentPage={page}
        search={search}
        sort={sort}
        category={category}
      />
    </main>
  )
}
