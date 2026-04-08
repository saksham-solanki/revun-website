import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowRight, Check, Plug, Zap } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/*                             Data                                    */
/* ------------------------------------------------------------------ */

type SetupDifficulty = 'Easy' | 'Medium' | 'Advanced'

interface IntegrationDetail {
  name: string
  slug: string
  category: string
  description: string
  features: string[]
  setup: SetupDifficulty
  status: 'Available' | 'Coming Soon' | 'Beta'
}

const integrationData: Record<string, IntegrationDetail> = {
  quickbooks: {
    name: 'QuickBooks',
    slug: 'quickbooks',
    category: 'Accounting',
    description:
      'Automatically sync rent payments, invoices, expenses, and vendor bills between Revun and QuickBooks Online. Eliminate double-entry and keep your books current in real time.',
    features: [
      'Automatic two-way sync of invoices and payments',
      'Map Revun properties to QuickBooks classes and locations',
      'Real-time expense categorization and GL mapping',
      'Owner statement data pushed directly to QuickBooks',
    ],
    setup: 'Easy',
    status: 'Available',
  },
  xero: {
    name: 'Xero',
    slug: 'xero',
    category: 'Accounting',
    description:
      'Connect Revun to Xero for automated financial reconciliation. Rent receipts, maintenance expenses, and owner distributions flow into Xero without manual intervention.',
    features: [
      'Bi-directional sync of contacts, invoices, and payments',
      'Automatic bank reconciliation matching',
      'Multi-currency support for cross-border portfolios',
      'Tracking categories mapped to properties and units',
    ],
    setup: 'Easy',
    status: 'Available',
  },
  salesforce: {
    name: 'Salesforce',
    slug: 'salesforce',
    category: 'CRM',
    description:
      'Push lead data, deal pipeline updates, and owner communications from Revun into Salesforce. Keep your sales and property management teams on the same page.',
    features: [
      'Automatic lead creation from Revun inquiries',
      'Custom field mapping for property and unit data',
      'Bi-directional contact and deal sync',
      'Activity timeline sync for full audit trail',
    ],
    setup: 'Medium',
    status: 'Available',
  },
  hubspot: {
    name: 'HubSpot',
    slug: 'hubspot',
    category: 'CRM',
    description:
      'Sync your property management contacts, deals, and communications with HubSpot. Automate marketing workflows triggered by Revun events.',
    features: [
      'Contact and company sync with custom property mapping',
      'Deal pipeline mirroring for brokerage operations',
      'Workflow triggers based on lease events',
      'Email engagement tracking across platforms',
    ],
    setup: 'Easy',
    status: 'Available',
  },
  twilio: {
    name: 'Twilio',
    slug: 'twilio',
    category: 'Communications',
    description:
      'Power tenant and owner communications with Twilio. Send automated SMS reminders, voice calls for maintenance updates, and WhatsApp messages, all from within Revun.',
    features: [
      'Automated SMS rent reminders and lease notifications',
      'Programmable voice for maintenance callback routing',
      'WhatsApp Business messaging for tenant comms',
      'Delivery tracking and message analytics',
    ],
    setup: 'Medium',
    status: 'Available',
  },
  stripe: {
    name: 'Stripe',
    slug: 'stripe',
    category: 'Payments',
    description:
      'Accept rent payments via credit card, debit card, ACH bank transfer, and more. Stripe powers Revun payment processing with automatic reconciliation and payout management.',
    features: [
      'Accept cards, ACH, and bank debits for rent',
      'Automatic payment reconciliation in Revun ledger',
      'Configurable payout schedules per property owner',
      'PCI-compliant payment infrastructure',
    ],
    setup: 'Easy',
    status: 'Available',
  },
  plaid: {
    name: 'Plaid',
    slug: 'plaid',
    category: 'Payments',
    description:
      'Link tenant bank accounts for instant verification and automated rent payments. Use Plaid for income verification during the screening process.',
    features: [
      'Instant bank account verification for ACH',
      'Income and employment verification for screening',
      'Real-time balance checks before payment initiation',
      'Multi-bank support for tenants and owners',
    ],
    setup: 'Easy',
    status: 'Available',
  },
  interac: {
    name: 'Interac',
    slug: 'interac',
    category: 'Payments',
    description:
      "Collect rent and security deposits through Interac e-Transfer, Canada's most trusted digital payment method. Automatic matching and reconciliation built in.",
    features: [
      'Interac e-Transfer for rent collection',
      'Auto-deposit configuration for property accounts',
      'Real-time payment notifications and matching',
      'Support for Interac Online and e-Transfer bulk',
    ],
    setup: 'Easy',
    status: 'Available',
  },
  'google-workspace': {
    name: 'Google Workspace',
    slug: 'google-workspace',
    category: 'Productivity',
    description:
      'Keep your team in sync with Google Workspace. Calendar events for showings, Drive storage for documents, and Gmail integration for tenant communications.',
    features: [
      'Google Calendar sync for showings and inspections',
      'Google Drive document storage and sharing',
      'Gmail integration for centralized communications',
      'Google Contacts sync for tenant and owner data',
    ],
    setup: 'Easy',
    status: 'Available',
  },
  slack: {
    name: 'Slack',
    slug: 'slack',
    category: 'Productivity',
    description:
      'Get real-time notifications in Slack when maintenance requests arrive, leases are signed, or payments clear. Keep your team informed without switching apps.',
    features: [
      'Configurable notifications per channel or property',
      'Maintenance request alerts with quick-action buttons',
      'Payment and lease event notifications',
      'Slash commands for quick Revun lookups',
    ],
    setup: 'Easy',
    status: 'Available',
  },
  docusign: {
    name: 'DocuSign',
    slug: 'docusign',
    category: 'Communications',
    description:
      'Electronic lease signing and document management with DocuSign. Send, sign, and store leases, amendments, and compliance documents.',
    features: [
      'E-signature for leases and amendments',
      'Template library with auto-populated fields',
      'Audit trail and completion tracking',
      'Mobile signing for tenants and owners',
    ],
    setup: 'Easy',
    status: 'Available',
  },
  equifax: {
    name: 'Equifax',
    slug: 'equifax',
    category: 'Identity',
    description:
      'Canadian credit bureau integration for comprehensive tenant screening. Pull credit reports and background checks directly within Revun.',
    features: [
      'Canadian credit report pulls',
      'Background check integration',
      'Risk score assessment',
      'Automated screening workflows',
    ],
    setup: 'Medium',
    status: 'Coming Soon',
  },
}

