'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, X, Minus, ChevronDown } from 'lucide-react'
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
    return <X className="size-4 shrink-0 text-[#E7000B]" />
  }
  if (lower === 'coming soon') {
    return <Minus className="size-4 shrink-0 text-[#D3D5DB]" />
  }
  return <Check className="size-4 shrink-0 text-[#176FEB]" />
}

export function CompareDetailClient({ data }: { data: CompetitorData }) {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#0A1628]">
        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center sm:py-32 lg:px-8">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#176FEB]">
            {data.category}
          </span>
          <h1 className="font-heading text-4xl italic text-white sm:text-5xl lg:text-6xl">
            Revun vs {data.name}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            {data.description}
          </p>
        </div>
      </section>

      {/* ── TL;DR Box ── */}
      {data.tldr && data.tldr.length > 0 && (
        <section className="bg-white py-12">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <RevealOnScroll>
              <motion.div
                variants={fadeUp}
                className="rounded-2xl border border-[#176FEB]/20 bg-[#E8F2FE] p-8"
              >
                <h2 className="mb-4 font-heading text-lg font-bold text-[#2C2E33]">
                  TL;DR: Key Differences
                </h2>
                <ul className="space-y-3">
                  {data.tldr.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-[#2C2E33]">
                      <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#176FEB] text-[10px] font-bold text-white">
                        {i + 1}
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ── Quick Comparison Cards ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Revun Card */}
              <motion.div
                variants={fadeUp}
                className="rounded-2xl border-2 border-[#176FEB] bg-white p-8"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#176FEB] text-sm font-bold text-white">
                    R
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#2C2E33]">
                    Revun
                  </h3>
                </div>
                <p className="mb-4 text-sm text-[#555860]">
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
                      <li key={f.name} className="flex items-start gap-2 text-sm text-[#2C2E33]">
                        <Check className="mt-0.5 size-4 shrink-0 text-[#176FEB]" />
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
                className="rounded-2xl border border-[#D3D5DB] bg-[#F5F6F8] p-8"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#D3D5DB] text-sm font-bold text-[#555860]">
                    {data.name.charAt(0)}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#2C2E33]">
                    {data.name}
                  </h3>
                </div>
                <p className="mb-4 text-sm text-[#555860]">
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
                      <li key={f.name} className="flex items-start gap-2 text-sm text-[#555860]">
                        <Check className="mt-0.5 size-4 shrink-0 text-[#555860]" />
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
      <section className="bg-[#F5F6F8] py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <RevealOnScroll>
            <motion.div variants={fadeUp} className="mb-12 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
                Feature Comparison
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
                Side-by-side <span className="text-[#176FEB]">breakdown</span>
              </h2>
            </motion.div>
          </RevealOnScroll>

          <RevealOnScroll>
            <motion.div
              variants={fadeUp}
              className="overflow-hidden rounded-2xl border border-[#D3D5DB] bg-white"
            >
              {/* Table header */}
              <div className="grid grid-cols-3 gap-4 border-b border-[#D3D5DB] bg-[#F5F6F8] px-6 py-4">
                <div className="text-sm font-semibold text-[#555860]">Feature</div>
                <div className="text-sm font-semibold text-[#176FEB]">Revun</div>
                <div className="text-sm font-semibold text-[#555860]">{data.name}</div>
              </div>

              {/* Table rows */}
              {data.features.map((feature, i) => (
                <div
                  key={feature.name}
                  className={`grid grid-cols-3 gap-4 px-6 py-4 ${
                    i % 2 === 0 ? 'bg-white' : 'bg-[#F5F6F8]/50'
                  } ${i < data.features.length - 1 ? 'border-b border-[#D3D5DB]/50' : ''}`}
                >
                  <div className="text-sm font-medium text-[#2C2E33]">
                    {feature.name}
                  </div>
                  <div className="flex items-start gap-2 text-sm text-[#2C2E33]">
                    {getStatusIcon(feature.revun)}
                    <span>{feature.revun}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-[#555860]">
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
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
                Pricing
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
                Compare the <span className="text-[#176FEB]">cost</span>
              </h2>
              <div className="mx-auto mt-10 grid max-w-2xl gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border-2 border-[#176FEB] bg-[#E8F2FE] p-6">
                  <p className="text-sm font-semibold text-[#176FEB]">Revun</p>
                  <p className="mt-2 font-heading text-2xl font-bold text-[#2C2E33]">
                    {data.revunPricingSummary}
                  </p>
                  <p className="mt-2 text-sm text-[#555860]">
                    Transparent, per-unit pricing. No hidden fees.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#D3D5DB] bg-[#F5F6F8] p-6">
                  <p className="text-sm font-semibold text-[#555860]">{data.name}</p>
                  <p className="mt-2 font-heading text-2xl font-bold text-[#2C2E33]">
                    {data.pricingSummary}
                  </p>
                  <p className="mt-2 text-sm text-[#555860]">
                    {data.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Why Teams Choose Revun ── */}
      <section className="bg-[#F5F6F8] py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <RevealOnScroll>
            <motion.div variants={fadeUp} className="mb-12 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
                The Revun Advantage
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
                Why teams choose Revun over <span className="text-[#176FEB]">{data.name}</span>
              </h2>
            </motion.div>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-3">
              {data.whyRevun.map((point) => (
                <motion.div
                  key={point.title}
                  variants={fadeUp}
                  className="rounded-2xl border border-[#D3D5DB] bg-white p-8 transition-colors duration-300 hover:border-[#176FEB]"
                >
                  <div className="mb-4 h-1 w-10 rounded-full bg-[#176FEB]" />
                  <h3 className="mb-3 font-heading text-lg font-bold text-[#2C2E33]">
                    {point.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#555860]">
                    {point.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── FAQ ── */}
      {data.faq && data.faq.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <RevealOnScroll>
              <motion.div variants={fadeUp} className="mb-10 text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
                  FAQ
                </p>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
                  Common <span className="text-[#176FEB]">questions</span>
                </h2>
              </motion.div>
            </RevealOnScroll>

            <RevealOnScroll>
              <motion.div variants={fadeUp}>
                {data.faq.map((item) => (
                  <details key={item.question} className="group border-b border-[#D3D5DB]">
                    <summary className="cursor-pointer py-5 font-heading font-semibold text-[#2C2E33] flex justify-between items-center">
                      {item.question}
                      <ChevronDown className="size-5 text-[#555860] transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="pb-5 text-[#555860] leading-relaxed">{item.answer}</p>
                  </details>
                ))}
              </motion.div>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-[#0A1628] py-24 md:py-32">
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <motion.div variants={fadeUp}>
              <h2 className="font-heading text-4xl italic tracking-tight text-white md:text-5xl">
                Ready to switch?
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-lg text-white/60">
                See why property managers are choosing Revun over {data.name}. Start free or book a personalized demo.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/contact/"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors hover:bg-[#005CE8]"
                >
                  Try Revun Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact/"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 px-8 text-base font-semibold text-white transition-colors hover:bg-white/10"
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
