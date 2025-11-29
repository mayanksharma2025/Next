// app/products/components/FiltersServer.tsx
export default function FiltersServer({
  search = '',
  sort = '',
  category = 'all',
}: {
  search?: string
  sort?: string
  category?: string
}) {
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
      method="get"
      className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6"
    >
      <input
        type="text"
        name="search"
        defaultValue={search}
        placeholder="Search products..."
        className="border rounded-lg p-2 w-full sm:w-64"
      />

      <select
        name="category"
        defaultValue={category}
        className="border rounded-lg p-2 w-full sm:w-40"
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </option>
        ))}
      </select>

      <select
        name="sort"
        defaultValue={sort}
        className="border rounded-lg p-2 w-full sm:w-40"
      >
        {sorts.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Apply
      </button>
    </form>
  )
}
