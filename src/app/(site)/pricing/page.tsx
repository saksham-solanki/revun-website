import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { PricingTabs } from '@/components/blocks/pricing-tabs'
import { PricingFaq } from '@/components/blocks/pricing-faq'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, transparent pricing for property management. Free for 1-2 units. Plans for self-managing owners, agents, brokerages, operators, and maintenance companies.',
  alternates: { canonical: buildCanonicalUrl('/pricing') },
  openGraph: {
    title: 'Pricing | Revun',
    description:
      'Free for 1-2 units. Plans for self-managing owners, agents, brokerages, operators, and maintenance companies.',
    url: buildCanonicalUrl('/pricing'),
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Revun Pricing',
  description:
    'Simple, transparent pricing for property management. Free for 1-2 units. Scale as your portfolio grows.',
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
      <section className="relative overflow-hidden bg-[#F5F6F8] pt-32 pb-16 md:pt-40 md:pb-20">
        {/* Decorative dot grid */}
        <div className="absolute inset-0 bg-dot-grid opacity-40" aria-hidden="true" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="animate-fade-up font-heading font-extrabold text-4xl text-[#0A1628] md:text-5xl lg:text-6xl">
            Simple, <span className="text-[#176FEB]">transparent</span> pricing
          </h1>
          <p className="animate-fade-up delay-150 mt-6 text-lg text-[#555860]">
            Free for 1-2 units. Scale as your portfolio grows.
          </p>
          <p className="animate-fade-up delay-150 mt-3 text-sm text-[#555860]/70">
            No long-term contracts. No hidden fees. Cancel anytime.
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
