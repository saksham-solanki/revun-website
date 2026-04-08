'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  UserPlus,
  Fingerprint,
  Building,
  CreditCard,
  Megaphone,
  Check,
  Clock,
  FileText,
  Camera,
  Key,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildHowToSchema } from '@/lib/schema-builders'

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

const activationSteps = [
  {
    icon: UserPlus,
    title: 'Create your account',
    time: '2 minutes',
    description:
      'Sign up with your email or Google account. No credit card required. You will land on your dashboard immediately.',
    details: [
      'Choose email or Google sign-in',
      'Set your password',
      'Confirm your email address',
      'Land on your dashboard',
    ],
  },
  {
    icon: Fingerprint,
    title: 'Verify your identity',
    time: '3 minutes',
    description:
      'Verify your identity to unlock screening, payments, and lease features. A one-time step that protects you and your tenants.',
    details: [
      'Upload government-issued ID',
      'Confirm your address',
      'Automated verification (usually instant)',
      'Manual review if needed (within 24 hours)',
    ],
  },
  {
    icon: Building,
    title: 'Add your first property',
    time: '5 minutes',
    description:
      'Enter your property address, unit details, amenities, and photos. This data powers your listings, leases, and management tools.',
    details: [
      'Enter property address (auto-fills details)',
      'Add unit numbers and details',
      'Upload property photos',
      'Set rent amount and lease terms',
      'Add amenities and features',
    ],
  },
  {
    icon: CreditCard,
    title: 'Set up payments',
    time: '5 minutes',
    description:
      'Connect your bank account to receive rent payments directly. Tenants can pay by pre-authorized debit, credit card, or e-transfer.',
    details: [
      'Connect your bank account via Plaid',
      'Set up payment preferences',
      'Configure automatic rent reminders',
      'Enable pre-authorized debit (optional)',
      'Test with a sample payment',
    ],
  },
  {
    icon: Megaphone,
    title: 'Publish your first listing',
    time: '5 minutes',
    description:
      'Create a professional listing from your property data. Publish to Revun, Kijiji, Facebook Marketplace, and Rentals.ca with one click.',
    details: [
      'Review auto-generated listing',
      'Customize description and highlights',
      'Select syndication channels',
      'Set showing availability',
      'Publish with one click',
    ],
  },
]

const checklist = [
  {
    icon: FileText,
    title: 'Documents',
    items: [
      'Government-issued photo ID (driver\'s license or passport)',
      'Property address and legal description',
      'Current lease agreement (if renewing or taking over)',
      'Bank account details for rent deposits',
    ],
  },
  {
    icon: Camera,
    title: 'Property photos',
    items: [
      '10-15 high-quality photos of the property',
      'Photos of each room, kitchen, bathroom',
      'Exterior and common area photos',
      'Close-ups of any unique features',
    ],
  },
  {
    icon: Key,
    title: 'Property details',
    items: [
      'Number of bedrooms and bathrooms',
      'Square footage (approximate is fine)',
      'Parking availability and type',
      'Laundry facilities (in-unit, shared, none)',
      'Pet policy',
      'Included utilities',
    ],
  },
]

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function SelfManageGetStartedPage() {
  const totalTime = '20 minutes'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Self-Manage', url: 'https://revun.com/self-manage/' },
              { name: 'Get Started', url: 'https://revun.com/self-manage/get-started/' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildHowToSchema({
              name: 'How to Get Started with Revun Self-Manage',
              description:
                'A step-by-step guide to creating your Revun account, adding your first property, and publishing your first listing. Takes about 20 minutes.',
              steps: activationSteps.map((step) => ({
                name: step.title,
                text: step.description,
              })),
            })
          ),
        }}
      />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-white">
        <motion.div
          className="mx-auto max-w-3xl px-6 pt-28 pb-16 text-center"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-brand-blue"
          >
            Getting started
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight text-foreground md:text-5xl"
          >
            Up and running in{' '}
            <span className="text-brand-blue">{totalTime}</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            From account creation to your first published listing. Here is exactly what to do, step by step.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/pricing/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              Create your account
            </Link>
            <Link
              href="/self-manage/faq/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-8 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Read the FAQ
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Step-by-step timeline ─────────────────────────────────── */}
      <section className="bg-brand-off-white py-12">
        <div className="mx-auto max-w-3xl px-6">
          <RevealOnScroll className="text-center mb-16">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-blue"
            >
              5 steps
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Your activation{' '}
              <span className="text-brand-blue">roadmap</span>
            </motion.h2>
          </RevealOnScroll>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-8"
              aria-hidden
            />

            {activationSteps.map((step, i) => {
              const Icon = step.icon
              return (
                <RevealOnScroll key={step.title} className="relative mb-16 last:mb-0">
                  <motion.div
                    variants={revealItem}
                    className="flex gap-6 md:gap-8"
                  >
                    {/* Icon circle */}
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brand-blue/20 bg-brand-blue/10 text-brand-blue md:h-16 md:w-16">
                      <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.8} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-semibold uppercase tracking-widest text-brand-blue">
                          Step {i + 1}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-blue/10 px-2.5 py-0.5 text-xs font-medium text-brand-blue">
                          <Clock className="h-3 w-3" />
                          {step.time}
                        </span>
                      </div>
                      <h3 className="font-heading text-xl font-bold text-foreground md:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-[0.938rem] leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>

                      <ul className="mt-4 space-y-2">
                        {step.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-2 text-sm text-foreground">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── What You Need Checklist ───────────────────────────────── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-blue"
            >
              Before you start
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              What you will{' '}
              <span className="text-brand-blue">need</span>
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground"
            >
              Gather these items before you start and you will breeze through setup.
            </motion.p>
          </RevealOnScroll>

          <RevealOnScroll
            stagger={0.08}
            className="mt-16 grid gap-6 sm:grid-cols-3"
          >
            {checklist.map((group) => {
              const Icon = group.icon
              return (
                <motion.div
                  key={group.title}
                  variants={revealItem}
                  className="flex flex-col rounded-2xl border border-border bg-card p-8 transition-colors hover:border-brand-blue/30"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {group.title}
                  </h3>
                  <ul className="mt-4 flex-1 space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────── */}
      <section className="bg-brand-off-white py-12">
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
            Free account. No credit card. {totalTime} to your first listing.
          </motion.p>
          <motion.div
            variants={revealItem}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/pricing/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              Create your account
            </Link>
            <Link
              href="/self-manage/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-8 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Explore features first
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>
    </>
  )
}
