import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { PricingTabs } from '@/components/blocks/pricing-tabs'
import { PricingFaq } from '@/components/blocks/pricing-faq'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, transparent pricing for property management. Start from $1/day per unit. Plans for self-managing owners, agents, brokerages, operators, and maintenance companies.',
  alternates: { canonical: buildCanonicalUrl('/pricing') },
  openGraph: {
    title: 'Pricing | Revun',
    description:
      'Start from $1/day per unit. Plans for self-managing owners, agents, brokerages, operators, and maintenance teams.',
    url: buildCanonicalUrl('/pricing'),
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Revun Pricing',
  description:
    'Simple, transparent pricing for property management. Start from $1/day per unit.',
  url: 'https://revun.com/pricing/',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Revun',
    url: 'https://revun.com/',
  },
}

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(jsonLd as Record<string, unknown>) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-mesh-gradient pt-32 pb-16 md:pt-40 md:pb-20">
        {/* Decorative dot grid */}
        <div className="absolute inset-0 bg-dot-grid opacity-40" aria-hidden="true" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="animate-fade-up font-display text-4xl italic text-brand-indigo md:text-5xl lg:text-6xl">
            Simple, transparent pricing
          </h1>
          <p className="animate-fade-up delay-150 mt-6 text-lg text-muted-foreground md:text-xl">
            Start from $1/day per unit. Scale as your business grows.
          </p>
        </div>
      </section>

      {/* Pricing tiers */}
      <PricingTabs />

      {/* FAQ */}
      <PricingFaq />
    </>
  )
}
