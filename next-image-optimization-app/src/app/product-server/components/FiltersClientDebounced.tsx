// app/products/components/FiltersClientDebounced.tsx
'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function FiltersClientDebounced({
  initialSearch = '',
  initialSort = '',
  initialCategory = 'all',
}: {
  initialSearch?: string
  initialSort?: string
  initialCategory?: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(initialSearch)
  const [sort, setSort] = useState(initialSort)
  const [category, setCategory] = useState(initialCategory)

  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams(
        Object.fromEntries(searchParams.entries())
      )
      if (search) params.set('search', search)
      else params.delete('search')
      if (sort) params.set('sort', sort)
      else params.delete('sort')
      if (category) params.set('category', category)
      else params.delete('category')
      params.delete('page') // reset page on filter change
      router.push(`/product-server?${params.toString()}`, {
        forceOptimisticNavigation: true,
      } as any)
    }, 450)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sort, category])

  return (
    <div className="flex gap-3 items-center mb-6">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="border p-2 rounded w-64"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="all">All</option>
        <option value="beauty">Beauty</option>
        <option value="fragrances">Fragrances</option>
        <option value="laptops">Laptops</option>X
        <option value="groceries">Groceries</option>X
        <option value="furniture">Furniture</option>X
      </select>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Default</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
      </select>
    </div>
  )
}
