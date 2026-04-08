'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Rocket,
  CreditCard,
  Home,
  Building2,
  Puzzle,
  LifeBuoy,
  Search,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { sanitizeJsonLd } from '@/lib/utils'

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

const categories = [
  {
    slug: 'getting-started',
    title: 'Getting Started',
    description: 'Set up your account, add properties, and learn the basics.',
    icon: Rocket,
  },
  {
    slug: 'account-billing',
    title: 'Account & Billing',
    description: 'Manage your subscription, payment methods, and invoices.',
    icon: CreditCard,
  },
  {
    slug: 'self-manage',
    title: 'Self-Manage',
    description: 'Guides for listing, screening, leases, rent collection, and maintenance.',
    icon: Home,
  },
  {
    slug: 'operator',
    title: 'Operator',
    description: 'Resources for property management companies, brokerages, and service providers.',
    icon: Building2,
  },
  {
    slug: 'integrations',
    title: 'Integrations',
    description: 'Connect Revun with your existing tools and third-party platforms.',
    icon: Puzzle,
  },
  {
    slug: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Fix common issues, error messages, and technical problems.',
    icon: LifeBuoy,
  },
]

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function HelpPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Help Center', url: 'https://revun.com/help/' },
            ])
          ),
        }}
      />
      {/* ── Hero with search ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-navy">
        <motion.div
          className="relative z-10 mx-auto max-w-3xl px-6 pt-36 pb-24 text-center"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={fadeUp}
            className="font-heading font-extrabold text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl"
          >
            Help{' '}
            <span className="text-brand-blue-light">Center</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#D3D5DB]"
          >
            Find guides, tutorials, and answers to common questions.
          </motion.p>

          {/* Search bar (visual only for MVP) */}
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-10 max-w-xl"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search for help articles..."
                className="h-13 w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-base text-white placeholder:text-[#94A3B8] transition-colors focus:border-brand-blue-light focus:outline-none focus:ring-2 focus:ring-brand-blue-light/30"
                readOnly
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Category cards ────────────────────────────────────────── */}
      <section className="bg-brand-off-white py-24 dark:bg-[#0B0A1A]">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll
            stagger={0.08}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <motion.div key={cat.slug} variants={revealItem}>
                  <Link
                    href={`/help/${cat.slug}/`}
                    className="group flex flex-col rounded-2xl border border-border bg-card p-8 transition-colors hover:border-brand-blue dark:border-white/8 dark:bg-card"
                  >
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <h2 className="font-heading text-lg font-bold text-foreground">
                      {cat.title}
                    </h2>
                    <p className="mt-2 flex-1 text-[0.938rem] leading-relaxed text-muted-foreground">
                      {cat.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-colors group-hover:underline">
                      Browse articles
                      <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                        &rarr;
                      </span>
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Contact CTA ───────────────────────────────────────────── */}
      <section className="bg-white py-24 dark:bg-[#0B0A1A]">
        <RevealOnScroll className="mx-auto max-w-2xl px-6 text-center">
          <motion.h2
            variants={revealItem}
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Can't find what you need?
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
          >
            Our support team is here to help. Reach out and we will get back to you within one business day.
          </motion.p>
          <motion.div
            variants={revealItem}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/contact/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              Contact Support
            </Link>
            <Link
              href="/support/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-8 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Back to Support
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>
    </>
  )
}
