'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Megaphone,
  CalendarCheck,
  ShieldCheck,
  FileSignature,
  CreditCard,
  Wrench,
  ArrowRight,
  Check,
  X,
  Star,
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

const workflowSteps = [
  {
    number: '01',
    label: 'List',
    title: 'Publish your listing',
    description: 'Syndicate to Kijiji, Facebook Marketplace, and more with one click.',
  },
  {
    number: '02',
    label: 'Screen',
    title: 'Screen applicants',
    description: 'Credit checks, identity verification, and background screening built in.',
  },
  {
    number: '03',
    label: 'Lease',
    title: 'Sign digitally',
    description: 'Jurisdiction-specific templates. Both parties e-sign. Stored securely.',
  },
  {
    number: '04',
    label: 'Collect',
    title: 'Collect rent online',
    description: 'Auto-reminders, real-time payment tracking, and automatic receipts.',
  },
  {
    number: '05',
    label: 'Maintain',
    title: 'Handle maintenance',
    description: 'Tenants submit requests online. You track, assign, and close work orders.',
  },
]

const comparisonRows = [
  { feature: 'Monthly cost', revun: 'From $30/unit/mo', pm: '8-12% of rent (~$160+/mo)' },
  { feature: 'Tenant screening', revun: true, pm: true },
  { feature: 'Lease management', revun: true, pm: true },
  { feature: 'Rent collection', revun: true, pm: true },
  { feature: 'Maintenance tracking', revun: true, pm: true },
  { feature: 'Full control of decisions', revun: true, pm: false },
  { feature: 'Direct tenant relationship', revun: true, pm: false },
  { feature: 'Instant access to your data', revun: true, pm: false },
  { feature: 'No lock-in contracts', revun: true, pm: false },
]

