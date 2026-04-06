'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Plug } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

const filterCategories = [
  'All',
  'Accounting',
  'CRM',
  'Communications',
  'Identity',
  'Payments',
  'Productivity',
] as const

type FilterCategory = (typeof filterCategories)[number]

type Status = 'Available' | 'Coming Soon' | 'Beta'

interface Integration {
  name: string
  slug: string
  category: Exclude<FilterCategory, 'All'>
  status: Status
  description: string
}

const integrations: Integration[] = [
  // Accounting
  {
    name: 'QuickBooks',
    slug: 'quickbooks',
    category: 'Accounting',
    status: 'Available',
    description: 'Sync invoices, payments, and expenses with QuickBooks Online.',
  },
  {
    name: 'Xero',
    slug: 'xero',
    category: 'Accounting',
    status: 'Available',
    description: 'Two-way sync with Xero for real-time financial reporting.',
  },
  {
    name: 'Sage Intacct',
    slug: 'sage-intacct',
    category: 'Accounting',
    status: 'Coming Soon',
    description: 'Enterprise-grade accounting for multi-entity portfolios.',
  },
  {
    name: 'NetSuite',
    slug: 'netsuite',
    category: 'Accounting',
    status: 'Coming Soon',
    description: 'Full ERP integration for large-scale property operations.',
  },
  // CRM
  {
    name: 'Salesforce',
    slug: 'salesforce',
    category: 'CRM',
    status: 'Available',
    description: 'Push lead and deal data directly into Salesforce CRM.',
  },
  {
    name: 'HubSpot',
    slug: 'hubspot',
    category: 'CRM',
    status: 'Available',
    description: 'Sync contacts, deals, and owner communications with HubSpot.',
  },
  {
    name: 'Pipedrive',
    slug: 'pipedrive',
    category: 'CRM',
    status: 'Beta',
    description: 'Track brokerage deals and pipeline stages in Pipedrive.',
  },
  // Communications
  {
    name: 'Twilio',
    slug: 'twilio',
    category: 'Communications',
    status: 'Available',
    description: 'SMS, voice, and WhatsApp messaging for tenant communication.',
  },
  {
    name: 'RingCentral',
    slug: 'ringcentral',
    category: 'Communications',
    status: 'Available',
    description: 'Unified phone, video, and messaging for your team.',
  },
  {
    name: 'Dialpad',
    slug: 'dialpad',
    category: 'Communications',
    status: 'Coming Soon',
    description: 'AI-powered calls and transcription for property managers.',
  },
  {
    name: 'OpenPhone',
    slug: 'openphone',
    category: 'Communications',
    status: 'Available',
    description: 'Shared phone numbers and SMS for leasing and maintenance.',
  },
  // Identity
  {
    name: 'Persona',
    slug: 'persona',
    category: 'Identity',
    status: 'Available',
    description: 'KYC identity verification for tenant applications.',
  },
  {
    name: 'TransUnion',
    slug: 'transunion',
    category: 'Identity',
    status: 'Available',
    description: 'Credit and background checks powered by TransUnion.',
  },
  {
    name: 'Equifax',
    slug: 'equifax',
    category: 'Identity',
    status: 'Coming Soon',
    description: 'Canadian credit bureau integration for tenant screening.',
  },
  // Payments
  {
    name: 'Stripe',
    slug: 'stripe',
    category: 'Payments',
    status: 'Available',
    description: 'Accept rent payments via card, ACH, and bank debit.',
  },
  {
    name: 'Plaid',
    slug: 'plaid',
    category: 'Payments',
    status: 'Available',
    description: 'Bank account linking and income verification.',
  },
  {
    name: 'Interac',
    slug: 'interac',
    category: 'Payments',
    status: 'Available',
    description: 'Canadian e-Transfer for rent collection and deposits.',
  },
  {
    name: 'DocuSign',
    slug: 'docusign',
    category: 'Payments',
    status: 'Available',
    description: 'Electronic lease signing and document management.',
  },
  // Productivity
  {
    name: 'Google Workspace',
    slug: 'google-workspace',
    category: 'Productivity',
    status: 'Available',
    description: 'Calendar sync, Drive storage, and Gmail integration.',
  },
  {
    name: 'Microsoft 365',
    slug: 'microsoft-365',
    category: 'Productivity',
    status: 'Available',
    description: 'Outlook calendar, OneDrive, and Teams integration.',
  },
  {
    name: 'Slack',
    slug: 'slack',
    category: 'Productivity',
    status: 'Available',
    description: 'Get notifications and updates delivered to Slack channels.',
  },
  {
    name: 'Zapier',
    slug: 'zapier',
    category: 'Productivity',
    status: 'Available',
    description: 'Connect Revun to 5,000+ apps with custom automations.',
  },
]

