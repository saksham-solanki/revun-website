'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Building2,
  Home,
  Building,
  GraduationCap,
  Heart,
  Palmtree,
  Briefcase,
  Shield,
  Flag,
  Layers,
  ArrowRight,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ── Industry card data ────────────────────────────────────────────────── */

const industries = [
  {
    slug: 'reits-and-asset-managers',
    icon: Building2,
    title: 'REITs &',
    titleHighlight: 'Asset Managers',
    description:
      'Standardize operations across properties and regions. Enterprise-grade reporting, governance controls, and API integrations for institutional portfolios.',
    highlights: [
      'Portfolio-wide KPI dashboards with region filters',
      'Granular role-based access with audit logging',
      'Pre-built connectors for Yardi, MRI, and Sage',
    ],
    cta: 'Explore for REITs',
  },
  {
    slug: 'single-family-operators',
    icon: Home,
    title: 'Single-Family',
    titleHighlight: 'Operators',
    description:
      'Manage scattered-site portfolios from a single dashboard. Route maintenance by location, track per-property financials, and automate lease renewals.',
    highlights: [
      'Per-property P&L statements and owner reports',
      'Location-based vendor routing and dispatch',
      'Automated lease renewal workflows',
    ],
    cta: 'Explore for SFR',
  },
  {
    slug: 'multifamily-operators',
    icon: Building,
    title: 'Multifamily',
    titleHighlight: 'Operators',
    description:
      'High-density living demands high-efficiency tools. Unit-level tracking, bulk operations, common area management, and resident experience tools.',
    highlights: [
      'Unit-level maintenance and billing tracking',
      'Bulk lease renewals and rent adjustments',
      'Common area scheduling and amenity booking',
    ],
    cta: 'Explore for Multifamily',
  },
  {
    slug: 'student-housing',
    icon: GraduationCap,
    title: 'Student',
    titleHighlight: 'Housing',
    description:
      'Handle seasonal turnover, guarantor management, and per-bed leasing. Built for the unique rhythms of university housing.',
    highlights: [
      'Per-bed and per-room lease structures',
      'Guarantor/co-signer management workflows',
      'Seasonal turnover checklists and scheduling',
    ],
    cta: 'Explore for Student Housing',
  },
  {
    slug: 'senior-living',
    icon: Heart,
    title: 'Senior',
    titleHighlight: 'Living',
    description:
      'Accessibility-first design, care coordination hooks, and family communication tools for assisted living and retirement communities.',
    highlights: [
      'Accessibility-focused maintenance prioritization',
      'Family member portal access and updates',
      'Emergency contact and care coordination',
    ],
    cta: 'Explore for Senior Living',
  },
  {
    slug: 'vacation-rentals',
    icon: Palmtree,
    title: 'Vacation &',
    titleHighlight: 'Short-Term Rentals',
    description:
      'Manage furnished units, cleaning schedules, guest communications, and pricing. An Airbnb alternative for professional operators.',
    highlights: [
      'Turnover cleaning scheduling and tracking',
      'Guest communication templates and automation',
      'Dynamic pricing integration support',
    ],
    cta: 'Explore for Vacation Rentals',
  },
  {
    slug: 'commercial-property',
    icon: Briefcase,
    title: 'Commercial',
    titleHighlight: 'Property',
    description:
      'Office, retail, and industrial property management with CAM reconciliation, NNN lease support, and tenant improvement tracking.',
    highlights: [
      'CAM reconciliation and operating expense recovery',
      'NNN, gross, and modified lease structures',
      'Tenant improvement (TI) project tracking',
    ],
    cta: 'Explore for Commercial',
  },
  {
    slug: 'affordable-housing',
    icon: Shield,
    title: 'Affordable',
    titleHighlight: 'Housing',
    description:
      'Compliance-heavy portfolios need compliance-heavy tools. HUD reporting, income certification, and subsidy tracking built in.',
    highlights: [
      'Income certification and recertification workflows',
      'HUD and CMHC compliance automation',
      'Subsidy tracking and reporting',
    ],
    cta: 'Explore for Affordable Housing',
  },
  {
    slug: 'military-housing',
    icon: Flag,
    title: 'Military',
    titleHighlight: 'Housing',
    description:
      'BAH-based rent calculations, PCS move coordination, and base housing compliance for military family communities.',
    highlights: [
      'BAH-based rent calculation engine',
      'PCS move-in/move-out automation',
      'DoD compliance and reporting',
    ],
    cta: 'Explore for Military Housing',
  },
  {
    slug: 'mixed-use',
    icon: Layers,
    title: 'Mixed-Use',
    titleHighlight: 'Properties',
    description:
      'Residential, commercial, and retail under one roof. Unified accounting, split billing, and property-wide operations from a single dashboard.',
    highlights: [
      'Unified accounting across property types',
      'Split billing for shared utilities and services',
      'Cross-use tenant and lease management',
    ],
    cta: 'Explore for Mixed-Use',
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

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function IndustriesPage() {
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
            Industries
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-normal leading-[1.1] tracking-tight text-[#0A1628] sm:text-5xl md:text-6xl"
          >
            Built for Your{' '}
            <span className="text-[#176FEB]">Industry</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]"
          >
            From single-family homes to enterprise REITs, student housing to
            commercial complexes. Revun adapts to the workflows, compliance,
            and scale of your property type.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Industries grid ───────────────────────────────────────────── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-7xl px-6">
          <RevealOnScroll
            stagger={0.08}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {industries.map((ind) => {
              const Icon = ind.icon
              return (
                <motion.div
                  key={ind.slug}
                  variants={revealItem}
                  className="group flex flex-col rounded-2xl border border-[#D3D5DB] bg-white p-8 transition-colors duration-150 hover:border-[#176FEB]"
                >
                  {/* Icon */}
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F2FE] text-[#176FEB]">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  {/* Title */}
                  <h2 className="font-heading text-xl font-bold text-[#2C2E33]">
                    {ind.title}{' '}
                    <span className="text-[#176FEB]">{ind.titleHighlight}</span>
                  </h2>

                  {/* Description */}
                  <p className="mt-3 text-[0.938rem] leading-relaxed text-[#555860]">
                    {ind.description}
                  </p>

                  {/* Feature highlights */}
                  <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                    {ind.highlights.map((h) => (
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
                    href="/demo/"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#176FEB] transition-colors duration-150 hover:text-[#1259c0]"
                  >
                    {ind.cta}
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
      <section className="bg-[#176FEB] py-12">
        <RevealOnScroll className="mx-auto max-w-2xl px-6 text-center">
          <motion.p
            variants={revealItem}
            className="mb-3 text-sm font-medium uppercase tracking-widest text-white/60"
          >
            Not sure where to start?
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Tell us about your{' '}
            <span className="text-white/80">portfolio</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 text-lg leading-relaxed text-white/80"
          >
            Book a 15-minute discovery call and we will map Revun to your exact
            property type and workflow.
          </motion.p>
          <motion.div
            variants={revealItem}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/demo/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 text-base font-semibold text-[#176FEB] transition-colors duration-150 hover:bg-white/90"
            >
              Book a Demo
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 px-8 text-base font-semibold text-white transition-colors duration-150 hover:bg-white/10"
            >
              View Pricing
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>
    </>
  )
}
