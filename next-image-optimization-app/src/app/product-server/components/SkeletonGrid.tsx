// app/products/components/SkeletonGrid.tsx
export default function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="rounded-xl overflow-hidden">
          <div className="w-full aspect-square bg-gray-200 animate-pulse rounded-xl" />
          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}
