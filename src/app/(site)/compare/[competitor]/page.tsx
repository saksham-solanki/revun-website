import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { buildCanonicalUrl } from '@/lib/utils'
import { CompareDetailClient } from './client'

/* ── Types ────────────────────────────────────────────────────────────────── */

export interface CompareFeature {
  name: string
  revun: string
  competitor: string
}

export interface CompetitorData {
  slug: string
  name: string
  category: string
  description: string
  pricingSummary: string
  revunPricingSummary: string
  features: CompareFeature[]
  whyRevun: { title: string; body: string }[]
}

/* ── Data ─────────────────────────────────────────────────────────────────── */

const competitors: CompetitorData[] = [
  {
    slug: 'appfolio',
    name: 'AppFolio',
    category: 'PM Software',
    description:
      'Cloud-based property management software for residential and commercial managers.',
    pricingSummary: 'From $1.40/unit/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Basic portal' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Built-in' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Basic work orders' },
      { name: 'Self-Manage Option', revun: 'From $1/day per unit', competitor: 'Not available' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-focused' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Email + portal messaging' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'ACH, credit card' },
    ],
    whyRevun: [
      {
        title: 'Built for North America, not just the US',
        body: 'Revun includes province-specific compliance workflows, Interac payments, and Canadian-first features that AppFolio does not support.',
      },
      {
        title: 'Self-manage option included',
        body: 'Unlike AppFolio, Revun offers a lightweight plan for self-managing owners starting at $1/day per unit, so your clients can self-serve.',
      },
      {
        title: 'All-in-one communications',
        body: 'Email, SMS, VoIP calling, and in-app messaging are built in. No need for a separate phone system or messaging tool.',
      },
    ],
  },
  {
    slug: 'buildium',
    name: 'Buildium',
    category: 'PM Software',
    description:
      'Property management platform for residential managers and community associations.',
    pricingSummary: 'From $55/month (up to 20 units)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Owner Portals', revun: 'Full portal with real-time financials', competitor: 'Basic owner portal' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'TransUnion integration' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Work order system' },
      { name: 'Self-Manage Option', revun: 'From $1/day per unit', competitor: 'Not available' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'Limited Canadian support' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Email + portal' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'ACH, credit card' },
    ],
    whyRevun: [
      {
        title: 'No flat-fee pricing traps',
        body: 'Buildium charges flat monthly fees that get expensive fast. Revun scales with your portfolio at $1/day per unit.',
      },
      {
        title: 'Brokerage and leasing built in',
        body: 'Revun includes CRM, deal management, and leasing workflows. Buildium focuses only on property management.',
      },
      {
        title: 'True Canadian compliance',
        body: 'Province-specific notice templates, N-series forms, and local payment methods like Interac are native to Revun.',
      },
    ],
  },
  {
    slug: 'doorloop',
    name: 'DoorLoop',
    category: 'PM Software',
    description:
      'Modern property management software with an emphasis on ease of use and quick setup.',
    pricingSummary: 'From $59/month (up to 20 units)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Owner portal included' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'TransUnion integration' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Basic maintenance module' },
      { name: 'Self-Manage Option', revun: 'From $1/day per unit', competitor: 'Starter plan available' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-focused' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Email + portal messaging' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'ACH, credit card' },
    ],
    whyRevun: [
      {
        title: 'Deeper workflow automation',
        body: 'While DoorLoop prioritizes simplicity, Revun offers deeper automation for compliance, vendor dispatch, and multi-entity operations.',
      },
      {
        title: 'Canadian-first design',
        body: 'Revun is built for the Canadian market with Interac, provincial compliance, and local integrations. DoorLoop is US-first.',
      },
      {
        title: 'Brokerage and maintenance in one',
        body: 'Revun combines PM, brokerage CRM, and maintenance dispatch. No need for separate tools for each function.',
      },
    ],
  },
  {
    slug: 'guesty',
    name: 'Guesty',
    category: 'PM Software',
    description:
      'Property management platform for short-term and vacation rental operators.',
    pricingSummary: 'Custom pricing (3-5% of revenue)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Owner statements' },
      { name: 'Channel Management', revun: 'Long-term focused listings', competitor: 'Airbnb, VRBO, Booking.com' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Task automation' },
      { name: 'Self-Manage Option', revun: 'From $1/day per unit', competitor: 'Guesty for Hosts (lite)' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'Global, not Canada-specific' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Unified inbox' },
      { name: 'Long-Term Leasing', revun: 'Full lease lifecycle', competitor: 'Short-term focused' },
    ],
    whyRevun: [
      {
        title: 'Built for long-term rentals',
        body: 'Guesty is designed for short-term and vacation rentals. Revun is purpose-built for long-term residential and commercial property management.',
      },
      {
        title: 'Predictable, transparent pricing',
        body: 'Guesty takes a percentage of revenue. Revun charges a flat per-unit rate so your costs stay predictable as revenue grows.',
      },
      {
        title: 'Full compliance and leasing',
        body: 'Provincial lease templates, N-series notices, and full tenant lifecycle management are core to Revun, not an afterthought.',
      },
    ],
  },
  {
    slug: 'yardi',
    name: 'Yardi',
    category: 'PM Software',
    description:
      'Enterprise property management and accounting platform for large portfolios and REITs.',
    pricingSummary: 'Custom enterprise pricing',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'RentCafe portal' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'ScreeningWorks Pro' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Yardi Maintenance IQ' },
      { name: 'Self-Manage Option', revun: 'From $1/day per unit', competitor: 'Not available' },
      { name: 'Setup Time', revun: 'Days, not months', competitor: '3-12 month implementation' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Commercial focus only' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'RentCafe messaging' },
      { name: 'Modern UX', revun: 'Clean, intuitive interface', competitor: 'Legacy interface' },
    ],
    whyRevun: [
      {
        title: 'Get started in days, not months',
        body: 'Yardi implementations take 3-12 months and require consultants. Revun launches in days with guided onboarding.',
      },
      {
        title: 'Modern interface, modern pricing',
        body: 'Revun offers a clean, intuitive interface with transparent per-unit pricing. No legacy UI or opaque enterprise contracts.',
      },
      {
        title: 'Same power, less overhead',
        body: 'Revun delivers enterprise features without requiring a dedicated IT team to manage and maintain the system.',
      },
    ],
  },
  {
    slug: 'singlekey',
    name: 'SingleKey',
    category: 'Canadian Platforms',
    description:
      'Canadian tenant screening and rent guarantee platform for landlords and property managers.',
    pricingSummary: 'Pay-per-screening + rent guarantee fees',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Core product' },
      { name: 'Rent Guarantee', revun: 'Coming soon', competitor: 'Up to $60K coverage' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Not included' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Not included' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Rent collection only' },
    ],
    whyRevun: [
      {
        title: 'Complete platform vs. single feature',
        body: 'SingleKey focuses on screening and rent guarantees. Revun is a complete property management platform that includes screening as one of many features.',
      },
      {
        title: 'One subscription, everything included',
        body: 'Instead of paying per-screening fees, Revun includes screening as part of your platform subscription alongside all PM tools.',
      },
      {
        title: 'Operational infrastructure',
        body: 'Revun handles leasing, maintenance, accounting, communications, and compliance. SingleKey covers one slice of the workflow.',
      },
    ],
  },
]

const competitorMap = Object.fromEntries(competitors.map((c) => [`revun-vs-${c.slug}`, c]))
const allSlugs = Object.keys(competitorMap)

/* ── Static params ────────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return allSlugs.map((competitor) => ({ competitor }))
}

/* ── Metadata ─────────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitor: string }>
}): Promise<Metadata> {
  const { competitor } = await params
  const data = competitorMap[competitor]
  if (!data) return {}
  return {
    title: `Revun vs ${data.name} | Compare`,
    description: `See how Revun compares to ${data.name} across features, pricing, and support. ${data.description}`,
    alternates: { canonical: buildCanonicalUrl(`/compare/${competitor}`) },
    openGraph: {
      title: `Revun vs ${data.name} | Comparison`,
      description: `Detailed comparison of Revun and ${data.name} for property management.`,
      url: buildCanonicalUrl(`/compare/${competitor}`),
    },
  }
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default async function CompareDetailPage({
  params,
}: {
  params: Promise<{ competitor: string }>
}) {
  const { competitor } = await params
  const data = competitorMap[competitor]
  if (!data) notFound()

  return <CompareDetailClient data={data} />
}
