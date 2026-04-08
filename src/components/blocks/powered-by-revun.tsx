'use client'

import { useRef, useId } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  Building2,
  Users,
  Wrench,
  ArrowRight,
  TrendingUp,
  Home,
  FileText,
  DollarSign,
  ClipboardCheck,
  MessageSquare,
  Calendar,
} from 'lucide-react'

/* ── Mini sparkline for cards ── */
function CardSparkline({ data, color, inView }: { data: number[]; color: string; inView: boolean }) {
  const id = useId()
  const w = 100
  const h = 28
  const max = Math.max(...data)
  const min = Math.min(...data) * 0.85
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - ((v - min) / (max - min)) * h,
  }))
  const linePts = pts.map((p) => `${p.x},${p.y}`).join(' ')
  const areaPath = `M ${pts[0].x},${h} L ${linePts.split(' ').map((p) => `L ${p}`).join(' ')} L ${pts[pts.length - 1].x},${h} Z`

  return (
    <svg width={w} height={h} className="overflow-visible">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.15} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <motion.path
        d={areaPath}
        fill={`url(#${id})`}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      />
      <motion.polyline
        points={linePts}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const, delay: 0.3 }}
      />
      <motion.circle
        cx={pts[pts.length - 1].x}
        cy={pts[pts.length - 1].y}
        r={3}
        fill="white"
        stroke={color}
        strokeWidth={2}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 1.2, type: 'spring', stiffness: 300, damping: 20 }}
      />
    </svg>
  )
}

