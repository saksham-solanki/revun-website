import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'

export const metadata: Metadata = {
  title: 'Revun in the United States | Property Management Software',
  description:
    'Property management software for US markets. State-specific compliance, local market data, and multi-state portfolio support.',
  alternates: { canonical: buildCanonicalUrl('/us') },
  openGraph: {
    title: 'Revun in the United States',
    description:
      'State-specific compliance, local market data, and multi-state portfolio support for US property managers.',
    url: buildCanonicalUrl('/us'),
  },
}

const states = [
  {
    name: 'Florida',
    slug: 'florida',
    abbreviation: 'FL',
    cities: ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Fort Lauderdale'],
    description:
      'One of the largest US rental markets with landlord-friendly regulations and growing demand. Florida-specific eviction workflows and HOA compliance.',
  },
  {
    name: 'Texas',
    slug: 'texas',
    abbreviation: 'TX',
    cities: ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth'],
    description:
      'High-growth rental market with no state income tax. Strong landlord protections and Texas Property Code compliance built in.',
  },
  {
    name: 'California',
    slug: 'california',
    abbreviation: 'CA',
    cities: ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose', 'Sacramento'],
    description:
      'Largest US rental market with complex tenant protection laws. AB 1482 rent cap compliance and local ordinance tracking.',
  },
  {
    name: 'New York',
    slug: 'new-york',
    abbreviation: 'NY',
    cities: ['New York City', 'Buffalo', 'Rochester', 'Albany', 'Syracuse'],
    description:
      'Dense urban rental market with strict rent stabilization and tenant protection laws. DHCR compliance workflows included.',
  },
  {
    name: 'Illinois',
    slug: 'illinois',
    abbreviation: 'IL',
    cities: ['Chicago', 'Aurora', 'Naperville', 'Rockford'],
    description:
      'Major Midwest rental market centered on Chicago metro area. RLTO compliance for Chicago landlords.',
  },
  {
    name: 'Georgia',
    slug: 'georgia',
    abbreviation: 'GA',
    cities: ['Atlanta', 'Savannah', 'Augusta', 'Columbus'],
    description:
      'Fast-growing Sunbelt rental market with landlord-friendly legal framework. Georgia-specific dispossessory proceedings support.',
  },
] as const

export default function USPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'United States', url: 'https://revun.com/us/' },
            ])
          ),
        }}
      />
      {/* Hero */}
      <section className="bg-brand-navy">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center sm:py-32 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-blue-light">
            United States
          </p>
          <h1 className="font-heading font-extrabold text-4xl text-white sm:text-5xl lg:text-6xl">
            Property Management Across the{' '}
            <span className="text-brand-blue">United States</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#D3D5DB]">
            Revun is expanding to US markets. Built on the same infrastructure trusted by Canadian
            property managers.
          </p>
        </div>
      </section>

      {/* Why US */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <RevealOnScroll>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              Multi-State Ready
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
              One platform,{' '}
              <span className="text-brand-blue">every state</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-brand-off-white0">
              US property law varies dramatically by state and even by city. Revun adapts to local
              regulations automatically: eviction timelines, notice requirements, security deposit
              rules, and rent control ordinances are all handled at the state and municipality level.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* State Cards */}
      <section className="bg-brand-off-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
                By State
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
                Choose your <span className="text-brand-blue">state</span>
              </h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {states.map((state, i) => (
                <Link
                  key={state.slug}
                  href={`/us/${state.slug}/`}
                  style={{ animationDelay: `${i * 60}ms` }}
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-white p-7 transition-colors duration-100 hover:border-brand-blue"
                >
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-lg border border-border bg-brand-off-white text-sm font-bold text-brand-graphite">
                        {state.abbreviation}
                      </span>
                      <h3 className="font-heading text-xl font-bold text-brand-graphite">
                        {state.name}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-[#475569]">
                      {state.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {state.cities.map((city) => (
                        <span
                          key={city}
                          className="flex items-center gap-1 rounded-full border border-border bg-brand-off-white px-3 py-1 text-xs font-medium text-[#475569]"
                        >
                          <MapPin className="size-3" />
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors duration-100 group-hover:text-brand-blue-dark">
                    Explore {state.name}
                    <ArrowRight className="size-4 transition-transform duration-100 group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="font-heading font-extrabold text-4xl tracking-tight text-white md:text-5xl">
              Manage properties across{' '}
              <span className="text-brand-blue">state lines</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-[#D3D5DB]">
              One platform that adapts to every state&apos;s regulations. See how Revun handles
              multi-state portfolio management.
            </p>
            <div className="mt-10">
              <Link
                href="/contact/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors duration-100 hover:bg-brand-blue-dark"
              >
                Book a Demo
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
