import type { Metadata } from 'next'
import Link from 'next/link'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { Sofa, ClipboardList, CalendarDays, Banknote, Shield, Home, ArrowRight } from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const metadata: Metadata = {
  title: 'Furnished Rentals - Manage Furnished Properties with Revun',
  description:
    'Manage furnished rental properties with inventory tracking, flexible lease terms, higher-rent management, and turnover checklists. Built for furnished rental operators and tenants.',
  alternates: { canonical: buildCanonicalUrl('/furnished-rentals') },
  openGraph: {
    title: 'Furnished Rentals - Manage Furnished Properties with Revun',
    description: 'Inventory tracking, flexible leases, and turnover management for furnished rental operators.',
    url: buildCanonicalUrl('/furnished-rentals'),
  },
}

const operatorFeatures = [
  { icon: ClipboardList, title: 'Inventory Management', description: 'Track every item in every unit. Photo documentation, condition reports, and replacement schedules built into the property record.' },
  { icon: CalendarDays, title: 'Flexible Lease Terms', description: 'Support short-term, mid-term, and long-term furnished leases. Configurable minimum stays and pricing by duration.' },
  { icon: Banknote, title: 'Premium Rent Tracking', description: 'Furnished rentals command higher rents. Track base rent, furnishing premiums, and utility inclusions separately.' },
  { icon: Shield, title: 'Turnover Checklists', description: 'Standardized move-in and move-out inspection checklists with photo comparison. Damage assessment automated.' },
  { icon: Home, title: 'Listing Optimization', description: 'Highlight furnishing details, amenities, and included utilities in your listings. Photo galleries showcase the space.' },
  { icon: Sofa, title: 'Maintenance & Replacements', description: 'Track appliance warranties, furniture condition, and schedule replacements before items degrade.' },
]

const tenantBenefits = [
  'Move in with just your suitcase - everything is provided',
  'Digital inventory sign-off at move-in protects both parties',
  'Maintenance requests include furniture and appliance issues',
  'Flexible lease terms for short or mid-term stays',
  'Utility inclusion clearly documented in your lease',
]

const faqs = [
  { q: 'How does inventory tracking work?', a: 'Every furnished unit has a detailed inventory list with photos and condition ratings. Tenants sign off on the inventory at move-in, and any discrepancies at move-out are documented with photo evidence.' },
  { q: 'Can I set different rates for different lease lengths?', a: 'Yes. Configure pricing tiers by duration - for example, a higher nightly rate for 30-day stays versus a lower monthly rate for 6-month leases. Revun calculates and displays the right price.' },
  { q: 'What happens if furniture is damaged?', a: 'Move-out inspections compare current photos to move-in documentation. Damage charges are calculated based on item value and depreciation, and can be deducted from the security deposit through the platform.' },
  { q: 'Is this different from Airbnb management?', a: 'Revun is designed for residential furnished rentals with lease agreements, not nightly vacation rentals. It supports mid-term and long-term furnished tenancies with proper lease documentation.' },
]

export default function FurnishedRentalsPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://revun.com/' },
      { '@type': 'ListItem', position: 2, name: 'Furnished Rentals', item: buildCanonicalUrl('/furnished-rentals') },
    ],
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(faqJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F5F6F8]">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute -left-[10%] top-[30%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(23,111,235,0.08)_0%,transparent_70%)] blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 pb-16 text-center lg:pt-32 lg:pb-24">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#176FEB]/20 text-[#176FEB]">
            <Sofa className="h-7 w-7" strokeWidth={1.8} />
          </div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-sm font-medium text-[#555860] backdrop-blur-sm">
            Furnished Rentals
          </p>
          <h1 className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight text-[#0A1628] sm:text-5xl md:text-6xl">
            Furnished Rental Management, Simplified
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]">
            Manage furnished properties with inventory tracking, flexible lease terms, and automated turnover workflows. For operators and tenants alike.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/demo/" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#005CE8]">
              Book a Demo
            </Link>
            <Link href="/self-manage/furnished-rental/" className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors duration-150 hover:bg-white">
              Self-Manage a Furnished Rental
            </Link>
          </div>
        </div>
      </section>

      {/* For Operators */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">For operators</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] sm:text-4xl">
              Tools built for <span className="text-[#176FEB]">furnished</span> properties
            </h2>
          </RevealOnScroll>
          <RevealOnScroll stagger={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {operatorFeatures.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="rounded-2xl border border-[#D3D5DB] bg-white p-7 transition-colors duration-150 hover:border-[#176FEB]/40">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#E8F2FE] text-[#176FEB]">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#2C2E33]">{f.title}</h3>
                  <p className="mt-2 text-[0.938rem] leading-relaxed text-[#555860]">{f.description}</p>
                </div>
              )
            })}
          </RevealOnScroll>
        </div>
      </section>

      {/* For Tenants */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">For tenants</p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] sm:text-4xl">
                Move in ready, <span className="text-[#176FEB]">stress free</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[#555860]">
                When you rent a furnished property through a Revun-powered operator, everything is documented and transparent from day one.
              </p>
            </div>
            <ul className="space-y-4">
              {tenantBenefits.map((b, i) => (
                <li key={b} className="flex items-start gap-3 rounded-xl border border-[#D3D5DB] bg-[#F5F6F8] p-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8F2FE] text-[#176FEB]">
                    <span className="text-xs font-bold">{i + 1}</span>
                  </span>
                  <span className="text-[0.938rem] leading-relaxed text-[#2C2E33]">{b}</span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-center font-heading text-3xl font-bold tracking-tight text-[#2C2E33] sm:text-4xl">
            Frequently Asked <span className="text-[#176FEB]">Questions</span>
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-[#D3D5DB] bg-white">
                <summary className="flex cursor-pointer items-center justify-between px-6 py-5 font-heading text-base font-bold text-[#2C2E33] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="ml-4 shrink-0 text-[#176FEB] transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-5 text-[0.938rem] leading-relaxed text-[#555860]">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#F5F6F8] py-12">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-heading font-extrabold text-3xl leading-tight tracking-tight text-[#0A1628] sm:text-4xl">
            Manage furnished properties the right way
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-[#555860]">
            Inventory tracking, flexible terms, and automated turnovers. Built for furnished rental operators.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/demo/" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#005CE8]">
              Book a Demo
            </Link>
            <Link href="/pricing/" className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors duration-150 hover:bg-white">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
