'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RotatingBadgeProps {
  phrases: string[]
  interval?: number
  className?: string
}

export function RotatingBadge({
  phrases,
  interval = 3000,
  className,
}: RotatingBadgeProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length)
    }, interval)
    return () => clearInterval(timer)
  }, [phrases.length, interval])

  return (
    <span
      className={`inline-flex overflow-hidden rounded-lg ${className ?? ''}`}
      style={{ minWidth: 'min(180px, 50vw)' }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-120%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="cta-gradient inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1 text-sm font-semibold text-white"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
