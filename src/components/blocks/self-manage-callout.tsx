'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { TrendingUp, Home, DollarSign, CheckCircle, ArrowUpRight } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

const steps = [
  { label: 'List', description: 'Syndicate to 20+ listing sites' },
  { label: 'Screen', description: 'Credit, criminal, and income checks' },
  { label: 'Lease', description: 'Province-specific digital leases' },
  { label: 'Collect', description: 'Automated rent collection' },
  { label: 'Maintain', description: 'Work orders and vendor dispatch' },
]

const revenueMonths = [
  { month: 'Jan', value: 38 },
  { month: 'Feb', value: 44 },
  { month: 'Mar', value: 41 },
  { month: 'Apr', value: 52 },
  { month: 'May', value: 56 },
  { month: 'Jun', value: 62 },
]

const notifications = [
  { text: 'Rent received - Unit 4B', icon: DollarSign, accent: '#5EA500' },
  { text: 'Lease signed - Unit 2A', icon: CheckCircle, accent: '#176FEB' },
  { text: 'Maintenance resolved - Unit 7C', icon: CheckCircle, accent: '#5EA500' },
  { text: 'New tenant screened - Unit 1D', icon: Home, accent: '#176FEB' },
]

/* ── Animated donut/ring gauge ── */
function DonutGauge({ value, size, strokeWidth, color, inView, delay = 0 }: {
  value: number; size: number; strokeWidth: number; color: string; inView: boolean; delay?: number
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const filled = (value / 100) * circumference

  return (
    <svg width={size} height={size} className="overflow-visible -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E5E7EB" strokeWidth={strokeWidth} />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={inView ? { strokeDashoffset: circumference - filled } : {}}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] as const, delay }}
      />
    </svg>
  )
}

/* ── Animated counter ── */
function AnimatedNumber({ target, prefix = '', suffix = '', inView, delay = 0, decimals = 0 }: {
  target: number; prefix?: string; suffix?: string; inView: boolean; delay?: number; decimals?: number
}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const timeout = setTimeout(() => {
      const duration = 1200
      const start = performance.now()
      const step = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(eased * target)
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, delay * 1000)
    return () => clearTimeout(timeout)
  }, [inView, target, delay])

  return <span>{prefix}{value.toFixed(decimals)}{suffix}</span>
}

