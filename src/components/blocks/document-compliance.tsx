'use client'

import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

const features = [
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: 'Automated Lease Generation',
    description: 'Generate province and state-specific leases with pre-filled clauses and regulatory requirements.',
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
      </svg>
    ),
    title: 'Provincial/State Templates',
    description: 'Pre-built templates for every Canadian province and US state. Always up to date with legislation.',
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
      </svg>
    ),
    title: 'Digital Signatures',
    description: 'Legally binding e-signatures for leases, notices, and amendments. No printing required.',
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: 'Compliance Tracking',
    description: 'Automated deadline tracking, notice scheduling, and regulatory filing reminders across jurisdictions.',
  },
]

export function DocumentCompliance() {
  return (
    <section className="bg-[#F5F6F8] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
          >
            Documents & Compliance
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-4xl font-normal text-brand-graphite md:text-5xl"
          >
            Every document. Every <span className="text-keyword">jurisdiction</span>.
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-xl text-lg text-brand-graphite/70"
          >
            Automated document generation and compliance tracking built for
            Canadian and US regulatory requirements.
          </motion.p>
        </RevealOnScroll>

        <RevealOnScroll className="mt-14 grid gap-6 sm:grid-cols-2" stagger={0.1}>
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={revealItem}
              className="group relative rounded-xl border border-[#E5E7EB] bg-white p-8 transition-all duration-200 hover:border-brand-blue/20 hover:shadow-card-hover"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-brand-blue opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true" />
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white">
                {feature.icon}
              </div>
              <h3 className="font-heading text-lg font-semibold text-brand-graphite">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#555860]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
