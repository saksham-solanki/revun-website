'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  UserPlus,
  Building,
  Megaphone,
  CalendarCheck,
  ShieldCheck,
  FileSignature,
  Settings,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'

/* ── Animation variants ─────────────────────────────────────────────── */

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

/* ── Data ────────────────────────────────────────────────────────────── */

const timelineSteps = [
  {
    icon: UserPlus,
    title: 'Create your account',
    description:
      'Sign up in under two minutes. No credit card required to start. Choose your plan later once you have explored the platform.',
  },
  {
    icon: Building,
    title: 'Add your properties and units',
    description:
      'Enter your property address, unit details, amenities, and photos. Revun structures the data so every downstream workflow, from listings to leases, pulls from the same source of truth.',
  },
  {
    icon: Megaphone,
    title: 'Create and publish listings',
    description:
      'Build professional listings from your property data. Publish to Revun, Kijiji, Facebook Marketplace, and other platforms with one click. Edit once, update everywhere.',
  },
  {
    icon: CalendarCheck,
    title: 'Schedule and manage showings',
    description:
      'Prospective tenants book showings online based on your availability. Calendar sync prevents double-bookings. Automated reminders reduce no-shows.',
  },
  {
    icon: ShieldCheck,
    title: 'Screen and select tenants',
    description:
      'Run credit checks, identity verification, and background screening directly from the application. Compare applicants side by side and make informed decisions.',
  },
  {
    icon: FileSignature,
    title: 'Execute leases digitally',
    description:
      'Generate leases from jurisdiction-specific templates. Both parties sign electronically. Documents are stored securely and accessible anytime.',
  },
  {
    icon: Settings,
    title: 'Manage your rental ongoing',
    description:
      'Collect rent with auto-reminders, handle maintenance requests, store documents, track expenses, and communicate with tenants. Everything lives in one place.',
  },
]

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function SelfManageHowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Self-Manage', url: 'https://revun.com/self-manage/' },
              { name: 'How It Works', url: 'https://revun.com/self-manage/how-it-works/' },
            ])
          ),
        }}
      />
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#0B0A1A]">
        <motion.div
          className="mx-auto max-w-3xl px-6 pt-36 pb-20 text-center"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-brand-blue"
          >
            How it works
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-heading font-extrabold text-4xl leading-[1.1] tracking-tight text-foreground md:text-5xl"
          >
            From signup to{' '}
            <span className="text-brand-blue">fully managed</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            From account creation to ongoing management, here is the full walkthrough.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────── */}
      <section className="bg-brand-off-white py-24 dark:bg-[#0f0e1e]">
        <div className="mx-auto max-w-3xl px-6">
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-8"
              aria-hidden
            />

            {timelineSteps.map((step, i) => {
              const Icon = step.icon
              return (
                <RevealOnScroll key={step.title} className="relative mb-16 last:mb-0">
                  <motion.div
                    variants={revealItem}
                    className="flex gap-6 md:gap-8"
                  >
                    {/* Icon circle */}
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brand-blue/20 bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 md:h-16 md:w-16">
                      <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.8} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-brand-blue">
                        Step {i + 1}
                      </span>
                      <h3 className="font-heading text-xl font-bold text-foreground md:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-[0.938rem] leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>

                      {/* Screenshot placeholder */}
                      <div className="mt-6 flex h-48 items-center justify-center rounded-xl border-2 border-dashed border-border bg-white text-sm text-muted-foreground dark:bg-[#0B0A1A]">
                        Screenshot / illustration placeholder
                      </div>
                    </div>
                  </motion.div>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────── */}
      <section className="bg-white py-24 dark:bg-[#0B0A1A]">
        <RevealOnScroll className="mx-auto max-w-2xl px-6 text-center">
          <motion.h2
            variants={revealItem}
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Ready to get{' '}
            <span className="text-brand-blue">started?</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
          >
            Set up your first property in minutes. No credit card required.
          </motion.p>
          <motion.div
            variants={revealItem}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/pricing/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              Start for $1/day
            </Link>
            <Link
              href="/self-manage/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-8 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Back to Self-Manage
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>
    </>
  )
}