/* ── Mini stat row inside cards ── */
function MiniStat({ icon: Icon, label, value, trend, color, inView, delay }: {
  icon: React.ComponentType<{ className?: string }>
  label: string; value: string; trend: string; color: string; inView: boolean; delay: number
}) {
  return (
    <motion.div
      className="flex items-center justify-between rounded-lg bg-[#F5F6F8] px-3 py-2"
      initial={{ opacity: 0, x: 8 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const, delay }}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-[#555860]" />
        <span className="text-[11px] text-[#555860]">{label}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-bold" style={{ color }}>{value}</span>
        <span className="text-[9px] text-[#5EA500]">{trend}</span>
      </div>
    </motion.div>
  )
}

/* ── Operator card data ── */
const operators = [
  {
    icon: Building2,
    title: 'Property Management Companies',
    description: 'Your PM runs their entire operation on Revun, from rent collection to maintenance dispatch.',
    color: '#176FEB',
    sparkData: [42, 48, 52, 58, 55, 62, 68, 74],
    stats: [
      { icon: Home, label: 'Units Managed', value: '2,340', trend: '+12%' },
      { icon: DollarSign, label: 'Rent Collected', value: '$1.2M', trend: '+8%' },
      { icon: ClipboardCheck, label: 'Work Orders', value: '94%', trend: '+3%' },
    ],
    features: ['Rent Collection', 'Tenant Screening', 'Maintenance'],
  },
  {
    icon: Users,
    title: 'Brokerages & Agents',
    description: 'Real estate brokerages use Revun to manage deals, documents, and client communication.',
    color: '#0B5AD4',
    sparkData: [30, 35, 38, 44, 50, 48, 56, 62],
    stats: [
      { icon: FileText, label: 'Active Deals', value: '187', trend: '+22%' },
      { icon: MessageSquare, label: 'Client Comms', value: '1.4K', trend: '+15%' },
      { icon: Calendar, label: 'Showings/mo', value: '320', trend: '+18%' },
    ],
    features: ['Deal Pipeline', 'Digital Docs', 'Client Portal'],
  },
  {
    icon: Wrench,
    title: 'Maintenance Companies',
    description: "Maintenance providers dispatch, track, and invoice through Revun's work order system.",
    color: '#5EA500',
    sparkData: [20, 28, 32, 30, 38, 42, 46, 52],
    stats: [
      { icon: ClipboardCheck, label: 'Jobs Completed', value: '856', trend: '+9%' },
      { icon: DollarSign, label: 'Invoiced', value: '$142K', trend: '+14%' },
      { icon: TrendingUp, label: 'On-Time Rate', value: '97%', trend: '+2%' },
    ],
    features: ['Work Orders', 'Vendor Dispatch', 'Invoicing'],
  },
]

/* ── Animated connecting line (center flow) ── */
function FlowConnector({ inView }: { inView: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
      <svg className="h-full w-full" preserveAspectRatio="none">
        {/* Horizontal connecting line behind cards */}
        <motion.line
          x1="16.5%"
          y1="50%"
          x2="83.5%"
          y2="50%"
          stroke="#E5E7EB"
          strokeWidth={1.5}
          strokeDasharray="6 4"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
        />
        {/* Animated dot traveling the line */}
        <motion.circle
          r={4}
          fill="#176FEB"
          initial={{ opacity: 0 }}
          animate={inView ? {
            cx: ['16.5%', '50%', '83.5%', '50%', '16.5%'],
            cy: ['50%', '50%', '50%', '50%', '50%'],
            opacity: [0, 1, 1, 1, 0],
          } : {}}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear', delay: 1.5 }}
        />
      </svg>
    </div>
  )
}

/* ── Operator Card ── */
function OperatorCard({ op, index, inView }: { op: typeof operators[number]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 + index * 0.15 }}
      className="group relative z-10 flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all duration-150 hover:border-brand-blue/20 hover:shadow-card-hover"
    >
      {/* Top accent bar */}
      <div className="h-[2px] w-full transition-colors duration-150" style={{ backgroundColor: `${op.color}20` }}>
        <motion.div
          className="h-full"
          style={{ backgroundColor: op.color }}
          initial={{ width: '0%' }}
          animate={inView ? { width: '100%' } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.4 + index * 0.15 }}
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        {/* Icon + title */}
        <div className="mb-4 flex items-start gap-4">
          <motion.div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${op.color}10` }}
            whileHover={{ scale: 1.05, rotate: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <op.icon className="h-6 w-6" style={{ color: op.color }} />
          </motion.div>
          <div>
            <h3 className="font-heading text-lg font-semibold leading-tight text-brand-graphite">{op.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#555860]">{op.description}</p>
          </div>
        </div>

        {/* Feature pills */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {op.features.map((f) => (
            <span
              key={f}
              className="rounded-full border border-[#E5E7EB] px-2.5 py-0.5 text-[10px] font-medium text-[#555860] transition-colors group-hover:border-brand-blue/20 group-hover:text-brand-blue"
            >
              {f}
            </span>
          ))}
        </div>

        {/* Sparkline chart */}
        <div className="mb-3 rounded-lg border border-[#E5E7EB]/60 bg-[#FAFBFC] px-3 py-2.5">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[10px] font-medium text-[#555860]">Growth Trend</span>
            <span className="text-[10px] font-bold" style={{ color: op.color }}>6 months</span>
          </div>
          <CardSparkline data={op.sparkData} color={op.color} inView={inView} />
        </div>

        {/* Mini stats */}
        <div className="space-y-1.5">
          {op.stats.map((stat, i) => (
            <MiniStat
              key={stat.label}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              trend={stat.trend}
              color={op.color}
              inView={inView}
              delay={0.6 + index * 0.15 + i * 0.08}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════ */
/*  Main export                               */
/* ═══════════════════════════════════════════ */
export function PoweredByRevun() {
  const gridRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, margin: '-80px 0px' })

  return (
    <section className="relative bg-white py-12 md:py-16">
      {/* Subtle ambient blob */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-[#176FEB]/[0.025] blur-[120px]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
          >
            Powered by Revun
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-4xl font-normal text-brand-graphite md:text-5xl"
          >
            Your property manager likely uses <span className="text-keyword">Revun</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-2xl text-lg text-brand-graphite/70"
          >
            Revun powers the software &mdash; your operator provides the service.
            Property management companies, brokerages, and maintenance companies
            run on Revun to deliver a better experience.
          </motion.p>
        </RevealOnScroll>

        {/* Cards with flow connector */}
        <div ref={gridRef} className="relative mt-14">
          <FlowConnector inView={gridInView} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {operators.map((op, i) => (
              <OperatorCard key={op.title} op={op} index={i} inView={gridInView} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <RevealOnScroll className="mt-12 text-center">
          <motion.div variants={revealItem}>
            <Link
              href="/powered-by-revun/"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-blue-dark"
            >
              Learn how Powered by Revun works
              <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
