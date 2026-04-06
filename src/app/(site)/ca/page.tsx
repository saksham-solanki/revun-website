import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { buildCanonicalUrl } from '@/lib/utils'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const metadata: Metadata = {
  title: 'Revun in Canada | Property Management Software',
  description:
    'Property management software built for Canadian markets, with province-specific compliance and local market support.',
  alternates: { canonical: buildCanonicalUrl('/ca') },
  openGraph: {
    title: 'Revun in Canada',
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
    cities: ['Toronto', 'Ottawa', 'Mississauga', 'Hamilton', 'London', 'Vaughan'],
    description:
      "Canada's largest rental market with 1.5M+ rental households. Province-specific RTA compliance, N-series notice automation, and LTB filing support built in.",
  },
  {
    name: 'British Columbia',
    slug: 'british-columbia',
    abbreviation: 'BC',
    cities: ['Vancouver', 'Surrey', 'Burnaby', 'Richmond', 'Victoria', 'Kelowna'],
    description:
      'High-demand rental market with strict tenancy regulations. BC RTB dispute resolution workflows and tenancy agreement templates included.',
  },
  {
    name: 'Quebec',
    slug: 'quebec',
    abbreviation: 'QC',
    cities: ['Montreal', 'Laval', 'Quebec City', 'Longueuil', 'Gatineau'],
    description:
      "Unique civil law rental framework. TAL-compliant lease templates, French-language support, and Quebec Civil Code workflows purpose-built.",
  },
  {
    name: 'Alberta',
    slug: 'alberta',
    abbreviation: 'AB',
    cities: ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge'],
    description:
      "Growing rental market with RTDRS compliance. Alberta-specific notice periods, deposit rules, and energy-sector tenant workflows.",
  },
  {
    name: 'Nova Scotia',
    slug: 'nova-scotia',
    abbreviation: 'NS',
    cities: ['Halifax', 'Dartmouth'],
    description:
      "Atlantic Canada's largest rental market with rent cap regulations. Province-specific compliance and notice templates.",
  },
  {
    name: 'Manitoba',
    slug: 'manitoba',
    abbreviation: 'MB',
    cities: ['Winnipeg', 'Brandon'],
    description:
      'Affordable rental market with RTB compliance workflows. Manitoba-specific notice and deposit rules included.',
  },
] as const

export default function CanadaPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-brand-indigo">
        <div className="absolute inset-0 bg-dot-grid opacity-30" />
        <div className="absolute inset-0 bg-mesh-gradient opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center sm:py-32 lg:px-8">
          <h1 className="font-display text-4xl italic text-white sm:text-5xl lg:text-6xl">
            Revun in Canada
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-200">
            Property management software built for Canadian markets, with
            province-specific compliance and local market support.
          </p>
        </div>
      </section>

      {/* ── Why Canada ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <RevealOnScroll>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-violet">
              Canadian-First
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-indigo md:text-4xl">
              Built for how Canadian property management actually works
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-brand-slate-500">
              Every province has different tenancy legislation, notice requirements,
              and dispute resolution processes. Revun handles the complexity so you
              can focus on your properties. Interac e-Transfer, Canadian credit
              bureaus, and bilingual support are native, not bolted on.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Province Cards ── */}
      <section className="bg-brand-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-violet">
                By Province
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-indigo md:text-4xl">
                Choose your province
              </h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {provinces.map((province) => (
                <Link
                  key={province.slug}
                  href={`/ca/${province.slug}/`}
                  className="spotlight-card group flex flex-col justify-between rounded-2xl border border-border bg-white p-7 shadow-sm transition-all hover:shadow-lg hover:border-brand-violet-light"
                >
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-lg bg-brand-violet/10 text-sm font-bold text-brand-violet">
                        {province.abbreviation}
                      </span>
                      <h3 className="font-heading text-xl font-bold text-brand-indigo">
                        {province.name}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-brand-slate-600">
                      {province.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {province.cities.map((city) => (
                        <span
                          key={city}
                          className="rounded-full bg-brand-slate-100 px-3 py-1 text-xs font-medium text-brand-slate-600"
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand-violet transition-colors group-hover:text-brand-violet-dark">
                    Explore {province.name}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-brand-indigo py-24 md:py-32">
        <div className="absolute inset-0 bg-mesh-gradient opacity-40" />
        <div className="absolute inset-0 bg-dot-grid opacity-20" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="font-display text-4xl italic tracking-tight text-white md:text-5xl">
              Ready to go Canadian-first?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-brand-slate-300">
              See how Revun handles province-specific compliance, Interac
              payments, and Canadian credit bureau integrations.
            </p>
            <div className="mt-10">
              <Link
                href="/contact/"
                className="cta-primary-shadow inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-violet px-8 text-base font-semibold text-white transition-all hover:bg-brand-violet-dark"
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