const setupColors: Record<SetupDifficulty, string> = {
  Easy: 'bg-[#E8F2FE] text-[#176FEB]',
  Medium: 'bg-[#F5F6F8] text-[#555860]',
  Advanced: 'bg-[#F5F6F8] text-[#2C2E33]',
}

const statusColors: Record<string, string> = {
  Available: 'bg-[#E8F2FE] text-[#176FEB]',
  'Coming Soon': 'bg-[#F5F6F8] text-[#555860]',
  Beta: 'bg-[#E8F2FE] text-[#0B5AD4]',
}

/* ------------------------------------------------------------------ */
/*                        Static Params                                */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return Object.keys(integrationData).map((slug) => ({ slug }))
}

/* ------------------------------------------------------------------ */
/*                          Metadata                                   */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const data = integrationData[slug]
  if (!data) return {}
  return {
    title: `Revun + ${data.name} Integration`,
    description: `Connect Revun with ${data.name}. ${data.description.slice(0, 120)}...`,
    alternates: {
      canonical: buildCanonicalUrl(`/integrations/${slug}`),
    },
  }
}

/* ------------------------------------------------------------------ */
/*                            Page                                     */
/* ------------------------------------------------------------------ */

export default async function IntegrationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const data = integrationData[slug]
  if (!data) notFound()

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: buildCanonicalUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Integrations',
        item: buildCanonicalUrl('/integrations'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Revun + ${data.name}`,
        item: buildCanonicalUrl(`/integrations/${slug}`),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(breadcrumbJsonLd as unknown as Record<string, unknown>),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A1628]">
        <div className="absolute inset-0 bg-dot-grid opacity-20" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Connection visual */}
            <div className="flex items-center gap-4">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                <span className="font-heading text-2xl font-bold text-white">R</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Zap className="size-5 text-[#176FEB]" />
                <div className="h-px w-8 bg-[#176FEB]" />
              </div>
              <div className="flex size-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                <span className="font-heading text-2xl font-bold text-white">
                  {data.name.charAt(0)}
                </span>
              </div>
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Integration
            </p>
            <h1 className="mt-3 font-heading font-extrabold text-4xl text-white sm:text-5xl">
              Revun + {data.name}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
              {data.category} integration
            </p>

            <div className="mt-6 flex gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[data.status]}`}
              >
                {data.status}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${setupColors[data.setup]}`}
              >
                {data.setup} Setup
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* What This Integration Does */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#2C2E33]">
                What this integration does
              </h2>
              <p className="mt-4 leading-relaxed text-[#555860]">
                {data.description}
              </p>
            </div>

            {/* Key Features */}
            <div className="rounded-2xl border border-[#D3D5DB] bg-[#F5F6F8] p-8">
              <h3 className="font-heading text-lg font-bold text-[#2C2E33]">
                Key features
              </h3>
              <ul className="mt-5 space-y-4">
                {data.features.map((feature, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[#E8F2FE]">
                      <Check className="size-3 text-[#176FEB]" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-[#555860]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Setup Info */}
      <section className="bg-[#F5F6F8] py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="rounded-2xl border border-[#D3D5DB] bg-white p-8 md:p-12">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-heading text-xl font-bold text-[#2C2E33]">
                  How to connect
                </h2>
                <p className="mt-2 text-sm text-[#555860]">
                  Set up the Revun + {data.name} integration in minutes. No
                  engineering required.
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${setupColors[data.setup]}`}
              >
                {data.setup} Difficulty
              </span>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  step: '1',
                  title: 'Connect your account',
                  desc: `Authorize Revun to access your ${data.name} account via OAuth.`,
                },
                {
                  step: '2',
                  title: 'Configure mapping',
                  desc: 'Map properties, units, and contacts to the right fields.',
                },
                {
                  step: '3',
                  title: 'Go live',
                  desc: 'Enable the sync and start seeing data flow automatically.',
                },
              ].map((s) => (
                <div key={s.step} className="rounded-xl bg-[#F5F6F8] p-5">
                  <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[#176FEB] text-sm font-bold text-white">
                    {s.step}
                  </span>
                  <h4 className="mt-3 font-heading text-sm font-bold text-[#2C2E33]">
                    {s.title}
                  </h4>
                  <p className="mt-1 text-xs text-[#555860]">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0A1628] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <div className="mx-auto flex w-fit items-center gap-3 rounded-full bg-white/10 px-5 py-2 backdrop-blur-sm">
            <Plug className="size-4 text-[#176FEB]" />
            <span className="text-sm font-medium text-white">
              Ready to connect
            </span>
          </div>
          <h2 className="mt-6 font-heading text-2xl font-bold text-white sm:text-3xl">
            Get started with Revun + {data.name}
          </h2>
          <p className="mt-4 text-slate-300">
            Start your free trial and connect {data.name} in minutes.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact/"
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#176FEB] px-8 text-sm font-semibold text-white hover:bg-[#005CE8]"
            >
              Try Revun Free
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact/"
              className="inline-flex h-12 items-center rounded-lg border border-white/20 px-8 text-sm font-semibold text-white hover:bg-white/10"
            >
              Book a Demo
            </Link>
          </div>
          <Link
            href="/integrations/"
            className="mt-6 inline-block text-sm font-medium text-[#176FEB] hover:underline"
          >
            View all integrations
          </Link>
        </div>
      </section>
    </>
  )
}
