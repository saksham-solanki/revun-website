import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, CheckCircle2, FileText, Shield, Clock } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { notFound } from 'next/navigation'

// ─────────────────────────────────────────────────────────────────────────────
// Province data
// ─────────────────────────────────────────────────────────────────────────────

const provinceData = {
  ontario: {
    name: 'Ontario',
    slug: 'ontario',
    abbreviation: 'ON',
    heroSubtitle:
      'Canada\'s largest rental market, purpose-built for RTA compliance, LTB workflows, and N-series notice automation.',
    regulation: {
      title: 'Residential Tenancies Act (RTA) & Landlord and Tenant Board',
      body: 'Ontario rental relationships are governed by the Residential Tenancies Act, 2006 and enforced by the Landlord and Tenant Board (LTB). The 2025 rent increase guideline is 2.5%. Landlords must use the Ontario Standard Lease for most tenancies, serve notices on the prescribed N-form series (N4 for non-payment, N12 for owner use, etc.), and file Applications (A-forms) with the LTB for disputes. Above-guideline rent increase applications require documented capital expenditure or operating cost submissions to the LTB.',
      highlights: [
        '2025 rent increase guideline: 2.5%',
        'Ontario Standard Lease mandatory for most agreements',
        'N4/N8/N12/N13 notice workflows with prescribed forms',
        'LTB Application (A1-A4) filing for disputes',
        'Above-guideline increase applications via LTB',
        'Interac e-Transfer accepted as legal payment method',
      ],
    },
    valueProps: [
      {
        icon: FileText,
        title: 'LTB N-Series Notice Automation',
        description:
          'Generate N4 (non-payment), N8 (persistent late payment), N12 (owner use), and N13 (demolition) notices pre-filled with tenant and property data. Correct notice periods calculated automatically.',
      },
      {
        icon: Shield,
        title: 'RTA-Compliant Lease Templates',
        description:
          'Ontario Standard Lease with all mandatory schedules. Revun keeps templates current with legislative amendments so you\'re never serving an out-of-date agreement.',
      },
      {
        icon: CheckCircle2,
        title: 'Rent Increase Guideline Tracking',
        description:
          'Annual rent increase guideline (2.5% for 2025) applied automatically. Above-guideline increase documentation package prepared on request.',
      },
      {
        icon: Clock,
        title: 'Interac e-Transfer Rent Collection',
        description:
          'Native Interac e-Transfer integration for rent collection. Automatic reconciliation, NSF tracking, and LTB-ready payment histories for A1 applications.',
      },
    ],
    cities: [
      { name: 'Toronto', slug: 'toronto' },
      { name: 'Mississauga', slug: 'mississauga' },
      { name: 'Brampton', slug: 'brampton' },
      { name: 'Hamilton', slug: 'hamilton' },
      { name: 'Ottawa', slug: 'ottawa' },
      { name: 'London', slug: 'london' },
      { name: 'Vaughan', slug: 'vaughan' },
      { name: 'Markham', slug: 'markham' },
      { name: 'Richmond Hill', slug: 'richmond-hill' },
      { name: 'Oakville', slug: 'oakville' },
      { name: 'Burlington', slug: 'burlington' },
      { name: 'Kitchener', slug: 'kitchener' },
      { name: 'Waterloo', slug: 'waterloo' },
      { name: 'Cambridge', slug: 'cambridge' },
      { name: 'Guelph', slug: 'guelph' },
      { name: 'Barrie', slug: 'barrie' },
      { name: 'Milton', slug: 'milton' },
      { name: 'Oshawa', slug: 'oshawa' },
      { name: 'Ajax', slug: 'ajax' },
      { name: 'Pickering', slug: 'pickering' },
      { name: 'Whitby', slug: 'whitby' },
      { name: 'St. Catharines', slug: 'st-catharines' },
      { name: 'Niagara Falls', slug: 'niagara-falls' },
      { name: 'Kingston', slug: 'kingston' },
    ],
    ctaText: 'Start managing properties in Ontario',
  },

  'british-columbia': {
    name: 'British Columbia',
    slug: 'british-columbia',
    abbreviation: 'BC',
    heroSubtitle:
      'High-demand rental market with strict RTB regulations, RTDRS dispute resolution, and CPI-linked rent increase rules.',
    regulation: {
      title: 'Residential Tenancy Act & Residential Tenancy Branch',
      body: 'BC residential tenancies are governed by the Residential Tenancy Act and administered by the Residential Tenancy Branch (RTB). Rent increases are capped at the BC CPI + 2% formula, calculated and announced each year. Landlords must use the mandatory BC Tenancy Agreement form. Disputes go through the Residential Tenancy Dispute Resolution Service (RTDRS) or RTB arbitration. Fixed-term tenancies require mutual agreement to end; otherwise they convert to monthly automatically.',
      highlights: [
        'Rent increase formula: BC CPI + 2% (announced annually)',
        'Mandatory BC Residential Tenancy Agreement form',
        'RTDRS dispute resolution (phone/online arbitration)',
        'One month\'s notice required for rent increases',
        'Damage deposit capped at half a month\'s rent',
        'Pet damage deposit capped at half a month\'s rent',
      ],
    },
    valueProps: [
      {
        icon: CheckCircle2,
        title: 'CPI + 2% Rent Increase Calculator',
        description:
          'Automatic rent increase limits calculated from the RTB\'s annual announcement. Notices generated with the mandatory one-month period built in.',
      },
      {
        icon: FileText,
        title: 'BC Tenancy Agreement Templates',
        description:
          'Current mandatory BC residential tenancy agreement with addenda. Landlord and tenant e-signature flow built in.',
      },
      {
        icon: Shield,
        title: 'RTDRS Dispute Preparation',
        description:
          'Evidence packages, payment histories, and inspection reports formatted for RTDRS and RTB arbitration submissions.',
      },
      {
        icon: Clock,
        title: 'Fixed-Term Tenancy Tracking',
        description:
          'Alerts before fixed-term end dates with mutual-agreement workflows so tenancies don\'t inadvertently convert to periodic.',
      },
    ],
    cities: [
      { name: 'Vancouver', slug: 'vancouver' },
      { name: 'Burnaby', slug: 'burnaby' },
      { name: 'Surrey', slug: 'surrey' },
      { name: 'Richmond', slug: 'richmond' },
      { name: 'Coquitlam', slug: 'coquitlam' },
      { name: 'Langley', slug: 'langley' },
      { name: 'Victoria', slug: 'victoria' },
      { name: 'Kelowna', slug: 'kelowna' },
      { name: 'Abbotsford', slug: 'abbotsford' },
      { name: 'Nanaimo', slug: 'nanaimo' },
    ],
    ctaText: 'Start managing properties in British Columbia',
  },

  quebec: {
    name: 'Quebec',
    slug: 'quebec',
    abbreviation: 'QC',
    heroSubtitle:
      'Unique civil law framework, mandatory French-language leases, and TAL tribunal compliance built for Quebec landlords.',
    regulation: {
      title: 'Civil Code of Quebec & Tribunal administratif du logement (TAL)',
      body: 'Quebec residential tenancies are governed by the Civil Code of Quebec (not common law) and regulated by the Tribunal administratif du logement (TAL), formerly the Régie du logement. Landlords must use the mandatory Bail (lease) form prescribed by the TAL. Rent increases require a notice with the proposed new rent, and tenants have the right to refuse and negotiate. TAL handles disputes, lease renewals, and rent fixation. All tenant communications must be in French where required by the Charter of the French Language.',
      highlights: [
        'Mandatory TAL Bail (lease) form for all residential units',
        'Tenant right to refuse rent increase and negotiate via TAL',
        'TAL Tribunal for dispute resolution (not provincial courts)',
        'French-language communications required under Charter',
        'Rent fixation hearings for contested increases',
        'No separate damage deposit permitted',
      ],
    },
    valueProps: [
      {
        icon: FileText,
        title: 'Mandatory TAL Bail Templates',
        description:
          'Current TAL-prescribed Bail form in French and English. Addenda sections for parking, storage, and appliances included.',
      },
      {
        icon: Shield,
        title: 'French-Language Document Generation',
        description:
          'All notices, rent increase letters, and tenant communications generated in French with optional English translation. Charter-compliant by default.',
      },
      {
        icon: CheckCircle2,
        title: 'Rent Increase Notice Workflows',
        description:
          'Prescribed notice periods (3-6 months depending on lease type) with correct TAL wording. Tenant response tracking for accepted, refused, or negotiated outcomes.',
      },
      {
        icon: Clock,
        title: 'TAL Dispute Documentation',
        description:
          'Evidence packages formatted for TAL hearings: payment histories, maintenance logs, and inspection reports in required format.',
      },
    ],
    cities: [
      { name: 'Montreal', slug: 'montreal' },
      { name: 'Laval', slug: 'laval' },
      { name: 'Quebec City', slug: 'quebec-city' },
      { name: 'Longueuil', slug: 'longueuil' },
      { name: 'Gatineau', slug: 'gatineau' },
      { name: 'Sherbrooke', slug: 'sherbrooke' },
    ],
    ctaText: 'Start managing properties in Quebec',
  },

  alberta: {
    name: 'Alberta',
    slug: 'alberta',
    abbreviation: 'AB',
    heroSubtitle:
      'Alberta\'s growing rental market has no rent control. RTDRS dispute resolution and periodic tenancy rules, handled for you.',
    regulation: {
      title: 'Residential Tenancies Act (Alberta) & RTDRS',
      body: 'Alberta residential tenancies are governed by the Residential Tenancies Act (RTA Alberta) with no rent control provisions. Landlords can increase rent with a minimum 3 months\' written notice for month-to-month tenancies. Periodic tenancies (month-to-month) require 3 months\' notice to end a tenancy without cause. Fixed-term tenancies end automatically at the term date unless renewed. Disputes go to the Residential Tenancy Dispute Resolution Service (RTDRS), a faster alternative to court.',
      highlights: [
        'No rent control - increases permitted with 3 months\' written notice',
        'Month-to-month: 3 months\' notice to terminate without cause',
        'Fixed-term tenancies end automatically at term date',
        'RTDRS for dispute resolution (faster than court, $75 filing fee)',
        'Security deposit capped at one month\'s rent',
        'Interest required on security deposits held over 12 months',
      ],
    },
    valueProps: [
      {
        icon: CheckCircle2,
        title: 'No-Rent-Control Flexibility',
        description:
          'Set market rents freely. Revun tracks notice periods (3 months for increases) and generates compliant written notices with delivery confirmation.',
      },
      {
        icon: FileText,
        title: 'RTDRS Dispute Packages',
        description:
          'RTDRS applications and supporting documentation formatted for the $75 online filing. Evidence bundles, payment records, and inspection reports organized automatically.',
      },
      {
        icon: Shield,
        title: 'Periodic Tenancy Notice Automation',
        description:
          'Month-to-month termination notices with correct 3-month periods. Move-out checklists and deposit return workflows within the legislated 10-day window.',
      },
      {
        icon: Clock,
        title: 'Security Deposit Interest Tracking',
        description:
          'Automatic interest calculation on deposits held over 12 months at the prescribed Alberta rate. Reconciliation at move-out with itemized deduction reports.',
      },
    ],
    cities: [
      { name: 'Calgary', slug: 'calgary' },
      { name: 'Edmonton', slug: 'edmonton' },
      { name: 'Red Deer', slug: 'red-deer' },
      { name: 'Lethbridge', slug: 'lethbridge' },
      { name: 'Airdrie', slug: 'airdrie' },
      { name: 'St. Albert', slug: 'st-albert' },
    ],
    ctaText: 'Start managing properties in Alberta',
  },

  'nova-scotia': {
    name: 'Nova Scotia',
    slug: 'nova-scotia',
    abbreviation: 'NS',
    heroSubtitle:
      'Atlantic Canada\'s largest rental market with an active rent cap program and fixed-term lease rules that matter.',
    regulation: {
      title: 'Residential Tenancies Act (NS) & Residential Tenancies Board',
      body: 'Nova Scotia residential tenancies are governed by the Residential Tenancies Act and administered by the Residential Tenancies Board (RTB). Nova Scotia introduced a rent cap in 2020, extended and modified in subsequent years. Rent increases are capped at a percentage set by the province each year. Landlords must provide the proper notice period and use prescribed forms for notices and applications. Fixed-term leases require landlord consent to end early; they do not automatically convert to month-to-month.',
      highlights: [
        'Rent cap program: percentage set annually by the province',
        'Prescribed forms required for all notices (Form J, Form P, etc.)',
        'Residential Tenancies Board for dispute resolution',
        'Fixed-term leases require mutual consent to terminate early',
        'Security deposit capped at half a month\'s rent',
        '3 months\' notice to end month-to-month tenancy without cause',
      ],
    },
    valueProps: [
      {
        icon: CheckCircle2,
        title: 'Rent Cap Compliance',
        description:
          'Annual NS rent cap applied automatically to scheduled increases. Notices generated with correct cap percentages and prescribed form language.',
      },
      {
        icon: FileText,
        title: 'NS Prescribed Form Library',
        description:
          'All Residential Tenancies Board prescribed forms (Form J notice to quit, Form P application, etc.) pre-filled and ready to serve.',
      },
      {
        icon: Shield,
        title: 'Fixed-Term Lease Management',
        description:
          'Alerts before fixed-term end dates with mutual consent workflows and renewal options. No surprises when a lease term expires.',
      },
      {
        icon: Clock,
        title: 'RTB Application Support',
        description:
          'Evidence packages and payment records formatted for RTB applications. Document tracking for the full dispute timeline.',
      },
    ],
    cities: [
      { name: 'Halifax', slug: 'halifax' },
      { name: 'Dartmouth', slug: 'dartmouth' },
      { name: 'Sydney', slug: 'sydney' },
      { name: 'Truro', slug: 'truro' },
    ],
    ctaText: 'Start managing properties in Nova Scotia',
  },

  manitoba: {
    name: 'Manitoba',
    slug: 'manitoba',
    abbreviation: 'MB',
    heroSubtitle:
      'Affordable rental market with RTB-regulated rent guidelines, security deposit limits, and prescribed notice requirements.',
    regulation: {
      title: 'Residential Tenancies Act (Manitoba) & Residential Tenancies Branch',
      body: 'Manitoba residential tenancies are governed by the Residential Tenancies Act and administered by the Residential Tenancies Branch (RTB Manitoba). Rent increases are tied to annual guidelines set by the Branch. Landlords must apply to the RTB for increases above the guideline. Security deposits are capped at half a month\'s rent and must be held in a designated account. The RTB provides mediation and dispute resolution services. Month-to-month tenancies require 3 months\' notice from the landlord to terminate without cause.',
      highlights: [
        'Annual rent increase guidelines set by RTB Manitoba',
        'Above-guideline increases require RTB application',
        'Security deposit capped at half a month\'s rent',
        'Deposits must be held in a designated RTB account',
        '3 months\' notice to end month-to-month tenancy without cause',
        'RTB mediation and dispute resolution services',
      ],
    },
    valueProps: [
      {
        icon: CheckCircle2,
        title: 'RTB Rent Guideline Tracking',
        description:
          'Manitoba annual rent increase guidelines applied automatically. Above-guideline application documentation prepared when capital improvements justify it.',
      },
      {
        icon: FileText,
        title: 'Security Deposit Account Management',
        description:
          'Deposit tracking with RTB-compliant designated account workflows. Move-out reconciliation with itemized deduction reports within the legislated timeline.',
      },
      {
        icon: Shield,
        title: 'RTB Notice Generation',
        description:
          'Month-to-month termination and rent increase notices with correct RTB Manitoba prescribed wording and 3-month notice periods.',
      },
      {
        icon: Clock,
        title: 'RTB Dispute Documentation',
        description:
          'Mediation and hearing packages with payment histories, maintenance records, and inspection reports formatted for RTB Manitoba submissions.',
      },
    ],
    cities: [
      { name: 'Winnipeg', slug: 'winnipeg' },
      { name: 'Brandon', slug: 'brandon' },
      { name: 'Steinbach', slug: 'steinbach' },
      { name: 'Thompson', slug: 'thompson' },
    ],
    ctaText: 'Start managing properties in Manitoba',
  },

  saskatchewan: {
    name: 'Saskatchewan',
    slug: 'saskatchewan',
    abbreviation: 'SK',
    heroSubtitle:
      'Saskatchewan\'s stable rental market governed by the Office of Residential Tenancies, with clear rules on deposits, notices, and dispute resolution.',
    regulation: {
      title: 'Residential Tenancies Act (Saskatchewan) & Office of Residential Tenancies',
      body: 'Saskatchewan residential tenancies are governed by The Residential Tenancies Act, 2006 and administered by the Office of Residential Tenancies (ORT). Rent increases require one full rental period\'s written notice (typically one month for month-to-month tenancies). There is no rent control in Saskatchewan - landlords may increase rent by any amount with proper notice. Security deposits are capped at one month\'s rent and must be held by the landlord with interest paid at a rate set annually by the government. The ORT handles disputes through a hearing process that is faster and less formal than court.',
      highlights: [
        'No rent control - increases permitted with one rental period\'s notice',
        'Security deposit capped at one month\'s rent with mandatory interest',
        'Office of Residential Tenancies (ORT) for dispute resolution',
        'Written lease required for tenancies over one year',
        'Landlord must provide 24 hours\' notice before entry',
        'Move-out inspection required within one week of vacancy',
      ],
    },
    valueProps: [
      {
        icon: CheckCircle2,
        title: 'ORT Dispute Preparation',
        description:
          'Evidence packages, payment histories, and inspection reports formatted for ORT hearings. Application tracking from filing to order with deadline alerts.',
      },
      {
        icon: FileText,
        title: 'Saskatchewan Notice Automation',
        description:
          'Generate rent increase notices, termination notices, and entry notices with correct notice periods calculated automatically under the SK Residential Tenancies Act.',
      },
      {
        icon: Shield,
        title: 'Security Deposit Interest Tracking',
        description:
          'Automatic interest calculation at the provincially prescribed rate. Move-out inspection workflows and deposit return within the legislated timeline.',
      },
      {
        icon: Clock,
        title: 'Interac Rent Collection',
        description:
          'Native Interac e-Transfer for rent collection with automatic reconciliation, NSF tracking, and ORT-ready payment histories for dispute applications.',
      },
    ],
    cities: [
      { name: 'Saskatoon', slug: 'saskatoon' },
      { name: 'Regina', slug: 'regina' },
      { name: 'Prince Albert', slug: 'prince-albert' },
      { name: 'Moose Jaw', slug: 'moose-jaw' },
    ],
    ctaText: 'Start managing properties in Saskatchewan',
  },

  'new-brunswick': {
    name: 'New Brunswick',
    slug: 'new-brunswick',
    abbreviation: 'NB',
    heroSubtitle:
      'New Brunswick\'s growing rental market with Residential Tenancies Tribunal oversight, rent increase rules, and bilingual document requirements.',
    regulation: {
      title: 'Residential Tenancies Act (NB) & Residential Tenancies Tribunal',
      body: 'New Brunswick residential tenancies are governed by the Residential Tenancies Act and regulated by the Residential Tenancies Tribunal (RTT). New Brunswick introduced rent increase caps in 2022, limiting annual increases to a percentage set by the province. Landlords must give at least two months\' notice for rent increases using prescribed forms. Security deposits are capped at one month\'s rent and must be deposited with the Residential Tenancies Tribunal within 15 days. The RTT handles all disputes including evictions, deposit claims, and rent increase challenges. Bilingual (English/French) documentation is common given NB\'s official bilingualism.',
      highlights: [
        'Rent increase cap set annually by the province (introduced 2022)',
        'Two months\' notice required for rent increases',
        'Security deposit capped at one month\'s rent, held by RTT',
        'Deposits must be filed with RTT within 15 days of receipt',
        'Residential Tenancies Tribunal for all dispute resolution',
        'Bilingual documentation common (official bilingualism)',
      ],
    },
    valueProps: [
      {
        icon: CheckCircle2,
        title: 'NB Rent Cap Compliance',
        description:
          'Annual rent increase cap applied automatically to scheduled increases. Notices generated with correct cap percentages and two-month notice periods.',
      },
      {
        icon: FileText,
        title: 'RTT Deposit Filing Workflows',
        description:
          'Security deposit tracking with RTT filing reminders within the 15-day window. Move-out reconciliation and return workflows within legislated timelines.',
      },
      {
        icon: Shield,
        title: 'Bilingual Document Generation',
        description:
          'Notices, lease agreements, and tenant communications generated in English and French to meet New Brunswick\'s bilingual requirements.',
      },
      {
        icon: Clock,
        title: 'RTT Dispute Documentation',
        description:
          'Evidence packages formatted for Residential Tenancies Tribunal hearings: payment histories, inspection reports, and maintenance logs in required format.',
      },
    ],
    cities: [
      { name: 'Moncton', slug: 'moncton' },
      { name: 'Saint John', slug: 'saint-john' },
      { name: 'Fredericton', slug: 'fredericton' },
      { name: 'Dieppe', slug: 'dieppe' },
    ],
    ctaText: 'Start managing properties in New Brunswick',
  },

  'prince-edward-island': {
    name: 'Prince Edward Island',
    slug: 'prince-edward-island',
    abbreviation: 'PE',
    heroSubtitle:
      'PEI\'s tight rental market with IRAC-administered rent control, strict vacancy decontrol rules, and island-specific compliance requirements.',
    regulation: {
      title: 'Rental of Residential Property Act & Island Regulatory and Appeals Commission (IRAC)',
      body: 'Prince Edward Island residential tenancies are governed by the Rental of Residential Property Act and administered by the Island Regulatory and Appeals Commission (IRAC). PEI has rent control: annual rent increases are capped at a percentage set by IRAC each year. Landlords must apply to IRAC for above-guideline increases. Security deposits are capped at one month\'s rent. The Residential Rental Property Board (a division of IRAC) handles disputes. PEI\'s small size and tight housing market mean vacancy rates have been among the lowest in Canada, driving significant regulatory attention to tenant protections.',
      highlights: [
        'Rent control: annual cap set by IRAC (applies to all rental units)',
        'Above-guideline increases require IRAC application',
        'Security deposit capped at one month\'s rent',
        'IRAC Residential Rental Property Board for dispute resolution',
        'Three months\' notice to end a year-to-year tenancy',
        'Landlord must provide 24 hours\' notice before entry',
      ],
    },
    valueProps: [
      {
        icon: CheckCircle2,
        title: 'IRAC Rent Cap Tracking',
        description:
          'Annual IRAC rent increase cap applied automatically. Above-guideline application documentation prepared when capital improvements or extraordinary costs justify it.',
      },
      {
        icon: FileText,
        title: 'PEI Lease & Notice Templates',
        description:
          'Current PEI-compliant lease agreements and notice forms. Correct notice periods for termination, rent increases, and entry built into every workflow.',
      },
      {
        icon: Shield,
        title: 'IRAC Dispute Preparation',
        description:
          'Evidence packages formatted for IRAC Residential Rental Property Board hearings. Payment histories, maintenance records, and inspection reports organized automatically.',
      },
      {
        icon: Clock,
        title: 'Island-Specific Compliance Calendar',
        description:
          'PEI-specific deadlines for rent increase notices, deposit returns, and IRAC filings tracked in one compliance calendar with automated reminders.',
      },
    ],
    cities: [
      { name: 'Charlottetown', slug: 'charlottetown' },
      { name: 'Summerside', slug: 'summerside' },
      { name: 'Stratford', slug: 'stratford' },
    ],
    ctaText: 'Start managing properties in Prince Edward Island',
  },

  'newfoundland-and-labrador': {
    name: 'Newfoundland and Labrador',
    slug: 'newfoundland-and-labrador',
    abbreviation: 'NL',
    heroSubtitle:
      'Newfoundland and Labrador\'s affordable rental market with Residential Tenancies Act compliance, Service NL oversight, and no rent control.',
    regulation: {
      title: 'Residential Tenancies Act (NL) & Service NL',
      body: 'Newfoundland and Labrador residential tenancies are governed by the Residential Tenancies Act, 2000 and administered by the Residential Tenancy Enforcement Unit within Service NL. There is no rent control in NL - landlords can increase rent by any amount with proper notice. Rent increases require at least six months\' written notice for yearly tenancies and three months\' for monthly tenancies. Security deposits are capped at 75% of one month\'s rent. The Residential Tenancy Enforcement Unit investigates complaints and can issue compliance orders. Disputes may also be resolved through Small Claims Court.',
      highlights: [
        'No rent control - increases permitted with 3-6 months\' notice',
        'Security deposit capped at 75% of one month\'s rent',
        'Service NL Residential Tenancy Enforcement Unit',
        'Six months\' notice for yearly tenancy rent increases',
        'Three months\' notice for monthly tenancy rent increases',
        'Small Claims Court available for disputes up to $25,000',
      ],
    },
    valueProps: [
      {
        icon: CheckCircle2,
        title: 'NL Notice Period Automation',
        description:
          'Correct notice periods calculated automatically: six months for yearly tenancies, three months for monthly. Notices generated with legislated wording and delivery confirmation.',
      },
      {
        icon: FileText,
        title: 'Service NL Compliance',
        description:
          'Documentation formatted for Service NL Residential Tenancy Enforcement Unit investigations. Payment histories, maintenance logs, and inspection records organized automatically.',
      },
      {
        icon: Shield,
        title: '75% Deposit Cap Tracking',
        description:
          'Security deposit collection enforced at the 75% cap. Move-out inspection workflows and deposit return within the legislated 15-business-day timeline.',
      },
      {
        icon: Clock,
        title: 'Interac Rent Collection',
        description:
          'Native Interac e-Transfer for rent collection with automatic reconciliation, late payment tracking, and enforcement-ready payment histories.',
      },
    ],
    cities: [
      { name: "St. John's", slug: 'st-johns' },
      { name: 'Mount Pearl', slug: 'mount-pearl' },
      { name: 'Corner Brook', slug: 'corner-brook' },
      { name: 'Paradise', slug: 'paradise' },
    ],
    ctaText: 'Start managing properties in Newfoundland and Labrador',
  },
} as const

