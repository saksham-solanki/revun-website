'use client'

import { useRef, useState, useEffect, useId } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  Building2,
  Home,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Shield,
  Wrench,
  ShoppingCart,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
  Timer,
  ArrowRight,
  ChevronRight,
  Pencil,
  Image as ImageIcon,
  Zap,
  Star,
  CircleDot,
  BarChart3,
  Users,
  Layers,
  Settings,
  Key,
  Thermometer,
  Sparkles,
} from 'lucide-react'

/* ═══════════════════════════════════════════ */
/*  Shared utilities                           */
/* ═══════════════════════════════════════════ */

const ease = [0.22, 1, 0.36, 1] as const

function SectionWrapper({ children, id, dark }: { children: React.ReactNode; id: string; dark?: boolean }) {
  return (
    <section id={id} className={`py-14 ${dark ? 'bg-[#F5F6F8]' : 'bg-white'}`}>
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </section>
  )
}

function SectionHeader({ eyebrow, title, highlight, description, dark }: {
  eyebrow: string; title: string; highlight: string; description: string; dark?: boolean
}) {
  return (
    <RevealOnScroll className="mx-auto max-w-2xl text-center">
      <motion.p variants={revealItem} className={`text-sm font-heading font-semibold uppercase tracking-wider ${dark ? 'text-brand-blue-light' : 'text-brand-blue'}`}>
        {eyebrow}
      </motion.p>
      <motion.h2 variants={revealItem} className={`mt-3 font-display text-4xl font-normal md:text-5xl ${dark ? 'text-[#0A1628]' : 'text-brand-graphite'}`}>
        {title} <span className={dark ? 'text-brand-blue-light' : 'text-accent'}>{highlight}</span>
      </motion.h2>
      <motion.p variants={revealItem} className={`mx-auto mt-4 max-w-xl text-lg ${dark ? 'text-[#555860]' : 'text-brand-graphite/70'}`}>
        {description}
      </motion.p>
    </RevealOnScroll>
  )
}

/* Animated donut gauge */
function DonutGauge({ value, size, sw, color, label, inView, delay = 0 }: {
  value: number; size: number; sw: number; color: string; label: string; inView: boolean; delay?: number
}) {
  const r = (size - sw) / 2
  const c = 2 * Math.PI * r
  const filled = (value / 100) * c
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={size} height={size} className="-rotate-90 overflow-visible">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={sw} />
          <motion.circle
            cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
            strokeWidth={sw} strokeLinecap="round" strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={inView ? { strokeDashoffset: c - filled } : {}}
            transition={{ duration: 1.4, ease, delay }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-2xl font-bold text-brand-graphite">{value}%</span>
          <span className="text-[10px] text-brand-graphite-mid">{label}</span>
        </div>
      </div>
    </div>
  )
}