/* ── Floating notification ticker ── */
function NotificationTicker({ inView }: { inView: boolean }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % notifications.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [inView])

  const notif = notifications[current]

  return (
    <div className="relative h-10 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          className="absolute inset-0 flex items-center gap-2.5 rounded-lg border border-[#E5E7EB] bg-white/80 px-3 backdrop-blur-sm"
        >
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: notif.accent + '20' }}
          >
            <notif.icon className="h-3 w-3" style={{ color: notif.accent }} />
          </span>
          <span className="truncate text-xs font-medium text-[#0A1628]">{notif.text}</span>
          <motion.span
            className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: notif.accent }}
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function DashboardCard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  const maxRevenue = Math.max(...revenueMonths.map((m) => m.value))

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
      className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-editorial"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-heading text-base font-semibold text-[#0A1628]">Portfolio Dashboard</h3>
        <motion.span
          className="rounded-full bg-[#5EA500]/20 px-2.5 py-0.5 text-xs font-medium text-[#5EA500]"
          animate={inView ? { opacity: [1, 0.5, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Live
        </motion.span>
      </div>

      {/* Top row: Donut gauge + Revenue bars */}
      <div className="flex gap-5 mb-5">
        {/* Occupancy donut */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <DonutGauge value={94} size={100} strokeWidth={8} color="#176FEB" inView={inView} delay={0.4} />
            <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
              <span className="font-heading text-xl font-bold text-[#0A1628]">
                <AnimatedNumber target={94} suffix="%" inView={inView} delay={0.6} />
              </span>
              <span className="text-[10px] text-[#9CA3AF]">Occupied</span>
            </div>
          </div>
          <span className="mt-2 text-[11px] font-medium text-[#555860]">Occupancy</span>
        </div>

        {/* Revenue bar chart */}
        <div className="flex-1">
          <div className="flex items-end justify-between gap-1.5" style={{ height: 100 }}>
            {revenueMonths.map((m, i) => {
              const barHeight = (m.value / maxRevenue) * 80
              return (
                <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                  <motion.div
                    className="w-full rounded-t-md"
                    style={{ backgroundColor: i === revenueMonths.length - 1 ? '#176FEB' : '#176FEB40' }}
                    initial={{ height: 0 }}
                    animate={inView ? { height: barHeight } : {}}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1] as const,
                      delay: 0.5 + i * 0.08,
                    }}
                  />
                  <span className="text-[9px] text-[#9CA3AF]">{m.month}</span>
                </div>
              )
            })}
          </div>
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-[#555860]">Revenue</span>
            <ArrowUpRight className="h-3 w-3 text-[#5EA500]" />
            <span className="text-[11px] font-bold text-[#5EA500]">+18%</span>
          </div>
        </div>
      </div>

      {/* KPI cards row */}
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        {([
          { label: 'Rent Collected', value: 48.2, prefix: '$', suffix: 'K', color: '#176FEB', decimals: 1 },
          { label: 'On-Time', value: 97.8, prefix: '', suffix: '%', color: '#5EA500', decimals: 1 },
          { label: 'Units', value: 24, suffix: '', color: '#176FEB', decimals: 0 },
        ] as const).map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: 0.9 + i * 0.1 }}
            className="flex flex-col items-center rounded-xl border border-[#E5E7EB] bg-[#F5F6F8] p-3"
          >
            <span className="font-heading text-lg font-bold" style={{ color: kpi.color }}>
              <AnimatedNumber target={kpi.value} prefix={'prefix' in kpi ? kpi.prefix : ''} suffix={kpi.suffix} inView={inView} delay={1 + i * 0.12} decimals={kpi.decimals} />
            </span>
            <span className="mt-0.5 text-[10px] text-[#9CA3AF]">{kpi.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Live notification ticker */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 1.3 }}
      >
        <NotificationTicker inView={inView} />
      </motion.div>
    </motion.div>
  )
}

export function SelfManageCallout() {
  return (
    <section className="relative overflow-hidden bg-[#F5F6F8] py-12 md:py-16">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid bg-grid-mask opacity-[0.03]" aria-hidden="true" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#176FEB]/[0.03] blur-[120px]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Text + Steps */}
          <div>
            <RevealOnScroll>
              <motion.p
                variants={revealItem}
                className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
              >
                Self-Manage
              </motion.p>
              <motion.h2
                variants={revealItem}
                className="mt-3 font-display text-4xl font-normal text-[#0A1628] md:text-5xl"
              >
                Own property? Manage it yourself starting at{' '}
                <span className="text-keyword">$1/day</span> per unit
              </motion.h2>
              <motion.p
                variants={revealItem}
                className="mt-4 max-w-xl text-lg text-[#555860]"
              >
                Everything you need to self-manage like a pro. No long-term contracts.
                Cancel anytime.
              </motion.p>
            </RevealOnScroll>

            {/* Steps */}
            <RevealOnScroll className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3" stagger={0.08}>
              {steps.map((step, idx) => (
                <motion.div
                  key={step.label}
                  variants={revealItem}
                  className="relative flex flex-col items-center rounded-xl border border-[#E5E7EB] bg-white p-4 text-center"
                >
                  <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue text-xs font-bold text-white">
                    {idx + 1}
                  </span>
                  <h3 className="font-heading text-sm font-semibold text-[#0A1628]">
                    {step.label}
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#555860]">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </RevealOnScroll>

            {/* CTA */}
            <RevealOnScroll className="mt-8">
              <motion.div
                variants={revealItem}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <Link
                  href="/self-manage/"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-blue px-6 text-sm font-semibold text-white shadow-cta-glow transition-all duration-200 hover:bg-brand-blue-dark"
                >
                  Start Self-Managing
                </Link>
                <Link
                  href="/self-manage/how-it-works/"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-6 text-sm font-semibold text-[#0A1628] transition-colors hover:border-[#176FEB]/30"
                >
                  See How It Works
                </Link>
              </motion.div>
            </RevealOnScroll>
          </div>

          {/* Right: Dashboard graphic */}
          <div className="lg:pl-4">
            <DashboardCard />
          </div>
        </div>
      </div>
    </section>
  )
}
