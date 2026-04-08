import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { AboutHero } from '@/components/blocks/about-hero'
import { buildCanonicalUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Revun exists because property management in Canada is still run on disconnected tools built for the US market. We are building the infrastructure layer for Canadian property managers.',
  alternates: { canonical: buildCanonicalUrl('/about') },
  openGraph: {
    title: 'About | Revun',
    description:
      'Building the infrastructure layer for Canadian property managers.',
    url: buildCanonicalUrl('/about'),
  },
}

const problems = [
  {
    title: "US tools don't understand Canada",
    body: 'Most property management software is built for the US market. Canadian compliance, provincial regulations, and local payment methods are afterthoughts.',
  },
  {
    title: 'Fragmented tools, fragmented data',
    body: 'Property managers juggle 5-8 disconnected tools for leasing, payments, maintenance, and reporting. Data lives in silos. Nothing talks to anything.',
  },
  {
    title: 'No single platform does it all',
    body: 'Rent guarantee, full PM operations, brokerage tools, and maintenance management. No existing platform combines all four. Revun does.',
  },
] as const

const values = [
  {
    title: 'Infrastructure',
    body: 'We build the foundation layer, not point solutions. Every feature connects to a shared data model.',
  },
  {
    title: 'Authority',
    body: 'Built by people who understand Canadian real estate. Provincial compliance, local payment rails, market-specific workflows.',
  },
  {
    title: 'Transparency',
    body: 'Clear pricing, no hidden fees, open roadmap. We earn trust by being straightforward.',
  },
  {
    title: 'Scale',
    body: 'From 1 unit to 10,000. The architecture is the same. The experience adapts to your size.',
  },
] as const

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <AboutHero />

      {/* ── Mission ── */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll className="text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Our Mission
            </p>
            <blockquote className="font-heading text-2xl font-bold leading-snug tracking-tight text-[#2C2E33] md:text-3xl">
              &ldquo;To give every property business in North America, from a single
              self-managing owner to a national operator, access to
              institutional-grade software infrastructure.&rdquo;
            </blockquote>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Why Revun Exists ── */}
      <section className="bg-[#F5F6F8] py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              The Problem
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33]">
              Why <span className="text-[#176FEB]">Revun</span> exists
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-3">
              {problems.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-[#D3D5DB] bg-white p-8"
                >
                  <h3 className="mb-3 font-heading text-lg font-bold text-[#2C2E33]">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#555860]">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Our Pillars
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33]">
              What we <span className="text-[#176FEB]">stand</span> for
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-2">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl border border-[#D3D5DB] bg-[#F5F6F8] p-8"
                >
                  <h3 className="mb-3 border-l-4 border-l-[#176FEB] pl-4 font-heading text-lg font-bold text-[#2C2E33]">
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#555860]">
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0A1628] py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="font-heading font-extrabold text-4xl tracking-tight text-white md:text-5xl">
              Want to <span className="text-[#176FEB]">learn</span> more?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-[#94A3B8]">
              We would love to hear from you. Whether you are an operator, an
              investor, or just curious about what we are building.
            </p>
            <div className="mt-10">
              <Link
                href="/contact/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors hover:bg-[#1461d0]"
              >
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
