'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Plug, Search } from 'lucide-react'
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
  featured?: boolean
}

const integrations: Integration[] = [
  // Accounting
  {
    name: 'QuickBooks',
    slug: 'quickbooks',
    category: 'Accounting',
    status: 'Available',
    description: 'Sync invoices, payments, and expenses with QuickBooks Online.',
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
  },
]

const statusColors: Record<Status, string> = {
  Available: 'bg-[#E8F2FE] text-[#176FEB]',
  'Coming Soon': 'bg-[#F5F6F8] text-[#555860]',
  Beta: 'bg-[#E8F2FE] text-[#0B5AD4]',
}

const featuredSlugs = ['stripe', 'quickbooks', 'twilio', 'salesforce', 'zapier', 'docusign']

function IntegrationCard({ integration }: { integration: Integration }) {
  return (
    <Link
      href={`/integrations/${integration.slug}/`}
      className="group flex flex-col justify-between rounded-2xl border border-[#D3D5DB] bg-white p-6 transition-colors duration-150 hover:border-[#176FEB]"
    >
      <div>
        <div className="flex items-start justify-between">
          <div className="inline-flex size-10 items-center justify-center rounded-xl bg-[#E8F2FE]">
            <Plug className="size-5 text-[#176FEB]" />
          </div>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[integration.status]}`}
          >
            {integration.status}
          </span>
        </div>
        <h3 className="mt-4 font-heading text-lg font-bold text-[#2C2E33]">
          {integration.name}
        </h3>
        <span className="mt-1 inline-block text-xs text-[#555860]">
          {integration.category}
        </span>
        <p className="mt-2 text-sm text-[#555860]">
          {integration.description}
        </p>
      </div>
      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#176FEB] transition-colors">
        Learn more
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}

export default function IntegrationsPage() {
  const [search, setSearch] = useState('')
  const [active, setActive] = useState<FilterCategory>('All')

  const filtered = integrations.filter((i) => {
    const matchesCategory = active === 'All' || i.category === active
    const matchesSearch =
      !search ||
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featured = integrations.filter((i) => featuredSlugs.includes(i.slug))

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A1628]">
        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center sm:py-32 lg:px-8">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70">
            <Plug className="size-4" />
            22+ integrations
          </div>
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Connect Revun with Your Favorite{' '}
            <span className="text-[#176FEB]">Tools</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            Revun connects to the tools your business already runs on, from accounting and payments to communications and identity verification.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="border-b border-[#D3D5DB] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="relative mx-auto max-w-xl">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#555860]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search integrations..."
              className="w-full rounded-xl border border-[#D3D5DB] bg-[#F5F6F8] py-3 pl-12 pr-4 text-sm text-[#2C2E33] placeholder:text-[#555860] focus:border-[#176FEB] focus:outline-none focus:ring-1 focus:ring-[#176FEB]"
            />
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="border-b border-[#D3D5DB] bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="no-scrollbar flex gap-2 overflow-x-auto py-4">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === cat
                    ? 'bg-[#176FEB] text-white'
                    : 'bg-[#F5F6F8] text-[#555860] hover:bg-[#E8F2FE]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Integrations */}
      {active === 'All' && !search && (
        <section className="bg-[#F5F6F8] py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-[#2C2E33] sm:text-3xl">
              Featured <span className="text-[#176FEB]">Integrations</span>
            </h2>
            <p className="mt-2 text-[#555860]">
              Our most popular connections, ready to go out of the box.
            </p>
            <RevealOnScroll stagger={0.05}>
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((integration) => (
                  <motion.div key={integration.slug} variants={revealItem}>
                    <IntegrationCard integration={integration} />
                  </motion.div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* Full Directory Grid */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-[#2C2E33] sm:text-3xl">
            All <span className="text-[#176FEB]">Integrations</span>
          </h2>
          <p className="mt-2 text-[#555860]">
            {filtered.length} integration{filtered.length !== 1 ? 's' : ''} found
            {active !== 'All' ? ` in ${active}` : ''}
            {search ? ` matching "${search}"` : ''}
          </p>
          <RevealOnScroll stagger={0.05}>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((integration) => (
                <motion.div key={integration.slug} variants={revealItem}>
                  <IntegrationCard integration={integration} />
                </motion.div>
              ))}
            </div>
          </RevealOnScroll>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg font-medium text-[#2C2E33]">No integrations found</p>
              <p className="mt-2 text-sm text-[#555860]">
                Try adjusting your search or category filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl border-t border-[#D3D5DB] px-6 pt-20 text-center lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-[#2C2E33] sm:text-3xl">
            Need a Custom <span className="text-[#176FEB]">Integration</span>?
          </h2>
          <p className="mt-4 text-[#555860]">
            Our API and Zapier connector let you build integrations with any tool
            in your stack.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact/"
              className="inline-flex h-11 items-center rounded-lg bg-[#176FEB] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#1260d1]"
            >
              Talk to Our Team
            </Link>
            <Link
              href="/contact/"
              className="inline-flex h-11 items-center rounded-lg border border-[#D3D5DB] px-6 text-sm font-semibold text-[#2C2E33] transition-colors hover:bg-[#F5F6F8]"
            >
              View API Docs
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
