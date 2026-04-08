'use client'

import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ── Integration partners ─────────────────────────────────────────────────── */

const integrations = [
  'Stripe',
  'QuickBooks',
  'Xero',
  'Twilio',
  'DocuSign',
  'Salesforce',
  'HubSpot',
  'Zapier',
  'Google Workspace',
  'Microsoft 365',
  'Plaid',
  'Interac',
] as const

/* ── Logo pill (text placeholder styled as badge) ─────────────────────────── */

function LogoPill({ name }: { name: string }) {
  return (
    <div className="group flex h-14 shrink-0 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-8 transition-all duration-150 hover:border-brand-blue/20 hover:shadow-card-hover">
      <span className="whitespace-nowrap text-sm font-heading font-semibold text-[#94A3B8] transition-colors duration-150 group-hover:text-brand-graphite">
        {name}
      </span>
    </div>
  )
}

/* ── Integration logos section ─────────────────────────────────────────────── */

export function IntegrationLogos() {
  const doubled = [...integrations, ...integrations]

  return (
    <section className="relative bg-white py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll className="text-center">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
          >
            Integrations
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mx-auto mt-3 max-w-md font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl"
          >
            Works with the <span className="text-accent">tools</span> you already use
          </motion.h2>
        </RevealOnScroll>
      </div>

      {/* Marquee container */}
      <div className="relative mt-16 overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white to-transparent" aria-hidden />

        {/* Scrolling track */}
        <div className="animate-marquee flex w-max gap-5">
          {doubled.map((name, i) => (
            <LogoPill key={`${name}-${i}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  )
}
