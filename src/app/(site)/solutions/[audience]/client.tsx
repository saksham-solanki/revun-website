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
  X,
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
  replaces: string[]
  relatedSolutions: { slug: string; title: string }[]
}

/* ── Animation variants ──────────────────────────────────────────────────── */

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

/* ── Client component ────────────────────────────────────────────────────── */

export function SolutionDetailClient({
  data,
}: {
  data: SolutionContent
  slug?: string
}) {
  return (
    <>
      {/* ────────────────────── HERO ────────────────────── */}
      <section className="relative overflow-hidden bg-[#F5F6F8]">
        <motion.div
          className="relative z-10 mx-auto max-w-4xl px-6 py-16 text-center"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-sm font-medium text-[#555860]"
          >
            {data.heroEyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-normal leading-[1.1] tracking-tight text-[#0A1628] sm:text-5xl md:text-6xl"
          >
            {data.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]"
          >
            {data.subtitle}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/demo/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#005CE8]"
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
        </motion.div>
      </section>

      {/* ────────────────────── PROBLEM ────────────────────── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <motion.p
                variants={revealItemLeft}
                className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]"
              >
                The challenge
              </motion.p>
              <motion.h2
                variants={revealItemLeft}
                className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] sm:text-4xl"
              >
                {data.problemHeading}
              </motion.h2>
              <motion.p
                variants={revealItemLeft}
                className="mt-4 text-lg leading-relaxed text-[#555860]"
              >
                {data.problemBody}
              </motion.p>
            </div>

            <motion.ul variants={revealItemRight} className="space-y-4">
              {data.problemBullets.map((bullet, i) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 rounded-xl border border-[#D3D5DB] bg-[#F5F6F8] p-4"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8F2FE] text-[#176FEB]">
                    <span className="text-xs font-bold">{i + 1}</span>
                  </span>
                  <span className="text-[0.938rem] leading-relaxed text-[#2C2E33]">
                    {bullet}
                  </span>
                </li>
              ))}
            </motion.ul>
          </RevealOnScroll>
        </div>
      </section>

      {/* ────────────────────── FEATURES ────────────────────── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]"
            >
              Built for your workflow
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] sm:text-4xl"
            >
              Everything you <span className="text-[#176FEB]">need</span>, nothing you don&apos;t
            </motion.h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.features.map((f) => {
              const Icon = iconMap[f.iconName] || CheckCircle2
              return (
                <motion.div
                  key={f.title}
                  variants={revealItem}
                  className="rounded-2xl border border-[#D3D5DB] bg-white p-7 transition-colors duration-150 hover:border-[#176FEB]/40"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#E8F2FE] text-[#176FEB]">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#2C2E33]">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[0.938rem] leading-relaxed text-[#555860]">
                    {f.description}
                  </p>
                </motion.div>
              )
            })}
          </RevealOnScroll>
        </div>
      </section>

      {/* ────────────────────── HOW IT WORKS ────────────────────── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]"
            >
              How it works
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] sm:text-4xl"
            >
              Live in <span className="text-[#176FEB]">days</span>, not months
            </motion.h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.12} className="relative">
            <div
              className="absolute left-[27px] top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-[#176FEB]/40 via-[#176FEB]/20 to-transparent lg:block"
              aria-hidden
            />

            <div className="space-y-8 lg:space-y-12">
              {data.steps.map((step) => (
                <motion.div
                  key={step.number}
                  variants={revealItem}
                  className="flex gap-6 lg:gap-8"
                >
                  <div className="flex shrink-0 flex-col items-center">
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#176FEB]/10 text-[#176FEB]">
                      <span className="font-heading text-lg font-bold">{step.number}</span>
                    </div>
                  </div>

                  <div className="pb-2 pt-2">
                    <h3 className="font-heading text-xl font-bold text-[#2C2E33]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 max-w-xl text-[0.938rem] leading-relaxed text-[#555860]">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ────────────────────── REPLACES ────────────────────── */}
      {data.replaces.length > 0 && (
        <section className="bg-[#F5F6F8] py-12">
          <div className="mx-auto max-w-4xl px-6">
            <RevealOnScroll className="text-center">
              <motion.h2
                variants={revealItem}
                className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] sm:text-4xl"
              >
                Revun <span className="text-[#176FEB]">replaces</span> your current stack
              </motion.h2>
              <motion.p
                variants={revealItem}
                className="mx-auto mt-4 max-w-lg text-lg text-[#555860]"
              >
                Stop paying for disconnected tools. One platform handles it all.
              </motion.p>
            </RevealOnScroll>

            <RevealOnScroll stagger={0.06} className="mt-12 flex flex-wrap items-center justify-center gap-3">
              {data.replaces.map((tool) => (
                <motion.span
                  key={tool}
                  variants={revealItem}
                  className="inline-flex items-center gap-2 rounded-full border border-[#D3D5DB] bg-white px-5 py-2.5 text-sm font-medium text-[#555860] line-through decoration-[#176FEB]/60 decoration-2"
                >
                  <X className="h-3.5 w-3.5 text-[#176FEB]" strokeWidth={2.5} />
                  {tool}
                </motion.span>
              ))}
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ────────────────────── PRICING PREVIEW ────────────────────── */}
      <section className="bg-white py-12">
        <RevealOnScroll className="mx-auto max-w-2xl px-6 text-center">
          <motion.p
            variants={revealItem}
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]"
          >
            Simple pricing
          </motion.p>
          <motion.div variants={revealItem}>
            <p className="font-heading text-5xl font-bold tracking-tight text-[#2C2E33] sm:text-6xl">
              {data.startingPrice}
            </p>
            <p className="mt-2 text-lg text-[#555860]">{data.priceUnit}</p>
          </motion.div>
          <motion.p
            variants={revealItem}
            className="mt-4 text-sm text-[#555860]"
          >
            {data.pricingNote}
          </motion.p>
          <motion.div variants={revealItem} className="mt-8">
            <Link
              href="/pricing/"
              className="inline-flex items-center gap-2 text-base font-semibold text-[#176FEB] transition-colors duration-150 hover:text-[#005CE8] hover:underline"
            >
              See full pricing details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>

      {/* ────────────────────── RELATED SOLUTIONS ────────────────────── */}
      {data.relatedSolutions.length > 0 && (
        <section className="bg-white py-12">
          <div className="mx-auto max-w-6xl px-6">
            <RevealOnScroll className="mb-8 text-center">
              <motion.p
                variants={revealItem}
                className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]"
              >
                Explore more
              </motion.p>
              <motion.h2
                variants={revealItem}
                className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] sm:text-4xl"
              >
                Related <span className="text-[#176FEB]">solutions</span>
              </motion.h2>
            </RevealOnScroll>

            <RevealOnScroll
              stagger={0.1}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {data.relatedSolutions.map((sol) => (
                <motion.div key={sol.slug} variants={revealItem}>
                  <Link
                    href={`/solutions/${sol.slug}/`}
                    className="group flex items-center justify-between rounded-2xl border border-[#D3D5DB] bg-white p-6 transition-colors duration-150 hover:border-[#176FEB]/40"
                  >
                    <span className="font-heading text-lg font-bold text-[#2C2E33] transition-colors duration-150 group-hover:text-[#176FEB]">
                      {sol.title}
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-[#D3D5DB] transition-colors duration-150 group-hover:text-[#176FEB]" />
                  </Link>
                </motion.div>
              ))}
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ────────────────────── FINAL CTA ────────────────────── */}
      <section className="relative overflow-hidden bg-[#F5F6F8] py-12">
        <div className="absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="absolute left-[20%] top-[30%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(23,111,235,0.18)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute right-[15%] bottom-[20%] h-[350px] w-[350px] rounded-full bg-[radial-gradient(circle,rgba(23,111,235,0.1)_0%,transparent_70%)] blur-3xl" />
        </div>

        <RevealOnScroll className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <motion.h2
            variants={revealItem}
            className="font-heading font-extrabold text-3xl leading-tight tracking-tight text-[#0A1628] sm:text-4xl md:text-5xl"
          >
            {data.ctaHeading}
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-[#555860]"
          >
            {data.ctaBody}
          </motion.p>
          <motion.div
            variants={revealItem}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/demo/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#005CE8]"
            >
              Book a Demo
            </Link>
            <Link
              href="/signup/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors duration-150 hover:bg-white"
            >
              Start Free
            </Link>
          </motion.div>
          <motion.p
            variants={revealItem}
            className="mt-6 text-sm text-[#64748B]"
          >
            No credit card required. 14-day free trial.
          </motion.p>
        </RevealOnScroll>
      </section>
    </>
  )
}
