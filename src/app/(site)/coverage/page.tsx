import type { Metadata } from 'next'
import Link from 'next/link'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { NorthAmericaCoverage } from '@/components/blocks/north-america-coverage'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Coverage',
  description:
    'Revun operates across all 10 Canadian provinces with built-in provincial compliance. Expanding coverage across the United States.',
  alternates: { canonical: buildCanonicalUrl('/coverage') },
  openGraph: {
    title: 'Coverage | Revun',
    description:
      'Provincial and state compliance built into every workflow. See where Revun operates.',
    url: buildCanonicalUrl('/coverage'),
  },
}

const canadaCompliance = [
  { province: 'Ontario', board: 'LTB (Landlord and Tenant Board)', features: ['RTA compliance', 'N-series notices', 'Above-guideline increases'] },
  { province: 'British Columbia', board: 'RTB (Residential Tenancy Branch)', features: ['Standard lease forms', 'Dispute resolution prep', 'Rent increase scheduling'] },
  { province: 'Quebec', board: 'TAL (Tribunal administratif du logement)', features: ['Bail lease forms', 'Renewal procedures', 'Tribunal filing support'] },
  { province: 'Alberta', board: 'RTDRS (Residential Tenancy Dispute Resolution)', features: ['Periodic tenancy rules', 'Security deposit tracking', 'Notice templates'] },
  { province: 'Nova Scotia', board: 'Residential Tenancies Program', features: ['Standard lease compliance', 'Rent increase caps', 'Dispute resolution'] },
  { province: 'Manitoba', board: 'Residential Tenancies Branch', features: ['Security deposit rules', 'Rent increase guidelines', 'Notice requirements'] },
]

export default function CoveragePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Coverage', url: 'https://revun.com/coverage/' },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="bg-[#F5F6F8] py-14">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <RevealOnScroll>
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
              Coverage
            </p>
            <h1 className="mt-3 font-display text-4xl font-normal text-[#0A1628] md:text-5xl">
              Built for <span className="text-[#176FEB]">Canada</span>. Expanding across North America.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#555860]">
              Provincial and state compliance built into every workflow. No workarounds, no manual overrides.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Coverage map component */}
      <NorthAmericaCoverage />

      {/* Provincial compliance detail */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <RevealOnScroll>
            <div className="mb-10">
              <p className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
                Compliance by Province
              </p>
              <h2 className="mt-3 font-heading text-2xl font-bold text-[#0A1628] md:text-3xl">
                Every province, every regulation
              </h2>
              <p className="mt-3 max-w-2xl text-[#555860]">
                Revun natively supports tenancy legislation for each Canadian province. Lease templates, notice forms, and deadline tracking are automated per jurisdiction.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {canadaCompliance.map((item) => (
                <div
                  key={item.province}
                  className="rounded-xl border border-[#E5E7EB] bg-white p-5 transition-all duration-200 hover:border-[#176FEB]/30"
                >
                  <h3 className="font-heading text-base font-bold text-[#0A1628]">{item.province}</h3>
                  <p className="mt-1 text-xs font-medium text-[#176FEB]">{item.board}</p>
                  <ul className="mt-4 space-y-2">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#5EA500]" />
                        <span className="text-sm text-[#555860]">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-8 text-center">
              <Link
                href="/ca/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#176FEB] transition-colors hover:text-[#0B5AD4]"
              >
                View all province pages
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#176FEB] py-14">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
              Operating in a province or state not listed?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-white/80">
              Contact us for early access. We are expanding coverage across North America.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="/contact/"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-[#176FEB] transition-colors duration-200 hover:bg-white/90"
              >
                Contact Us
              </Link>
              <Link
                href="/demo/"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                Book a Demo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
