'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function FiltersClientDebounced() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Read URL params on initial load
  const initialSearch = searchParams.get('search') ?? ''
  const initialSort = searchParams.get('sort') ?? ''
  const initialCategory = searchParams.get('category') ?? 'all'

  const [search, setSearch] = useState(initialSearch)
  const [sort, setSort] = useState(initialSort)
  const [category, setCategory] = useState(initialCategory)

  const firstRender = useRef(true)

  // Debounced URL update on changes
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return // skip replacing URL on first load
    }

    const timer = setTimeout(() => {
      const query = new URLSearchParams({ search, sort, category })
      router.replace(`/product-server?${query.toString()}`)
    }, 500)

    return () => clearTimeout(timer)
  }, [search, sort, category, router])

  const categories = [
    'all',
    'smartphones',
    'laptops',
    'fragrances',
    'skincare',
    'groceries',
    'home-decoration',
    'furniture',
    'tops',
    'womens-dresses',
    'mens-shirts',
    'beauty',
  ]

  const sorts = [
    { label: 'Default', value: '' },
    { label: 'Price Low → High', value: 'price-asc' },
    { label: 'Price High → Low', value: 'price-desc' },
    { label: 'Rating Low → High', value: 'rating-asc' },
    { label: 'Rating High → Low', value: 'rating-desc' },
  ]

  return (
    <form
      className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="border rounded-lg p-2 w-full sm:w-64"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded-lg p-2 w-full sm:w-40"
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </option>
        ))}
      </select>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border rounded-lg p-2 w-full sm:w-40"
      >
        {sorts.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </form>
  )
}
