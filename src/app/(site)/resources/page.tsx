import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, FileText, BarChart3 } from 'lucide-react'
import { buildCanonicalUrl } from '@/lib/utils'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const metadata: Metadata = {
  title: 'Resources | Revun',
  description:
    'Guides, case studies, and insights for property managers and owners.',
  alternates: { canonical: buildCanonicalUrl('/resources') },
  openGraph: {
    title: 'Resources | Revun',
    description:
      'Guides, case studies, and insights for property managers and owners.',
    url: buildCanonicalUrl('/resources'),
  },
}

const upcomingCategories = [
  {
    icon: BookOpen,
    title: 'Guides',
    description:
      'Step-by-step playbooks for property management operations, from onboarding tenants to scaling your portfolio.',
  },
  {
    icon: FileText,
    title: 'Case Studies',
    description:
      'Real stories from property managers and owners who transformed their operations with Revun.',
  },
  {
    icon: BarChart3,
    title: 'Industry Insights',
    description:
      'Market data, trend analysis, and research to help you make better property management decisions.',
  },
] as const

export default function ResourcesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-brand-indigo">
        <div className="absolute inset-0 bg-dot-grid opacity-30" />
        <div className="absolute inset-0 bg-mesh-gradient opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center sm:py-32 lg:px-8">
          <h1 className="font-display text-4xl italic text-white sm:text-5xl lg:text-6xl">
            Resources
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-200">
            Guides, case studies, and insights for property managers and owners.
          </p>
        </div>
      </section>

      {/* ── Coming Soon ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <RevealOnScroll>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-violet">
              Coming Soon
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-indigo md:text-4xl">
              We are building something worth reading
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-brand-slate-500">
              Our content library is in development. Sign up to be notified when
              we publish our first guides, case studies, and market reports.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Category Preview Cards ── */}
      <section className="bg-brand-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-3">
              {upcomingCategories.map((cat) => (
                <div
                  key={cat.title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-brand-violet/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative z-10">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-brand-violet/10">
                      <cat.icon className="size-6 text-brand-violet" />
                    </div>
                    <h3 className="mb-3 font-heading text-lg font-bold text-brand-indigo">
                      {cat.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-brand-slate-600">
                      {cat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="relative overflow-hidden bg-brand-indigo py-24 md:py-32">
        <div className="absolute inset-0 bg-mesh-gradient opacity-40" />
        <div className="absolute inset-0 bg-dot-grid opacity-20" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="font-display text-4xl italic tracking-tight text-white md:text-5xl">
              Stay in the loop
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-brand-slate-300">
              Get notified when we publish new guides, case studies, and market
              insights. No spam, just useful content for property operators.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact/"
                className="cta-primary-shadow inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-violet px-8 text-base font-semibold text-white transition-all hover:bg-brand-violet-dark"
              >
                Subscribe to Updates
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 px-8 text-base font-semibold text-white transition-all hover:bg-white/10"
              >
                Back to Home
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
