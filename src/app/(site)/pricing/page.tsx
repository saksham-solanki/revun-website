import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildProductSchema, buildBreadcrumbSchema, buildFAQPageSchema } from '@/lib/schema-builders'
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildProductSchema([
              { name: 'Free', price: '0', description: 'For 1-2 units. Core features included.' },
              { name: 'Starter', price: '29', description: 'For growing portfolios up to 20 units.' },
              { name: 'Professional', price: '79', description: 'For professional property managers.' },
              { name: 'Enterprise', price: '299', description: 'For large portfolios and multi-location operations.' },
            ])
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildBreadcrumbSchema([
            { name: 'Home', url: 'https://revun.com/' },
            { name: 'Pricing', url: 'https://revun.com/pricing/' },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildFAQPageSchema([
            { question: 'Can I switch plans later?', answer: 'Yes. Upgrade or downgrade anytime. Changes take effect on your next billing cycle. No penalties.' },
            { question: 'What counts as a unit?', answer: 'Any property with a current lease or active listing. Vacant, unlisted units are not billed.' },
            { question: 'Is there a free trial?', answer: 'The Free plan is free forever for 1-2 units. Growth and Professional plans include a 14-day free trial with full access.' },
            { question: 'What payment methods do you accept?', answer: 'Credit card, ACH, and Interac (Canada). All payments processed securely through Stripe.' },
            { question: 'Do you offer annual billing?', answer: 'Yes. Save 20% with annual billing on Growth and Professional plans.' },
            { question: 'What happens if I exceed my plan limits?', answer: 'We notify you before any changes. No surprise charges. You can upgrade or we can discuss custom pricing.' },
            { question: 'Can I use Revun for properties in both Canada and the US?', answer: 'Yes. Revun supports both markets with province and state-specific compliance workflows built in.' },
            { question: 'How do I cancel?', answer: 'Cancel anytime from your account settings. No long-term contracts, no cancellation fees.' },
          ])),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F5F6F8] pt-32 pb-16 md:pt-40 md:pb-20">
        {/* Decorative dot grid */}
        <div className="absolute inset-0 bg-dot-grid opacity-40" aria-hidden="true" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="animate-fade-up font-display font-extrabold text-4xl text-[#0A1628] md:text-5xl lg:text-6xl">
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