const statusColors: Record<Status, string> = {
  Available: 'bg-emerald-100 text-emerald-700',
  'Coming Soon': 'bg-amber-100 text-amber-700',
  Beta: 'bg-blue-100 text-blue-700',
}

const categoryIcons: Record<Exclude<FilterCategory, 'All'>, string> = {
  Accounting: 'bg-indigo-100 text-indigo-600',
  CRM: 'bg-violet-100 text-violet-600',
  Communications: 'bg-sky-100 text-sky-600',
  Identity: 'bg-rose-100 text-rose-600',
  Payments: 'bg-emerald-100 text-emerald-600',
  Productivity: 'bg-amber-100 text-amber-600',
}

export default function IntegrationsPage() {
  const [active, setActive] = useState<FilterCategory>('All')

  const filtered =
    active === 'All'
      ? integrations
      : integrations.filter((i) => i.category === active)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-indigo">
        <div className="absolute inset-0 bg-dot-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center sm:py-32 lg:px-8">
          <h1 className="font-display text-4xl italic text-white sm:text-5xl lg:text-6xl">
            40+ integrations. One connected platform.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-200">
            Revun connects to the tools your business already runs on.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="no-scrollbar flex gap-1 overflow-x-auto py-4">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  active === cat
                    ? 'bg-brand-violet text-white shadow-md'
                    : 'bg-brand-slate-100 text-brand-slate-600 hover:bg-brand-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Grid */}
      <section className="bg-brand-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll stagger={0.05}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((integration) => (
                <motion.div key={integration.slug} variants={revealItem}>
                  <Link
                    href={`/integrations/${integration.slug}/`}
                    className="spotlight-card group flex flex-col justify-between rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-brand-violet-light"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div
                          className={`inline-flex size-10 items-center justify-center rounded-xl ${categoryIcons[integration.category]}`}
                        >
                          <Plug className="size-5" />
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[integration.status]}`}
                        >
                          {integration.status}
                        </span>
                      </div>
                      <h3 className="mt-4 font-heading text-lg font-bold text-brand-indigo">
                        {integration.name}
                      </h3>
                      <span className="mt-1 inline-block text-xs font-medium text-brand-slate-400">
                        {integration.category}
                      </span>
                      <p className="mt-2 text-sm text-brand-slate-500">
                        {integration.description}
                      </p>
                    </div>
                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-brand-violet transition-colors group-hover:text-brand-violet-dark">
                      Learn more
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-brand-indigo sm:text-3xl">
            Need a custom integration?
          </h2>
          <p className="mt-4 text-brand-slate-500">
            Our API and Zapier connector let you build integrations with any tool
            in your stack.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact/"
              className="inline-flex h-11 items-center rounded-lg bg-brand-violet px-6 text-sm font-semibold text-white cta-primary-shadow hover:bg-brand-violet-dark"
            >
              Talk to Our Team
            </Link>
            <Link
              href="/contact/"
              className="inline-flex h-11 items-center rounded-lg border border-border px-6 text-sm font-semibold text-brand-indigo hover:bg-brand-slate-50"
            >
              View API Docs
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
