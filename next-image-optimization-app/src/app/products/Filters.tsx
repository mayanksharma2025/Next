'use client'

import { useState, useEffect } from 'react'

export default function Filters({ onChange }: any) {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')
  const [category, setCategory] = useState('all')

  // Debounce Search
  useEffect(() => {
    const t = setTimeout(() => {
      onChange({ search, sort, category })
    }, 400)

    return () => clearTimeout(t)
  }, [search, sort, category])

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
      {/* Search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search product..."
        className="border p-2 rounded-xl w-full sm:w-1/3"
      />

      {/* Sort */}
      <select
        className="border p-2 rounded-xl"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Sort</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
        <option value="rating-desc">Rating ↑</option>
        <option value="rating-asc">Rating ↓</option>
      </select>

      {/* Category */}
      <select
        className="border p-2 rounded-xl"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">All categories</option>
        <option value="smartphones">Smartphones</option>
        <option value="laptops">Laptops</option>
        <option value="skincare">Skincare</option>
        <option value="groceries">Groceries</option>
      </select>
    </div>
  )
}
