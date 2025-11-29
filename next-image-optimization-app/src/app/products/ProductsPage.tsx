'use client'

import { useState } from 'react'
import Filters from './Filters'
import InfiniteGallery from './InfiniteGallery'

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    search: '',
    sort: '',
    category: 'all',
  })

  return (
    <>
      <Filters onChange={(f: any) => setFilters(f)} />

      <InfiniteGallery filters={filters} />
    </>
  )
}
