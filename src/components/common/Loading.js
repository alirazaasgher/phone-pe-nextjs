export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  )
}
```

## 9. Constants (lib/constants.js)
```js
export const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
  { name: 'Dashboard', href: '/dashboard' }
]

export const sidebarItems = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
  { name: 'Users', href: '/dashboard/users', icon: '👥' },
  { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  { name: 'Reports', href: '/dashboard/reports', icon: '📋' }
]