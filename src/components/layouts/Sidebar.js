'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarItems = [
  { name: 'Overview', href: '/dashboard', icon: '📊' },
  { name: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
  { name: 'Users', href: '/dashboard/users', icon: '👥' },
  { name: 'Products', href: '/dashboard/products', icon: '📦' },
  { name: 'Orders', href: '/dashboard/orders', icon: '🛒' },
  { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  { name: 'Reports', href: '/dashboard/reports', icon: '📋' }
]

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
           <aside className="w-64 bg-gray-100 p-4 overflow-y-auto">
            <ul className="space-y-2">
              <li className="p-2 hover:bg-gray-200 rounded cursor-pointer">Dashboard</li>
              <li className="p-2 hover:bg-gray-200 rounded cursor-pointer">Settings</li>
              <li className="p-2 hover:bg-gray-200 rounded cursor-pointer">Users</li>
              <li className="p-2 hover:bg-gray-200 rounded cursor-pointer">Reports</li>
            </ul>
          </aside>
    </>
  )
}