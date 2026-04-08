import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const metadata: Metadata = {
  title: 'Property Management Across Canada | Revun',
  description:
    'Province-specific compliance, Interac payments, and local market support for Canadian property managers across Ontario, BC, Quebec, Alberta, and more.',
  alternates: { canonical: buildCanonicalUrl('/ca') },
  openGraph: {
    title: 'Property Management Across Canada | Revun',
    description:
      'Province-specific compliance, Interac payments, and local market support for Canadian property managers.',
    url: buildCanonicalUrl('/ca'),
  },
}

const provinces = [
  {
    name: 'Ontario',
    slug: 'ontario',
    abbreviation: 'ON',
    citiesCount: 6,
    cities: ['Toronto', 'Ottawa', 'Mississauga', 'Hamilton', 'London', 'Vaughan'],
    keyRegulation: 'LTB / RTA',
    description:
      "Canada's largest rental market with 1.5M+ rental households. N-series notice automation and LTB filing support built in.",
  },
  {
    name: 'British Columbia',
    slug: 'british-columbia',
    abbreviation: 'BC',
    citiesCount: 6,
    cities: ['Vancouver', 'Surrey', 'Burnaby', 'Richmond', 'Victoria', 'Kelowna'],
    keyRegulation: 'RTB',
    description:
      'High-demand rental market with strict tenancy regulations. BC RTB dispute resolution workflows and tenancy agreement templates included.',
  },
  {
    name: 'Quebec',
    slug: 'quebec',
    abbreviation: 'QC',
    citiesCount: 5,
    cities: ['Montreal', 'Laval', 'Quebec City', 'Longueuil', 'Gatineau'],
    keyRegulation: 'TAL / CCQ',
    description:
      'Unique civil law rental framework. TAL-compliant lease templates, French-language support, and Quebec Civil Code workflows purpose-built.',
  },
  {
    name: 'Alberta',
    slug: 'alberta',
    abbreviation: 'AB',
    citiesCount: 4,
    cities: ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge'],
    keyRegulation: 'RTDRS',
    description:
      'Growing rental market with RTDRS compliance. Alberta-specific notice periods, deposit rules, and energy-sector tenant workflows.',
  },
  {
    name: 'Nova Scotia',
    slug: 'nova-scotia',
    abbreviation: 'NS',
    citiesCount: 2,
    cities: ['Halifax', 'Dartmouth'],
    keyRegulation: 'RTB',
    description:
      "Atlantic Canada's largest rental market with rent cap regulations. Province-specific compliance and notice templates.",
  },
  {
    name: 'Manitoba',
    slug: 'manitoba',
    abbreviation: 'MB',
    citiesCount: 2,
    cities: ['Winnipeg', 'Brandon'],
    keyRegulation: 'RTB',
    description:
      'Affordable rental market with RTB compliance workflows. Manitoba-specific notice and deposit rules included.',
  },
] as const

export default function CanadaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Canada', url: 'https://revun.com/ca/' },
            ])
          ),
        }}
      />
      {/* Hero */}
      <section className="bg-brand-navy py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-blue-light">
              Canadian Coverage
            </p>
            <h1 className="font-heading font-extrabold text-4xl text-white sm:text-5xl lg:text-6xl">
              Property Management{' '}
              <span className="text-brand-blue-light">Across</span> Canada
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[#D3D5DB]">
              Every province has different tenancy legislation, notice requirements, and dispute
              resolution processes. Revun handles the complexity so you can focus on your
              properties.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors duration-100 hover:bg-brand-blue-dark"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#provinces"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-8 text-base font-semibold text-white transition-colors duration-100 hover:border-white/40 hover:bg-white/5"
              >
                View Provinces
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Canada */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <RevealOnScroll>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              Canadian-First
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
              Built for how Canadian property management{' '}
              <span className="text-brand-blue">actually</span> works
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[#555860]">
              Interac e-Transfer, Canadian credit bureaus, and bilingual support are native, not
              bolted on. Province-specific compliance is enforced at the workflow level, not left
              as a configuration checkbox.
            </p>
          </RevealOnScroll>

          <RevealOnScroll className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { stat: '6', label: 'Provinces covered' },
              { stat: '25+', label: 'Cities supported' },
              { stat: '100%', label: 'Canadian compliance' },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-border p-6">
                <p className="font-heading text-4xl font-bold text-brand-blue">{item.stat}</p>
                <p className="mt-1 text-sm text-[#555860]">{item.label}</p>
              </div>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* Province Cards */}
      <section id="provinces" className="bg-brand-off-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
                By Province
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
                Choose your <span className="text-brand-blue">province</span>
              </h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {provinces.map((province) => (
                <Link
                  key={province.slug}
                  href={`/ca/${province.slug}/`}
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-white p-7 transition-colors duration-150 hover:border-brand-blue"
                >
                  <div>
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 text-sm font-bold text-brand-blue">
                          {province.abbreviation}
                        </span>
                        <h3 className="font-heading text-xl font-bold text-brand-graphite">
                          {province.name}
                        </h3>
                      </div>
                      <span className="shrink-0 rounded-md bg-brand-blue/10 px-2.5 py-1 text-xs font-semibold text-brand-blue">
                        {province.keyRegulation}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#475569]">
                      {province.description}
                    </p>
                    <div className="mt-4 text-xs text-[#94A3B8]">
                      <span className="font-medium text-[#555860]">
                        {province.citiesCount} cities:{' '}
                      </span>
                      {province.cities.slice(0, 3).join(', ')}
                      {province.cities.length > 3 && (
                        <span> +{province.cities.length - 3} more</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors duration-100 group-hover:text-brand-blue-dark">
                    Explore {province.name}
                    <ArrowRight className="size-4 transition-transform duration-100 group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Feature strip */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="mb-12 text-center font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
              Everything Canadian landlords <span className="text-brand-blue">need</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll stagger={0.07}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: 'Interac e-Transfer',
                  body: 'Native Canadian payment rail. No workarounds or third-party plugins.',
                },
                {
                  title: 'Province-Specific Notices',
                  body: 'N-series (ON), RTB forms (BC/MB/NS), TAL templates (QC) pre-loaded.',
                },
                {
                  title: 'Bilingual Support',
                  body: 'English and French throughout. Required for Quebec operations.',
                },
                {
                  title: 'Canadian Credit Bureaus',
                  body: 'Equifax and TransUnion tenant screening built into the application flow.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-border p-6">
                  <h3 className="font-heading text-base font-bold text-brand-graphite">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#555860]">{item.body}</p>
                </div>
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
              Ready to go Canadian-first?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-[#D3D5DB]">
              See how Revun handles province-specific compliance, Interac payments, and Canadian
              credit bureau integrations.
            </p>
            <div className="mt-10">
              <Link
                href="/contact/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors duration-100 hover:bg-brand-blue-dark"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
