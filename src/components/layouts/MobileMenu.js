'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigationItems = [
  { name: 'Home', href: '/', icon: '🏠' },
  { name: 'Latest Mobiles', href: '/latest', icon: '📱' },
  { name: 'Upcoming', href: '/upcoming', icon: '🔮' },
  { name: 'Compare', href: '/compare', icon: '⚖️' },
  { name: 'Reviews', href: '/reviews', icon: '⭐' },
  { name: 'News', href: '/news', icon: '📰' }
]

const popularBrands = [
  { name: 'Apple', href: '/brand/apple' },
  { name: 'Samsung', href: '/brand/samsung' },
  { name: 'Google', href: '/brand/google' },
  { name: 'OnePlus', href: '/brand/oneplus' },
  { name: 'Xiaomi', href: '/brand/xiaomi' },
  { name: 'Oppo', href: '/brand/oppo' }
]

export default function MobileMenu({ isOpen, onClose }) {
  const pathname = usePathname()

  return (
    <div className={`
      fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 
      transform transition-transform duration-300 ease-in-out lg:hidden
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
          aria-label="Close menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Main Navigation */}
        <nav className="p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Popular Brands */}
        <div className="px-4 py-2 border-t">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Popular Brands
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {popularBrands.map((brand) => (
              <Link
                key={brand.href}
                href={brand.href}
                onClick={onClose}
                className="px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="px-4 py-2 border-t">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Quick Links
          </h3>
          <div className="space-y-2">
            <Link href="/price-range" onClick={onClose} className="block text-sm text-gray-700 hover:text-blue-600">
              Mobiles by Price
            </Link>
            <Link href="/features" onClick={onClose} className="block text-sm text-gray-700 hover:text-blue-600">
              Find by Features
            </Link>
            <Link href="/deals" onClick={onClose} className="block text-sm text-gray-700 hover:text-blue-600">
              Best Deals
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}