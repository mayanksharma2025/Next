'use client'
import './styles.css'
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { name: 'Register', href: '/register' },
  { name: 'Login', href: '/login' },
  { name: 'Forgot Password', href: '/forgot-password' },
]

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [input, setInput] = useState('')

  return (
    <div className="container space-x-8 space-y-16">
      <div className="space-x-4 my-4 mx-8">
        <input
          value={input}
          placeholder="Enter text"
          onChange={(e) => setInput(e.target.value)}
          className=" shadow-md p-2 border-spacing-2 border-black "
        />
      </div>
      {navLinks.map((link) => {
        const isActive = pathname.startsWith(link.href)

        return (
          <Link
            className={isActive ? 'font-bold mr-4' : 'text-blue-500 mr-4'}
            href={link.href}
            key={link.name}
          >
            {link.name}
          </Link>
        )
      })}
      {children}
    </div>
  )
}
