'use client'

import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ── Feature data ─────────────────────────────────────────────────────────── */

const features = [
  {
    title: 'Unified tenant, owner, and vendor workflows',
    description:
      'One system of record for every interaction. No more switching between apps.',
    gradient: 'from-brand-violet/10 to-brand-violet/5',
    iconGradient: 'from-brand-violet to-brand-violet-light',
    icon: WorkflowIcon,
    span: 'lg:col-span-2',
  },
  {
    title: 'Automated compliance',
    description:
      'Province and state-specific workflows built in. Notices, forms, and deadlines handled.',
    gradient: 'from-brand-amber/10 to-brand-amber/5',
    iconGradient: 'from-brand-amber to-brand-amber-light',
    icon: ShieldIcon,
    span: '',
  },
  {
    title: 'Integrated payments',
    description:
      'Rent collection, vendor payouts, and financial reporting in one place.',
    gradient: 'from-emerald-500/10 to-emerald-500/5',
    iconGradient: 'from-emerald-500 to-emerald-400',
    icon: CreditCardIcon,
    span: '',
  },
  {
    title: 'Communications hub',
    description:
      'Email, SMS, calling, and in-app messaging. Every conversation in context.',
    gradient: 'from-sky-500/10 to-sky-500/5',
    iconGradient: 'from-sky-500 to-sky-400',
    icon: MessageIcon,
    span: 'lg:col-span-2',
  },
] as const

/* ── SVG Icons ────────────────────────────────────────────────────────────── */

function WorkflowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M17.5 14v3.5a1 1 0 01-1 1H14" />
      <path d="M14 17.5h3.5" />
    </svg>
  )
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

function CreditCardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  )
}

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      <path d="M8 9h8M8 13h4" />
    </svg>
  )
}

/* ── Feature card ─────────────────────────────────────────────────────────── */

function FeatureCard({
  feature,
}: {
  feature: (typeof features)[number]
}) {
  const isLarge = feature.span.includes('col-span-2')

  return (
    <motion.div
      variants={revealItem}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-white ${feature.span}`}
    >
      {/* Gradient accent top bar */}
      <div
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${feature.iconGradient} opacity-60`}
        aria-hidden
      />

      <div className={`relative p-8 ${isLarge ? 'md:p-10' : ''}`}>
        {/* Subtle gradient bg */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
          aria-hidden
        />

        <div className="relative z-10">
          {/* Icon */}
          <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.iconGradient} shadow-lg`}>
            <feature.icon className="h-6 w-6 text-white" />
          </div>

          {/* Title */}
          <h3 className={`font-heading font-semibold text-brand-indigo ${isLarge ? 'text-xl md:text-2xl' : 'text-lg'}`}>
            {feature.title}
          </h3>

          {/* Description */}
          <p className={`mt-3 leading-relaxed text-brand-slate-500 ${isLarge ? 'max-w-lg text-base' : 'text-sm'}`}>
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Feature showcase section ─────────────────────────────────────────────── */

export function FeatureShowcase() {
  return (
    <section className="relative bg-brand-slate-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll className="text-center">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-violet"
          >
            Platform
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mx-auto mt-3 max-w-xl font-heading text-3xl font-bold tracking-tight text-brand-indigo md:text-4xl"
          >
            Everything you need. Nothing you don't.
          </motion.h2>
        </RevealOnScroll>

        <RevealOnScroll className="mt-16 grid gap-5 lg:grid-cols-2" stagger={0.1}>
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
