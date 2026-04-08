'use client'

import { useState, useEffect, useRef } from 'react'

export function useCounter(end: number, duration = 2000, shouldStart = true): number {
  const [value, setValue] = useState(0)
  const startTime = useRef<number | null>(null)
  const rafId = useRef<number>(0)

  useEffect(() => {
    if (!shouldStart) { setValue(0); return }
    startTime.current = null
    const step = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp
      const elapsed = timestamp - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * end))
      if (progress < 1) rafId.current = requestAnimationFrame(step)
    }
    rafId.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId.current)
  }, [end, duration, shouldStart])

  return value
}
