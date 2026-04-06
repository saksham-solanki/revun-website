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

/* ── Spotlight mouse-follow ─────────────────────────────────────────── */

function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  e.currentTarget.style.setProperty('--mouse-x', `${x}%`)
  e.currentTarget.style.setProperty('--mouse-y', `${y}%`)
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
      {/* ── Hero with search ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-indigo">
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-indigo via-[#13103a] to-[#0B0A1A]" />
          <div className="absolute inset-0 bg-dot-grid opacity-20" />
          <div className="absolute left-[25%] top-[40%] h-[350px] w-[350px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.25)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute right-[20%] top-[10%] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.15)_0%,transparent_70%)] blur-3xl" />
        </div>

        <motion.div
          className="relative z-10 mx-auto max-w-3xl px-6 pt-36 pb-24 text-center"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={fadeUp}
            className="font-display italic text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl"
          >
            Help Center
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-slate-300"
          >
            Find guides, tutorials, and answers to common questions.
          </motion.p>

          {/* Search bar (visual only for MVP) */}
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-10 max-w-xl"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-slate-400" />
              <input
                type="text"
                placeholder="Search for help articles..."
                className="h-13 w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-base text-white placeholder:text-brand-slate-400 backdrop-blur-sm transition-colors focus:border-brand-violet-light focus:outline-none focus:ring-2 focus:ring-brand-violet-light/30"
                readOnly
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Category cards ────────────────────────────────────────── */}
      <section className="bg-brand-slate-50 py-24 dark:bg-[#0B0A1A]">
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
                    onMouseMove={handleMouseMove as any}
                    className="spotlight-card group flex flex-col rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-xl dark:border-white/8 dark:bg-card"
                  >
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-violet/10 text-brand-violet dark:bg-brand-violet/20">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <h2 className="font-heading text-lg font-bold text-foreground">
                      {cat.title}
                    </h2>
                    <p className="mt-2 flex-1 text-[0.938rem] leading-relaxed text-muted-foreground">
                      {cat.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-violet transition-colors group-hover:underline">
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
            Can not find what you need?
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
              className="cta-primary-shadow inline-flex h-12 items-center justify-center rounded-xl bg-brand-violet px-8 text-base font-semibold text-white transition-all hover:bg-brand-violet-dark"
            >
              Contact Support
            </Link>
            <Link
              href="/support/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-8 text-base font-semibold text-foreground transition-all hover:bg-muted"
            >
              Back to Support
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>
    </>
  )
}
