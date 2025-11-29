// components/SkeletonGrid.tsx
export default function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="h-[300px] bg-gray-200 animate-pulse rounded-xl"
        />
      ))}
    </div>
  )
}
