import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Building2,
  User,
  ArrowRight,
  FileText,
  CreditCard,
  Wrench,
  Shield,
  BarChart3,
  MessageSquare,
  ClipboardCheck,
  Settings,
  Rocket,
  UserPlus,
  Home,
  Layers,
  Puzzle,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildHowToSchema, buildWebPageSchema } from '@/lib/schema-builders'

export const metadata: Metadata = {
  title: 'How Revun Works | Product Overview',
  description:
    'See how Revun works for B2B operators and self-managing owners. From onboarding to daily operations: leasing, maintenance, payments, compliance, analytics, and integrations.',
  alternates: { canonical: buildCanonicalUrl('/how-revun-works') },
  openGraph: {
    title: 'How Revun Works | Product Overview',
    description:
      'Two paths to Revun: operators deploy it as their stack, owners use it directly. See the full workflow.',
    url: buildCanonicalUrl('/how-revun-works'),
  },
}

/* ── Data ──────────────────────────────────────────────────────────────── */

const operatorSteps = [
  {
    step: '01',
    title: 'Apply',
    description: 'Submit your operator application. Tell us about your business, portfolio size, and current tech stack. We will review within 48 hours.',
    icon: ClipboardCheck,
  },
  {
    step: '02',
    title: 'Onboard',
    description: 'Our team helps migrate your data, configure your workflows, and set up your branded portal. Typical onboarding takes 1-2 weeks.',
    icon: Settings,
  },
  {
    step: '03',
    title: 'Configure',
    description: 'Customize your portal branding, payment workflows, maintenance routing, lease templates, and reporting dashboards to match your operations.',
    icon: Layers,
  },
  {
    step: '04',
    title: 'Launch',
    description: 'Go live with your Powered by Revun operation. Invite your team, tenants, owners, and vendors. Start managing from day one.',
    icon: Rocket,
  },
]

const ownerSteps = [
  {
    step: '01',
    title: 'Sign Up',
    description: 'Create your free account in under 2 minutes. No credit card required. Choose the Self-Manage path during onboarding.',
    icon: UserPlus,
  },
  {
    step: '02',
    title: 'Add Property',
    description: 'Enter your property details, configure units, set rental rates, and upload photos. Import existing tenant data if you have it.',
    icon: Home,
  },
  {
    step: '03',
    title: 'Manage Everything',
    description: 'List vacancies, screen tenants, generate leases, collect rent, handle maintenance, and track finances. All from one dashboard.',
    icon: BarChart3,
  },
]

const modules = [
  {
    title: 'Leasing',
    description: 'Listings, showings, screening, applications, offers, and lease execution. From vacancy to signed lease.',
    icon: FileText,
  },
  {
    title: 'Maintenance',
    description: 'Work orders, vendor dispatch, progress tracking, proof of work, and invoice processing.',
    icon: Wrench,
  },
  {
    title: 'Communications',
    description: 'Email, SMS, in-app messaging, and calling. Every conversation in context with the right property and tenant.',
    icon: MessageSquare,
  },
  {
    title: 'Payments',
    description: 'ACH, credit card, Interac, and PAD. Automated reminders, split payments, late fees, and real-time reconciliation.',
    icon: CreditCard,
  },
  {
    title: 'Compliance',
    description: 'Province-specific lease templates, notice generators, regulatory tracking, and tribunal-ready documentation.',
    icon: Shield,
  },
  {
    title: 'Analytics',
    description: 'Owner statements, P&L, cash flow, occupancy rates, maintenance spend, and portfolio performance dashboards.',
    icon: BarChart3,
  },
]