type ProvinceSlug = keyof typeof provinceData

const slugList = Object.keys(provinceData) as ProvinceSlug[]

// ─────────────────────────────────────────────────────────────────────────────
// Static generation
// ─────────────────────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return slugList.map((slug) => ({ province: slug }))
}

// ─────────────────────────────────────────────────────────────────────────────
// Metadata
// ─────────────────────────────────────────────────────────────────────────────

type Props = {
  params: Promise<{ province: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { province } = await params
  const data = provinceData[province as ProvinceSlug]

  if (!data) {
    return { title: 'Province Not Found | Revun' }
  }

  const title = `Property Management in ${data.name} | Revun`
  const description = `Revun handles ${data.regulation.title} compliance for ${data.name} property managers. ${data.heroSubtitle}`
  const url = buildCanonicalUrl(`/ca/${data.slug}`)

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Page component
// ─────────────────────────────────────────────────────────────────────────────

export default async function ProvincePage({ params }: Props) {
  const { province } = await params
  const data = provinceData[province as ProvinceSlug]

  if (!data) {
    notFound()
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Canada', url: 'https://revun.com/ca/' },
              { name: data.name, url: `https://revun.com/ca/${data.slug}/` },
            ])
          ),
        }}
      />
      {/* ── Hero ── */}
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              Canada / {data.name}
            </p>
            <h1 className="font-display font-extrabold text-4xl text-[#0A1628] sm:text-5xl lg:text-6xl">
              Property Management in{' '}
              <span className="text-brand-blue">{data.name}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[#555860]">
              {data.heroSubtitle}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors duration-100 hover:bg-brand-blue-dark"
              >
                {data.ctaText}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/ca/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors duration-100 hover:border-[#E5E7EB] hover:text-[#555860]"
              >
                All Provinces
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Regulation Summary ── */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <RevealOnScroll>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              Regulatory Framework
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
              {data.regulation.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#475569]">
              {data.regulation.body}
            </p>
          </RevealOnScroll>

          <RevealOnScroll className="mt-10">
            <div className="rounded-2xl border border-border bg-brand-off-white p-8">
              <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-brand-blue">
                Key Rules at a Glance
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {data.regulation.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                    <span className="text-sm text-[#334155]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Value Props ── */}
      <section className="bg-brand-off-white py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mb-8 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
                Built for {data.name}
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
                How Revun handles{' '}
                <span className="text-brand-blue">{data.abbreviation}</span> compliance
              </h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {data.valueProps.map((prop) => {
                const Icon = prop.icon
                return (
                  <div
                    key={prop.title}
                    className="flex flex-col rounded-2xl border border-border bg-white p-7"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                      <Icon className="h-5 w-5 text-brand-blue" />
                    </div>
                    <h3 className="mb-2 font-heading text-base font-bold text-brand-graphite">
                      {prop.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#475569]">
                      {prop.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Cities Grid ── */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mb-10 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
                Coverage
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
                Cities we cover in{' '}
                <span className="text-brand-blue">{data.name}</span>
              </h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.07}>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {data.cities.map((city) => (
                <div key={city.slug}>
                  <Link
                    href={`/ca/${data.slug}/${city.slug}/`}
                    className="group flex items-center gap-3 rounded-xl border border-border bg-brand-off-white px-5 py-4 transition-colors duration-100 hover:border-brand-blue-light hover:bg-white"
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-brand-blue" />
                    <span className="font-heading text-sm font-semibold text-brand-graphite transition-colors duration-100 group-hover:text-brand-blue">
                      {city.name}
                    </span>
                    <ArrowRight className="ml-auto h-3.5 w-3.5 text-[#94A3B8] transition-transform duration-100 group-hover:translate-x-0.5 group-hover:text-brand-blue" />
                  </Link>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#176FEB] py-12 md:py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="font-heading font-extrabold text-4xl tracking-tight text-white md:text-5xl">
              Ready to manage {data.name} properties the right way?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-white/80">
              Revun handles {data.regulation.title.split('&')[0].trim()} compliance so you can
              focus on your portfolio.
            </p>
            <div className="mt-10">
              <Link
                href="/contact/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-8 text-base font-semibold text-[#176FEB] transition-colors duration-100 hover:bg-white/90"
              >
                {data.ctaText}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
