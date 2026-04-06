import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { AboutHero } from '@/components/blocks/about-hero'
import { buildCanonicalUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Revun exists because property management is still run on disconnected tools, manual processes, and fragmented communication. We are changing that.',
  alternates: { canonical: buildCanonicalUrl('/about') },
  openGraph: {
    title: 'About | Revun',
    description:
      'Building the infrastructure layer for property management.',
    url: buildCanonicalUrl('/about'),
  },
}

const beliefs = [
  {
    headline: 'Software should replace complexity, not add it.',
    body: 'Every feature we ship is measured by whether it removes a step, not whether it adds a capability. If a workflow takes more clicks in Revun than it did on paper, we failed.',
  },
  {
    headline: 'Every operator deserves institutional-grade tools.',
    body: 'Whether you manage 5 units or 5,000, the quality of your software should not depend on your budget. Revun is built for scale but priced for access.',
  },
  {
    headline: 'Technology works best when it disappears into the workflow.',
    body: 'The best property management software is the one your team stops thinking about. It just works, in the background, every time.',
  },
] as const

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <AboutHero />

      {/* ── Mission ── */}
      <section className="relative bg-white py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll className="text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-violet">
              Our Mission
            </p>
            <blockquote className="font-heading text-2xl font-bold leading-snug tracking-tight text-brand-indigo md:text-3xl">
              "Our mission is to give every property business, from a single
              self-managing owner to a national operator, access to the same
              quality of software infrastructure."
            </blockquote>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── What We Believe ── */}
      <section className="relative bg-brand-slate-50 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-violet">
              Principles
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-indigo md:text-4xl">
              What we believe
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-3">
              {beliefs.map((b) => (
                <div
                  key={b.headline}
                  className="group relative overflow-hidden rounded-2xl border border-brand-slate-200 bg-white p-8 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-brand-violet/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
                  <div className="relative z-10">
                    <h3 className="mb-3 font-heading text-lg font-bold text-brand-indigo">
                      {b.headline}
                    </h3>
                    <p className="text-sm leading-relaxed text-brand-slate-600">
                      {b.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="relative overflow-hidden bg-brand-indigo py-24 md:py-32">
        <div className="absolute inset-0 bg-mesh-gradient opacity-40" aria-hidden />
        <div className="absolute inset-0 bg-dot-grid opacity-20" aria-hidden />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="font-display italic text-4xl tracking-tight text-white md:text-5xl">
              Want to learn more?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-brand-slate-300">
              We would love to hear from you. Whether you are an operator, an
              investor, or just curious about what we are building.
            </p>
            <div className="mt-10">
              <Link
                href="/contact/"
                className="cta-primary-shadow inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-violet px-8 text-base font-semibold text-white transition-all hover:bg-brand-violet-dark"
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
