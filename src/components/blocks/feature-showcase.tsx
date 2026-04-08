'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useCounter } from '@/hooks/use-counter'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ═══════════════════════════════════════════════════════════════════════════
   Browser chrome wrapper
   ═══════════════════════════════════════════════════════════════════════════ */

function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-[#E5E7EB] bg-[#F8F9FA] px-3 py-2">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
          <span className="h-2 w-2 rounded-full bg-[#FEBD2F]" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="rounded bg-white border border-[#E5E7EB] px-2.5 py-0.5 text-[9px] text-[#94A3B8]">
            {url}
          </span>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Animated score ring (PageSpeed style)
   ═══════════════════════════════════════════════════════════════════════════ */

function ScoreRing({
  value, label, color, inView, delay, size = 56,
}: {
  value: number; label: string; color: string; inView: boolean; delay: number; size?: number
}) {
  const counter = useCounter(value, 1200, inView)
  const r = (size - 4) / 2
  const circ = 2 * Math.PI * r
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="-rotate-90" width={size} height={size}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E7EB" strokeWidth={3.5} />
          <motion.circle
            cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke={color} strokeWidth={3.5} strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={inView ? { strokeDashoffset: circ - (value / 100) * circ } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold" style={{ color }}>{counter}</span>
        </div>
      </div>
      <span className="text-[10px] text-[#555860]">{label}</span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   1. Unified Workflows - PageSpeed-style dashboard
   ═══════════════════════════════════════════════════════════════════════════ */

function VizWorkflows({ inView }: { inView: boolean }) {
  return (
    <BrowserFrame url="app.revun.com/dashboard">
      <div className="flex items-center justify-around">
        {[
          { v: 98, l: 'Leasing', c: '#22C55E' },
          { v: 100, l: 'Payments', c: '#22C55E' },
          { v: 96, l: 'Maintenance', c: '#22C55E' },
          { v: 100, l: 'Compliance', c: '#22C55E' },
        ].map((s, i) => (
          <ScoreRing key={s.l} value={s.v} label={s.l} color={s.c} inView={inView} delay={0.2 + i * 0.12} />
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {[
          { l: 'Tools consolidated', v: '5 → 1' },
          { l: 'Data sync delay', v: '0ms' },
          { l: 'Single sign-on', v: 'Active' },
        ].map((m, i) => (
          <motion.div
            key={m.l}
            className="flex items-center justify-between text-[11px]"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 + i * 0.1 }}
          >
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
              <span className="text-[#555860]">{m.l}</span>
            </span>
            <span className="font-semibold text-brand-graphite">{m.v}</span>
          </motion.div>
        ))}
      </div>
    </BrowserFrame>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. Automated Compliance - province compliance checker
   ═══════════════════════════════════════════════════════════════════════════ */

function VizCompliance({ inView }: { inView: boolean }) {
  const provinces = [
    { code: 'ON', board: 'LTB', status: 'Compliant' },
    { code: 'BC', board: 'RTB', status: 'Compliant' },
    { code: 'QC', board: 'TAL', status: 'Compliant' },
    { code: 'AB', board: 'RTDRS', status: 'Compliant' },
  ]
  return (
    <BrowserFrame url="app.revun.com/compliance">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-semibold text-[#555860]">Provincial compliance</span>
        <motion.span
          className="rounded-full bg-[#22C55E]/10 px-2 py-0.5 text-[9px] font-bold text-[#22C55E]"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          10/10 provinces ✓
        </motion.span>
      </div>
      <div className="space-y-1.5">
        {provinces.map((p, i) => (
          <motion.div
            key={p.code}
            className="flex items-center justify-between rounded-md bg-[#F5F6F8] px-2.5 py-1.5"
            initial={{ opacity: 0, x: -6 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-[#176FEB]/10 text-[8px] font-bold text-[#176FEB]">{p.code}</span>
              <span className="text-[10px] text-[#555860]">{p.board}</span>
            </div>
            <motion.div
              className="flex items-center gap-1"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.12, type: 'spring', stiffness: 300, damping: 15 }}
            >
              <svg width="10" height="10" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#22C55E" fillOpacity={0.15} /><path d="M5 8l2 2 4-4" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="text-[9px] font-medium text-[#22C55E]">{p.status}</span>
            </motion.div>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="mt-2 text-center text-[9px] text-[#94A3B8]"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
      >
        +6 more provinces monitored
      </motion.div>
    </BrowserFrame>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. Integrated Payments - live transaction feed
   ═══════════════════════════════════════════════════════════════════════════ */

function VizPayments({ inView }: { inView: boolean }) {
  const collected = useCounter(284500, 1600, inView)
  const txns = [
    { name: 'Sarah M.', amount: '$1,850', method: 'Interac', color: '#22C55E' },
    { name: 'James K.', amount: '$2,100', method: 'ACH', color: '#22C55E' },
    { name: 'Unit 4B', amount: '$1,600', method: 'Card', color: '#F59E0B' },
  ]
  return (
    <BrowserFrame url="app.revun.com/payments">
      <div className="mb-3 flex items-baseline justify-between">
        <div>
          <p className="text-[9px] text-[#94A3B8] uppercase tracking-wider font-semibold">Collected this month</p>
          <motion.p
            className="text-xl font-bold text-brand-graphite"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            ${collected.toLocaleString()}
          </motion.p>
        </div>
        <motion.span
          className="rounded-full bg-[#22C55E]/10 px-2 py-0.5 text-[9px] font-bold text-[#22C55E]"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          97.8% on-time
        </motion.span>
      </div>
      <div className="space-y-1.5">
        {txns.map((tx, i) => (
          <motion.div
            key={tx.name}
            className="flex items-center justify-between rounded-md bg-[#F5F6F8] px-2.5 py-1.5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 + i * 0.12 }}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#176FEB]/10 text-[8px] font-bold text-[#176FEB]">{tx.name[0]}</div>
              <span className="text-[10px] text-[#555860]">{tx.name}</span>
              <span className="rounded bg-[#E5E7EB] px-1.5 py-px text-[8px] text-[#94A3B8]">{tx.method}</span>
            </div>
            <span className="text-[10px] font-semibold text-brand-graphite">{tx.amount}</span>
          </motion.div>
        ))}
      </div>
    </BrowserFrame>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. Communications Hub - chat thread
   ═══════════════════════════════════════════════════════════════════════════ */

function VizComms({ inView }: { inView: boolean }) {
  const msgs = [
    { text: 'Kitchen faucet is leaking again.', own: false, time: '2:14 PM' },
    { text: "Plumber dispatched for tomorrow 9-11 AM.", own: true, time: '2:16 PM' },
    { text: 'Perfect, thank you!', own: false, time: '2:17 PM' },
  ]
  return (
    <BrowserFrame url="app.revun.com/messages">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-[#176FEB]/10 flex items-center justify-center text-[8px] font-bold text-[#176FEB]">S</div>
          <span className="text-[10px] font-semibold text-[#555860]">Sarah M. - Unit 3A</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-soft-ping rounded-full bg-[#22C55E] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
          </span>
          <span className="text-[8px] text-[#22C55E]">Online</span>
        </div>
      </div>
      <div className="space-y-2">
        {msgs.map((m, i) => (
          <motion.div
            key={i}
            className={`flex ${m.own ? 'justify-end' : ''}`}
            initial={{ opacity: 0, y: 4 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.35 }}
          >
            <div className={`max-w-[80%] rounded-xl px-3 py-1.5 ${m.own ? 'bg-[#176FEB] text-white' : 'bg-[#F5F6F8] text-[#555860]'}`}>
              <p className="text-[10px] leading-relaxed">{m.text}</p>
              <p className={`text-right text-[7px] mt-0.5 ${m.own ? 'text-white/50' : 'text-[#94A3B8]'}`}>{m.time}</p>
            </div>
          </motion.div>
        ))}
        <motion.div
          className="flex gap-1 pl-1"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
        >
          {[0, 1, 2].map((d) => (
            <motion.span
              key={d}
              className="h-1 w-1 rounded-full bg-[#94A3B8]"
              animate={inView ? { y: [0, -2, 0] } : {}}
              transition={{ duration: 0.5, repeat: Infinity, delay: d * 0.12, repeatDelay: 0.3 }}
            />
          ))}
        </motion.div>
      </div>
    </BrowserFrame>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   5. Rent Guarantee - coverage dashboard with score ring
   ═══════════════════════════════════════════════════════════════════════════ */

function VizGuarantee({ inView }: { inView: boolean }) {
  const coverage = useCounter(60000, 1500, inView)
  return (
    <BrowserFrame url="app.revun.com/guarantee">
      <div className="flex items-center gap-4">
        <ScoreRing value={92} label="Tenant score" color="#22C55E" inView={inView} delay={0.2} size={60} />
        <div className="flex-1">
          <p className="text-[10px] text-[#94A3B8]">Risk assessment</p>
          <p className="text-base font-bold text-brand-graphite">Low Risk</p>
          <motion.p
            className="text-[9px] font-medium text-[#22C55E]"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            ✓ Eligible for rent guarantee
          </motion.p>
        </div>
      </div>
      <div className="mt-4 rounded-lg bg-[#F5F6F8] p-2.5">
        <div className="flex justify-between text-[9px] mb-1">
          <span className="text-[#555860]">Coverage</span>
          <span className="font-bold text-[#22C55E]">${coverage.toLocaleString()}</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-[#E5E7EB] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#176FEB] to-[#22C55E]"
            initial={{ width: '0%' }}
            animate={inView ? { width: '85%' } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          />
        </div>
        <div className="mt-1 flex justify-between text-[7px] text-[#94A3B8]">
          <span>$0</span>
          <span>$60,000 max</span>
        </div>
      </div>
    </BrowserFrame>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   6. AI Automation - operations engine (GEO/chat-style)
   ═══════════════════════════════════════════════════════════════════════════ */

function VizAI({ inView }: { inView: boolean }) {
  const steps = [
    { step: '1.', text: 'Classified as', highlight: 'Appliance - Priority: Medium', color: '#F59E0B' },
    { step: '2.', text: 'Matched vendor:', highlight: 'Pro Appliance Co. (4.9★)', color: '#22C55E' },
    { step: '3.', text: 'Scheduled for', highlight: 'Tomorrow, 10 AM', color: '#176FEB' },
    { step: '4.', text: 'Tenant notified via', highlight: 'SMS + in-app', color: '#176FEB' },
  ]
  return (
    <BrowserFrame url="app.revun.com/ai-ops">
      {/* Query */}
      <motion.div
        className="mb-3 flex justify-end"
        initial={{ opacity: 0, y: 5 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 }}
      >
        <div className="rounded-xl rounded-br-sm bg-[#176FEB]/8 px-3 py-2 max-w-[85%]">
          <p className="text-[10px] font-medium text-brand-graphite">Broken dishwasher in Unit 7C. Handle it.</p>
        </div>
      </motion.div>
      {/* Response */}
      <div className="flex items-start gap-2">
        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#176FEB]/10">
          <Sparkles className="h-2.5 w-2.5 text-[#176FEB]" />
        </div>
        <div className="space-y-1.5">
          <motion.p
            className="text-[10px] text-[#555860]"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            Done. Here&apos;s what I handled:
          </motion.p>
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              className="flex items-start gap-1"
              initial={{ opacity: 0, x: -4 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7 + i * 0.18 }}
            >
              <span className="text-[10px] text-[#94A3B8]">{s.step}</span>
              <p className="text-[10px] text-[#555860]">
                {s.text} <span className="font-semibold" style={{ color: s.color }}>{s.highlight}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Bottom badges */}
      <div className="mt-3 pt-2.5 border-t border-[#E5E7EB] flex items-center justify-between">
        <div className="flex items-center gap-1">
          {['Classify', 'Match', 'Schedule', 'Notify'].map((b) => (
            <motion.span
              key={b}
              className="rounded-full border border-[#E5E7EB] bg-[#F5F6F8] px-1.5 py-px text-[8px] font-medium text-[#555860]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.5 }}
            >
              {b}
            </motion.span>
          ))}
        </div>
        <motion.span
          className="text-[9px] font-bold text-[#22C55E]"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.6 }}
        >
          4/4 workflows
        </motion.span>
      </div>
    </BrowserFrame>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Feature data
   ═══════════════════════════════════════════════════════════════════════════ */

const features = [
  {
    title: 'Unified workflows',
    description: 'One system of record for tenants, owners, and vendors. Replace 5+ disconnected tools with a single operating system.',
    viz: VizWorkflows,
    href: '/platform/',
  },
  {
    title: 'Automated compliance',
    description: 'Province and state-specific workflows built in. Notices, forms, and deadlines handled automatically.',
    viz: VizCompliance,
    href: '/features/lease-management/',
  },
  {
    title: 'Integrated payments',
    description: 'Rent collection via ACH, card, and Interac. Vendor payouts and reporting reconciled in one place.',
    viz: VizPayments,
    href: '/features/rent-collection/',
  },
  {
    title: 'Communications hub',
    description: 'Email, SMS, calling, and in-app messaging. Every conversation tracked in context.',
    viz: VizComms,
    href: '/features/',
  },
  {
    title: 'Rent guarantee',
    description: 'Protect rental income with built-in coverage up to $60K. Never worry about missed payments.',
    viz: VizGuarantee,
    href: '/features/',
  },
  {
    title: 'AI-powered automation',
    description: 'Smart maintenance routing, automated comms, and predictive analytics that learn from your portfolio.',
    viz: VizAI,
    href: '/features/',
  },
]

/* ═══════════════════════════════════════════════════════════════════════════
   Feature card
   ═══════════════════════════════════════════════════════════════════════════ */

function FeatureCard({ feature, index, inView }: { feature: (typeof features)[number]; index: number; inView: boolean }) {
  const Viz = feature.viz
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 + index * 0.1 }}
      className="group flex flex-col"
    >
      {/* Animated visualization */}
      <Viz inView={inView} />

      {/* Text below */}
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="font-heading text-base font-semibold text-brand-graphite">{feature.title}</h3>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-[#555860]">{feature.description}</p>
        <Link
          href={feature.href}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        >
          Learn more
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Main export
   ═══════════════════════════════════════════════════════════════════════════ */

export function FeatureShowcase() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <section className="relative bg-brand-off-white py-12 md:py-16">
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-[#176FEB]/[0.02] blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <motion.p variants={revealItem} className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue">
            Platform
          </motion.p>
          <motion.h2 variants={revealItem} className="mt-3 font-display text-4xl font-normal text-brand-graphite md:text-5xl">
            Everything you need. <span className="text-keyword">Nothing</span> you don&apos;t.
          </motion.h2>
          <motion.p variants={revealItem} className="mx-auto mt-4 max-w-2xl text-lg text-brand-graphite/70">
            Six core modules that replace your entire property management stack -
            unified, automated, and built for Canadian compliance from day one.
          </motion.p>
        </RevealOnScroll>

        {/* 6 features - 3×2 grid, each with browser-chrome mockup */}
        <div ref={ref} className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  )
}
