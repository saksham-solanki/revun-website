'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, X, Minus } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import type { CompetitorData } from './page'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function getStatusIcon(value: string) {
  const lower = value.toLowerCase()
  if (lower === 'not available' || lower === 'not included') {
    return <X className="size-4 shrink-0 text-rose-500" />
  }
  if (lower === 'coming soon') {
    return <Minus className="size-4 shrink-0 text-amber-500" />
  }
  return <Check className="size-4 shrink-0 text-emerald-500" />
}

export function CompareDetailClient({ data }: { data: CompetitorData }) {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-brand-indigo">
        <div className="absolute inset-0 bg-dot-grid opacity-30" />
        <div className="absolute inset-0 bg-mesh-gradient opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center sm:py-32 lg:px-8">
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-200">
            {data.category}
          </span>
          <h1 className="font-display text-4xl italic text-white sm:text-5xl lg:text-6xl">
            Revun vs {data.name}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-200">
            {data.description}
          </p>
        </div>
      </section>

      {/* ── Quick Comparison Cards ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Revun Card */}
              <motion.div
                variants={fadeUp}
                className="rounded-2xl border-2 border-brand-violet bg-gradient-to-br from-violet-50 to-white p-8"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-brand-violet text-sm font-bold text-white">
                    R
                  </div>
                  <h3 className="font-heading text-xl font-bold text-brand-indigo">
                    Revun
                  </h3>
                </div>
                <p className="mb-4 text-sm text-brand-slate-500">
                  {data.revunPricingSummary}
                </p>
                <ul className="space-y-3">
                  {data.features
                    .filter((f) => {
                      const cl = f.competitor.toLowerCase()
                      return cl === 'not available' || cl === 'not included' || cl === 'us-focused'
                    })
                    .slice(0, 4)
                    .map((f) => (
                      <li key={f.name} className="flex items-start gap-2 text-sm text-brand-slate-700">
                        <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                        <span>
                          <span className="font-medium">{f.name}:</span> {f.revun}
                        </span>
                      </li>
                    ))}
                </ul>
              </motion.div>

              {/* Competitor Card */}
              <motion.div
                variants={fadeUp}
                className="rounded-2xl border border-border bg-brand-slate-50 p-8"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-brand-slate-200 text-sm font-bold text-brand-slate-600">
                    {data.name.charAt(0)}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-brand-slate-700">
                    {data.name}
                  </h3>
                </div>
                <p className="mb-4 text-sm text-brand-slate-500">
                  {data.pricingSummary}
                </p>
                <ul className="space-y-3">
                  {data.features
                    .filter((f) => {
                      const cl = f.competitor.toLowerCase()
                      return cl !== 'not available' && cl !== 'not included'
                    })
                    .slice(0, 4)
                    .map((f) => (
                      <li key={f.name} className="flex items-start gap-2 text-sm text-brand-slate-600">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand-slate-400" />
                        <span>
                          <span className="font-medium">{f.name}:</span> {f.competitor}
                        </span>
                      </li>
                    ))}
                </ul>
              </motion.div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Feature Comparison Table ── */}
      <section className="bg-brand-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <RevealOnScroll>
            <motion.div variants={fadeUp} className="mb-12 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-violet">
                Feature Comparison
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-indigo md:text-4xl">
                Side-by-side breakdown
              </h2>
            </motion.div>
          </RevealOnScroll>

          <RevealOnScroll>
            <motion.div
              variants={fadeUp}
              className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
            >
              {/* Table header */}
              <div className="grid grid-cols-3 gap-4 border-b border-border bg-brand-slate-50 px-6 py-4">
                <div className="text-sm font-semibold text-brand-slate-500">Feature</div>
                <div className="text-sm font-semibold text-brand-violet">Revun</div>
                <div className="text-sm font-semibold text-brand-slate-500">{data.name}</div>
              </div>

              {/* Table rows */}
              {data.features.map((feature, i) => (
                <div
                  key={feature.name}
                  className={`grid grid-cols-3 gap-4 px-6 py-4 ${
                    i % 2 === 0 ? 'bg-white' : 'bg-brand-slate-50/50'
                  } ${i < data.features.length - 1 ? 'border-b border-border/50' : ''}`}
                >
                  <div className="text-sm font-medium text-brand-indigo">
                    {feature.name}
                  </div>
                  <div className="flex items-start gap-2 text-sm text-brand-slate-700">
                    {getStatusIcon(feature.revun)}
                    <span>{feature.revun}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-brand-slate-500">
                    {getStatusIcon(feature.competitor)}
                    <span>{feature.competitor}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Pricing Comparison ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <RevealOnScroll>
            <motion.div variants={fadeUp}>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-violet">
                Pricing
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-indigo md:text-4xl">
                Compare the cost
              </h2>
              <div className="mx-auto mt-10 grid max-w-2xl gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border-2 border-brand-violet bg-violet-50 p-6">
                  <p className="text-sm font-semibold text-brand-violet">Revun</p>
                  <p className="mt-2 font-heading text-2xl font-bold text-brand-indigo">
                    {data.revunPricingSummary}
                  </p>
                  <p className="mt-2 text-sm text-brand-slate-500">
                    Transparent, per-unit pricing. No hidden fees.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-brand-slate-50 p-6">
                  <p className="text-sm font-semibold text-brand-slate-500">{data.name}</p>
                  <p className="mt-2 font-heading text-2xl font-bold text-brand-slate-700">
                    {data.pricingSummary}
                  </p>
                  <p className="mt-2 text-sm text-brand-slate-500">
                    {data.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Why Teams Choose Revun ── */}
      <section className="bg-brand-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <RevealOnScroll>
            <motion.div variants={fadeUp} className="mb-12 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-violet">
                The Revun Advantage
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-indigo md:text-4xl">
                Why teams choose Revun over {data.name}
              </h2>
            </motion.div>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-3">
              {data.whyRevun.map((point) => (
                <motion.div
                  key={point.title}
                  variants={fadeUp}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:shadow-lg hover:border-brand-violet-light"
                >
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-brand-violet/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative z-10">
                    <h3 className="mb-3 font-heading text-lg font-bold text-brand-indigo">
                      {point.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-brand-slate-600">
                      {point.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-brand-indigo py-24 md:py-32">
        <div className="absolute inset-0 bg-mesh-gradient opacity-40" />
        <div className="absolute inset-0 bg-dot-grid opacity-20" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <motion.div variants={fadeUp}>
              <h2 className="font-display text-4xl italic tracking-tight text-white md:text-5xl">
                Ready to switch?
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-lg text-brand-slate-300">
                See why property managers are choosing Revun over {data.name}. Start free or book a personalized demo.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/contact/"
                  className="cta-primary-shadow inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-violet px-8 text-base font-semibold text-white transition-all hover:bg-brand-violet-dark"
                >
                  Try Revun Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact/"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 px-8 text-base font-semibold text-white transition-all hover:bg-white/10"
                >
                  Book a Demo
                </Link>
              </div>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
