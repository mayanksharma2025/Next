// components/PaginationServer.tsx
import Link from 'next/link'

export default function PaginationServer({
  page,
  nextCursor,
  search,
  sort,
  category,
}: any) {
  if (!nextCursor) return null

  const nextPage = page + 1

  const qs = new URLSearchParams({
    page: String(nextPage),
    search,
    sort,
    category,
  }).toString()

  return (
    <div className="flex justify-center mt-10">
      <Link
        href={`/product-server?${qs}`}
        className="px-4 py-2 bg-black text-white rounded-lg"
      >
        Load More
      </Link>
    </div>
  )
}
