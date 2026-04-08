import type { Metadata } from 'next'
import { BookOpen, FileText, BarChart3, Presentation, ArrowRight, Clock } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const metadata: Metadata = {
  title: 'Resources | Revun',
  description:
    'Guides, market reports, templates, and webinars for property managers and owners. Built to help you run a smarter operation.',
  alternates: { canonical: buildCanonicalUrl('/resources') },
  openGraph: {
    title: 'Resources | Revun',
    description:
      'Guides, market reports, templates, and webinars for property managers and owners.',
    url: buildCanonicalUrl('/resources'),
  },
}

const categories = [
  {
    icon: BookOpen,
    title: 'Guides',
    description:
      'Step-by-step playbooks for every stage of property management, from onboarding tenants to scaling a portfolio across multiple markets.',
  },
  {
    icon: BarChart3,
    title: 'Market Reports',
    description:
      'Data-backed analysis of Canadian rental markets, vacancy trends, and operator benchmarks to help you make informed decisions.',
  },
  {
    icon: FileText,
    title: 'Templates',
    description:
      'Ready-to-use lease clauses, inspection checklists, maintenance request forms, and communication scripts built for Canadian operators.',
  },
  {
    icon: Presentation,
    title: 'Webinars',
    description:
      'Live and on-demand sessions with property management experts, operators, and the Revun team on topics that move the needle.',
  },
] as const

const featuredResources = [
  {
    category: 'Guide',
    title: 'The Property Manager\'s Onboarding Playbook',
    description:
      'A complete checklist and workflow for moving new tenants in without friction, from lease signing to key handoff.',
  },
  {
    category: 'Market Report',
    title: 'Canadian Rental Market Benchmarks 2025',
    description:
      'Vacancy rates, average rents, and portfolio performance data across 12 major Canadian markets, with operator commentary.',
  },
  {
    category: 'Template',
    title: 'Maintenance Request & Work Order Pack',
    description:
      'Six pre-built forms covering routine maintenance, emergency requests, vendor dispatch, and sign-off confirmation.',
  },
  {
    category: 'Webinar',
    title: 'Scaling from 50 to 500 Units Without Hiring More Staff',
    description:
      'Three operators share how they used automation and process redesign to grow portfolios without proportional headcount growth.',
  },
] as const

export default function ResourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Resources', url: 'https://revun.com/resources/' },
            ])
          ),
        }}
      />
      {/* ── Hero ── */}
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center sm:py-16 lg:px-8">
          <RevealOnScroll>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              Resources
            </p>
            <h1 className="font-display font-extrabold text-4xl text-[#0A1628] sm:text-5xl lg:text-6xl">
              Guides, Reports, and Tools for{' '}
              <span className="text-brand-blue">Property Managers</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]">
              Practical content for Canadian operators. No fluff, no generic advice, only material built around the real decisions you make every week.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Category Grid ── */}
      <section className="bg-white py-12 md:py-12">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              What's Coming
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
              Four content types, one{' '}
              <span className="text-brand-blue">clear purpose</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#555860]">
              Everything in the Revun resource library is designed to save time or sharpen decisions. Nothing else makes it in.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((cat) => (
                <div
                  key={cat.title}
                  className="group relative rounded-2xl border border-[#E5E7EB] bg-white p-8 transition-colors duration-150 hover:border-brand-blue"
                >
                  <div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-brand-off-white transition-colors duration-150 group-hover:border-brand-blue/20 group-hover:bg-brand-blue/5">
                    <cat.icon className="size-5 text-brand-blue" />
                  </div>
                  <h3 className="mb-2 font-heading text-base font-bold text-brand-graphite">
                    {cat.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#555860]">
                    {cat.description}
                  </p>
                  <div className="mt-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] px-3 py-1 text-xs font-medium text-[#94A3B8]">
                      <Clock className="size-3" />
                      Coming soon
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Featured Resource Previews ── */}
      <section className="bg-brand-off-white py-12 md:py-12">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <RevealOnScroll className="mb-16">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              First Up
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
              What we're{' '}
              <span className="text-brand-blue">publishing first</span>
            </h2>
            <p className="mt-4 max-w-xl text-[#555860]">
              These are in production. Sign up below to be notified when they go live.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="grid gap-6 sm:grid-cols-2">
              {featuredResources.map((resource) => (
                <div
                  key={resource.title}
                  className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-colors duration-150 hover:border-brand-blue"
                >
                  {/* Coming soon overlay */}
                  <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/50 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                    <span className="rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
                      Coming soon
                    </span>
                  </div>

                  <div className="p-8">
                    <div className="mb-4">
                      <span className="inline-block rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue">
                        {resource.category}
                      </span>
                    </div>
                    <h3 className="mb-3 font-heading text-lg font-bold leading-snug text-brand-graphite">
                      {resource.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#555860]">
                      {resource.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="bg-[#F5F6F8] py-12 md:py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              Stay ahead
            </p>
            <h2 className="font-heading font-extrabold text-4xl tracking-tight text-[#0A1628] md:text-5xl">
              Get notified when we publish
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-[#555860]">
              Drop your email and we will send you each new guide, report, or template as it goes live. One email per publish, no noise.
            </p>

            <form
              action="#"
              className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-base text-[#0A1628] placeholder:text-[#94A3B8] focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              />
              <button
                type="submit"
                className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-blue px-6 text-base font-semibold text-white transition-colors duration-150 hover:bg-brand-blue-dark"
              >
                Subscribe
                <ArrowRight className="size-4" />
              </button>
            </form>

            <p className="mt-4 text-sm text-[#94A3B8]">
              No spam. Unsubscribe any time.
            </p>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
