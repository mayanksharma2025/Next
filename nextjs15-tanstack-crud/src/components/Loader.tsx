'use client'

import React from 'react'

export default function Loader({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4"></div>
      {message && <p className="text-gray-600">{message}</p>}
    </div>
  )
}
