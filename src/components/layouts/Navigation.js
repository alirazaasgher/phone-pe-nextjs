'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Latest Mobiles', href: '/latest' },
  { name: 'Upcoming', href: '/upcoming' },
  { name: 'Compare', href: '/compare' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'News', href: '/news' }
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex space-x-6">
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            pathname === item.href
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}