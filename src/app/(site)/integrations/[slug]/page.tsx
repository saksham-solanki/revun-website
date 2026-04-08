import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowRight, Check, Plug, Zap } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

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
  /* ---- Accounting ---- */
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
  'zoho-books': {
    name: 'Zoho Books',
    slug: 'zoho-books',
    category: 'Accounting',
    description:
      'Sync your Revun property financials with Zoho Books cloud accounting. Automate invoice generation, expense tracking, and financial reporting for small business property managers.',
    features: [
      'Automatic invoice creation from rent schedules',
      'Expense categorization mapped to property chart of accounts',
      'Bank feed reconciliation with Revun payment data',
      'Custom financial reports by property and portfolio',
    ],
    setup: 'Easy',
    status: 'Available',
  },

  /* ---- CRM ---- */
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
  'zoho-crm': {
    name: 'Zoho CRM',
    slug: 'zoho-crm',
    category: 'CRM',
    description:
      'Connect Revun with Zoho CRM to manage leads, tenants, and owner relationships in one place. Automate follow-ups and track deal progress across your property portfolio.',
    features: [
      'Lead capture from Revun inquiries into Zoho CRM',
      'Custom module mapping for properties and units',
      'Automated follow-up workflows for lease renewals',
      'Contact timeline with full Revun activity history',
    ],
    setup: 'Medium',
    status: 'Coming Soon',
  },

  /* ---- Communications ---- */
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
  aircall: {
    name: 'Aircall',
    slug: 'aircall',
    category: 'Communications',
    description:
      'Connect Revun with Aircall for cloud-based phone operations. Route calls to the right property manager, log conversations automatically, and track call analytics across your portfolio.',
    features: [
      'Smart call routing based on property assignments',
      'Automatic call logging linked to tenant records',
      'IVR menus for maintenance and leasing inquiries',
      'Real-time call analytics and team performance dashboards',
    ],
    setup: 'Easy',
    status: 'Available',
  },
  'zoom-phone': {
    name: 'Zoom Phone',
    slug: 'zoom-phone',
    category: 'Communications',
    description:
      'Integrate Revun with Zoom Phone for unified business communication. Combine voice, video, and messaging for property management teams with seamless call tracking.',
    features: [
      'Business phone lines with video conferencing',
      'Call recording and transcription for compliance',
      'Auto-attendant with property-specific routing',
      'Voicemail-to-text with Revun notification sync',
    ],
    setup: 'Medium',
    status: 'Coming Soon',
  },
  intercom: {
    name: 'Intercom',
    slug: 'intercom',
    category: 'Communications',
    description:
      'Use Intercom with Revun to provide real-time tenant messaging, automated support workflows, and proactive communication for maintenance updates and lease renewals.',
    features: [
      'Live chat widget for tenant portals and websites',
      'Automated message sequences for onboarding new tenants',
      'Custom bots for maintenance request triage',
      'Inbox management with property-based team routing',
    ],
    setup: 'Easy',
    status: 'Available',
  },
  zendesk: {
    name: 'Zendesk',
    slug: 'zendesk',
    category: 'Communications',
    description:
      'Connect Revun to Zendesk for structured tenant support. Create tickets from maintenance requests, track SLAs, and provide multi-channel support across email, chat, and phone.',
    features: [
      'Automatic ticket creation from Revun maintenance requests',
      'SLA tracking and escalation rules by property type',
      'Multi-channel support: email, chat, phone, and social',
      'Knowledge base for common tenant questions',
    ],
    setup: 'Medium',
    status: 'Available',
  },
  freshdesk: {
    name: 'Freshdesk',
    slug: 'freshdesk',
    category: 'Communications',
    description:
      'Integrate Revun with Freshdesk for help desk and support ticket management. Streamline tenant issue resolution with automated workflows, SLA policies, and self-service portals.',
    features: [
      'Ticket creation from Revun maintenance and support requests',
      'Automated assignment rules based on property and issue type',
      'Self-service portal for tenants with FAQ and status tracking',
      'SLA policies with escalation for urgent property issues',
    ],
    setup: 'Easy',
    status: 'Coming Soon',
  },
  'zoho-desk': {
    name: 'Zoho Desk',
    slug: 'zoho-desk',
    category: 'Communications',
    description:
      'Connect Revun with Zoho Desk for help desk operations. Manage tenant support tickets, automate responses, and track resolution times across your property portfolio.',
    features: [
      'Multi-channel ticket management for tenant issues',
      'Automated ticket routing by property and category',
      'AI-powered response suggestions for common queries',
      'Customer satisfaction surveys after ticket resolution',
    ],
    setup: 'Easy',
    status: 'Coming Soon',
  },

  /* ---- Documents ---- */
  docusign: {
    name: 'DocuSign',
    slug: 'docusign',
    category: 'Documents',
    description:
      'Electronic lease signing and document management with DocuSign. Send, sign, and store leases, amendments, and compliance documents directly within Revun.',
    features: [
      'E-signature for leases and amendments',
      'Template library with auto-populated fields',
      'Audit trail and completion tracking',
      'Mobile signing for tenants and owners',
    ],
    setup: 'Easy',
    status: 'Available',
  },
  'dropbox-sign': {
    name: 'Dropbox Sign',
    slug: 'dropbox-sign',
    category: 'Documents',
    description:
      'Use Dropbox Sign with Revun for streamlined eSignature workflows. Send leases, addendums, and property documents for electronic signature with built-in template management.',
    features: [
      'eSignature workflows for leases and property documents',
      'Reusable templates with merge fields from Revun',
      'Bulk send for multi-unit lease renewals',
      'Completed document auto-filing to tenant records',
    ],
    setup: 'Easy',
    status: 'Coming Soon',
  },
  'adobe-sign': {
    name: 'Adobe Acrobat Sign',
    slug: 'adobe-sign',
    category: 'Documents',
    description:
      'Integrate Revun with Adobe Acrobat Sign for enterprise-grade PDF signatures. Manage lease execution, compliance forms, and multi-party signing workflows with full audit trails.',
    features: [
      'PDF-native electronic signatures for all property documents',
      'Multi-party signing workflows for complex lease agreements',
      'Government ID verification for high-value transactions',
      'Integration with Adobe Document Cloud for storage and archiving',
    ],
    setup: 'Medium',
    status: 'Coming Soon',
  },

  /* ---- Identity/Verification ---- */
  persona: {
    name: 'Persona',
    slug: 'persona',
    category: 'Identity',
    description:
      'Use Persona with Revun for KYC identity verification during tenant applications. Verify government IDs, run watchlist checks, and ensure compliance with Canadian regulations.',
    features: [
      'Government ID verification with photo matching',
      'Watchlist and sanctions screening',
      'Configurable verification flows per property type',
      'Compliance audit logs and reporting',
    ],
    setup: 'Medium',
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
  trustii: {
    name: 'Trustii',
    slug: 'trustii',
    category: 'Identity',
    description:
      'Integrate Revun with Trustii for Canadian tenant verification. Run credit checks, employment verification, and reference checks tailored to the Canadian rental market.',
    features: [
      'Canadian credit bureau checks with consent management',
      'Employment and income verification workflows',
      'Previous landlord reference automation',
      'Risk scoring calibrated for Canadian rental markets',
    ],
    setup: 'Easy',
    status: 'Available',
  },
  flinks: {
    name: 'Flinks',
    slug: 'flinks',
    category: 'Identity',
    description:
      'Connect Revun with Flinks for financial data connectivity. Verify tenant income, bank balances, and transaction history through secure open-banking connections with Canadian financial institutions.',
    features: [
      'Secure bank account linking with Canadian institutions',
      'Real-time income and balance verification',
      'Transaction history analysis for affordability assessment',
      'Open-banking compliant data access and consent management',
    ],
    setup: 'Medium',
    status: 'Available',
  },
  'singlekey-integration': {
    name: 'SingleKey',
    slug: 'singlekey-integration',
    category: 'Identity',
    description:
      'Use SingleKey with Revun for Canadian tenant screening and rent guarantee insurance. Screen applicants, verify identity, and protect against missed rent payments with integrated coverage.',
    features: [
      'Comprehensive Canadian tenant screening reports',
      'Rent guarantee insurance for qualifying tenants',
      'Identity verification with Canadian data sources',
      'Automated screening decisions with customizable criteria',
    ],
    setup: 'Easy',
    status: 'Available',
  },

  /* ---- Listings ---- */
  brokerbay: {
    name: 'BrokerBay',
    slug: 'brokerbay',
    category: 'Listings',
    description:
      'Connect Revun with BrokerBay for showing management and scheduling. Coordinate property viewings, manage agent calendars, and track showing feedback all from one platform.',
    features: [
      'Automated showing scheduling with calendar sync',
      'Agent and tenant showing confirmation workflows',
      'Feedback collection after each property viewing',
      'Lockbox and access management integration',
    ],
    setup: 'Medium',
    status: 'Coming Soon',
  },
  'mls-idx': {
    name: 'MLS/IDX',
    slug: 'mls-idx',
    category: 'Listings',
    description:
      'Integrate Revun with MLS/IDX data connectors for property listing syndication. Push vacancy listings to MLS boards and pull market data for pricing intelligence.',
    features: [
      'Automatic listing syndication to Canadian MLS boards',
      'IDX feed integration for website property search',
      'Market data pulls for rental pricing intelligence',
      'Listing status sync between Revun and MLS',
    ],
    setup: 'Advanced',
    status: 'Coming Soon',
  },

  /* ---- Payments/Fintech ---- */
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
  klarna: {
    name: 'Klarna',
    slug: 'klarna',
    category: 'Payments',
    description:
      'Offer tenants flexible payment options with Klarna buy now pay later. Split large deposits, move-in costs, or first/last month rent into manageable installments.',
    features: [
      'Buy now pay later for security deposits and move-in costs',
      'Installment plans configurable by property manager',
      'Automated payment collection on installment schedules',
      'Tenant credit assessment with instant approval decisions',
    ],
    setup: 'Easy',
    status: 'Coming Soon',
  },
  affirm: {
    name: 'Affirm',
    slug: 'affirm',
    category: 'Payments',
    description:
      'Integrate Revun with Affirm to offer tenants pay-over-time options for large property expenses. Enable flexible financing for deposits, renovations, and premium upgrades.',
    features: [
      'Pay-over-time financing for large tenant expenses',
      'Transparent interest rates with no hidden fees',
      'Instant credit decisions for qualified applicants',
      'Automated repayment tracking synced with Revun ledger',
    ],
    setup: 'Easy',
    status: 'Coming Soon',
  },
  paybright: {
    name: 'PayBright',
    slug: 'paybright',
    category: 'Payments',
    description:
      'Connect Revun with PayBright for Canadian buy now pay later solutions. Help tenants finance deposits and move-in costs with installment plans built for the Canadian market.',
    features: [
      'Canadian BNPL for deposits and move-in costs',
      'Integration with Canadian financial institutions',
      'Flexible installment terms configurable by property',
      'Bilingual support for English and French tenants',
    ],
    setup: 'Easy',
    status: 'Coming Soon',
  },

  /* ---- Productivity ---- */
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
  'microsoft-365': {
    name: 'Microsoft 365',
    slug: 'microsoft-365',
    category: 'Productivity',
    description:
      'Connect Revun with Microsoft 365 for full Office suite integration. Sync Outlook calendars, store documents in OneDrive, and collaborate via Teams across your property management team.',
    features: [
      'Outlook calendar sync for showings and inspections',
      'OneDrive document storage for lease files and reports',
      'Microsoft Teams notifications for property events',
      'Excel export templates for financial reporting',
    ],
    setup: 'Medium',
    status: 'Coming Soon',
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
  calendly: {
    name: 'Calendly',
    slug: 'calendly',
    category: 'Productivity',
    description:
      'Integrate Revun with Calendly for automated scheduling. Let tenants and prospects book property showings, maintenance windows, and meetings without back-and-forth emails.',
    features: [
      'Self-service booking for property showings and tours',
      'Automated reminders and follow-ups for scheduled events',
      'Round-robin scheduling across property management team',
      'Calendar sync with Google, Outlook, and Revun events',
    ],
    setup: 'Easy',
    status: 'Available',
  },
  'google-calendar': {
    name: 'Google Calendar',
    slug: 'google-calendar',
    category: 'Productivity',
    description:
      'Sync Revun events directly with Google Calendar. Property showings, maintenance schedules, lease renewal dates, and inspection appointments appear automatically on your calendar.',
    features: [
      'Two-way sync of showings and inspection schedules',
      'Automatic calendar events for lease milestones',
      'Shared team calendars for property portfolios',
      'Color-coded events by property and event type',
    ],
    setup: 'Easy',
    status: 'Available',
  },
  'google-maps': {
    name: 'Google Maps',
    slug: 'google-maps',
    category: 'Productivity',
    description:
      'Embed Google Maps into Revun for property location services. Display property locations, nearby amenities, transit routes, and distance calculations for tenants and prospects.',
    features: [
      'Interactive property maps on listing pages',
      'Nearby amenities and points of interest display',
      'Transit and commute time calculations for tenants',
      'Geocoding and address validation for property records',
    ],
    setup: 'Easy',
    status: 'Available',
  },
  mapbox: {
    name: 'Mapbox',
    slug: 'mapbox',
    category: 'Productivity',
    description:
      'Use Mapbox with Revun for custom mapping experiences. Build branded property maps, portfolio heatmaps, and location-based search with full design control.',
    features: [
      'Custom-branded property portfolio maps',
      'Heatmap visualization for vacancy and pricing data',
      'Location-based property search with radius filtering',
      'Custom map styles matching your brand guidelines',
    ],
    setup: 'Medium',
    status: 'Available',
  },

  /* ---- Accounting (additional) ---- */
  'sage-intacct': {
    name: 'Sage Intacct',
    slug: 'sage-intacct',
    category: 'Accounting',
    description:
      'Connect Revun with Sage Intacct for enterprise-grade multi-entity accounting. Automate journal entries, consolidations, and financial reporting across large property portfolios.',
    features: [
      'Multi-entity financial consolidation across portfolios',
      'Automated journal entries from rent and expense transactions',
      'Dimensional reporting by property, region, and entity',
      'Accounts payable and receivable automation',
    ],
    setup: 'Advanced',
    status: 'Coming Soon',
  },
  netsuite: {
    name: 'NetSuite',
    slug: 'netsuite',
    category: 'Accounting',
    description:
      'Integrate Revun with Oracle NetSuite for full ERP connectivity. Sync financial data, automate vendor payments, and consolidate reporting for large-scale property operations.',
    features: [
      'Full ERP integration for property financials',
      'Automated vendor bill processing and payment',
      'Real-time financial dashboards across portfolios',
      'Custom record types for property and unit data',
    ],
    setup: 'Advanced',
    status: 'Coming Soon',
  },

  /* ---- CRM (additional) ---- */
  pipedrive: {
    name: 'Pipedrive',
    slug: 'pipedrive',
    category: 'CRM',
    description:
      'Connect Revun with Pipedrive to track brokerage deals and pipeline stages. Sync contacts, automate follow-ups, and keep your sales pipeline aligned with property operations.',
    features: [
      'Deal pipeline sync between Revun and Pipedrive',
      'Automatic contact creation from Revun inquiries',
      'Activity logging and follow-up automation',
      'Custom fields for property and portfolio data',
    ],
    setup: 'Easy',
    status: 'Beta',
  },

  /* ---- Communications (additional) ---- */
  ringcentral: {
    name: 'RingCentral',
    slug: 'ringcentral',
    category: 'Communications',
    description:
      'Integrate Revun with RingCentral for unified phone, video, and messaging. Route tenant and owner calls through your property management workflow with full call logging.',
    features: [
      'Unified phone, video, and team messaging',
      'Automatic call logging linked to tenant and property records',
      'Smart call routing based on property assignments',
      'Voicemail transcription and notification sync',
    ],
    setup: 'Medium',
    status: 'Available',
  },
  dialpad: {
    name: 'Dialpad',
    slug: 'dialpad',
    category: 'Communications',
    description:
      'Connect Revun with Dialpad for AI-powered calling and transcription. Automate call summaries, track sentiment, and keep all tenant communications in context.',
    features: [
      'AI-powered call transcription and summaries',
      'Real-time sentiment analysis for tenant calls',
      'Automatic call logging to tenant records in Revun',
      'Smart routing based on property and team assignments',
    ],
    setup: 'Medium',
    status: 'Coming Soon',
  },
  openphone: {
    name: 'OpenPhone',
    slug: 'openphone',
    category: 'Communications',
    description:
      'Use OpenPhone with Revun for shared business phone numbers. Manage leasing and maintenance calls with shared inboxes, auto-replies, and SMS templates for your team.',
    features: [
      'Shared phone numbers for leasing and maintenance teams',
      'SMS templates for common tenant communications',
      'Auto-reply and away messaging for off-hours',
      'Call and text history synced to Revun records',
    ],
    setup: 'Easy',
    status: 'Available',
  },

  /* ---- Identity (additional) ---- */
  transunion: {
    name: 'TransUnion',
    slug: 'transunion',
    category: 'Identity',
    description:
      'Integrate Revun with TransUnion for comprehensive tenant credit and background checks. Pull credit reports, verify identity, and assess risk directly within the application workflow.',
    features: [
      'Credit report pulls with SmartMove integration',
      'Criminal and eviction background checks',
      'Identity verification with fraud detection',
      'Risk scoring calibrated for rental applications',
    ],
    setup: 'Medium',
    status: 'Available',
  },

  /* ---- Productivity (additional) ---- */
  zapier: {
    name: 'Zapier',
    slug: 'zapier',
    category: 'Productivity',
    description:
      'Connect Revun to 5,000+ apps with Zapier. Build custom automations triggered by lease events, maintenance requests, payment receipts, and more without writing code.',
    features: [
      'Triggers for lease events, payments, and maintenance',
      'Actions to create records in any connected app',
      'Multi-step workflows with conditional logic',
      'Pre-built templates for common property management automations',
    ],
    setup: 'Easy',
    status: 'Available',
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
      <section className="relative overflow-hidden bg-[#F5F6F8]">
        <div className="relative mx-auto max-w-5xl px-6 py-16 sm:py-16 lg:px-8">
          <RevealOnScroll className="flex flex-col items-center text-center">
            {/* Connection visual */}
            <div className="flex items-center gap-4">
              <div className="flex size-16 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white">
                <span className="font-heading text-2xl font-bold text-[#0A1628]">R</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Zap className="size-5 text-[#176FEB]" />
                <div className="h-px w-8 bg-[#176FEB]" />
              </div>
              <div className="flex size-16 items-center justify-center rounded-2xl bg-white border border-[#E5E7EB]">
                <span className="font-heading text-2xl font-bold text-[#0A1628]">
                  {data.name.charAt(0)}
                </span>
              </div>
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Integration
            </p>
            <h1 className="mt-3 font-display text-4xl font-normal text-[#0A1628] sm:text-5xl">
              Revun + {data.name}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-[#555860]">
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
          </RevealOnScroll>
        </div>
      </section>

      {/* What This Integration Does */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <RevealOnScroll className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
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
                {data.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[#E8F2FE]">
                      <Check className="size-3 text-[#176FEB]" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-[#555860]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Setup Info */}
      <section className="bg-[#F5F6F8] py-14">
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
      <section className="bg-[#F5F6F8] py-14">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <div className="mx-auto flex w-fit items-center gap-3 rounded-full bg-white border border-[#E5E7EB] px-5 py-2">
            <Plug className="size-4 text-[#176FEB]" />
            <span className="text-sm font-medium text-[#0A1628]">
              Ready to connect
            </span>
          </div>
          <h2 className="mt-6 font-heading text-2xl font-bold text-[#0A1628] sm:text-3xl">
            Get started with Revun + {data.name}
          </h2>
          <p className="mt-4 text-[#555860]">
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
              className="inline-flex h-12 items-center rounded-lg border border-[#E5E7EB] px-8 text-sm font-semibold text-[#0A1628] hover:bg-white"
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
