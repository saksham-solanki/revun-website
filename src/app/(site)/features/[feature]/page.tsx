import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Users,
  CreditCard,
  Wrench,
  FileText,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

interface Capability {
  title: string
  description: string
}

interface Step {
  number: string
  title: string
  description: string
}

interface FeatureData {
  title: string
  metaTitle: string
  metaDescription: string
  iconName: string
  heroDescription: string
  capabilities: Capability[]
  steps: Step[]
}

const featureData: Record<string, FeatureData> = {
  'tenant-screening': {
    title: 'Tenant Screening',
    metaTitle: 'Tenant Screening Software for Canadian Landlords',
    metaDescription:
      'Screen tenants with Equifax and TransUnion credit checks, identity verification, and background reports. Built for Canadian landlords and property managers.',
    iconName: 'Users',
    heroDescription:
      'Run comprehensive credit checks, verify identities, and assess tenant risk in minutes. Powered by Equifax and TransUnion with Canadian-specific scoring models.',
    capabilities: [
      { title: 'Credit Reports', description: 'Full Equifax and TransUnion credit reports with Canadian scoring models and payment history.' },
      { title: 'Identity Verification', description: 'Government ID verification, employment confirmation, and reference checks in one workflow.' },
      { title: 'Risk Assessment', description: 'AI-powered risk scoring that considers Canadian rental market factors and provincial regulations.' },
      { title: 'Applicant Comparison', description: 'Side-by-side applicant comparison with weighted scoring across credit, income, and history.' },
    ],
    steps: [
      { number: '01', title: 'Send application link', description: 'Share a branded application link with prospective tenants. They consent and submit their information securely.' },
      { number: '02', title: 'Reports generated instantly', description: 'Credit, identity, and background reports are pulled automatically from Equifax and TransUnion.' },
      { number: '03', title: 'Review and decide', description: 'Compare applicants side by side, review risk scores, and make informed decisions from your dashboard.' },
    ],
  },
  'rent-collection': {
    title: 'Rent Collection',
    metaTitle: 'Automated Rent Collection Software for Canada',
    metaDescription:
      'Collect rent automatically via ACH, credit card, and Interac e-Transfer. Auto-reminders, split payments, and real-time reconciliation for Canadian landlords.',
    iconName: 'CreditCard',
    heroDescription:
      'Automated rent collection with ACH, credit card, and Interac e-Transfer support. Set up once and let Revun handle reminders, late fees, and reconciliation.',
    capabilities: [
      { title: 'Multiple Payment Methods', description: 'Accept ACH, credit card, debit, and Interac e-Transfer. Tenants choose their preferred method.' },
      { title: 'Auto-Reminders', description: 'Automated payment reminders before due dates and escalating notices for late payments.' },
      { title: 'Split Payments', description: 'Roommates and co-tenants can split rent automatically with individual payment tracking.' },
      { title: 'Real-Time Reconciliation', description: 'Payments reconcile instantly with your accounting. Export to QuickBooks or Xero with one click.' },
    ],
    steps: [
      { number: '01', title: 'Set up payment schedule', description: 'Configure rent amounts, due dates, and accepted payment methods for each unit.' },
      { number: '02', title: 'Tenants pay online', description: 'Tenants receive reminders and pay through their portal via their preferred payment method.' },
      { number: '03', title: 'Track and reconcile', description: 'Monitor payments in real-time, handle exceptions, and export reports automatically.' },
    ],
  },
  'maintenance-management': {
    title: 'Maintenance Management',
    metaTitle: 'Property Maintenance Management Software',
    metaDescription:
      'Streamline maintenance requests with tenant portals, vendor routing, work order tracking, and AI-powered priority routing for property managers.',
    iconName: 'Wrench',
    heroDescription:
      'Tenant request portals, AI-powered priority routing, vendor dispatch, and proof-of-completion tracking. From request to resolution in one system.',
    capabilities: [
      { title: 'Tenant Request Portal', description: 'Tenants submit requests with photos and descriptions. AI categorizes and prioritizes automatically.' },
      { title: 'Vendor Routing', description: 'Smart vendor matching based on skill, availability, location, and cost. Automatic dispatch and scheduling.' },
      { title: 'Work Order Tracking', description: 'Full lifecycle tracking from request to completion with status updates, time logs, and cost tracking.' },
      { title: 'Proof of Completion', description: 'Before/after photos, tenant sign-off, and invoice capture. Complete audit trail for every job.' },
    ],
    steps: [
      { number: '01', title: 'Tenant submits request', description: 'Tenants describe the issue with photos through the portal. AI categorizes and sets priority.' },
      { number: '02', title: 'Vendor dispatched', description: 'The right vendor is matched and dispatched automatically based on issue type and location.' },
      { number: '03', title: 'Resolved and documented', description: 'Vendor completes the work, uploads proof, and the tenant confirms resolution.' },
    ],
  },
  'lease-management': {
    title: 'Lease Management',
    metaTitle: 'Digital Lease Management for Canadian Properties',
    metaDescription:
      'Province-specific lease templates, electronic signatures, automated renewals, and compliance tracking for LTB, RTB, TAL, and RTDRS.',
    iconName: 'FileText',
    heroDescription:
      'Generate leases from province-specific templates, collect electronic signatures, and automate renewals. Built-in compliance for LTB, RTB, TAL, and RTDRS.',
    capabilities: [
      { title: 'Provincial Templates', description: 'Pre-built lease templates compliant with Ontario (LTB), BC (RTB), Quebec (TAL), Alberta (RTDRS), and more.' },
      { title: 'E-Signatures', description: 'Legally binding electronic signatures for landlords and tenants. DocuSign integration included.' },
      { title: 'Automated Renewals', description: 'Track lease expiries, send renewal notices on schedule, and generate new agreements automatically.' },
      { title: 'Compliance Tracking', description: 'Built-in deadline tracking for notices, rent increases, and regulatory filings by jurisdiction.' },
    ],
    steps: [
      { number: '01', title: 'Select your template', description: 'Choose from province-specific lease templates that are pre-populated with your property data.' },
      { number: '02', title: 'Customize and send', description: 'Add custom clauses, set terms, and send for electronic signature to your tenants.' },
      { number: '03', title: 'Auto-manage lifecycle', description: 'Revun tracks expiries, sends renewal notices, and generates new leases automatically.' },
    ],
  },
  accounting: {
    title: 'Accounting & Reporting',
    metaTitle: 'Property Management Accounting Software',
    metaDescription:
      'Real-time financial reporting, automated reconciliation, tax-ready statements, and owner disbursements. Integrates with QuickBooks and Xero.',
    iconName: 'BarChart3',
    heroDescription:
      'Real-time financial dashboards, automated bank reconciliation, tax-ready reporting, and one-click owner disbursements. Integrates with QuickBooks and Xero.',
    capabilities: [
      { title: 'Real-Time Dashboards', description: 'Revenue, expenses, NOI, and cash flow updated in real-time across your entire portfolio.' },
      { title: 'Bank Reconciliation', description: 'Automated matching of bank transactions to ledger entries. Exceptions flagged for review.' },
      { title: 'Tax-Ready Reports', description: 'Generate T4A slips, expense summaries, and capital cost allowance reports for CRA compliance.' },
      { title: 'Owner Disbursements', description: 'Automated owner payments with detailed statements showing income, expenses, and management fees.' },
    ],
    steps: [
      { number: '01', title: 'Connect your accounts', description: 'Link bank accounts and integrate with QuickBooks or Xero for automatic data sync.' },
      { number: '02', title: 'Track automatically', description: 'Income and expenses are categorized and reconciled in real-time as transactions flow in.' },
      { number: '03', title: 'Report and disburse', description: 'Generate reports, send owner statements, and process disbursements with one click.' },
    ],
  },
  'owner-portal': {
    title: 'Owner Portal',
    metaTitle: 'Property Owner Portal Software',
    metaDescription:
      'Transparent owner dashboards with real-time occupancy, revenue tracking, expense reports, and document access. White-label ready for property managers.',
    iconName: 'BookOpen',
    heroDescription:
      'Give property owners transparent, real-time access to occupancy rates, revenue, expenses, and documents. White-label ready for your brand.',
    capabilities: [
      { title: 'Real-Time Dashboard', description: 'Owners see occupancy, revenue, maintenance status, and tenant information updated in real-time.' },
      { title: 'Financial Transparency', description: 'Income statements, expense breakdowns, and management fee details available on demand.' },
      { title: 'Document Vault', description: 'Leases, inspection reports, insurance documents, and tax records organized and accessible 24/7.' },
      { title: 'White-Label Ready', description: 'Brand the portal with your logo, colors, and domain. Owners see your brand, not Revun.' },
    ],
    steps: [
      { number: '01', title: 'Invite your owners', description: 'Send owner invitations with one click. They create accounts and access their portal instantly.' },
      { number: '02', title: 'Owners self-serve', description: 'Owners view financials, download reports, and access documents without calling your office.' },
      { number: '03', title: 'Build trust automatically', description: 'Real-time transparency builds owner confidence and reduces support requests by up to 60%.' },
    ],
  },
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  CreditCard,
  Wrench,
  FileText,
  BarChart3,
  BookOpen,
}