const features = [
  {
    icon: Megaphone,
    title: 'Listing & Distribution',
    description: 'Publish to multiple platforms with one click. Syndicate your listing across rental marketplaces automatically.',
  },
  {
    icon: CalendarCheck,
    title: 'Showing Scheduling',
    description: 'Online booking for prospective tenants. Calendar sync keeps your availability up to date.',
  },
  {
    icon: ShieldCheck,
    title: 'Tenant Screening',
    description: 'Credit checks, identity verification, and background screening. Know who you are renting to.',
  },
  {
    icon: FileSignature,
    title: 'Lease Management',
    description: 'Digital lease creation and e-signing. Templates built for Canadian and US jurisdictions.',
  },
  {
    icon: CreditCard,
    title: 'Rent Collection',
    description: 'Online payments with auto-reminders. Track who has paid and who has not, in real time.',
  },
  {
    icon: Wrench,
    title: 'Maintenance Tracking',
    description: 'Tenants submit requests online. You track progress, assign vendors, and close work orders.',
  },
]

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function SelfManagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Self-Manage', url: 'https://revun.com/self-manage/' },
            ])
          ),
        }}
      />
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-white">
        <motion.div
          className="mx-auto max-w-3xl px-6 pt-24 pb-16 text-center"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-4 py-1.5 text-sm font-medium text-brand-blue"
          >
            For self-managing owners
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight text-foreground md:text-5xl"
          >
            Manage your properties{' '}
            <span className="text-brand-blue">like a pro</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            Listings, showings, screening, leases, rent collection, and maintenance. Everything in one place, starting from $1/day per unit.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/pricing/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              Start for $1/day
            </Link>
            <Link
              href="/self-manage/how-it-works/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-8 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              See how it works
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── How It Works: 5-step flow ─────────────────────────────── */}
      <section className="bg-brand-off-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-blue"
            >
              How it works
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Five steps from listing to{' '}
              <span className="text-brand-blue">lease and beyond</span>
            </motion.h2>
          </RevealOnScroll>

          {/* Desktop: horizontal row. Mobile: vertical stack */}
          <RevealOnScroll
            stagger={0.1}
            className="mt-16 flex flex-col gap-0 md:flex-row"
          >
            {workflowSteps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={revealItem}
                className="relative flex flex-col md:flex-1"
              >
                {/* Mobile vertical connector */}
                {i < workflowSteps.length - 1 && (
                  <div
                    className="absolute left-7 top-[3.5rem] bottom-0 w-px bg-border md:hidden"
                    aria-hidden
                  />
                )}

                <div className="flex items-start gap-4 md:flex-col md:items-center md:text-center p-6 md:px-4 md:py-8">
                  {/* Number badge */}
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-brand-blue/20 bg-white">
                    <span className="font-heading text-sm font-bold text-brand-blue">{step.label}</span>
                  </div>

                  <div className="flex-1 md:flex-none">
                    <p className="mb-0.5 text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground">
                      Step {step.number}
                    </p>
                    <h3 className="font-heading text-base font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Desktop horizontal connector arrow */}
                {i < workflowSteps.length - 1 && (
                  <div
                    className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 z-10 md:flex h-6 w-6 items-center justify-center rounded-full border border-border bg-white"
                    aria-hidden
                  >
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </RevealOnScroll>

          <RevealOnScroll className="mt-10 text-center">
            <motion.div variants={revealItem}>
              <Link
                href="/self-manage/how-it-works/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-colors hover:underline"
              >
                Full walkthrough <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Comparison Table ──────────────────────────────────────── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-blue"
            >
              Self-manage vs. property management
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Keep control,{' '}
              <span className="text-brand-blue">cut the cost</span>
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground"
            >
              A PM company charges 8-12% of rent and makes decisions without you. Revun gives you the same tools and keeps you in charge.
            </motion.p>
          </RevealOnScroll>

          <RevealOnScroll className="mt-12">
            <motion.div
              variants={revealItem}
              className="overflow-hidden rounded-2xl border border-border"
            >
              {/* Table header */}
              <div className="grid grid-cols-3 border-b border-border bg-brand-off-white">
                <div className="px-6 py-4 text-sm font-semibold text-muted-foreground" />
                <div className="border-l border-border px-6 py-4 text-center">
                  <span className="font-heading text-sm font-bold text-foreground">Revun</span>
                  <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-brand-blue/10 px-2 py-0.5 text-xs font-semibold text-brand-blue">
                    Self-manage
                  </span>
                </div>
                <div className="border-l border-border px-6 py-4 text-center">
                  <span className="font-heading text-sm font-bold text-muted-foreground">PM Company</span>
                </div>
              </div>

              {/* Rows */}
              {comparisonRows.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 border-b border-border last:border-0 ${
                    i % 2 === 1 ? 'bg-brand-off-white/50' : 'bg-white'
                  }`}
                >
                  <div className="px-6 py-4 text-sm font-medium text-foreground">
                    {row.feature}
                  </div>
                  <div className="flex items-center justify-center border-l border-border px-6 py-4">
                    {typeof row.revun === 'boolean' ? (
                      row.revun ? (
                        <Check className="h-5 w-5 text-brand-blue" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground/40" />
                      )
                    ) : (
                      <span className="text-sm font-semibold text-brand-blue">{row.revun}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-center border-l border-border px-6 py-4">
                    {typeof row.pm === 'boolean' ? (
                      row.pm ? (
                        <Check className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground/40" />
                      )
                    ) : (
                      <span className="text-sm text-muted-foreground">{row.pm}</span>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Feature Grid ──────────────────────────────────────────── */}
      <section className="bg-brand-off-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-blue"
            >
              Everything you need
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Built for{' '}
              <span className="text-brand-blue">hands-on landlords</span>
            </motion.h2>
          </RevealOnScroll>

          <RevealOnScroll
            stagger={0.08}
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((f) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={f.title}
                  variants={revealItem}
                  className="flex flex-col rounded-2xl border border-border bg-card p-8 transition-colors hover:border-brand-blue/30"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.938rem] leading-relaxed text-muted-foreground">
                    {f.description}
                  </p>
                </motion.div>
              )
            })}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Pricing Callout ───────────────────────────────────────── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-3xl px-6">
          <RevealOnScroll className="text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-blue"
            >
              Pricing
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Start free.{' '}
              <span className="text-brand-blue">Scale as you grow.</span>
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground"
            >
              Free tier to explore the platform. Growth tier unlocks the full toolkit from $1/day per unit. No annual contracts.
            </motion.p>
          </RevealOnScroll>

          <RevealOnScroll
            stagger={0.1}
            className="mt-12 grid gap-6 sm:grid-cols-2"
          >
            <motion.div
              variants={revealItem}
              className="flex flex-col rounded-2xl border border-border bg-card p-8"
            >
              <h3 className="font-heading text-xl font-bold text-foreground">Free</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-heading text-4xl font-bold text-foreground">$0</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Explore the platform. Manage one listing and get a feel for every feature.
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {['1 active listing', 'Showing scheduling', 'Tenant communication', 'Document storage'].map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing/"
                className="mt-8 inline-flex h-11 items-center justify-center rounded-xl border border-border text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Get started free
              </Link>
            </motion.div>

            <motion.div
              variants={revealItem}
              className="relative flex flex-col rounded-2xl border border-brand-blue bg-brand-blue/5 p-8"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-blue px-4 py-1 text-xs font-semibold text-white">
                Most popular
              </span>
              <h3 className="font-heading text-xl font-bold text-foreground">Growth</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-heading text-4xl font-bold text-foreground">$1</span>
                <span className="text-sm text-muted-foreground">/day per unit</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The full toolkit. Unlimited listings, screening, leases, and maintenance tracking.
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {['Unlimited listings', 'Tenant screening', 'Digital leases', 'Rent collection', 'Maintenance tracking'].map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing/"
                className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-brand-blue text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
              >
                Start for $1/day
              </Link>
            </motion.div>
          </RevealOnScroll>

          <RevealOnScroll className="mt-8 text-center">
            <motion.div variants={revealItem}>
              <Link
                href="/pricing/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-colors hover:underline"
              >
                See full pricing details <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Testimonial ───────────────────────────────────────────── */}
      <section className="bg-brand-off-white py-12">
        <div className="mx-auto max-w-3xl px-6">
          <RevealOnScroll>
            <motion.div
              variants={revealItem}
              className="rounded-2xl border border-border bg-card p-10"
            >
              <div className="mb-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-blue text-brand-blue" />
                ))}
              </div>
              <p className="font-heading font-extrabold text-xl leading-relaxed text-foreground md:text-2xl">
                "I was paying a property manager $200/month. Revun gives me everything they did, and I actually know what is happening with my property."
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10 text-sm font-semibold text-brand-blue">
                  SM
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Sarah M.</p>
                  <p className="text-sm text-muted-foreground">Landlord, 3 units, Ontario</p>
                </div>
              </div>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────── */}
      <section className="bg-white py-12">
        <RevealOnScroll className="mx-auto max-w-2xl px-6 text-center">
          <motion.h2
            variants={revealItem}
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Start managing{' '}
            <span className="text-brand-blue">today</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
          >
            From $1/day. No credit card required.
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
              href="/contact/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-8 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Talk to us
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>
    </>
  )
}