const integrations = [
  'QuickBooks', 'Xero', 'Stripe', 'Plaid', 'Twilio', 'SendGrid',
  'DocuSign', 'Certn', 'Equifax', 'TransUnion', 'Zapier', 'Google Workspace',
]

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function HowRevunWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'How Revun Works', url: 'https://revun.com/how-revun-works/' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildHowToSchema({
              name: 'How to Deploy Revun as an Operator',
              description: 'Steps for property management companies to deploy Revun as their technology stack.',
              steps: operatorSteps.map((s) => ({ name: s.title, text: s.description })),
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildHowToSchema({
              name: 'How to Self-Manage Properties with Revun',
              description: 'Steps for property owners to start self-managing with Revun.',
              steps: ownerSteps.map((s) => ({ name: s.title, text: s.description })),
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildWebPageSchema({
              name: 'How Revun Works',
              description: 'Product overview and workflow for Revun property management platform.',
              url: 'https://revun.com/how-revun-works/',
            })
          ),
        }}
      />

      {/* ── Hero ── */}
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
          <RevealOnScroll>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#176FEB]">
              Product Overview
            </p>
            <h1 className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight text-[#0A1628] sm:text-5xl lg:text-6xl">
              How <span className="text-[#176FEB]">Revun</span> works
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]">
              Two paths to one platform. Operators deploy Revun as their technology stack. Self-managing owners use it directly. Here is how each path works.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── B2B: Operator Path ── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#176FEB]/10">
              <Building2 className="h-7 w-7 text-[#176FEB]" strokeWidth={1.8} />
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              For Operators (B2B)
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              Deploy Revun as your{' '}
              <span className="text-[#176FEB]">technology stack</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#555860]">
              Property management companies, brokerages, and maintenance companies go through a guided onboarding process to launch on Revun.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {operatorSteps.map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.step}
                    className="rounded-2xl border border-[#D3D5DB] bg-white p-8"
                  >
                    <span className="mb-4 block font-mono text-sm font-semibold text-[#176FEB]">
                      Step {s.step}
                    </span>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-6 w-6 text-[#176FEB]" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-[#2C2E33]">
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#555860]">
                      {s.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── B2C: Self-Manage Path ── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F2FE]">
              <User className="h-7 w-7 text-[#176FEB]" strokeWidth={1.8} />
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              For Self-Managing Owners (B2C)
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              Start self-managing in{' '}
              <span className="text-[#176FEB]">three steps</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#555860]">
              Individual property owners sign up directly and start managing their properties immediately. No sales call required.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-8 md:grid-cols-3">
              {ownerSteps.map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.step}
                    className="rounded-2xl border border-[#D3D5DB] bg-white p-8"
                  >
                    <span className="mb-4 block font-mono text-sm font-semibold text-[#176FEB]">
                      Step {s.step}
                    </span>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-6 w-6 text-[#176FEB]" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-[#2C2E33]">
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#555860]">
                      {s.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Platform Modules ── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Platform Modules
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              What you can <span className="text-[#176FEB]">do</span> with Revun
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#555860]">
              Six core modules that cover every aspect of property management. All connected, all in one platform.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {modules.map((m) => {
                const Icon = m.icon
                return (
                  <div
                    key={m.title}
                    className="rounded-2xl border border-[#D3D5DB] bg-white p-8 transition hover:border-[#176FEB]/40"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-6 w-6 text-[#176FEB]" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-[#2C2E33]">
                      {m.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#555860]">
                      {m.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Integration Capabilities ── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Integrations
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              Connects to <span className="text-[#176FEB]">40+</span> tools
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#555860]">
              Revun integrates with the accounting, payment, screening, and communication tools you already use.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.06}>
            <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {integrations.map((name) => (
                <div
                  key={name}
                  className="flex h-16 items-center justify-center rounded-xl border border-[#D3D5DB] bg-white text-sm font-medium text-[#555860] transition hover:border-[#176FEB]/40"
                >
                  {name}
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/integrations/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#176FEB] transition-colors hover:text-[#1259c1]"
              >
                View all integrations
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA Cluster ── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="font-heading font-extrabold text-4xl tracking-tight text-[#0A1628] md:text-5xl">
              Ready to see Revun{' '}
              <span className="text-[#176FEB]">in action?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-[#555860]">
              Whether you are an operator deploying your stack or an owner managing your own properties, we are ready when you are.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/demo/"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors hover:bg-[#1259c1]"
              >
                Book a Demo
              </Link>
              <Link
                href="/signup/"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors hover:bg-white"
              >
                Start Free
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* AEO quick answer */}
      <p className="sr-only">
        Revun works two ways. For B2B operators like property management companies and brokerages, the process is: apply, onboard, configure, and launch. For B2C self-managing owners, the process is: sign up, add your property, and start managing. The platform includes six core modules: leasing, maintenance, communications, payments, compliance, and analytics. Revun integrates with 40+ tools including QuickBooks, Xero, Stripe, DocuSign, and more.
      </p>
    </>
  )
}
