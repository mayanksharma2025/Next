import './globals.css'
import type { ReactNode } from 'react'
import localFont from 'next/font/local'

// import font from '../public/fonts'

// -------------- Local Fonts -------------------
// Lato
const lato = localFont({
  src: [
    {
      path: '../public/fonts/Lato-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/LatoSemibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Lato-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Lato-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-lato',
  display: 'swap',
  preload: true,
})

// Open Sans
const openSans = localFont({
  src: [
    {
      path: '../public/fonts/OpenSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/OpenSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/OpenSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-opensans',
  display: 'swap',
  preload: true,
})

// Metadata
export const metadata = {
  title: 'Fast Next.js + Tailwind site',
  description: 'Optimized for Lighthouse & Core Web Vitals',
}

// RootLayout
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${lato.variable} ${openSans.variable}`}>
      <body className="font-lato bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
