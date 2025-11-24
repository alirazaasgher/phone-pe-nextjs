// app/AnalyticsTracker.js
'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const GA_MEASUREMENT_ID = 'G-KRGHF7G70Y'

export default function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname,
      })
    }
  }, [pathname])

  return null
}
