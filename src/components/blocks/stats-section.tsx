'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { useCounter } from '@/hooks/use-counter'
import { Sparkline } from '@/components/ui/sparkline'

/* ── Sparkline data (unique per stat) ────────────────────────────────────── */

const sparklineData = {
  units: [20, 35, 28, 45, 52, 48, 65, 72, 68, 80],
  uptime: [98, 99, 99, 100, 99, 100, 100, 99, 100, 100],
  integrations: [8, 12, 15, 18, 22, 26, 30, 33, 37, 40],
  countries: [1, 1, 1, 1, 1, 1, 1, 2, 2, 2],
}

/* ── Stats section ───────────────────────────────────────────────────────── */

export function StatsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const units = useCounter(12000, 2000, inView)
  const uptime = useCounter(999, 2000, inView)
  const integrations = useCounter(40, 1500, inView)
  const countries = useCounter(2, 1000, inView)

  return (
    <section ref={ref} className="relative overflow-hidden bg-brand-navy py-20 md:py-24">
      {/* Thin decorative lines at top and bottom */}
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-0 h-px w-[60%] -translate-x-1/2 bg-white/5" />
        <div className="absolute left-1/2 bottom-0 h-px w-[60%] -translate-x-1/2 bg-white/5" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section badge */}
        <div className="mb-10 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-soft-ping rounded-full bg-brand-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-success" />
            </span>
            Live client data
          </span>
        </div>

        <RevealOnScroll className="grid grid-cols-2 gap-y-12 md:grid-cols-4" stagger={0.1}>
          {/* Units on Platform */}
          <motion.div variants={revealItem} className="relative flex flex-col items-center text-center">
            <span className="font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">
              {units.toLocaleString()}+
            </span>
            <Sparkline data={sparklineData.units} width={64} height={20} color="rgba(74,145,240,0.5)" className="mt-2" />
            <span className="mt-2 text-sm font-medium text-[#64748B]">Units on Platform</span>
          </motion.div>

          {/* Uptime */}
          <motion.div variants={revealItem} className="relative flex flex-col items-center text-center">
            <div className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-white/10 md:block" aria-hidden />
            <span className="inline-flex items-center gap-1.5 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-soft-ping rounded-full bg-brand-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-success" />
              </span>
              <span className="text-brand-success text-xs font-medium">Live</span>
            </span>
            <span className="font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">
              {(uptime / 10).toFixed(1)}%
            </span>
            <Sparkline data={sparklineData.uptime} width={64} height={20} color="rgba(52,211,153,0.5)" className="mt-2" />
            <span className="mt-2 text-sm font-medium text-[#64748B]">Uptime</span>
          </motion.div>

          {/* Integrations */}
          <motion.div variants={revealItem} className="relative flex flex-col items-center text-center">
            <div className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-white/10 md:block" aria-hidden />
            <span className="font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">
              {integrations}+
            </span>
            <Sparkline data={sparklineData.integrations} width={64} height={20} color="rgba(74,145,240,0.5)" className="mt-2" />
            <span className="mt-2 text-sm font-medium text-[#64748B]">Integrations</span>
          </motion.div>

          {/* Countries */}
          <motion.div variants={revealItem} className="relative flex flex-col items-center text-center">
            <div className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-white/10 md:block" aria-hidden />
            <span className="font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">
              {countries}
            </span>
            <Sparkline data={sparklineData.countries} width={64} height={20} color="rgba(148,130,240,0.5)" className="mt-2" />
            <span className="mt-2 text-sm font-medium text-[#64748B]">Countries</span>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
