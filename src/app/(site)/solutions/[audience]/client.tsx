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
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react'
import { RevealOnScroll, revealItem, revealItemLeft, revealItemRight } from '@/components/ui/reveal-on-scroll'

/* ── Icon lookup ─────────────────────────────────────────────────────────── */

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement> & { strokeWidth?: number }>> = {
  Home, Building2, Briefcase, FileKey2, Wrench, Landmark, CheckCircle2, ArrowRight,
}

/* ── Types ────────────────────────────────────────────────────────────────── */

interface Feature {
  title: string
  description: string
  iconName: string
}

interface Step {
  number: string
  title: string
  description: string
}

interface SolutionContent {
  title: string
  subtitle: string
  heroEyebrow: string
  problemHeading: string
  problemBody: string
  problemBullets: string[]
  features: Feature[]
  steps: Step[]
  startingPrice: string
  priceUnit: string
  pricingNote: string
  ctaHeading: string
  ctaBody: string
}

/* ── Animation variants ──────────────────────────────────────────────────── */

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

/* ── Client component ────────────────────────────────────────────────────── */

export function SolutionDetailClient({
  data,
  slug,
}: {
  data: SolutionContent
  slug: string
}) {
  return (
    <>
      {/* ────────────────────── HERO ────────────────────── */}
      <section className="relative overflow-hidden bg-brand-indigo">
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-indigo via-[#13103a] to-[#0B0A1A]" />
          <div className="absolute inset-0 bg-dot-grid opacity-25" />
          <div className="absolute -left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.3)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute right-[5%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.18)_0%,transparent_70%)] blur-3xl" />
        </div>

        <motion.div
          className="relative z-10 mx-auto max-w-4xl px-6 pt-36 pb-28 text-center lg:pt-40 lg:pb-32"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-brand-violet-light backdrop-blur-sm"
          >
            {data.heroEyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display italic text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            {data.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-slate-300"
          >
            {data.subtitle}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/demo/"
              className="cta-primary-shadow inline-flex h-12 items-center justify-center rounded-xl bg-brand-violet px-8 text-base font-semibold text-white transition-all hover:bg-brand-violet-dark"
            >
              Book a Demo
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 px-8 text-base font-semibold text-white transition-all hover:bg-white/10"
            >
              View Pricing
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ────────────────────── PROBLEM ────────────────────── */}
      <section className="bg-white py-24 dark:bg-[#0B0A1A]">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left column */}
            <div>
              <motion.div
                variants={revealItemLeft}
                className="mb-4 inline-flex items-center gap-2 text-brand-amber"
              >
                <AlertTriangle className="h-5 w-5" strokeWidth={1.8} />
                <span className="text-sm font-semibold uppercase tracking-widest">
                  The challenge
                </span>
              </motion.div>
              <motion.h2
                variants={revealItemLeft}
                className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                {data.problemHeading}
              </motion.h2>
              <motion.p
                variants={revealItemLeft}
                className="mt-4 text-lg leading-relaxed text-muted-foreground"
              >
                {data.problemBody}
              </motion.p>
            </div>

            {/* Right column: bullets */}
            <motion.ul variants={revealItemRight} className="space-y-4">
              {data.problemBullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-border bg-brand-slate-50 p-4 dark:border-white/8 dark:bg-white/5"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                    <span className="text-xs font-bold">{i + 1}</span>
                  </span>
                  <span className="text-[0.938rem] leading-relaxed text-foreground">
                    {bullet}
                  </span>
                </li>
              ))}
            </motion.ul>
          </RevealOnScroll>
        </div>
      </section>

      {/* ────────────────────── FEATURES ────────────────────── */}
      <section className="bg-brand-slate-50 py-24 dark:bg-[#0d0c20]">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mb-16 text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-violet"
            >
              Built for your workflow
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Everything you need, nothing you don't
            </motion.h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.features.map((f, i) => {
              const Icon = iconMap[f.iconName] || CheckCircle2
              return (
                <motion.div
                  key={i}
                  variants={revealItem}
                  className="group rounded-2xl border border-border bg-card p-7 transition-shadow hover:shadow-lg dark:border-white/8"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-violet/10 text-brand-violet dark:bg-brand-violet/20">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[0.938rem] leading-relaxed text-muted-foreground">
                    {f.description}
                  </p>
                </motion.div>
              )
            })}
          </RevealOnScroll>
        </div>
      </section>

      {/* ────────────────────── HOW IT WORKS ────────────────────── */}
      <section className="bg-white py-24 dark:bg-[#0B0A1A]">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-16 text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-violet"
            >
              How it works
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Live in days, not months
            </motion.h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.12} className="relative">
            {/* Vertical line connecting steps (desktop) */}
            <div
              className="absolute left-[27px] top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-brand-violet/40 via-brand-violet/20 to-transparent lg:block"
              aria-hidden
            />

            <div className="space-y-8 lg:space-y-12">
              {data.steps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={revealItem}
                  className="flex gap-6 lg:gap-8"
                >
                  {/* Step number */}
                  <div className="flex shrink-0 flex-col items-center">
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-indigo text-white shadow-lg">
                      <span className="font-heading text-lg font-bold">{step.number}</span>
                    </div>
                  </div>

                  {/* Step content */}
                  <div className="pb-2 pt-2">
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 max-w-xl text-[0.938rem] leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ────────────────────── PRICING PREVIEW ────────────────────── */}
      <section className="bg-brand-slate-50 py-24 dark:bg-[#0d0c20]">
        <RevealOnScroll className="mx-auto max-w-2xl px-6 text-center">
          <motion.p
            variants={revealItem}
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-violet"
          >
            Simple pricing
          </motion.p>
          <motion.div variants={revealItem}>
            <p className="font-heading text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              {data.startingPrice}
            </p>
            <p className="mt-2 text-lg text-muted-foreground">{data.priceUnit}</p>
          </motion.div>
          <motion.p
            variants={revealItem}
            className="mt-4 text-sm text-muted-foreground"
          >
            {data.pricingNote}
          </motion.p>
          <motion.div variants={revealItem} className="mt-8">
            <Link
              href="/pricing/"
              className="inline-flex items-center gap-2 text-base font-semibold text-brand-violet transition-colors hover:underline"
            >
              See full pricing details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>

      {/* ────────────────────── FINAL CTA ────────────────────── */}
      <section className="relative overflow-hidden bg-brand-indigo py-28">
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-indigo via-[#13103a] to-brand-indigo" />
          <div className="absolute inset-0 bg-dot-grid opacity-20" />
          <div className="absolute left-[20%] top-[30%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.25)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute right-[15%] bottom-[20%] h-[350px] w-[350px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.15)_0%,transparent_70%)] blur-3xl" />
        </div>

        <RevealOnScroll className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <motion.h2
            variants={revealItem}
            className="font-display italic text-3xl leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            {data.ctaHeading}
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-brand-slate-300"
          >
            {data.ctaBody}
          </motion.p>
          <motion.div
            variants={revealItem}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/demo/"
              className="cta-primary-shadow inline-flex h-12 items-center justify-center rounded-xl bg-brand-violet px-8 text-base font-semibold text-white transition-all hover:bg-brand-violet-dark"
            >
              Book a Demo
            </Link>
            <Link
              href="/signup/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 px-8 text-base font-semibold text-white transition-all hover:bg-white/10"
            >
              Start Free
            </Link>
          </motion.div>
          <motion.p
            variants={revealItem}
            className="mt-6 text-sm text-brand-slate-400"
          >
            No credit card required. 14-day free trial.
          </motion.p>
        </RevealOnScroll>
      </section>
    </>
  )
}
