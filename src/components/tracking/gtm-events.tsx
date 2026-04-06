'use client'

import { useEffect, useRef } from 'react'
import { pushEvent } from '@/lib/analytics'

export function ScrollDepthTracker() {
  const depths = useRef(new Set<25 | 50 | 75 | 100>())

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const pct = Math.round((scrollTop / docHeight) * 100)
      const thresholds = [25, 50, 75, 100] as const

      for (const t of thresholds) {
        if (pct >= t && !depths.current.has(t)) {
          depths.current.add(t)
          pushEvent({ event: 'scroll_depth', page: window.location.pathname, depth: t })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return null
}
