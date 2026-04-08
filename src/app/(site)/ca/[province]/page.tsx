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
        'LTB Application (A1–A4) filing for disputes',
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
      { name: 'Ottawa', slug: 'ottawa' },
      { name: 'Mississauga', slug: 'mississauga' },
      { name: 'Hamilton', slug: 'hamilton' },
      { name: 'London', slug: 'london' },
      { name: 'Vaughan', slug: 'vaughan' },
      { name: 'Brampton', slug: 'brampton' },
      { name: 'Kitchener', slug: 'kitchener' },
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
      { name: 'Surrey', slug: 'surrey' },
      { name: 'Burnaby', slug: 'burnaby' },
      { name: 'Richmond', slug: 'richmond' },
      { name: 'Victoria', slug: 'victoria' },
      { name: 'Kelowna', slug: 'kelowna' },
      { name: 'Abbotsford', slug: 'abbotsford' },
      { name: 'Langley', slug: 'langley' },
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
          'Prescribed notice periods (3–6 months depending on lease type) with correct TAL wording. Tenant response tracking for accepted, refused, or negotiated outcomes.',
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
        'No rent control — increases permitted with 3 months\' written notice',
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
      <section className="bg-brand-navy">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-blue-light">
              Canada / {data.name}
            </p>
            <h1 className="font-heading font-extrabold text-4xl text-white sm:text-5xl lg:text-6xl">
              Property Management in{' '}
              <span className="text-brand-blue-light">{data.name}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[#D3D5DB]">
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
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-8 text-base font-semibold text-white transition-colors duration-100 hover:border-white/40 hover:text-white/90"
              >
                All Provinces
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Regulation Summary ── */}
      <section className="bg-white py-20">
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
      <section className="bg-brand-off-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mb-12 text-center">
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
      <section className="bg-white py-20">
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
      <section className="bg-brand-navy py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="font-heading font-extrabold text-4xl tracking-tight text-white md:text-5xl">
              Ready to manage {data.name} properties the right way?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-[#D3D5DB]">
              Revun handles {data.regulation.title.split('&')[0].trim()} compliance so you can
              focus on your portfolio.
            </p>
            <div className="mt-10">
              <Link
                href="/contact/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors duration-100 hover:bg-brand-blue-dark"
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
