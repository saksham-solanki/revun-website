'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Search,
  Banknote,
  FileKey2,
  Wrench,
  Home,
  CalendarDays,
  BarChart3,
  Users,
  FileStack,
  MessageSquare,
  Calculator,
  Shield,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ── Use case data ────────────────────────────────────────────────────────── */

const categories = ['All', 'Operations', 'Financial', 'Communications', 'Compliance'] as const

const useCases = [
  {
    slug: 'tenant-screening',
    icon: Search,
    title: 'Tenant Screening',
    category: 'Operations',
    description: 'End-to-end credit checks, identity verification, reference checks, and employment verification from one workflow.',
  },
  {
    slug: 'rent-collection',
    icon: Banknote,
    title: 'Rent Collection',
    category: 'Financial',
    description: 'Automated pre-authorized debit, credit card, and e-transfer collection with late notices and ledger tracking.',
  },
  {
    slug: 'lease-management',
    icon: FileKey2,
    title: 'Lease Management',
    category: 'Operations',
    description: 'Digital lease creation with provincial templates, e-signatures, renewals, and amendment workflows.',
  },
  {
    slug: 'maintenance-management',
    icon: Wrench,
    title: 'Maintenance Management',
    category: 'Operations',
    description: 'Work order creation, vendor dispatch, proof-of-work capture, and invoicing from request to resolution.',
  },
  {
    slug: 'property-listing',
    icon: Home,
    title: 'Property Listing',
    category: 'Operations',
    description: 'Create and syndicate listings with photos, virtual tours, and scheduling across multiple platforms.',
  },
  {
    slug: 'showing-scheduling',
    icon: CalendarDays,
    title: 'Showing Scheduling',
    category: 'Operations',
    description: 'Calendar booking, automated confirmations, self-guided tour options, and feedback collection.',
  },
  {
    slug: 'owner-reporting',
    icon: BarChart3,
    title: 'Owner Reporting',
    category: 'Financial',
    description: 'Financial reports, occupancy dashboards, expense tracking, and tax document generation for property owners.',
  },
  {
    slug: 'vendor-management',
    icon: Users,
    title: 'Vendor Management',
    category: 'Operations',
    description: 'Vendor directory, work assignment, payment tracking, and performance ratings across your portfolio.',
  },
  {
    slug: 'document-automation',
    icon: FileStack,
    title: 'Document Automation',
    category: 'Compliance',
    description: 'Template library with auto-fill, compliance document generation, secure storage, and sharing.',
  },
  {
    slug: 'communication-hub',
    icon: MessageSquare,
    title: 'Communication Hub',
    category: 'Communications',
    description: 'Unified inbox with phone, video, SMS, email, and automated notifications for tenants, owners, and vendors.',
  },
  {
    slug: 'accounting-integration',
    icon: Calculator,
    title: 'Accounting Integration',
    category: 'Financial',
    description: 'QuickBooks and Xero sync, trust accounting, bank reconciliation, and owner statement generation.',
  },
  {
    slug: 'compliance-tracking',
    icon: Shield,
    title: 'Compliance Tracking',
    category: 'Compliance',
    description: 'Provincial and state regulation tracking, notice deadlines, rent increase limits, and form generation.',
  },
] as const

/* ── Animation variants ────────────────────────────────────────────────── */

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

import { useState } from 'react'

export default function UseCasesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filtered =
    activeCategory === 'All'
      ? useCases
      : useCases.filter((u) => u.category === activeCategory)

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#F5F6F8]">
        <motion.div
          className="relative z-10 mx-auto max-w-3xl px-6 py-16 text-center"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-[#176FEB]"
          >
            Use Cases
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-normal leading-[1.1] tracking-tight text-[#0A1628] sm:text-5xl md:text-6xl"
          >
            One Platform, Every{' '}
            <span className="text-[#176FEB]">Workflow</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]"
          >
            From tenant screening to compliance tracking, see how Revun
            automates every aspect of property management operations.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Filter + Grid ─────────────────────────────────────────────── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-7xl px-6">
          {/* Category filter */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-150 ${
                  activeCategory === cat
                    ? 'border-[#176FEB] bg-[#176FEB] text-white'
                    : 'border-[#D3D5DB] bg-white text-[#555860] hover:border-[#176FEB]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Use case cards */}
          <RevealOnScroll
            stagger={0.08}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((u) => {
              const Icon = u.icon
              return (
                <motion.div
                  key={u.slug}
                  variants={revealItem}
                  className="group flex flex-col rounded-2xl border border-[#D3D5DB] bg-white p-8 transition-colors duration-150 hover:border-[#176FEB]"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F2FE] text-[#176FEB]">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  <h2 className="font-heading text-xl font-bold text-[#2C2E33]">
                    {u.title}
                  </h2>

                  <p className="mt-3 flex-1 text-[0.938rem] leading-relaxed text-[#555860]">
                    {u.description}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#176FEB]">
                    {u.category}
                  </span>
                </motion.div>
              )
            })}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#F5F6F8] py-12">
        <RevealOnScroll className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <motion.p
            variants={revealItem}
            className="mb-3 text-sm font-medium uppercase tracking-widest text-[#176FEB]"
          >
            See it in action
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="font-heading text-3xl font-bold tracking-tight text-[#0A1628] sm:text-4xl"
          >
            Ready to automate your{' '}
            <span className="text-[#176FEB]">workflows</span>?
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 text-lg leading-relaxed text-[#555860]"
          >
            Book a demo and we will walk through the exact workflows that matter to your operation.
          </motion.p>
          <motion.div
            variants={revealItem}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/demo/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#1259c0]"
            >
              Book a Demo
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors duration-150 hover:border-[#176FEB]/30 hover:bg-white"
            >
              View Pricing
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>
    </>
  )
}
