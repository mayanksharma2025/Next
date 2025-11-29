export default function Skeleton() {
  return (
    <div className="relative w-full aspect-square bg-gray-300 rounded-xl overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>
  )
}
