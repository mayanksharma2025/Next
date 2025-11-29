export default function Loading() {
  return (
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 m-24">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-96 bg-gray-200 rounded-xl animate-pulse" />
      ))}
    </div>
  )
}
