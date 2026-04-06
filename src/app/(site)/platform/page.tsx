import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Users,
  FileText,
  Wrench,
  CreditCard,
  Shield,
  MessageSquare,
  ArrowRight,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { PlatformHero } from '@/components/blocks/platform-hero'
import { buildCanonicalUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Platform',
  description:
    'Revun brings owner workflows, tenant management, vendor coordination, compliance, payments, and communications into one platform. The operating system for property management.',
  alternates: { canonical: buildCanonicalUrl('/platform') },
  openGraph: {
    title: 'Platform | Revun',
    description:
      'The operating system for property management. See how every module connects.',
    url: buildCanonicalUrl('/platform'),
  },
}

/* ── Data ──────────────────────────────────────────────────────────────────── */

const modules = [
  {
    title: 'Owner & Tenant Management',
    description:
      'Onboarding, portals, communication, and document management for every stakeholder in one place.',
    icon: Users,
    accent: 'from-violet-500/20 to-indigo-500/20',
    border: 'group-hover:border-violet-400/40',
    span: 'md:col-span-2',
  },
  {
    title: 'Leasing & Applications',
    description:
      'Listings, showings, screening, offers, and lease execution. From vacancy to signed lease, automated.',
    icon: FileText,
    accent: 'from-amber-500/20 to-orange-500/20',
    border: 'group-hover:border-amber-400/40',
    span: 'md:col-span-1',
  },
  {
    title: 'Maintenance & Vendors',
    description:
      'Work orders, dispatch, proof of work, and vendor payments. Full lifecycle visibility.',
    icon: Wrench,
    accent: 'from-emerald-500/20 to-teal-500/20',
    border: 'group-hover:border-emerald-400/40',
    span: 'md:col-span-1',
  },
  {
    title: 'Payments & Financial',
    description:
      'Rent collection, owner payouts, reconciliation, and reporting. Real-time financial clarity.',
    icon: CreditCard,
    accent: 'from-blue-500/20 to-cyan-500/20',
    border: 'group-hover:border-blue-400/40',
    span: 'md:col-span-2',
  },
  {
    title: 'Compliance & Legal',
    description:
      'Province and state workflows, automated notices, and audit trails. Stay compliant without the overhead.',
    icon: Shield,
    accent: 'from-rose-500/20 to-pink-500/20',
    border: 'group-hover:border-rose-400/40',
    span: 'md:col-span-1',
  },
  {
    title: 'Communications',
    description:
      'Email, SMS, calling, and in-app messaging. All conversations in context, all in one thread.',
    icon: MessageSquare,
    accent: 'from-purple-500/20 to-fuchsia-500/20',
    border: 'group-hover:border-purple-400/40',
    span: 'md:col-span-2',
  },
] as const

const integrations = [
  'QuickBooks',
  'Xero',
  'Stripe',
  'Plaid',
  'Twilio',
  'SendGrid',
  'DocuSign',
  'Certn',
  'Google Workspace',
  'Microsoft 365',
  'Zapier',
  'Slack',
]

/* ── Page ──────────────────────────────────────────────────────────────────── */

export default function PlatformPage() {
  return (
    <>
      {/* ── Hero ── */}
      <PlatformHero />

      {/* ── Core Modules (Bento Grid) ── */}
      <section className="relative bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mb-16 text-center">
            <p className="revealItem mb-3 text-sm font-semibold uppercase tracking-widest text-brand-violet">
              Core Modules
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-indigo md:text-4xl">
              Everything your operation needs, nothing it doesn't
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="grid gap-5 md:grid-cols-3">
              {modules.map((m) => {
                const Icon = m.icon
                return (
                  <div
                    key={m.title}
                    className={`group relative overflow-hidden rounded-2xl border border-brand-slate-200 bg-brand-slate-50 p-8 transition-all duration-300 hover:shadow-lg ${m.border} ${m.span}`}
                  >
                    {/* Gradient glow */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${m.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                      aria-hidden
                    />
                    <div className="relative z-10">
                      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-brand-slate-200">
                        <Icon className="h-6 w-6 text-brand-violet" />
                      </div>
                      <h3 className="mb-2 font-heading text-lg font-bold text-brand-indigo">
                        {m.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-brand-slate-600">
                        {m.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── How It Connects ── */}
      <section className="relative overflow-hidden bg-brand-indigo py-24 md:py-32">
        <div className="absolute inset-0 bg-dot-grid opacity-20" aria-hidden />
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-amber">
              Architecture
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
              How it all connects
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-brand-slate-300">
              Every module feeds into a shared data layer. Actions in one area
              automatically update the rest. No CSV exports. No double entry.
            </p>
          </RevealOnScroll>

          {/* Connection diagram */}
          <RevealOnScroll>
            <div className="relative mx-auto max-w-3xl">
              {/* Center hub */}
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-brand-violet to-brand-violet-dark shadow-lg shadow-brand-violet/30 ring-4 ring-brand-violet-light/20">
                <span className="font-heading text-sm font-bold text-white">
                  Revun
                  <br />
                  Core
                </span>
              </div>

              {/* Spokes */}
              <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
                {modules.map((m) => {
                  const Icon = m.icon
                  return (
                    <div
                      key={m.title}
                      className="glass-dark flex items-center gap-3 rounded-xl px-4 py-3"
                    >
                      <Icon className="h-5 w-5 shrink-0 text-brand-violet-light" />
                      <span className="text-sm font-medium text-white/90">
                        {m.title.split(' & ')[0]}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Connecting lines (decorative) */}
              <div
                className="pointer-events-none absolute inset-0 hidden md:block"
                aria-hidden
              >
                <svg
                  className="h-full w-full"
                  viewBox="0 0 600 100"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <line
                    x1="300"
                    y1="0"
                    x2="300"
                    y2="100"
                    stroke="rgba(167,139,250,0.2)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                </svg>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Integrations ── */}
      <section className="relative bg-brand-slate-50 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-violet">
              Ecosystem
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-indigo md:text-4xl">
              Connects to 40+ tools
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-brand-slate-600">
              Revun integrates with the accounting, payment, screening, and
              communication tools you already use.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.06}>
            <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {integrations.map((name) => (
                <div
                  key={name}
                  className="flex h-16 items-center justify-center rounded-xl border border-brand-slate-200 bg-white text-sm font-medium text-brand-slate-700 transition-shadow hover:shadow-md"
                >
                  {name}
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/integrations/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-violet transition-colors hover:text-brand-violet-dark"
              >
                View all integrations
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-brand-indigo py-24 md:py-32">
        <div className="absolute inset-0 bg-mesh-gradient opacity-40" aria-hidden />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="font-display italic text-4xl tracking-tight text-white md:text-5xl">
              See Revun in action
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-brand-slate-300">
              Whether you manage 10 units or 10,000, Revun scales with your
              operation. Get a walkthrough from our team.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/demo/"
                className="cta-primary-shadow inline-flex h-12 items-center justify-center rounded-xl bg-brand-violet px-8 text-base font-semibold text-white transition-all hover:bg-brand-violet-dark"
              >
                Book a Demo
              </Link>
              <Link
                href="/signup/"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 px-8 text-base font-semibold text-white transition-all hover:bg-white/10"
              >
                Start Free
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
