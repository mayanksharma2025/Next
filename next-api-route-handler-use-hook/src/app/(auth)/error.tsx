'use client'

export default function AuthError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded bg-white p-6 shadow">
        <h2 className="mb-2 text-xl font-semibold text-red-500">
          Authentication Error
        </h2>
        <p className="mb-4 text-sm text-gray-600">{error.message}</p>
        <button
          onClick={reset}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