export function generateStaticParams() {
  return Object.keys(featureData).map((feature) => ({ feature }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ feature: string }>
}): Promise<Metadata> {
  const { feature } = await params
  const data = featureData[feature]
  if (!data) return {}
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: buildCanonicalUrl(`/features/${feature}`) },
    openGraph: {
      title: `${data.metaTitle} | Revun`,
      description: data.metaDescription,
      url: buildCanonicalUrl(`/features/${feature}`),
    },
  }
}

export default async function FeatureDetailPage({
  params,
}: {
  params: Promise<{ feature: string }>
}) {
  const { feature } = await params
  const data = featureData[feature]
  if (!data) notFound()

  const Icon = iconMap[data.iconName] || Users

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Features', url: 'https://revun.com/features/' },
              { name: data.title, url: buildCanonicalUrl(`/features/${feature}`) },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F5F6F8] pt-32 pb-16 md:pt-40 md:pb-20">
        {/* Decorative dot grid */}
        <div className="absolute inset-0 bg-dot-grid opacity-40" aria-hidden="true" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="animate-fade-up mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F2FE]">
            <Icon className="h-8 w-8 text-[#176FEB]" />
          </div>
          <h1 className="animate-fade-up font-display text-4xl font-normal text-[#0A1628] md:text-5xl">
            {data.title}
          </h1>
          <p className="animate-fade-up delay-150 mx-auto mt-4 max-w-2xl text-lg text-[#555860]">
            {data.heroDescription}
          </p>
          <div className="animate-fade-up delay-300 mt-8 flex items-center justify-center gap-4">
            <Link
              href="/pricing/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0B5AD4]"
            >
              Start Free Trial
            </Link>
            <Link
              href="/demo/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-6 text-sm font-semibold text-[#2C2E33] transition-colors duration-200 hover:border-[#176FEB]/30"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <RevealOnScroll stagger={0.12}>
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
              Capabilities
            </p>
            <h2 className="mt-3 font-heading text-2xl font-bold text-[#0A1628] md:text-3xl">
              What you get with {data.title}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll stagger={0.08}>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {data.capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="flex gap-4 rounded-xl border border-[#E5E7EB] p-5 transition-all duration-200 hover:border-[#176FEB]/30 hover:shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#176FEB]" />
                  <div>
                    <h3 className="font-heading text-base font-semibold text-[#0A1628]">
                      {cap.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#555860]">
                      {cap.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#F5F6F8] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll className="text-center" stagger={0.12}>
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
              How it works
            </p>
            <h2 className="mt-3 font-heading text-2xl font-bold text-[#0A1628] md:text-3xl">
              Three steps to get started
            </h2>
          </RevealOnScroll>
          <RevealOnScroll stagger={0.1}>
            <div className="mt-10 space-y-6">
              {data.steps.map((step) => (
                <div
                  key={step.number}
                  className="flex gap-5 rounded-xl border border-[#E5E7EB] bg-white p-6 transition-all duration-200 hover:border-[#176FEB]/30 hover:shadow-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F2FE] font-heading text-sm font-bold text-[#176FEB]">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-[#0A1628]">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#555860]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#176FEB] py-14">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll stagger={0.12}>
            <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
              Ready to try {data.title}?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-white/80">
              Start your free trial today. No credit card required.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="/pricing/"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-[#176FEB] transition-colors duration-200 hover:bg-white/90"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact/"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                Contact Sales <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
