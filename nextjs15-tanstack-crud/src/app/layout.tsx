import './globals.css'
import { QueryProvider } from '../lib/queryClient'

export const metadata = {
  title: 'Next.js TanStack CRUD',
  description: 'Next 14/15 + TanStack Query demo app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen text-gray-900">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
