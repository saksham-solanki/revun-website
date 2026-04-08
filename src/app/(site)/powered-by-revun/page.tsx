import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Building2,
  Users,
  Wrench,
  ArrowRight,
  Shield,
  Layers,
  Home,
  UserCheck,
  Truck,
  HelpCircle,
  Handshake,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildWebPageSchema, buildOrganizationSchema } from '@/lib/schema-builders'

export const metadata: Metadata = {
  title: 'Powered by Revun | Operator Ecosystem',
  description:
    'Learn what "Powered by Revun" means. How property management companies, brokerages, and maintenance companies use Revun as their operating system, and what it means for tenants, owners, and vendors.',
  alternates: { canonical: buildCanonicalUrl('/powered-by-revun') },
  openGraph: {
    title: 'Powered by Revun | Operator Ecosystem',
    description:
      'Property management companies, brokerages, and maintenance companies use Revun as their technology stack. Learn what this means for everyone involved.',
    url: buildCanonicalUrl('/powered-by-revun'),
  },
}

/* ── Data ──────────────────────────────────────────────────────────────── */

const operatorTypes = [
  {
    title: 'Property Management Companies',
    description:
      'Full-service PMCs use Revun to manage leasing, payments, maintenance, owner reporting, and tenant communications across their entire portfolio.',
    icon: Building2,
    href: '/solutions/property-managers/',
  },
  {
    title: 'Real Estate Brokerages',
    description:
      'Brokerages offering property management services use Revun alongside their sales operations, connecting listings to management workflows.',
    icon: Users,
    href: '/solutions/brokerages/',
  },
  {
    title: 'Maintenance Companies',
    description:
      'Service providers use Revun to receive work orders, dispatch technicians, track completion, and invoice property managers.',
    icon: Wrench,
    href: '/solutions/maintenance-companies/',
  },
  {
    title: 'Leasing Companies',
    description:
      'Dedicated leasing firms use Revun for listing syndication, showing scheduling, application processing, and lease execution.',
    icon: Handshake,
    href: '/solutions/',
  },
]

const endUserPerspectives = [
  {
    title: 'For Tenants',
    description:
      'You interact with your property manager\'s brand. Revun powers the portal where you pay rent, submit maintenance requests, and communicate with management. Your service relationship is with your property manager.',
    icon: Home,
  },
  {
    title: 'For Property Owners',
    description:
      'Your property manager uses Revun to send you financial reports, occupancy updates, and maintenance summaries. You see your manager\'s brand, backed by Revun\'s infrastructure.',
    icon: UserCheck,
  },
  {
    title: 'For Vendors',
    description:
      'You receive work orders, update job status, and submit invoices through the platform. Your relationship is with the property manager who dispatched you, not with Revun directly.',
    icon: Truck,
  },
]

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function PoweredByRevunPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Powered by Revun', url: 'https://revun.com/powered-by-revun/' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildOrganizationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildWebPageSchema({
              name: 'Powered by Revun',
              description: 'How property management operators use Revun as their technology stack.',
              url: 'https://revun.com/powered-by-revun/',
            })
          ),
        }}
      />

      {/* ── Hero ── */}
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
          <RevealOnScroll>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#176FEB]">
              Operator Ecosystem
            </p>
            <h1 className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight text-[#0A1628] sm:text-5xl lg:text-6xl">
              Powered by{' '}
              <span className="text-[#176FEB]">Revun</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]">
              Property management companies, brokerages, and maintenance companies across Canada use Revun as their operating system. Here is what that means for operators, tenants, owners, and vendors.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── What It Means ── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              The Concept
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              What &ldquo;Powered by Revun&rdquo;{' '}
              <span className="text-[#176FEB]">means</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#555860]">
              When a company is &ldquo;Powered by Revun,&rdquo; it means they have chosen Revun as their property management technology stack. They use our platform to run their operations, while maintaining their own brand, pricing, and client relationships.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1} className="mt-16">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: 'Their Brand, Our Tech',
                  description: 'Operators present their own brand to clients. Revun runs invisibly in the background as the infrastructure layer.',
                  icon: Layers,
                },
                {
                  title: 'Full Operations Suite',
                  description: 'Operators get leasing, payments, maintenance, screening, reporting, and communications in one connected platform.',
                  icon: Shield,
                },
                {
                  title: 'Independent Relationships',
                  description: 'Your service relationship is with the operator. Revun provides the technology, the operator provides the service.',
                  icon: Handshake,
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[#D3D5DB] bg-white p-8 transition hover:border-[#176FEB]/40"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-6 w-6 text-[#176FEB]" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-[#2C2E33]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#555860]">
                      {item.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── How Operators Use Revun ── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Operator Types
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              Who uses{' '}
              <span className="text-[#176FEB]">Powered by Revun?</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-2">
              {operatorTypes.map((op) => {
                const Icon = op.icon
                return (
                  <Link
                    key={op.title}
                    href={op.href}
                    className="group flex flex-col rounded-2xl border border-[#D3D5DB] bg-white p-8 transition-colors hover:border-[#176FEB]/40"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-6 w-6 text-[#176FEB]" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-[#2C2E33]">
                      {op.title}
                    </h3>
                    <p className="flex-1 text-sm leading-relaxed text-[#555860]">
                      {op.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#176FEB] transition-colors group-hover:underline">
                      Learn more
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── What This Means for End Users ── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              For End Users
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              What it means for{' '}
              <span className="text-[#176FEB]">you</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-3">
              {endUserPerspectives.map((p) => {
                const Icon = p.icon
                return (
                  <div
                    key={p.title}
                    className="rounded-2xl border border-[#D3D5DB] bg-white p-8"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-6 w-6 text-[#176FEB]" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-[#2C2E33]">
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#555860]">
                      {p.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Support Routing ── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll className="text-center">
            <div className="mx-auto max-w-xl">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F2FE]">
                <HelpCircle className="h-7 w-7 text-[#176FEB]" />
              </div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
                Need <span className="text-[#176FEB]">support?</span>
              </h2>
              <p className="mt-4 text-[#555860]">
                If you interact with a Powered by Revun company, your service relationship is with that company, not directly with Revun. For lease, maintenance, payment, or property questions, contact your operator.
              </p>
              <div className="mt-8">
                <Link
                  href="/support/powered-by-revun/"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#176FEB] transition-colors hover:text-[#1259c1]"
                >
                  Find your operator&apos;s support
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA: For Operators ── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="font-heading font-extrabold text-4xl tracking-tight text-[#0A1628] md:text-5xl">
              Become a <span className="text-[#176FEB]">Powered by Revun</span> operator
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-[#555860]">
              Deploy Revun as your property management technology stack. Replace disconnected tools with one platform. Keep your brand, streamline your operations.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/demo/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors hover:bg-[#1259c1]"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/how-revun-works/"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors hover:bg-white"
              >
                See How It Works
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* AEO quick answer */}
      <p className="sr-only">
        Powered by Revun means a property management company, brokerage, or maintenance company uses Revun as their technology platform. The operator maintains their own brand and client relationships while Revun provides the software infrastructure for leasing, payments, maintenance, screening, and reporting. If you are a tenant, owner, or vendor interacting with a Powered by Revun company, your service relationship is with that company, not with Revun directly.
      </p>
    </>
  )
}
