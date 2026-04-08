'use client'

import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ── SVG Icons ────────────────────────────────────────────────────────────── */

function WorkflowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
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

/* ── Decorative SVGs ─────────────────────────────────────────────────────── */

function DecorativeDots({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" stroke="#176FEB" strokeWidth={1.5}>
      <circle cx="20" cy="20" r="4" />
      <circle cx="60" cy="20" r="4" />
      <circle cx="20" cy="60" r="4" />
      <circle cx="60" cy="60" r="4" />
      <line x1="24" y1="20" x2="56" y2="20" />
      <line x1="24" y1="60" x2="56" y2="60" />
      <line x1="20" y1="24" x2="20" y2="56" />
      <line x1="60" y1="24" x2="60" y2="56" />
    </svg>
  )
}

function DecorativeShield({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" stroke="#176FEB" strokeWidth={1.5}>
      <path d="M40 10L12 22v18c0 20 28 30 28 30s28-10 28-30V22L40 10z" />
    </svg>
  )
}

function DecorativeBars({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" stroke="#176FEB" strokeWidth={1.5}>
      <rect x="10" y="50" width="14" height="20" rx="2" />
      <rect x="33" y="32" width="14" height="38" rx="2" />
      <rect x="56" y="14" width="14" height="56" rx="2" />
    </svg>
  )
}

function DecorativeBubble({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" stroke="#176FEB" strokeWidth={1.5}>
      <path d="M68 48a6 6 0 01-6 6H24l-12 12V18a6 6 0 016-6h44a6 6 0 016 6v30z" />
    </svg>
  )
}

/* ── Feature data ─────────────────────────────────────────────────────────── */

const features = [
  {
    icon: WorkflowIcon,
    decorative: DecorativeDots,
    title: 'Unified',
    keyword: 'workflows',
    description:
      'One system of record for tenants, owners, and vendors. No more switching between apps.',
    span: 'lg:col-span-2',
  },
  {
    icon: ShieldIcon,
    decorative: DecorativeShield,
    title: 'Automated',
    keyword: 'compliance',
    description:
      'Province and state-specific workflows built in. Notices, forms, and deadlines handled.',
    span: '',
  },
  {
    icon: CreditCardIcon,
    decorative: DecorativeBars,
    title: 'Integrated',
    keyword: 'payments',
    description:
      'Rent collection, vendor payouts, and financial reporting in one place.',
    span: '',
  },
  {
    icon: MessageIcon,
    decorative: DecorativeBubble,
    title: 'Communications',
    keyword: 'hub',
    description:
      'Email, SMS, calling, and in-app messaging. Every conversation in context.',
    span: 'lg:col-span-2',
  },
]

/* ── Feature card ─────────────────────────────────────────────────────────── */

function FeatureCard({ feature }: { feature: (typeof features)[number] }) {
  return (
    <motion.div
      variants={revealItem}
      className={`group relative overflow-hidden rounded-xl border border-[#E5E7EB] bg-white p-8 hover:shadow-card-hover hover:border-brand-blue/20 transition-all duration-300 ${feature.span}`}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #176FEB 1px, transparent 1px), linear-gradient(to bottom, #176FEB 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
        aria-hidden
      />

      {/* Blue accent top bar */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] bg-brand-blue"
        aria-hidden
      />

      {/* Decorative SVG watermark */}
      <feature.decorative className="absolute right-4 bottom-4 w-20 h-20 opacity-[0.06]" />

      {/* Icon */}
      <div className="relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue">
        <feature.icon className="h-6 w-6 text-white" />
      </div>

      {/* Title */}
      <h3 className="relative font-heading text-lg font-semibold text-brand-graphite">
        {feature.title}{' '}
        <span className="text-brand-blue">{feature.keyword}</span>
      </h3>

      {/* Description */}
      <p className="relative mt-3 text-sm leading-relaxed text-[#555860]">
        {feature.description}
      </p>

      {/* Hover tooltip */}
      <p className="relative mt-3 text-sm font-medium text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Learn more &rarr;
      </p>
    </motion.div>
  )
}

/* ── Feature showcase section ─────────────────────────────────────────────── */

export function FeatureShowcase() {
  return (
    <section className="bg-brand-off-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll className="text-center">
          <motion.p
            variants={revealItem}
            className="font-heading text-sm font-semibold uppercase tracking-wider text-brand-blue"
          >
            Platform
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mx-auto mt-3 max-w-xl font-heading text-3xl font-bold text-brand-graphite md:text-4xl"
          >
            Everything you need.{' '}
            <span className="text-accent">Nothing</span> you don&apos;t.
          </motion.h2>
        </RevealOnScroll>

        <RevealOnScroll className="mt-16 grid gap-5 lg:grid-cols-3" stagger={0.1}>
          {features.map((feature) => (
            <FeatureCard key={feature.keyword} feature={feature} />
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
