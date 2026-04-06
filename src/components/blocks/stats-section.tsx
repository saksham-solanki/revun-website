'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ── Stat data ────────────────────────────────────────────────────────────── */

const stats = [
  { value: 12000, suffix: '+', label: 'Units on Platform' },
  { value: 99.9, suffix: '%', label: 'Uptime', decimals: 1 },
  { value: 40, suffix: '+', label: 'Integrations' },
  { value: 2, suffix: '', label: 'Countries' },
] as const

/* ── Animated counter ─────────────────────────────────────────────────────── */

function AnimatedCounter({
  value,
  suffix,
  decimals = 0,
}: {
  value: number
  suffix: string
  decimals?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px 0px' })
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (!inView) return

    const controls = animate(0, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1] as const,
      onUpdate(v) {
        if (decimals > 0) {
          setDisplayValue(v.toFixed(decimals))
        } else {
          setDisplayValue(Math.floor(v).toLocaleString())
        }
      },
    })

    return () => controls.stop()
  }, [inView, value, decimals])

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  )
}

/* ── Stats section ────────────────────────────────────────────────────────── */

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-brand-indigo py-24 md:py-28">
      {/* Subtle gradient accents */}
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute left-[10%] top-0 h-px w-[40%] bg-gradient-to-r from-transparent via-brand-violet/30 to-transparent" />
        <div className="absolute right-[10%] bottom-0 h-px w-[40%] bg-gradient-to-r from-transparent via-brand-violet/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <RevealOnScroll className="grid grid-cols-2 gap-y-12 md:grid-cols-4" stagger={0.1}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={revealItem}
              className="relative flex flex-col items-center text-center"
            >
              {/* Divider lines between stats (hidden on mobile) */}
              {i > 0 && (
                <div
                  className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-white/10 md:block"
                  aria-hidden
                />
              )}

              <span className="font-display text-4xl tracking-tight text-white md:text-5xl">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={'decimals' in stat ? stat.decimals : 0}
                />
              </span>

              <span className="mt-2 text-sm font-medium text-brand-slate-400">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