/* Mini sparkline */
function Spark({ data, color, w = 80, h = 24, inView, delay = 0 }: {
  data: number[]; color: string; w?: number; h?: number; inView: boolean; delay?: number
}) {
  const id = useId()
  const max = Math.max(...data)
  const min = Math.min(...data) * 0.85
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min)) * h}`).join(' ')
  return (
    <svg width={w} height={h} className="overflow-visible">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.2} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <motion.polyline points={pts} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1, ease, delay }}
      />
    </svg>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 1: Investment At A Glance          */
/* ═══════════════════════════════════════════ */

const propertyBreakdown = [
  { type: 'Condos', count: 40, color: '#176FEB' },
  { type: 'Houses', count: 16, color: '#0B5AD4' },
  { type: 'Apartments', count: 24, color: '#4A91F0' },
]

const quickStats = [
  { icon: Building2, label: 'Total Properties', value: '80', spark: [60, 65, 68, 72, 75, 80] },
  { icon: DollarSign, label: 'Monthly Revenue', value: '$142K', spark: [98, 110, 105, 118, 130, 142] },
  { icon: TrendingUp, label: 'YoY Growth', value: '+18%', spark: [8, 10, 12, 14, 16, 18] },
]

function InvestmentGlance() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="glance">
      <SectionHeader
        eyebrow="Portfolio Overview"
        title="Your Investment,"
        highlight="At A Glance"
        description="See all your properties in one place. Track occupancy, activity, and performance across your entire portfolio."
      />
      <div ref={ref} className="mt-14 grid gap-6 lg:grid-cols-12">
        {/* Main dashboard card */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white p-6 lg:col-span-7"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-heading text-lg font-semibold text-brand-graphite">My Investment</h3>
            <div className="flex gap-2">
              {[
                { icon: ShoppingCart, label: 'Offers', badge: '07' },
                { icon: Calendar, label: 'Tours', badge: '02' },
                { icon: ShoppingCart, label: 'Services', badge: '' },
              ].map((item) => (
                <div key={item.label} className="relative flex flex-col items-center rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-center transition-colors hover:border-brand-blue/20">
                  <item.icon className="h-5 w-5 text-brand-blue" />
                  {item.badge && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-error px-1 text-[9px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                  <span className="mt-1 text-[10px] text-brand-graphite-mid">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-8">
            {/* Occupancy donut */}
            <DonutGauge value={95} size={140} sw={10} color="#176FEB" label="Occupancy" inView={inView} delay={0.3} />

            {/* Property breakdown */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-heading text-sm font-semibold text-brand-graphite">
                  <Building2 className="h-4 w-4 text-brand-blue" /> Properties
                </span>
                <span className="font-heading text-lg font-bold text-brand-graphite">80</span>
              </div>
              {propertyBreakdown.map((p, i) => (
                <motion.div key={p.type} className="flex items-center justify-between"
                  initial={{ opacity: 0, x: 10 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, ease, delay: 0.5 + i * 0.1 }}
                >
                  <span className="flex items-center gap-2 text-sm text-brand-graphite-mid">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
                    {p.type}
                  </span>
                  <span className="rounded-md px-2.5 py-0.5 text-xs font-bold text-white" style={{ backgroundColor: p.color }}>
                    {p.count}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick stats sidebar */}
        <div className="space-y-4 lg:col-span-5">
          {quickStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex items-center justify-between rounded-xl border border-[#E5E7EB] bg-white p-5"
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.12 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10">
                  <stat.icon className="h-5 w-5 text-brand-blue" />
                </div>
                <div>
                  <p className="text-xs text-brand-graphite-mid">{stat.label}</p>
                  <p className="font-heading text-xl font-bold text-brand-graphite">{stat.value}</p>
                </div>
              </div>
              <Spark data={stat.spark} color="#176FEB" inView={inView} delay={0.5 + i * 0.12} />
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 2: Scheduled Tours                 */
/* ═══════════════════════════════════════════ */

const tours = [
  {
    agent: 'Jeremy K.', role: 'Tenant Agent', date: 'Thu, May 15', time: '10:30 AM',
    property: 'Unit 704 · Portland St, Mississauga, ON',
    status: 'Confirmed',
  },
  {
    agent: 'Mike U.', role: 'Tenant Agent', date: 'Fri, May 16', time: '2:00 PM',
    property: 'Unit 301 · Queen St W, Toronto, ON',
    status: 'Pending',
  },
  {
    agent: 'Lisa P.', role: 'Buyer Agent', date: 'Sat, May 17', time: '11:00 AM',
    property: 'Unit 12 · York St, Mississauga, ON',
    status: 'Confirmed',
  },
]

function ScheduledTours() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="tours">
      <SectionHeader
        eyebrow="Tour Management"
        title="Scheduled"
        highlight="Tours"
        description="View upcoming showings, who is attending, and when each tour is happening. All organized by date."
      />
      <div ref={ref} className="mt-14">
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white"
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          {/* Table header */}
          <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
            <h3 className="font-heading text-lg font-semibold text-brand-graphite">Upcoming Tours</h3>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-medium text-brand-blue">
                {tours.length} scheduled
              </span>
              <Calendar className="h-4 w-4 text-brand-graphite-mid" />
            </div>
          </div>

          {/* Tour rows */}
          <div className="divide-y divide-[#E5E7EB]">
            {tours.map((tour, i) => (
              <motion.div
                key={tour.agent}
                className="flex items-center gap-5 px-6 py-5 transition-colors hover:bg-brand-off-white/50"
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, ease, delay: 0.2 + i * 0.1 }}
              >
                {/* Agent avatar */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 font-heading text-sm font-bold text-brand-blue">
                  {tour.agent.split(' ').map((n) => n[0]).join('')}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-sm font-semibold text-brand-graphite">{tour.agent}</span>
                    <span className="rounded-full bg-brand-off-white px-2 py-0.5 text-[10px] text-brand-graphite-mid">{tour.role}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-brand-graphite-mid">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {tour.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {tour.time}</span>
                  </div>
                  <p className="mt-1 flex items-center gap-1 text-xs text-brand-graphite-mid">
                    <MapPin className="h-3 w-3" /> {tour.property}
                  </p>
                </div>

                {/* Status badge */}
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${tour.status === 'Confirmed' ? 'bg-[#5EA500]/15 text-[#5EA500]' : 'bg-[#F59E0B]/15 text-[#F59E0B]'}`}>
                  {tour.status}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-[#E5E7EB] px-6 py-3 text-center">
            <button className="text-sm font-medium text-brand-blue transition-colors hover:text-brand-blue-dark">
              View All Tours <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 3: Offers & Approvals              */
/* ═══════════════════════════════════════════ */

const offers = [
  { property: 'Unit 704 · Portland St, Mississauga', amount: '$1,650', moveIn: 'Mar 1, 2026', status: 'Pending', expires: '19h 59m', color: '#F59E0B' },
  { property: 'Unit 301 · Queen St W, Toronto', amount: '$2,100', moveIn: 'Apr 1, 2026', status: 'Approved', expires: '', color: '#5EA500' },
  { property: 'Unit 12 · York St, Mississauga', amount: '$1,450', moveIn: 'Mar 15, 2026', status: 'Pending', expires: '3h 12m', color: '#F59E0B' },
]

const offerTabs = ['All', 'Pending', 'Approved', 'Declined'] as const

function OffersApprovals() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeTab, setActiveTab] = useState<string>('All')

  const filtered = activeTab === 'All' ? offers : offers.filter((o) => o.status === activeTab)

  return (
    <SectionWrapper id="offers">
      <SectionHeader
        eyebrow="Offer Pipeline"
        title="Offers &"
        highlight="Approvals"
        description="Review new offers, see their status, and respond before they expire. Stay on top of every opportunity."
      />
      <div ref={ref} className="mt-14">
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white"
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          {/* Header + tabs */}
          <div className="flex flex-col gap-4 border-b border-[#E5E7EB] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-heading text-lg font-semibold text-brand-graphite">Offers</h3>
            <div className="flex gap-1.5">
              {offerTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${activeTab === tab ? 'bg-brand-blue text-white' : 'bg-brand-off-white text-brand-graphite-mid hover:text-brand-blue'}`}
                >
                  {tab} {tab === 'All' && <span className="ml-0.5 opacity-60">{offers.length}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Offer cards */}
          <div className="divide-y divide-[#E5E7EB]">
            <AnimatePresence mode="popLayout">
              {filtered.map((offer, i) => (
                <motion.div
                  key={offer.property}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease, delay: i * 0.05 }}
                  className="flex flex-col gap-4 px-6 py-5 transition-colors hover:bg-brand-off-white/50 sm:flex-row sm:items-center"
                >
                  {/* Status + expiry */}
                  <div className="flex items-center gap-2 sm:w-40">
                    <span className="rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: `${offer.color}20`, color: offer.color }}>
                      {offer.status}
                    </span>
                    {offer.expires && (
                      <span className="flex items-center gap-1 text-[11px] text-brand-graphite-mid">
                        <Timer className="h-3 w-3" /> {offer.expires}
                      </span>
                    )}
                  </div>

                  {/* Property */}
                  <div className="flex-1">
                    <p className="flex items-center gap-1.5 text-sm font-medium text-brand-graphite">
                      <MapPin className="h-3.5 w-3.5 text-brand-blue" /> {offer.property}
                    </p>
                  </div>

                  {/* Financials */}
                  <div className="flex items-center gap-6 text-right sm:w-48">
                    <div>
                      <p className="text-[10px] uppercase text-brand-graphite-mid">Offer</p>
                      <p className="font-heading text-base font-bold text-brand-blue">{offer.amount}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-brand-graphite-mid">Move-in</p>
                      <p className="text-sm font-medium text-brand-graphite">{offer.moveIn}</p>
                    </div>
                  </div>

                  <ChevronRight className="hidden h-4 w-4 text-brand-graphite-light sm:block" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 4: Maintenance Overview            */
/* ═══════════════════════════════════════════ */

const maintenanceStats = [
  { label: 'Completed', count: 22, color: '#5EA500', icon: CheckCircle },
  { label: 'Pending', count: 8, color: '#F59E0B', icon: AlertCircle },
  { label: 'Canceled', count: 0, color: '#E7000B', icon: XCircle },
]

const maintenanceStages = ['Submitted', 'Authorized', 'In Progress', 'Completed'] as const

const maintenanceItems = [
  { title: 'Plumbing', priority: 'High', status: 'In Progress', unit: 'Unit 4B', time: '01 hr ago' },
  { title: 'Electrical', priority: 'Medium', status: 'Submitted', unit: 'Unit 2A', time: '3 hrs ago' },
  { title: 'HVAC Filter', priority: 'Low', status: 'Completed', unit: 'Unit 7C', time: '1 day ago' },
]

function MaintenanceOverview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="maintenance">
      <SectionHeader
        eyebrow="Maintenance"
        title="Maintenance"
        highlight="Overview"
        description="Track all maintenance requests by priority and status, from submission to completion."
      />
      <div ref={ref} className="mt-14 grid gap-6 lg:grid-cols-12">
        {/* Left: Donut + stats */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white p-6 lg:col-span-5"
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <h3 className="mb-6 font-heading text-lg font-semibold text-brand-graphite">Request Summary</h3>
          <div className="flex items-center gap-6">
            <DonutGauge value={73} size={130} sw={10} color="#176FEB" label="Resolved" inView={inView} delay={0.3} />
            <div className="flex-1 space-y-3">
              <div className="text-center">
                <span className="font-heading text-3xl font-bold text-brand-graphite">30</span>
                <p className="text-xs text-brand-graphite-mid">Total Requests</p>
              </div>
              {maintenanceStats.map((s, i) => (
                <motion.div key={s.label} className="flex items-center justify-between"
                  initial={{ opacity: 0, x: 8 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, ease, delay: 0.4 + i * 0.1 }}
                >
                  <span className="flex items-center gap-2 text-sm text-brand-graphite-mid">
                    <s.icon className="h-3.5 w-3.5" style={{ color: s.color }} /> {s.label}
                  </span>
                  <span className="rounded-md px-2 py-0.5 text-xs font-bold" style={{ backgroundColor: `${s.color}15`, color: s.color }}>
                    {s.count.toString().padStart(2, '0')}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.button
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-brand-blue bg-brand-blue/5 py-3 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
          >
            Create Request
          </motion.button>
        </motion.div>

        {/* Right: Pipeline + items */}
        <div className="space-y-4 lg:col-span-7">
          {/* Stage pipeline */}
          <motion.div
            className="flex items-center gap-1 rounded-xl border border-[#E5E7EB] bg-white p-3"
            initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
          >
            {maintenanceStages.map((stage, i) => (
              <div key={stage} className={`flex flex-1 flex-col items-center gap-1.5 rounded-lg py-2.5 ${i === 3 ? 'bg-brand-blue text-white' : 'text-brand-graphite-mid'}`}>
                <div className={`flex h-7 w-7 items-center justify-center rounded-full ${i === 3 ? 'bg-white/20' : 'bg-brand-off-white'}`}>
                  {i === 0 && <Clock className="h-3.5 w-3.5" />}
                  {i === 1 && <CheckCircle className="h-3.5 w-3.5" />}
                  {i === 2 && <Wrench className="h-3.5 w-3.5" />}
                  {i === 3 && <CheckCircle className="h-3.5 w-3.5" />}
                </div>
                <span className="text-[10px] font-medium">{stage}</span>
              </div>
            ))}
          </motion.div>

          {/* Maintenance items */}
          {maintenanceItems.map((item, i) => (
            <motion.div
              key={item.title}
              className="flex items-center gap-4 rounded-xl border border-[#E5E7EB] bg-white p-5 transition-colors hover:border-brand-blue/20"
              initial={{ opacity: 0, x: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, ease, delay: 0.35 + i * 0.1 }}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10">
                <Wrench className="h-5 w-5 text-brand-blue" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-sm font-semibold text-brand-graphite">{item.title}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${item.priority === 'High' ? 'bg-brand-error/10 text-brand-error' : item.priority === 'Medium' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' : 'bg-brand-off-white text-brand-graphite-mid'}`}>
                    {item.priority} Priority
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-brand-graphite-mid">{item.unit} · {item.time}</p>
              </div>
              <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${item.status === 'Completed' ? 'bg-[#5EA500]/15 text-[#5EA500]' : item.status === 'In Progress' ? 'bg-brand-blue/10 text-brand-blue' : 'bg-[#F59E0B]/15 text-[#F59E0B]'}`}>
                {item.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 5: Financial Overview              */
/* ═══════════════════════════════════════════ */

const finMonths = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
const incomeData = [3.2, 3.8, 3.5, 4.1, 3.9, 4.3]
const expenseData = [1.4, 1.6, 1.8, 1.5, 1.7, 1.9]

const transactions = [
  { name: 'Aiden O.', type: 'Rent', amount: '+$2,200.00', time: '11:12 AM', positive: true },
  { name: 'ProFix Plumbing', type: 'Maintenance', amount: '-$450.00', time: '9:30 AM', positive: false },
  { name: 'Sarah M.', type: 'Rent', amount: '+$1,650.00', time: 'Yesterday', positive: true },
]

function FinancialOverview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const maxVal = Math.max(...incomeData, ...expenseData)

  return (
    <SectionWrapper id="financials" dark>
      <SectionHeader
        eyebrow="Financials"
        title="Your Financial"
        highlight="Overview"
        description="See how much you earned, what was spent, and what remains. Tap a month for details."
        dark
      />
      <div ref={ref} className="mt-14 grid gap-6 lg:grid-cols-12">
        {/* Chart card */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white p-6 lg:col-span-7"
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <div className="mb-6">
            <p className="text-xs text-[#555860]">Net Income</p>
            <p className="font-heading text-3xl font-bold text-[#0A1628]">$200,900.00</p>
            <div className="mt-2 flex gap-6">
              <span className="text-sm text-[#555860]">Income <span className="font-bold text-[#0A1628]">$246,900.00</span></span>
              <span className="text-sm text-[#555860]">Expenses <span className="font-bold text-brand-error">$85,621.98</span></span>
            </div>
          </div>

          {/* Bar chart */}
          <div className="flex items-end gap-3" style={{ height: 160 }}>
            {finMonths.map((month, i) => {
              const incH = (incomeData[i] / maxVal) * 120
              const expH = (expenseData[i] / maxVal) * 120
              return (
                <div key={month} className="flex flex-1 flex-col items-center gap-1">
                  <div className="flex w-full items-end justify-center gap-1">
                    <motion.div
                      className="w-[40%] rounded-t bg-brand-blue"
                      initial={{ height: 0 }}
                      animate={inView ? { height: incH } : {}}
                      transition={{ duration: 0.8, ease, delay: 0.3 + i * 0.08 }}
                    />
                    <motion.div
                      className="w-[40%] rounded-t bg-brand-error"
                      initial={{ height: 0 }}
                      animate={inView ? { height: expH } : {}}
                      transition={{ duration: 0.8, ease, delay: 0.4 + i * 0.08 }}
                    />
                  </div>
                  <span className="text-[10px] text-[#555860]">{month}</span>
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 flex gap-5">
            <span className="flex items-center gap-1.5 text-xs text-[#555860]">
              <span className="h-2 w-2 rounded-full bg-brand-blue" /> Income
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#555860]">
              <span className="h-2 w-2 rounded-full bg-brand-error" /> Expenses
            </span>
          </div>
        </motion.div>

        {/* Transactions */}
        <div className="space-y-3 lg:col-span-5">
          <motion.div
            className="rounded-2xl border border-[#E5E7EB] bg-white p-5"
            initial={{ opacity: 0, x: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
          >
            <h4 className="mb-4 font-heading text-sm font-semibold text-[#0A1628]">Recent Transactions</h4>
            <div className="space-y-3">
              {transactions.map((tx, i) => (
                <motion.div
                  key={tx.name + tx.amount}
                  className="flex items-center justify-between rounded-lg bg-white px-4 py-3"
                  initial={{ opacity: 0, x: 8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, ease, delay: 0.4 + i * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full ${tx.positive ? 'bg-[#5EA500]/20' : 'bg-brand-error/20'}`}>
                      <DollarSign className={`h-4 w-4 ${tx.positive ? 'text-[#5EA500]' : 'text-brand-error'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#0A1628]">{tx.name}</p>
                      <p className="text-[11px] text-[#555860]">{tx.type} · {tx.time}</p>
                    </div>
                  </div>
                  <span className={`font-heading text-sm font-bold ${tx.positive ? 'text-[#5EA500]' : 'text-brand-error'}`}>
                    {tx.amount}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick financial stats */}
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            {[
              { label: 'Collection Rate', value: '97.8%', icon: TrendingUp, color: '#5EA500' },
              { label: 'Avg Rent', value: '$1,820', icon: DollarSign, color: '#176FEB' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-[#E5E7EB] bg-white p-4 text-center">
                <s.icon className="mx-auto mb-1.5 h-5 w-5" style={{ color: s.color }} />
                <p className="font-heading text-lg font-bold text-[#0A1628]">{s.value}</p>
                <p className="text-[10px] text-[#555860]">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 6: Rent Guarantee                  */
/* ═══════════════════════════════════════════ */

const guaranteeFeatures = [
  { icon: Shield, title: 'Guaranteed Rent', description: 'Up to 12 months or $60,000 if a tenant defaults' },
  { icon: Home, title: 'Property Damage Protection', description: 'Covered up to $10,000 for vandalism or misuse' },
  { icon: FileText, title: 'Legal Support Included', description: 'Paralegal services and court fees covered up to $2,000' },
]

function RentGuarantee() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="guarantee">
      <SectionHeader
        eyebrow="Protection"
        title="Guarantee"
        highlight="Your Rent"
        description="Protect your rental income with coverage for missed rent and property damage. Never miss a payment again."
      />
      <div ref={ref} className="mt-14 grid items-center gap-10 lg:grid-cols-2">
        {/* Left: Feature list */}
        <div className="space-y-4">
          <motion.div
            className="mb-6 rounded-xl border border-brand-blue/20 bg-brand-blue-tint px-5 py-4"
            initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
          >
            <p className="text-xs font-medium text-brand-blue">With Rental Guarantee Protection</p>
            <p className="mt-1 font-heading text-xl font-semibold text-brand-graphite">
              Never miss a rent payment again
            </p>
            <p className="mt-1 text-sm text-brand-graphite-mid">
              Your rental income is protected, even if tenants default.
            </p>
          </motion.div>

          {guaranteeFeatures.map((feat, i) => (
            <motion.div
              key={feat.title}
              className="flex items-start gap-4 rounded-xl border border-[#E5E7EB] bg-white p-5 transition-all hover:border-brand-blue/20"
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.12 }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10">
                <feat.icon className="h-5 w-5 text-brand-blue" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-semibold text-brand-graphite">{feat.title}</h4>
                <p className="mt-1 text-sm text-brand-graphite-mid">{feat.description}</p>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
          >
            <Link
              href="/pricing/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-blue-dark"
            >
              Learn More <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* Right: Visual card */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white p-6"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
        >
          <div className="mb-5 flex items-center justify-between">
            <h4 className="font-heading text-base font-semibold text-brand-graphite">Coverage Summary</h4>
            <span className="rounded-full bg-[#5EA500]/15 px-2.5 py-0.5 text-xs font-medium text-[#5EA500]">Active</span>
          </div>

          {/* Coverage bars */}
          {[
            { label: 'Rent Protection', amount: '$60,000', pct: 85, color: '#176FEB' },
            { label: 'Damage Coverage', amount: '$10,000', pct: 100, color: '#0B5AD4' },
            { label: 'Legal Fees', amount: '$2,000', pct: 40, color: '#4A91F0' },
          ].map((bar, i) => (
            <div key={bar.label} className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-brand-graphite-mid">{bar.label}</span>
                <span className="text-xs font-bold" style={{ color: bar.color }}>{bar.amount}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-[#E5E7EB]">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: bar.color }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${bar.pct}%` } : {}}
                  transition={{ duration: 1, ease, delay: 0.5 + i * 0.12 }}
                />
              </div>
            </div>
          ))}

          <div className="mt-5 rounded-lg bg-brand-off-white p-4 text-center">
            <p className="text-xs text-brand-graphite-mid">Total Coverage</p>
            <p className="font-heading text-2xl font-bold text-brand-graphite">$72,000</p>
            <p className="mt-0.5 text-[11px] text-brand-graphite-mid">Per unit per year</p>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 7: All Services                    */
