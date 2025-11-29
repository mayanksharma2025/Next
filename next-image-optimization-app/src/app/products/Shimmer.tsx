export default function Shimmer({ className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      {/* Base Layer */}
      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700" />

      {/* Shimmer Layer */}
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] 
        bg-linear-to-r from-transparent via-white/40 to-transparent"
      />
    </div>
  )
}
