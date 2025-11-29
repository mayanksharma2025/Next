// app/components/InfiniteScrollServer.tsx
import Link from 'next/link'

interface InfiniteScrollServerProps {
  nextCursor: number | null
  currentPage: number
  search?: string
  sort?: string
  category?: string
}

export default function InfiniteScrollServer({
  nextCursor,
  currentPage,
  search = '',
  sort = '',
  category = 'all',
}: InfiniteScrollServerProps) {
  if (!nextCursor) return null // no more products

  const nextPage = currentPage + 1

  const params = new URLSearchParams({
    page: String(nextPage),
    search,
    sort,
    category,
  })

  return (
    <div className="flex justify-center mt-6">
      <Link
        href={`/product-server?${params.toString()}`}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Load More
      </Link>
    </div>
  )
}
