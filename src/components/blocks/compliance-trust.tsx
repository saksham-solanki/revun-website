'use client'

import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ── Province data ──────────────────────────────────────────────────────── */

const provinces = [
  {
    name: 'Ontario',
    abbr: 'ON',
    body: 'LTB (Landlord and Tenant Board)',
    bullets: [
      'RTA-compliant lease generation',
      'Automated N-series notices (N4, N5, N12)',
      'Above-guideline increase tracking',
    ],
  },
  {
    name: 'British Columbia',
    abbr: 'BC',
    body: 'RTB (Residential Tenancy Branch)',
    bullets: [
      'Standard lease form auto-fill',
      'Dispute resolution document prep',
      'Rent increase notice scheduling',
    ],
  },
  {
    name: 'Quebec',
    abbr: 'QC',
    body: 'TAL (Tribunal administratif du logement)',
    bullets: [
      'Bail lease form generation',
      'Mandatory clause enforcement',
      'Renewal and fixation workflows',
    ],
  },
  {
    name: 'Alberta',
    abbr: 'AB',
    body: 'RTDRS (Residential Tenancy Dispute Resolution Service)',
    bullets: [
      'Periodic tenancy notice automation',
      'Security deposit tracking',
      'Dispute filing document prep',
    ],
  },
  {
    name: 'Nova Scotia',
    abbr: 'NS',
    body: 'Residential Tenancies Program',
    bullets: [
      'Standard Form of Lease compliance',
      'Rent cap calculation engine',
    ],
  },
  {
    name: 'Manitoba',
    abbr: 'MB',
    body: 'Residential Tenancies Branch',
    bullets: [
      'Guideline rent increase automation',
      'Security deposit interest calculation',
    ],
  },
]

/* ── Trust signals ──────────────────────────────────────────────────────── */

const trustSignals = [
  {
    label: 'Bank-Grade Encryption',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
  {
    label: 'SOC 2 Type II',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    label: 'Canadian Data Residency',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
      </svg>
    ),
  },
  {
    label: '99.9% Uptime SLA',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    label: 'PIPEDA Compliant',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
]

/* ── Component ──────────────────────────────────────────────────────────── */

export function ComplianceTrust() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <motion.p
            variants={revealItem}
            className="text-xs font-semibold uppercase tracking-widest text-brand-blue"
          >
            Compliance
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-4xl font-bold tracking-tight text-brand-navy md:text-5xl"
          >
            Built for <span className="text-keyword">Canadian</span> regulations
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 text-base leading-relaxed text-slate-600"
          >
            Revun natively supports provincial tenancy legislation across Canada.
            No workarounds, no manual overrides.
          </motion.p>
        </RevealOnScroll>

        {/* ── Province grid ──────────────────────────────────────────── */}
        <RevealOnScroll
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {provinces.map((prov) => (
            <motion.div
              key={prov.name}
              variants={revealItem}
              className="relative rounded-xl border border-[#E5E7EB] p-6 hover:border-[#176FEB]/30 transition-all duration-200 cursor-default"
            >
              <span className="absolute top-3 right-3 rounded-full bg-[#E8F2FE] px-2 py-0.5 text-xs font-semibold text-[#176FEB]">{prov.abbr}</span>
              <h3 className="font-heading text-lg font-semibold text-brand-navy">
                {prov.name}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{prov.body}</p>
              <ul className="mt-4 space-y-2">
                {prov.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </RevealOnScroll>

        {/* ── Divider ────────────────────────────────────────────────── */}
        <div className="mx-auto my-12 h-px w-24 bg-[#E5E7EB]" />

        {/* ── Trust signals ──────────────────────────────────────────── */}
        <RevealOnScroll className="flex flex-wrap items-center justify-center gap-3">
          {trustSignals.map((signal) => (
            <motion.span
              key={signal.label}
              variants={revealItem}
              className="inline-flex items-center gap-2.5 rounded-full border border-[#E5E7EB] px-5 py-2.5 text-sm font-medium text-slate-600"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E8F2FE]">{signal.icon}</span>
              {signal.label}
            </motion.span>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
