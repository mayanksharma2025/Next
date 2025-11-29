// 'use client'
// app/components/FiltersServer.tsx
import Link from 'next/link'

interface FiltersServerProps {
  search?: string
  sort?: string
  category?: string
}

export default function FiltersServer({
  search = '',
  sort = '',
  category = 'all',
}: FiltersServerProps) {
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
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
      {/* Search */}
      <form method="get" className="w-full sm:w-64">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search products..."
          className="border rounded-lg p-2 w-full"
        />
      </form>

      {/* Category */}
      <select
        name="category"
        defaultValue={category}
        className="border rounded-lg p-2 w-full sm:w-40"
        onChange={(e) =>
          (window.location.href = `?category=${e.target.value}&search=${search}&sort=${sort}`)
        }
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        name="sort"
        defaultValue={sort}
        className="border rounded-lg p-2 w-full sm:w-40"
        onChange={(e) =>
          (window.location.href = `?category=${category}&search=${search}&sort=${e.target.value}`)
        }
      >
        {sorts.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  )
}