/* ═══════════════════════════════════════════ */

const services = [
  { title: 'Tenant Placement', description: 'Find your perfect tenant with our screening and placement service.', icon: Users, tag: '' },
  { title: 'Property Management', description: 'Hassle-free property care with dedicated managers.', icon: Building2, tag: 'Recommended' },
  { title: 'Maintenance', description: 'Home upkeep essentials with vetted vendors.', icon: Wrench, tag: '' },
  { title: 'Property Essentials', description: 'Insurance, inspections, and compliance tools.', icon: Shield, tag: '' },
]

function AllServices() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="services">
      <SectionHeader
        eyebrow="Marketplace"
        title="All Services"
        highlight="In One Place"
        description="Access property management, tenant placement, maintenance, insurance, and more from a single dashboard."
      />
      <div ref={ref} className="mt-14 grid gap-5 sm:grid-cols-2">
        {services.map((svc, i) => (
          <motion.div
            key={svc.title}
            className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all duration-150 hover:border-brand-blue/20"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.1 }}
          >
            {/* Gradient banner top */}
            <div className="relative h-32 overflow-hidden bg-gradient-to-br from-brand-blue/10 to-brand-blue/5">
              <div className="absolute inset-0 bg-grid opacity-[0.04]" />
              <div className="absolute bottom-4 left-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                  <svc.icon className="h-5 w-5 text-brand-blue" />
                </div>
              </div>
              {svc.tag && (
                <span className="absolute right-4 top-4 rounded-full bg-brand-blue px-2.5 py-0.5 text-[10px] font-medium text-white">
                  {svc.tag}
                </span>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-heading text-lg font-semibold text-brand-graphite">{svc.title}</h3>
              <p className="mt-1.5 text-sm text-brand-graphite-mid">{svc.description}</p>
              <div className="mt-4 flex items-center text-sm font-medium text-brand-blue transition-colors group-hover:text-brand-blue-dark">
                Explore <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <RevealOnScroll className="mt-10 text-center">
        <motion.div variants={revealItem}>
          <Link
            href="/pricing/"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-blue px-8 text-sm font-semibold text-white transition-all hover:bg-brand-blue-dark"
          >
            Get Started
          </Link>
        </motion.div>
      </RevealOnScroll>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Section 8: Edit Your Unit                  */
/* ═══════════════════════════════════════════ */

const unitFields = [
  { icon: MapPin, label: 'Unit address' },
  { icon: FileText, label: 'Essential info' },
  { icon: DollarSign, label: 'Unit pricing' },
  { icon: Thermometer, label: 'Included utilities' },
  { icon: Star, label: 'Unit features' },
  { icon: Building2, label: 'Building feature' },
  { icon: Key, label: 'Key location' },
]

function EditUnit() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="edit-unit">
      <SectionHeader
        eyebrow="Unit Management"
        title="Edit Your Unit,"
        highlight="Anytime"
        description="Update your unit details, pricing, features, and information whenever you need. Full control at your fingertips."
      />
      <div ref={ref} className="mt-14 grid items-start gap-8 lg:grid-cols-2">
        {/* Left: Unit preview */}
        <motion.div
          className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white"
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          {/* Image placeholder */}
          <div className="relative h-52 bg-gradient-to-br from-brand-blue/10 to-brand-off-white">
            <div className="absolute inset-0 bg-grid opacity-[0.04]" />
            <div className="absolute bottom-3 left-4 flex gap-2">
              <span className="flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                <ImageIcon className="h-3 w-3" /> 14
              </span>
              <span className="flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                <Layers className="h-3 w-3" /> 01
              </span>
            </div>
            <button className="absolute bottom-3 right-4 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[11px] font-medium text-brand-graphite shadow-sm">
              <Pencil className="h-3 w-3" /> Edit
            </button>
          </div>

          {/* Unit info */}
          <div className="p-5">
            <h3 className="font-heading text-lg font-semibold text-brand-graphite">Unit 704 · Portland St</h3>
            <p className="mt-1 text-sm text-brand-graphite-mid">Mississauga, ON · 2 Bed · 2 Bath · 950 sqft</p>
            <div className="mt-4 flex gap-3">
              <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-medium text-brand-blue">$1,650/mo</span>
              <span className="rounded-full bg-[#5EA500]/10 px-3 py-1 text-xs font-medium text-[#5EA500]">Occupied</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Editable fields */}
        <div className="space-y-2.5">
          {unitFields.map((field, i) => (
            <motion.div
              key={field.label}
              className="flex items-center justify-between rounded-xl border border-[#E5E7EB] bg-white px-5 py-4 transition-all hover:border-brand-blue/20"
              initial={{ opacity: 0, x: 12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, ease, delay: 0.15 + i * 0.07 }}
            >
              <div className="flex items-center gap-3">
                <field.icon className="h-4.5 w-4.5 text-brand-graphite-mid" />
                <span className="text-sm font-medium text-brand-graphite">{field.label}</span>
              </div>
              <button className="flex items-center gap-1 text-xs font-medium text-brand-blue transition-colors hover:text-brand-blue-dark">
                <Pencil className="h-3 w-3" /> Edit
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ═══════════════════════════════════════════ */
/*  Hero                                       */
/* ═══════════════════════════════════════════ */

function InvestmentHero() {
  return (
    <section className="relative overflow-hidden bg-white pb-12 pt-28 md:pt-36">
      <div className="absolute inset-0 bg-grid bg-grid-mask opacity-40" aria-hidden="true" />
      <div className="absolute top-0 right-[-200px] h-[500px] w-[500px] rounded-full bg-brand-blue/[0.04] blur-[120px]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <RevealOnScroll>
          <motion.div variants={revealItem} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 shadow-sm">
            <Sparkles className="h-4 w-4 text-brand-blue" />
            <span className="text-sm font-medium text-brand-graphite-mid">Investment Dashboard</span>
          </motion.div>
          <motion.h1
            variants={revealItem}
            className="font-display text-5xl font-normal leading-[1.1] tracking-tight text-brand-graphite md:text-7xl"
          >
            Your entire portfolio,{' '}
            <span className="text-brand-blue">one dashboard</span>
          </motion.h1>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-graphite-mid md:text-xl"
          >
            Track occupancy, schedule tours, review offers, manage maintenance,
            monitor financials, and protect your income - all from one place.
          </motion.p>
          <motion.div variants={revealItem} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/pricing/"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-all hover:bg-brand-blue-dark"
            >
              Get Started Free
            </Link>
            <Link
              href="/demo/"
              className="inline-flex h-14 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-8 text-base font-semibold text-brand-graphite transition-all hover:border-brand-blue/30 hover:shadow-sm"
            >
              Book a Demo
            </Link>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════ */
/*  Page Assembly                              */
/* ═══════════════════════════════════════════ */

export function InvestmentPage() {
  return (
    <>
      <InvestmentHero />
      <InvestmentGlance />
      <ScheduledTours />
      <OffersApprovals />
      <MaintenanceOverview />
      <FinancialOverview />
      <RentGuarantee />
      <AllServices />
      <EditUnit />
    </>
  )
}
