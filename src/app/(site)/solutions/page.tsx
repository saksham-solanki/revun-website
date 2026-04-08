'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Home,
  Building2,
  Briefcase,
  FileKey2,
  Wrench,
  Landmark,
  ArrowRight,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ── Audience card data ─────────────────────────────────────────────────── */

const solutions = [
  {
    slug: 'self-managing-owners',
    icon: Home,
    title: 'Self-Managing',
    titleHighlight: 'Owners',
    description:
      'List properties, schedule showings, screen tenants, collect rent, and handle maintenance. Everything you need from a single dashboard.',
    highlights: [
      'Listing syndication to Kijiji, Rentals.ca, and more',
      'Automated rent collection with late-notice triggers',
      'Maintenance request portal with vendor routing',
    ],
    cta: 'Explore for Owners',
  },
  {
    slug: 'property-management-companies',
    icon: Building2,
    title: 'Property Management',
    titleHighlight: 'Companies',
    description:
      'Owner portals, tenant workflows, vendor management, automated compliance, financials, and team coordination. Replace 5+ disconnected tools.',
    highlights: [
      'Real-time owner portals with financial dashboards',
      'Province-specific compliance automation',
      'Trust accounting and owner disbursements',
    ],
    cta: 'Explore for PMCs',
  },
  {
    slug: 'brokerages',
    icon: Briefcase,
    title: 'Brokerages',
    titleHighlight: '& Agents',
    description:
      'CRM, document automation, offer management, showing coordination, and compliance workflows purpose-built for real estate transactions.',
    highlights: [
      'Template-based offer packages with e-signatures',
      'Centralized showing calendar with feedback capture',
      'FINTRAC and RECO compliance libraries built in',
    ],
    cta: 'Explore for Brokerages',
  },
  {
    slug: 'leasing-companies',
    icon: FileKey2,
    title: 'Leasing',
    titleHighlight: 'Companies',
    description:
      'Applications, offers, lease generation, identity verification, compliance notices, and tenant onboarding. All automated, all auditable.',
    highlights: [
      'Branded application portal with screening triggers',
      'Clause-library lease generation engine',
      'Automatic N-series and provincial notice delivery',
    ],
    cta: 'Explore for Leasing',
  },
  {
    slug: 'maintenance-companies',
    icon: Wrench,
    title: 'Maintenance',
    titleHighlight: 'Companies',
    description:
      'Work order intake, technician dispatch, scheduling, proof of work, invoicing, and customer communication from one platform.',
    highlights: [
      'Drag-and-drop technician dispatch and GPS tracking',
      'Before/after photo capture with tenant sign-off',
      'Auto-generated invoices from completed work orders',
    ],
    cta: 'Explore for Maintenance',
  },
  {
    slug: 'reits',
    icon: Landmark,
    title: 'REITs',
    titleHighlight: '& Investors',
    description:
      'Standardize operations across properties and regions. Role-based access, advanced reporting, API integrations, and custom governance.',
    highlights: [
      'Portfolio-wide KPI dashboard with region filters',
      'Granular role-based access with audit logging',
      'Pre-built connectors for Yardi, MRI, and Sage',
    ],
    cta: 'Explore for REITs',
  },
] as const

/* ── Animation variants ─────────────────────────────────────────────────── */

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

export default function SolutionsPage() {
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
            Solutions
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-normal leading-[1.1] tracking-tight text-[#0A1628] sm:text-5xl md:text-6xl"
          >
            Built for How You{' '}
            <span className="text-[#176FEB]">Work</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]"
          >
            From self-managing a single unit to operating a national portfolio,
            Revun adapts to your role, your workflow, and your scale.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Solutions grid ────────────────────────────────────────────── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-7xl px-6">
          <RevealOnScroll
            stagger={0.08}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {solutions.map((s) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.slug}
                  variants={revealItem}
                  className="group flex flex-col rounded-2xl border border-[#D3D5DB] bg-white p-8 transition-colors duration-150 hover:border-[#176FEB]"
                >
                  {/* Icon */}
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F2FE] text-[#176FEB]">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  {/* Title */}
                  <h2 className="font-heading text-xl font-bold text-[#2C2E33]">
                    {s.title}{' '}
                    <span className="text-[#176FEB]">{s.titleHighlight}</span>
                  </h2>

                  {/* Description */}
                  <p className="mt-3 text-[0.938rem] leading-relaxed text-[#555860]">
                    {s.description}
                  </p>

                  {/* Feature highlights */}
                  <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                    {s.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2.5 text-sm text-[#555860]"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#176FEB]" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={`/solutions/${s.slug}/`}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#176FEB] transition-colors duration-150 hover:text-[#1259c0]"
                  >
                    {s.cta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1"
                      strokeWidth={2}
                    />
                  </Link>
                </motion.div>
              )
            })}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white py-12">
        <RevealOnScroll className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <motion.p
            variants={revealItem}
            className="mb-3 text-sm font-medium uppercase tracking-widest text-[#176FEB]"
          >
            Not sure where to start?
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="font-heading text-3xl font-bold tracking-tight text-[#0A1628] sm:text-4xl"
          >
            Tell us about your{' '}
            <span className="text-[#176FEB]">operation</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 text-lg leading-relaxed text-[#555860]"
          >
            Book a 15-minute discovery call and we will map Revun to your exact
            workflow.
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
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors duration-150 hover:border-[#176FEB]/40 hover:bg-white"
            >
              View Pricing
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>
    </>
  )
}
