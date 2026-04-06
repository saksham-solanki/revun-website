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
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ── Card data ───────────────────────────────────────────────────────────── */

const solutions = [
  {
    slug: 'self-managing-owners',
    title: 'Self-Managing Owners',
    tagline: 'Your rental, your rules, one app.',
    description:
      'List properties, schedule showings, screen tenants, collect rent, and handle maintenance requests. Everything an owner needs, starting from $1/day per unit.',
    cta: 'Explore Self-Manage',
    icon: Home,
  },
  {
    slug: 'property-management-companies',
    title: 'Property Management Companies',
    tagline: 'One system of record for your entire operation.',
    description:
      'Owner portals, tenant workflows, vendor management, automated compliance, financial operations, and team coordination. Replace 5+ disconnected tools.',
    cta: 'Explore for PMCs',
    icon: Building2,
  },
  {
    slug: 'brokerages',
    title: 'Brokerages & Agents',
    tagline: 'Close deals faster. Eliminate paperwork.',
    description:
      'CRM, document automation, offer management, showing coordination, client communication, and compliance workflows. 60-day guided launch included.',
    cta: 'Explore for Brokerages',
    icon: Briefcase,
  },
  {
    slug: 'leasing-companies',
    title: 'Leasing Companies',
    tagline: 'Automate the leasing lifecycle.',
    description:
      'Applications, offers, lease generation, identity verification, compliance notices, and tenant onboarding. All automated, all auditable.',
    cta: 'Explore for Leasing',
    icon: FileKey2,
  },
  {
    slug: 'maintenance-companies',
    title: 'Maintenance Companies',
    tagline: 'Dispatch, track, invoice. Done.',
    description:
      'Work order intake, technician dispatch, scheduling, proof of work uploads, invoicing, and customer communication from one platform.',
    cta: 'Explore for Maintenance',
    icon: Wrench,
  },
  {
    slug: 'reits',
    title: 'REITs & Asset Managers',
    tagline: 'Institutional-grade operations at scale.',
    description:
      'Standardize operations across properties and regions. Role-based access, advanced reporting, API integrations, and custom governance.',
    cta: 'Explore for REITs',
    icon: Landmark,
  },
] as const

/* ── Hero animation variants ─────────────────────────────────────────────── */

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

/* ── Spotlight mouse-follow handler ──────────────────────────────────────── */

function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  e.currentTarget.style.setProperty('--mouse-x', `${x}%`)
  e.currentTarget.style.setProperty('--mouse-y', `${y}%`)
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function SolutionsPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-indigo">
        {/* Background layers */}
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-indigo via-[#13103a] to-[#0B0A1A]" />
          <div className="absolute inset-0 bg-dot-grid opacity-30" />
          {/* Gradient orbs */}
          <div className="absolute left-[15%] top-[30%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.35)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute right-[10%] top-[10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.2)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute left-[40%] bottom-[5%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.2)_0%,transparent_70%)] blur-3xl" />
        </div>

        <motion.div
          className="relative z-10 mx-auto max-w-3xl px-6 pt-36 pb-28 text-center"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-brand-violet-light"
          >
            Solutions
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display italic text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Solutions for every role in property management
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-slate-300"
          >
            From self-managing a single unit to operating a national portfolio,
            Revun adapts to how you work.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Solutions grid ────────────────────────────────────────────── */}
      <section className="relative bg-brand-slate-50 py-24 dark:bg-[#0B0A1A]">
        <div className="mx-auto max-w-7xl px-6">
          <RevealOnScroll stagger={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.slug}
                  variants={revealItem}
                  onMouseMove={handleMouseMove}
                  className="spotlight-card group flex flex-col rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-xl dark:border-white/8 dark:bg-card"
                >
                  {/* Icon */}
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-violet/10 text-brand-violet dark:bg-brand-violet/20">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  {/* Title */}
                  <h2 className="font-heading text-xl font-bold text-foreground">
                    {s.title}
                  </h2>

                  {/* Tagline */}
                  <p className="mt-1.5 text-sm font-medium text-brand-violet">
                    {s.tagline}
                  </p>

                  {/* Description */}
                  <p className="mt-3 flex-1 text-[0.938rem] leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>

                  {/* CTA */}
                  <Link
                    href={`/solutions/${s.slug}/`}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-violet transition-colors hover:underline"
                  >
                    {s.cta}
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden>&rarr;</span>
                  </Link>
                </motion.div>
              )
            })}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────── */}
      <section className="bg-white py-24 dark:bg-[#0B0A1A]">
        <RevealOnScroll className="mx-auto max-w-2xl px-6 text-center">
          <motion.p
            variants={revealItem}
            className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-violet"
          >
            Not sure where to start?
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Tell us about your operation
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
          >
            Book a 15-minute discovery call and we will map Revun to your exact workflow.
          </motion.p>
          <motion.div
            variants={revealItem}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/demo/"
              className="cta-primary-shadow inline-flex h-12 items-center justify-center rounded-xl bg-brand-violet px-8 text-base font-semibold text-white transition-all hover:bg-brand-violet-dark"
            >
              Book a Demo
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-8 text-base font-semibold text-foreground transition-all hover:bg-muted"
            >
              View Pricing
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>
    </>
  )
}
