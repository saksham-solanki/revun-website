'use client'

import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ── Audience data ────────────────────────────────────────────────────────── */

const audiences = [
  {
    title: 'Self-Managing Owners',
    description: 'Manage your property from one app. Start from $1/day.',
    href: '/solutions/self-managing-owners/',
    icon: HomeIcon,
  },
  {
    title: 'Property Management Companies',
    description: 'Replace fragmented systems with one infrastructure layer.',
    href: '/solutions/property-management-companies/',
    icon: BuildingIcon,
  },
  {
    title: 'Brokerages & Agents',
    description: 'Run deals, documents, and communication from one system.',
    href: '/solutions/brokerages/',
    icon: UsersIcon,
  },
  {
    title: 'Leasing Companies',
    description: 'Automate applications, offers, and compliance.',
    href: '/solutions/leasing-companies/',
    icon: FileTextIcon,
  },
  {
    title: 'Maintenance Companies',
    description: 'Dispatch, proof of work, invoicing, and technician workflow.',
    href: '/solutions/maintenance-companies/',
    icon: WrenchIcon,
  },
  {
    title: 'REITs & Asset Managers',
    description: 'Systemize operations across portfolios.',
    href: '/solutions/reits/',
    icon: TrendingUpIcon,
  },
] as const

/* ── Minimal SVG icons (small UI indicators, not primary visuals) ─────── */

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  )
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 22V18h6v4M9 6h.01M15 6h.01M9 10h.01M15 10h.01M9 14h.01M15 14h.01" />
    </svg>
  )
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  )
}

function FileTextIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  )
}

function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  )
}

function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}

/* ── Spotlight card wrapper ───────────────────────────────────────────────── */

function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card ${className ?? ''}`}
    >
      {children}
    </div>
  )
}

/* ── Arrow icon ───────────────────────────────────────────────────────────── */

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

/* ── Audience router section ──────────────────────────────────────────────── */

export function AudienceRouter() {
  return (
    <section className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll className="text-center">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-violet"
          >
            Solutions
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mx-auto mt-3 max-w-xl font-heading text-3xl font-bold tracking-tight text-brand-indigo md:text-4xl"
          >
            Built for how you actually work
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-lg text-lg text-brand-slate-500"
          >
            Whether you manage one unit or one thousand, Revun adapts to your role.
          </motion.p>
        </RevealOnScroll>

        <RevealOnScroll className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {audiences.map((audience) => (
            <motion.div key={audience.href} variants={revealItem}>
              <Link href={audience.href} className="group block h-full">
                <SpotlightCard className="flex h-full flex-col rounded-xl border border-border bg-white p-6 transition-all duration-300 hover:shadow-lg hover:shadow-brand-violet/5 hover:border-brand-violet/20">
                  {/* Icon */}
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-violet/8 transition-colors group-hover:bg-brand-violet/12">
                    <audience.icon className="h-5 w-5 text-brand-violet" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg font-semibold text-brand-indigo transition-colors group-hover:text-brand-violet">
                    {audience.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-slate-500">
                    {audience.description}
                  </p>

                  {/* Link indicator */}
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-brand-violet opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </SpotlightCard>
              </Link>
            </motion.div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
