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
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ── Animation variants ─────────────────────────────────────────────── */

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

/* ── Data ────────────────────────────────────────────────────────────── */

const steps = [
  {
    number: '01',
    title: 'Set up your property',
    description:
      'Add your property details, unit info, and listing preferences in minutes.',
  },
  {
    number: '02',
    title: 'Find and screen tenants',
    description:
      'Publish listings, schedule showings, run screening, and manage applications.',
  },
  {
    number: '03',
    title: 'Manage everything',
    description:
      'Collect rent, handle maintenance requests, store documents, and communicate with tenants.',
  },
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

const pricingPlans = [
  {
    name: 'Lite',
    price: '$1',
    period: '/day per unit',
    description: 'For owners getting started with one or two units.',
    features: ['Listing syndication', 'Showing scheduling', 'Rent collection', 'Tenant communication'],
  },
  {
    name: 'Pro',
    price: '$2',
    period: '/day per unit',
    description: 'Full toolkit for hands-on landlords.',
    features: ['Everything in Lite', 'Tenant screening', 'Digital leases', 'Maintenance tracking', 'Document storage'],
    popular: true,
  },
  {
    name: 'Max',
    price: '$3',
    period: '/day per unit',
    description: 'For portfolio owners who want it all.',
    features: ['Everything in Pro', 'Multi-property dashboard', 'Financial reporting', 'Priority support', 'API access'],
  },
]

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function SelfManagePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/60 via-white to-white dark:from-[#0B0A1A] dark:via-[#0B0A1A] dark:to-[#0B0A1A]">
        {/* Subtle warm accent */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute right-[10%] top-[15%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.12)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute left-[5%] bottom-[10%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.08)_0%,transparent_70%)] blur-3xl" />
        </div>

        <motion.div
          className="relative z-10 mx-auto max-w-3xl px-6 pt-36 pb-24 text-center"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-medium text-amber-800 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300"
          >
            For self-managing owners
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-display italic text-4xl leading-[1.1] tracking-tight text-foreground md:text-5xl"
          >
            Manage your rental property from one app
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            Listings, showings, screening, leases, rent collection, and maintenance. Starting from $1/day per unit.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/pricing/"
              className="cta-primary-shadow inline-flex h-12 items-center justify-center rounded-xl bg-brand-violet px-8 text-base font-semibold text-white transition-all hover:bg-brand-violet-dark"
            >
              Start for $1/day
            </Link>
            <Link
              href="/self-manage/how-it-works/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-8 text-base font-semibold text-foreground transition-all hover:bg-muted"
            >
              See how it works
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────── */}
      <section className="bg-white py-24 dark:bg-[#0B0A1A]">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-violet"
            >
              How it works
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Three steps to better landlording
            </motion.h2>
          </RevealOnScroll>

          <RevealOnScroll
            stagger={0.15}
            className="mt-16 grid gap-8 md:grid-cols-3"
          >
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={revealItem}
                className="relative flex flex-col items-center text-center"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-violet/10 font-heading text-xl font-bold text-brand-violet dark:bg-brand-violet/20">
                  {step.number}
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.938rem] leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
                {/* Connector line (visible on md+) */}
                {step.number !== '03' && (
                  <div className="absolute right-0 top-7 hidden h-px w-8 translate-x-full bg-border md:block" aria-hidden />
                )}
              </motion.div>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Feature Grid ──────────────────────────────────────────── */}
      <section className="bg-brand-slate-50 py-24 dark:bg-[#0f0e1e]">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-violet"
            >
              Everything you need
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Built for self-managing owners
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
                  className="spotlight-card group flex flex-col rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-xl dark:border-white/8 dark:bg-card"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-violet/10 text-brand-violet dark:bg-brand-violet/20">
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

      {/* ── Pricing Preview ───────────────────────────────────────── */}
      <section className="bg-white py-24 dark:bg-[#0B0A1A]">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-violet"
            >
              Simple pricing
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Pick the plan that fits your portfolio
            </motion.h2>
          </RevealOnScroll>

          <RevealOnScroll
            stagger={0.1}
            className="mt-16 grid gap-6 md:grid-cols-3"
          >
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={revealItem}
                className={`relative flex flex-col rounded-2xl border p-8 transition-shadow hover:shadow-xl ${
                  plan.popular
                    ? 'border-brand-violet bg-brand-violet/5 shadow-lg dark:border-brand-violet/40 dark:bg-brand-violet/10'
                    : 'border-border bg-card dark:border-white/8 dark:bg-card'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-violet px-4 py-1 text-xs font-semibold text-white">
                    Most popular
                  </span>
                )}
                <h3 className="font-heading text-xl font-bold text-foreground">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {plan.period}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {plan.description}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-violet" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/pricing/"
                  className={`mt-8 inline-flex h-11 items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                    plan.popular
                      ? 'cta-primary-shadow bg-brand-violet text-white hover:bg-brand-violet-dark'
                      : 'border border-border text-foreground hover:bg-muted'
                  }`}
                >
                  Get started
                </Link>
              </motion.div>
            ))}
          </RevealOnScroll>

          <RevealOnScroll className="mt-8 text-center">
            <motion.div variants={revealItem}>
              <Link
                href="/pricing/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-violet transition-colors hover:underline"
              >
                See full pricing <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────── */}
      <section className="bg-brand-slate-50 py-24 dark:bg-[#0f0e1e]">
        <RevealOnScroll className="mx-auto max-w-2xl px-6 text-center">
          <motion.h2
            variants={revealItem}
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Start managing smarter today
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
              className="cta-primary-shadow inline-flex h-12 items-center justify-center rounded-xl bg-brand-violet px-8 text-base font-semibold text-white transition-all hover:bg-brand-violet-dark"
            >
              Start for $1/day
            </Link>
            <Link
              href="/contact/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-8 text-base font-semibold text-foreground transition-all hover:bg-muted"
            >
              Talk to us
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>
    </>
  )
}
