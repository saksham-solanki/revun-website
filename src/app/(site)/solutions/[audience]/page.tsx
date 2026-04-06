import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Home,
  Building2,
  Briefcase,
  FileKey2,
  Wrench,
  Landmark,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { buildCanonicalUrl } from '@/lib/utils'
import { SolutionDetailClient } from './client'

/* ── Icon map (server-safe reference) ────────────────────────────────────── */

const iconMap = {
  Home, Building2, Briefcase, FileKey2, Wrench, Landmark, CheckCircle2, ArrowRight,
} as const

/* ── Types ────────────────────────────────────────────────────────────────── */

interface Feature {
  title: string
  description: string
  iconName: keyof typeof iconMap
}

interface Step {
  number: string
  title: string
  description: string
}

interface SolutionContent {
  title: string
  subtitle: string
  heroEyebrow: string
  problemHeading: string
  problemBody: string
  problemBullets: string[]
  features: Feature[]
  steps: Step[]
  startingPrice: string
  priceUnit: string
  pricingNote: string
  ctaHeading: string
  ctaBody: string
  metaTitle: string
  metaDescription: string
}

/* ── Data ─────────────────────────────────────────────────────────────────── */

const solutionData: Record<string, SolutionContent> = {
  'self-managing-owners': {
    title: 'Manage your rental like a pro, without hiring one',
    subtitle:
      'List properties, screen tenants, collect rent, and handle maintenance. Everything you need from a single dashboard, starting at $1/day per unit.',
    heroEyebrow: 'For Self-Managing Owners',
    problemHeading: 'The problem with spreadsheets and inbox chaos',
    problemBody:
      'Most self-managing owners juggle Kijiji listings, email chains, PDF leases, e-transfers, and a sticky-note maintenance log. Every missed message costs time and money.',
    problemBullets: [
      'No single view of tenant status, lease expiry, or outstanding rent',
      'Manual showing coordination eats weekends',
      'Compliance documents buried across email threads',
      'No audit trail when disputes arise',
    ],
    features: [
      { title: 'Listing Syndication', description: 'Push listings to Kijiji, Rentals.ca, and your branded site with one click. Auto-refresh to stay on top.', iconName: 'Home' },
      { title: 'Showing Scheduler', description: 'Self-serve booking links with automatic reminders. Tenants pick a slot, you approve or skip.', iconName: 'CheckCircle2' },
      { title: 'Tenant Screening', description: 'Credit, identity, and reference checks built in. Score-based recommendation so you pick confidently.', iconName: 'CheckCircle2' },
      { title: 'Rent Collection', description: 'Pre-authorized debit, credit card, or e-transfer. Automated receipts, late notices, and ledger tracking.', iconName: 'CheckCircle2' },
      { title: 'Maintenance Requests', description: 'Tenants submit via app or portal. Track status, upload photos, assign vendors, close the loop.', iconName: 'Wrench' },
      { title: 'Lease & Document Vault', description: 'Digital lease signing, automatic storage, and instant retrieval. Always compliant, always accessible.', iconName: 'FileKey2' },
    ],
    steps: [
      { number: '01', title: 'Add your property', description: 'Enter address, unit details, and upload photos. Takes under 5 minutes.' },
      { number: '02', title: 'List and find tenants', description: 'Syndicate listings, schedule showings, and screen applicants from one workflow.' },
      { number: '03', title: 'Sign and onboard', description: 'Send a digital lease, collect first month and deposit, and grant portal access.' },
      { number: '04', title: 'Collect and maintain', description: 'Automate rent collection, handle maintenance requests, and generate year-end reports.' },
    ],
    startingPrice: '$1/day',
    priceUnit: 'per unit',
    pricingNote: 'No credit card required to start. Cancel anytime.',
    ctaHeading: 'Ready to simplify your rental?',
    ctaBody: 'Join thousands of self-managing owners who replaced 5+ tools with Revun.',
    metaTitle: 'Self-Managing Owners',
    metaDescription:
      'List, screen, collect rent, and manage maintenance from one dashboard. Starting at $1/day per unit. No credit card required.',
  },
  'property-management-companies': {
    title: 'One system of record for your entire portfolio',
    subtitle:
      'Owner portals, tenant workflows, vendor management, automated compliance, financials, and team coordination. Replace 5+ disconnected tools.',
    heroEyebrow: 'For Property Management Companies',
    problemHeading: 'The problem with stitching together 5 different tools',
    problemBody:
      'Most PMCs run on a patchwork of legacy software, spreadsheets, and email. Data lives in silos. Reporting takes days. Scaling means more headcount, not more efficiency.',
    problemBullets: [
      'Owner reporting is manual and error-prone',
      'Tenant communication scattered across email, text, and phone',
      'Vendor invoicing disconnected from work orders',
      'Compliance deadlines tracked on sticky notes',
    ],
    features: [
      { title: 'Owner Portal', description: 'Real-time financials, document access, and communication history. Owners self-serve instead of calling your office.', iconName: 'Building2' },
      { title: 'Tenant Lifecycle', description: 'Applications, screening, leasing, renewals, and move-outs in one continuous workflow.', iconName: 'CheckCircle2' },
      { title: 'Vendor Management', description: 'Preferred vendor lists, work order routing, invoice matching, and performance tracking.', iconName: 'Wrench' },
      { title: 'Automated Compliance', description: 'Province and state-specific notice templates, automatic deadlines, and audit-ready logs.', iconName: 'FileKey2' },
      { title: 'Financial Operations', description: 'Trust accounting, owner disbursements, expense tracking, and 1099/T4A generation.', iconName: 'Landmark' },
      { title: 'Team Coordination', description: 'Role-based access, task assignment, internal notes, and activity feeds per property.', iconName: 'CheckCircle2' },
    ],
    steps: [
      { number: '01', title: 'Import your portfolio', description: 'Bulk import properties, owners, and tenants. Migration support included.' },
      { number: '02', title: 'Configure workflows', description: 'Set up approval chains, notice templates, and accounting rules for your operation.' },
      { number: '03', title: 'Onboard your team', description: 'Invite staff, assign roles, and run a guided 60-day launch program.' },
      { number: '04', title: 'Scale with confidence', description: 'Add properties without adding headcount. Every process stays consistent.' },
    ],
    startingPrice: '$2/day',
    priceUnit: 'per unit',
    pricingNote: 'Volume discounts for 100+ units. Custom plans available.',
    ctaHeading: 'Replace your tool stack with one platform',
    ctaBody: 'Book a portfolio review and see how Revun maps to your operation.',
    metaTitle: 'Property Management Companies',
    metaDescription:
      'Owner portals, tenant workflows, vendor management, automated compliance, and financials. One platform to replace your entire PMC tool stack.',
  },
  brokerages: {
    title: 'Close deals faster with zero paperwork bottlenecks',
    subtitle:
      'CRM, document automation, offer management, showing coordination, client communication, and compliance. 60-day guided launch included.',
    heroEyebrow: 'For Brokerages & Agents',
    problemHeading: 'The problem with manual brokerage workflows',
    problemBody:
      'Agents lose deals because they are buried in admin. Offer packages take hours to assemble. Showing schedules conflict. Compliance is an afterthought until audit season.',
    problemBullets: [
      'CRM data never syncs with transaction workflows',
      'Offer management relies on email attachments and phone calls',
      'Showing coordination is a scheduling nightmare',
      'Compliance documentation assembled at the last minute',
    ],
    features: [
      { title: 'Agent CRM', description: 'Contact management, pipeline stages, activity logging, and automated follow-ups built for real estate transactions.', iconName: 'Briefcase' },
      { title: 'Document Automation', description: 'Template-based offer packages, auto-populated fields, e-signatures, and version tracking.', iconName: 'FileKey2' },
      { title: 'Offer Management', description: 'Submit, track, and compare offers in real time. Automatic notifications to all parties.', iconName: 'CheckCircle2' },
      { title: 'Showing Coordination', description: 'Centralized calendar, lockbox integration, feedback collection, and route optimization.', iconName: 'Home' },
      { title: 'Client Communication', description: 'Branded email and SMS templates, drip campaigns, and a shared activity timeline per client.', iconName: 'CheckCircle2' },
      { title: 'Compliance Workflows', description: 'FINTRAC, RECO, and provincial form libraries. Auto-reminders for missing documents.', iconName: 'Landmark' },
    ],
    steps: [
      { number: '01', title: 'Connect your brokerage', description: 'Import agent roster, branding, and existing contacts in one session.' },
      { number: '02', title: 'Customize templates', description: 'Set up offer packages, email sequences, and compliance checklists for your market.' },
      { number: '03', title: 'Launch with agents', description: '60-day guided rollout with training, support, and adoption tracking.' },
      { number: '04', title: 'Win more deals', description: 'Faster offers, fewer errors, happier clients. Measure the difference in your first quarter.' },
    ],
    startingPrice: '$49/mo',
    priceUnit: 'per agent',
    pricingNote: 'Brokerage-wide plans with volume discounts available.',
    ctaHeading: 'Give your agents an unfair advantage',
    ctaBody: 'See how top brokerages cut admin time by 60% with Revun.',
    metaTitle: 'Brokerages & Agents',
    metaDescription:
      'CRM, document automation, offer management, and compliance workflows purpose-built for real estate brokerages. 60-day guided launch included.',
  },
  'leasing-companies': {
    title: 'Automate the leasing lifecycle end to end',
    subtitle:
      'Applications, offers, lease generation, identity verification, compliance notices, and tenant onboarding. All automated, all auditable.',
    heroEyebrow: 'For Leasing Companies',
    problemHeading: 'The problem with manual leasing operations',
    problemBody:
      'Leasing teams drown in repetitive data entry. Applications arrive by email. Lease clauses are copied and pasted. Compliance notices go out late or not at all.',
    problemBullets: [
      'Application intake scattered across PDFs, web forms, and walk-ins',
      'Lease generation requires manual clause selection',
      'Identity verification is a separate, disconnected process',
      'No centralized audit trail for regulatory reviews',
    ],
    features: [
      { title: 'Online Applications', description: 'Branded application portal with conditional logic, document uploads, and automatic screening triggers.', iconName: 'CheckCircle2' },
      { title: 'Offer Workflows', description: 'Generate, send, and track lease offers with approval chains and automatic counter-offer handling.', iconName: 'FileKey2' },
      { title: 'Lease Generation', description: 'Template engine with clause libraries, auto-populated fields, and province-specific defaults.', iconName: 'CheckCircle2' },
      { title: 'Identity Verification', description: 'Integrated ID checks, credit pulls, and reference verification. Results flow into the applicant profile.', iconName: 'CheckCircle2' },
      { title: 'Compliance Notices', description: 'Automatic N-series and state-specific notices triggered by lease events. PDF generation and delivery tracking.', iconName: 'Landmark' },
      { title: 'Tenant Onboarding', description: 'Welcome packages, portal activation, move-in inspection checklists, and utility setup reminders.', iconName: 'Home' },
    ],
    steps: [
      { number: '01', title: 'Configure your templates', description: 'Set up lease templates, clause libraries, and application forms for your portfolio.' },
      { number: '02', title: 'Connect listings', description: 'Sync vacant units and automatically generate application links.' },
      { number: '03', title: 'Process applications', description: 'Screen, verify, approve, and generate leases in a single workflow.' },
      { number: '04', title: 'Onboard tenants', description: 'Welcome packages, portal access, and move-in inspections, all triggered automatically.' },
    ],
    startingPrice: '$1.50/day',
    priceUnit: 'per unit',
    pricingNote: 'Includes unlimited applications and lease generations.',
    ctaHeading: 'Stop leasing manually',
    ctaBody: 'See how leasing companies cut time-to-lease by 40% with Revun.',
    metaTitle: 'Leasing Companies',
    metaDescription:
      'Online applications, lease generation, identity verification, and compliance notices. Automate your entire leasing lifecycle with Revun.',
  },
  'maintenance-companies': {
    title: 'Dispatch, track, invoice. All from one platform.',
    subtitle:
      'Work order intake, technician dispatch, scheduling, proof of work, invoicing, and customer communication. Built for property maintenance at scale.',
    heroEyebrow: 'For Maintenance Companies',
    problemHeading: 'The problem with phone calls and paper work orders',
    problemBody:
      'Maintenance companies run on phone calls, text messages, and handwritten invoices. Scheduling conflicts waste hours. Proof of work is a photo in someone\'s camera roll.',
    problemBullets: [
      'Work orders arrive by phone, email, and text with no centralized intake',
      'Technician scheduling relies on memory and group chats',
      'Proof of completion lives on personal devices',
      'Invoicing is manual and delayed, hurting cash flow',
    ],
    features: [
      { title: 'Work Order Intake', description: 'Centralized portal for property managers to submit and categorize work orders. Auto-routing by trade and priority.', iconName: 'CheckCircle2' },
      { title: 'Technician Dispatch', description: 'Drag-and-drop scheduling, availability management, GPS tracking, and automatic notifications.', iconName: 'Wrench' },
      { title: 'Mobile App', description: 'Technicians view assignments, update status, upload photos, and capture signatures from the field.', iconName: 'CheckCircle2' },
      { title: 'Proof of Work', description: 'Before/after photos, time logs, materials used, and tenant sign-off captured at the job site.', iconName: 'CheckCircle2' },
      { title: 'Invoicing', description: 'Auto-generate invoices from completed work orders. Track payment status and send automated reminders.', iconName: 'Landmark' },
      { title: 'Customer Portal', description: 'Property managers see real-time job status, history, and spend analytics across their portfolio.', iconName: 'Building2' },
    ],
    steps: [
      { number: '01', title: 'Set up your team', description: 'Add technicians, define trades, set service areas, and configure availability.' },
      { number: '02', title: 'Connect clients', description: 'Invite property managers to submit work orders through your branded portal.' },
      { number: '03', title: 'Dispatch and track', description: 'Assign jobs, monitor progress in real time, and collect proof of completion.' },
      { number: '04', title: 'Invoice and grow', description: 'Auto-generate invoices, track payments, and use analytics to optimize operations.' },
    ],
    startingPrice: '$99/mo',
    priceUnit: 'per team',
    pricingNote: 'Unlimited work orders. Add technicians for $19/mo each.',
    ctaHeading: 'Modernize your maintenance operation',
    ctaBody: 'See how maintenance companies cut dispatch time by 70% with Revun.',
    metaTitle: 'Maintenance Companies',
    metaDescription:
      'Work order intake, technician dispatch, scheduling, proof of work, and invoicing. One platform for property maintenance companies.',
  },
  reits: {
    title: 'Institutional-grade operations, unified across every asset',
    subtitle:
      'Standardize operations across properties and regions. Role-based access, advanced reporting, API integrations, and custom governance frameworks.',
    heroEyebrow: 'For REITs & Asset Managers',
    problemHeading: 'The problem with fragmented property operations at scale',
    problemBody:
      'Large portfolios inherit different systems from every acquisition. Reporting is a quarterly fire drill. Compliance risk scales with unit count. Board visibility is always lagging.',
    problemBullets: [
      'Each property runs on a different system with different data formats',
      'Consolidated reporting requires weeks of manual reconciliation',
      'Compliance gaps appear after audits, not before',
      'No real-time portfolio-level dashboard for leadership',
    ],
    features: [
      { title: 'Portfolio Dashboard', description: 'Real-time KPIs across every property: occupancy, collections, maintenance spend, and NOI. Filter by region, asset class, or manager.', iconName: 'Landmark' },
      { title: 'Standardized Operations', description: 'Enforce consistent workflows, approval chains, and document templates across all properties regardless of acquisition history.', iconName: 'Building2' },
      { title: 'Role-Based Access', description: 'Granular permissions by property, region, function, and seniority. Audit-logged access for every action.', iconName: 'FileKey2' },
      { title: 'Advanced Reporting', description: 'Custom report builder, scheduled distribution, and export to your BI stack. Board-ready decks generated on demand.', iconName: 'CheckCircle2' },
      { title: 'API Integrations', description: 'REST APIs, webhooks, and pre-built connectors for Yardi, MRI, Sage, QuickBooks, and major banking platforms.', iconName: 'CheckCircle2' },
      { title: 'Custom Governance', description: 'Configurable approval workflows, spending limits, exception escalation, and policy enforcement per entity.', iconName: 'CheckCircle2' },
    ],
    steps: [
      { number: '01', title: 'Portfolio assessment', description: 'We map your current systems, data flows, and operational gaps across every property.' },
      { number: '02', title: 'Configuration and migration', description: 'Standardize workflows, migrate data, and integrate with your existing financial systems.' },
      { number: '03', title: 'Phased rollout', description: 'Deploy region-by-region with dedicated onboarding support for each property team.' },
      { number: '04', title: 'Optimize and scale', description: 'Continuous improvement with quarterly business reviews and a dedicated account team.' },
    ],
    startingPrice: 'Custom',
    priceUnit: 'portfolio pricing',
    pricingNote: 'Dedicated account team. Enterprise SLA. SOC 2 compliant.',
    ctaHeading: 'Unify your portfolio on one platform',
    ctaBody: 'Schedule a portfolio assessment with our enterprise team.',
    metaTitle: 'REITs & Asset Managers',
    metaDescription:
      'Standardize operations across properties and regions. Portfolio dashboards, role-based access, advanced reporting, and API integrations for institutional real estate.',
  },
}

const allSlugs = Object.keys(solutionData)

/* ── Static params ────────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return allSlugs.map((audience) => ({ audience }))
}

/* ── Metadata ─────────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ audience: string }>
}): Promise<Metadata> {
  const { audience } = await params
  const data = solutionData[audience]
  if (!data) return {}
  return {
    title: `${data.metaTitle} | Solutions`,
    description: data.metaDescription,
    alternates: { canonical: buildCanonicalUrl(`/solutions/${audience}`) },
    openGraph: {
      title: `${data.metaTitle} | Revun Solutions`,
      description: data.metaDescription,
      url: buildCanonicalUrl(`/solutions/${audience}`),
    },
  }
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ audience: string }>
}) {
  const { audience } = await params
  const data = solutionData[audience]
  if (!data) notFound()

  return <SolutionDetailClient data={data} slug={audience} />
}
