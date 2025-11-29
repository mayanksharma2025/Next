export default function Skeleton({
  width,
  height,
}: {
  width: number
  height: number
}) {
  const aspectRatio = (height / width) * 100

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700"
      style={{ paddingBottom: `${aspectRatio}%` }}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent" />
    </div>
  )
}
