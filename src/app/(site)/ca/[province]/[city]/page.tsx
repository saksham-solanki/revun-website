import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, TrendingUp, MapPin, FileText, HelpCircle, CheckCircle2 } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildLocalBusinessSchema } from '@/lib/schema-builders'

// ── City data ────────────────────────────────────────────────────────────────

const cityData = {
  toronto: {
    name: 'Toronto',
    province: 'Ontario',
    provinceSlug: 'ontario',
    slug: 'toronto',
    tagline: 'Canada\'s largest rental market, with compliance complexity to match.',
    description:
      'Toronto\'s rental market is the most active in Canada. High demand, low vacancy, and a layered regulatory environment — from provincial RTA requirements to Toronto-specific municipal licensing — means property managers need every process locked down.',
    market: {
      medianRent1BR: '$2,500/mo',
      vacancyRate: '1.4%',
      yoyChange: '+3.2%',
      totalRentalHouseholds: '~470,000',
      context:
        'Toronto\'s vacancy rate has remained below 2% for the better part of a decade. The city draws disproportionate immigration and interprovincial migration, keeping demand structurally high even as new supply hits the market. Downtown condo units dominate new stock while purpose-built rental remains undersupplied relative to demand.',
    },
    neighborhoods: [
      {
        name: 'Downtown Core',
        description:
          'High-rise condos and purpose-built rental towers dominate. Tenants skew young professional and international. Turnover is higher than suburban areas, and many units are investor-owned condos with strata-level rules layered on top of provincial RTA obligations.',
      },
      {
        name: 'North York',
        description:
          'Suburban feel with strong transit access via Yonge-University line. Family-oriented tenant base, longer average tenancies, and a mix of townhouses, mid-rise apartments, and older purpose-built rental stock. Rent growth has been consistent as families priced out of ownership continue renting long-term.',
      },
      {
        name: 'Scarborough',
        description:
          'The most affordable submarket within Toronto proper. Significant diversity and a large proportion of long-term tenants. Vacancy is slightly higher than the city average due to older stock, but demand from Scarborough-based workers and students remains steady.',
      },
      {
        name: 'Etobicoke',
        description:
          'Waterfront access and mid-rise stock attract renters seeking more space at relatively lower price points than the downtown core. The area has seen significant purpose-built rental construction near major transit corridors. Tenant profiles are mixed, including families and older professionals.',
      },
      {
        name: 'Midtown',
        description:
          'Established neighbourhood with excellent transit (Eglinton Crosstown, Yonge subway) and walkable retail. Tenants pay a premium for the combination of transit access, parks, and proximity to employment centres. Heritage buildings require extra maintenance diligence.',
      },
    ],
    services: [
      {
        title: 'N-Form Automation',
        description:
          'Generate N4, N5, N8, and N12 notices automatically from lease and payment data. Every notice is timestamped and filed to the tenant record before it goes out.',
      },
      {
        title: 'LTB Workflow Tracking',
        description:
          'Toronto landlords file more LTB applications than any other city. Revun tracks every open application, scheduled hearing, and outstanding order in one place, with alerts for upcoming deadlines.',
      },
      {
        title: 'Multi-Residential Tax Class Monitoring',
        description:
          'Toronto\'s multi-residential property tax class carries different rates than the residential class. Revun surfaces relevant tax class information during portfolio reporting to avoid surprises at year-end.',
      },
      {
        title: 'Municipal Licensing Compliance',
        description:
          'Certain rental properties in Toronto require a Rental Housing Operator Licence. Revun tracks licence status, expiry dates, and required inspections so nothing lapses.',
      },
    ],
    regulations: [
      {
        title: 'Rental Housing Operator Licence',
        body: 'Toronto requires a Rental Housing Operator Licence for most rental properties with one to six units built before November 15, 2018, and any rental unit created through a conversion or addition. Unlicensed operators face escalating fines. Revun tracks licence expiry and renewal windows for every eligible unit.',
      },
      {
        title: 'Ontario Rent Control Under the RTA',
        body: 'Units first occupied for residential purposes before November 15, 2018 are subject to Ontario\'s rent increase guideline (2.5% for 2024). Units first occupied on or after that date are exempt from rent control. The RTA still governs notice requirements, lease terms, and dispute resolution for all units.',
      },
      {
        title: 'Multi-Residential Property Tax Class',
        body: 'Properties with seven or more rental units are assessed under the multi-residential tax class, which historically carries a higher rate than the residential class. Toronto has been working toward equalizing the rates, but property managers should confirm classification annually with MPAC.',
      },
      {
        title: 'MFIPPA and Tenant Data',
        body: 'The Municipal Freedom of Information and Protection of Privacy Act governs how certain Toronto bodies handle tenant information. Property managers working with social housing or subsidized units administered through the City should understand MFIPPA obligations before sharing tenant records.',
      },
    ],
    faqs: [
      {
        q: 'Do I need a rental licence in Toronto?',
        a: 'Most likely yes if your property has one to six rental units and was built before November 15, 2018, or if you created a rental unit through a conversion, addition, or change of use. The Toronto Rental Housing Operator Licence program enforces standards around unit condition, maintenance, and tenant rights. Fines for non-compliance start at $500 and escalate. Revun tracks licence status so you are never caught off guard.',
      },
      {
        q: 'How does the LTB process work in Toronto specifically?',
        a: 'The Landlord and Tenant Board (LTB) handles all residential tenancy disputes in Ontario, including Toronto. Toronto-area cases are typically heard at the Toronto office at 15 Grosvenor Street. Most hearings are now conducted by videoconference. From filing an application to receiving an order, timelines currently average 4-8 months depending on application type and scheduling. Revun tracks all open applications and flags upcoming hearing dates.',
      },
      {
        q: 'What are average property management fees in Toronto?',
        a: 'Full-service property management in Toronto typically runs 8-12% of gross monthly rent, with some firms charging flat per-unit fees instead. Leasing fees (for finding a new tenant) are usually one month\'s rent. Many managers charge separately for maintenance coordination, lease renewal, and eviction support. These ranges reflect Toronto\'s labour costs and market complexity.',
      },
      {
        q: 'Is rent control applicable to my Toronto property?',
        a: 'It depends on when the unit was first occupied for residential purposes. Units first occupied before November 15, 2018 are subject to Ontario\'s annual rent increase guideline (2.5% for 2024). Units first occupied on or after that date are exempt from guideline limits, though landlords must still give 90 days\' written notice before any increase using an N1 form. Revun generates the correct notice type based on the unit\'s occupancy date.',
      },
      {
        q: 'How does the Vacant Home Tax affect Toronto landlords?',
        a: 'Toronto\'s Vacant Home Tax (VHT) is 3% of a property\'s current value assessment for properties left vacant in the prior year. Landlords must declare occupancy status annually, even if the property is occupied and tax is not owed. Failure to declare results in an automatic tax assessment plus a $250 penalty. Revun\'s compliance calendar includes the annual declaration deadline.',
      },
    ],
  },
  vancouver: {
    name: 'Vancouver',
    province: 'British Columbia',
    provinceSlug: 'british-columbia',
    slug: 'vancouver',
    tagline: 'Canada\'s tightest rental market, with the most layered tax obligations.',
    description:
      'Vancouver consistently records the lowest vacancy rates in Canada. Demand far outstrips supply across every neighbourhood. Property managers here navigate a uniquely layered regulatory environment: provincial tenancy law, strata rental restrictions, the Empty Homes Tax, and the BC Speculation and Vacancy Tax all apply depending on property type and ownership structure.',
    market: {
      medianRent1BR: '$2,800/mo',
      vacancyRate: '0.9%',
      yoyChange: '+2.8%',
      totalRentalHouseholds: '~155,000',
      context:
        'Vancouver\'s sub-1% vacancy rate is structural, not cyclical. Constrained geography (mountains and ocean), restrictive zoning, and sustained immigration pressure have kept vacancy near or below 1% for most of the past decade. Rents have outpaced income growth significantly, and the city\'s rental stock skews heavily toward condominiums whose owners are subject to strata rental restriction bylaws.',
    },
    neighborhoods: [
      {
        name: 'Downtown / West End',
        description:
          'The densest rental market in BC. Highrise condos and older purpose-built rental towers sit side by side. The West End has some of the highest concentrations of purpose-built rental in the city, with long-tenured tenants who pay well below current market rates under rent control. Turnover events command significant above-market rents.',
      },
      {
        name: 'Kitsilano',
        description:
          'Beach proximity and a walkable commercial strip make Kitsilano highly competitive. Rental stock mixes pre-war houses converted to suites, low-rise apartments, and newer infill. Heritage character of some buildings requires additional maintenance planning. Tenants tend to be longer-term and pay a lifestyle premium.',
      },
      {
        name: 'East Vancouver',
        description:
          'The most supply-diverse submarket: detached homes with legal suites, laneway houses, co-ops, and newer mid-rise rentals all compete. Rents run 10-15% below Westside averages, making it the entry point for renters priced out elsewhere. The area has seen significant purpose-built rental construction along arterial transit corridors.',
      },
      {
        name: 'Burnaby',
        description:
          'Technically a separate municipality but functionally part of Greater Vancouver\'s rental market. Metrotown and Brentwood are high-density rental hubs with extensive SkyTrain access. New purpose-built rental towers have added supply but vacancy remains low. Burnaby has its own business licensing requirements for rental operators.',
      },
      {
        name: 'Mount Pleasant',
        description:
          'Vancouver\'s most rapidly gentrifying neighbourhood. Industrial-to-residential conversions and new mixed-use buildings have reshaped the area. Tenants skew creative and tech industry. Rents have risen sharply over five years. The area sits on the Broadway corridor, which is seeing additional density around the new Broadway SkyTrain extension.',
      },
    ],
    services: [
      {
        title: 'Strata Bylaw Compliance Tracking',
        description:
          'Many Vancouver condos restrict rentals through strata bylaws. Revun stores bylaw restrictions per unit, tracks rental exemption status, and alerts when strata AGMs may vote on rental rule changes.',
      },
      {
        title: 'Empty Homes Tax Declaration Calendar',
        description:
          'Vancouver\'s Empty Homes Tax requires an annual occupancy declaration even for fully rented properties. Revun includes the declaration deadline in its compliance calendar with automated reminders 30 and 7 days out.',
      },
      {
        title: 'BC Rent Increase Formula Engine',
        description:
          'BC sets an annual allowable rent increase tied to CPI. Revun calculates the exact permissible amount for each tenancy, generates the RTB-7 notice, and schedules delivery 90 days before the effective date.',
      },
      {
        title: 'RTB Dispute Resolution Workflow',
        description:
          'BC\'s Residential Tenancy Branch handles disputes differently from Ontario\'s LTB. Revun tracks all open RTB applications, dispute resolution hearing dates, and outstanding monetary orders per property.',
      },
    ],
    regulations: [
      {
        title: 'Vancouver Empty Homes Tax (EHT)',
        body: 'Properties left vacant for more than six months of the year are subject to the Empty Homes Tax at 3% of assessed value. All property owners must submit an annual status declaration regardless of occupancy. Failure to declare results in the property being designated vacant and taxed accordingly. Revun\'s compliance calendar tracks the declaration window each year.',
      },
      {
        title: 'BC Speculation and Vacancy Tax',
        body: 'This provincial tax targets foreign owners and satellite families who own residential property in designated urban zones including Metro Vancouver. Canadian citizens and permanent residents who are BC residents are generally exempt, but all property owners in designated areas must complete an annual declaration. The tax rate for foreign owners is 2% of assessed value.',
      },
      {
        title: 'Strata Rental Restrictions',
        body: 'Under BC\'s Strata Property Act, stratas may pass bylaws restricting or prohibiting rentals. However, Bill 44 (2022) limits the ability of stratas to enforce rental restriction bylaws for most properties, with some exemptions for age-restricted stratas. Property managers must know the current bylaw status of each strata property and track any bylaw changes at AGMs.',
      },
      {
        title: 'BC Rent Increase Formula',
        body: 'BC sets an annual allowable rent increase percentage, which has historically been tied to CPI. For 2024, the allowable increase is 3.5%. Landlords must give 90 days\' written notice using the RTB-7 form. Increases cannot occur more than once in a 12-month period. Units first occupied after December 11, 2021 may be exempt from the standard annual limit during initial vacancy.',
      },
    ],
    faqs: [
      {
        q: 'What is the Vancouver Empty Homes Tax and how does it affect rental properties?',
        a: 'The Empty Homes Tax (EHT) is a City of Vancouver tax of 3% of assessed value applied to properties that are vacant for more than six months per calendar year. Fully rented properties are exempt from the tax itself, but every Vancouver property owner must submit an annual occupancy status declaration regardless. Missing the declaration deadline means the City designates the property vacant automatically, triggering the full tax bill plus a $250 late fee. Revun includes the declaration deadline in its compliance calendar.',
      },
      {
        q: 'How do strata rental restrictions work after Bill 44?',
        a: 'BC\'s Bill 44 (2022) significantly curtailed stratas\' ability to enforce rental restriction bylaws. Most stratas can no longer enforce bylaws that prevent owners from renting their units. However, stratas that are exclusively for owner-occupants or age-restricted communities (55+) may retain restrictions. Managers of strata-titled rental units should verify current bylaw status with the strata council and monitor AGM minutes for any proposed changes.',
      },
      {
        q: 'What are typical property management fees in Vancouver?',
        a: 'Full-service property management in Vancouver typically ranges from 8-12% of gross monthly rent. Leasing fees are usually 50-100% of one month\'s rent depending on the manager and property type. Strata-titled rental units often incur additional coordination fees since managers must liaise with the strata council on top of normal landlord-tenant obligations. Vancouver\'s high rents mean dollar-value fees are higher than most Canadian cities even at the same percentage.',
      },
      {
        q: 'How does BC\'s rent increase formula work?',
        a: 'BC allows one rent increase per 12-month period, capped at the annual allowable amount set by the Province each September for the following year. For 2024, the cap is 3.5%. Landlords must give 90 days\' written notice using the RTB-7 form. The notice must specify the date the increase takes effect, and that date must be at least 90 days after the tenant receives the notice. Revun calculates the maximum increase for each tenancy and generates the correctly dated RTB-7.',
      },
      {
        q: 'Does BC\'s Speculation and Vacancy Tax apply to Vancouver rental properties?',
        a: 'The SVT applies in designated areas including Metro Vancouver, Fraser Valley, and several other BC municipalities. Canadian citizens and permanent residents who are BC residents are generally exempt after submitting an annual declaration. Foreign owners and satellite families (those whose income is primarily earned outside Canada) are taxed at 2% of assessed value. All owners in designated areas must declare annually regardless of exemption status.',
      },
    ],
  },
  calgary: {
    name: 'Calgary',
    province: 'Alberta',
    provinceSlug: 'alberta',
    slug: 'calgary',
    tagline: 'Alberta\'s largest city, no rent control, and a rental market shaped by energy sector cycles.',
    description:
      'Calgary operates under Alberta\'s Residential Tenancies Act with no rent control and no provincial vacancy tax. Rental demand is closely tied to energy sector employment cycles, which creates volatility that property managers must plan for. The upside: when the market is strong, landlords retain full flexibility on pricing. Operating costs here are lower than Vancouver or Toronto, and municipal licensing requirements are minimal.',
    market: {
      medianRent1BR: '$1,650/mo',
      vacancyRate: '2.8%',
      yoyChange: '+5.1%',
      totalRentalHouseholds: '~120,000',
      context:
        'Calgary\'s rental market has surged since 2022, driven by strong interprovincial migration from higher-cost provinces and sustained energy sector activity. The 2.8% vacancy rate is near historical lows for Calgary, and rent growth of 5.1% year-over-year reflects a market tightening faster than new supply can offset. The absence of rent control means price signals are efficient, but it also means tenant turnover is more common when rents reset at market.',
    },
    neighborhoods: [
      {
        name: 'Beltline',
        description:
          'Calgary\'s urban core rental district. High-density condos and apartments house young professionals and university-adjacent renters. Walkability and proximity to downtown employment make it the highest-demand submarket in the city. Turnover is common as renters move frequently with career changes.',
      },
      {
        name: 'Kensington',
        description:
          'A trendy, walkable neighbourhood northwest of downtown with a strong independent retail and food scene. Rental stock mixes older walk-up apartments with newer infill. Tenants pay a premium for the neighbourhood feel. Low vacancy and strong demand from renters who prioritize lifestyle over square footage.',
      },
      {
        name: 'Bridgeland',
        description:
          'A riverside community northeast of downtown that has been steadily gentrifying. Older housing stock is being supplemented with new infill and small-format purpose-built rentals. Close to SAIT and the Bow River pathway system. Attracts young professionals and students who want urban access without Beltline pricing.',
      },
      {
        name: 'Southeast Calgary',
        description:
          'A broad suburban area covering communities like Mahogany, Cranston, and Auburn Bay. Family-oriented tenant base with longer average tenancies. Detached homes and townhouses with legal suites are common. Demand is driven by families seeking space and good schools who are not yet able to purchase.',
      },
      {
        name: 'Northwest Calgary',
        description:
          'Established communities including Varsity, Dalhousie, and Edgemont. Mix of older purpose-built apartment stock and basement suites in detached homes. Proximity to the University of Calgary and SAIT drives steady student rental demand alongside longer-term professional tenants.',
      },
    ],
    services: [
      {
        title: 'No Rent Control: Market-Rate Repricing',
        description:
          'With no rent control in Alberta, Revun enables systematic rent reviews at each lease renewal, generating market-rate analysis and updated lease terms that reflect current conditions.',
      },
      {
        title: 'Energy Sector Vacancy Planning',
        description:
          'Calgary\'s energy sector drives cyclical vacancy spikes. Revun\'s occupancy forecasting flags tenancies approaching renewal in historically volatile periods so you can line up replacement tenants early.',
      },
      {
        title: 'Alberta-Specific Notice Automation',
        description:
          'Generate correctly dated RTDRS notices, security deposit statements, and periodic tenancy renewal forms compliant with the Alberta Residential Tenancies Act.',
      },
      {
        title: 'Utility Cost Tracking',
        description:
          'Calgary\'s deregulated energy market means utility costs in non-inclusive rentals fluctuate significantly. Revun tracks utility pass-through structures and flags anomalies in landlord-paid utility accounts.',
      },
    ],
    regulations: [
      {
        title: 'No Rent Control in Alberta',
        body: 'Alberta has no rent control legislation. Landlords may increase rent by any amount with proper notice: at least 365 days\' written notice for a periodic tenancy (monthly or weekly) with no increase within the first year of tenancy. For a fixed-term tenancy, rent cannot be increased during the fixed term. When a fixed term ends and converts to periodic, the 365-day clock starts fresh.',
      },
      {
        title: 'Security Deposit Rules',
        body: 'Security deposits in Alberta are capped at one month\'s rent. The deposit must be held in a trust account or in a prescribed manner. Landlords have 10 business days after the tenant vacates (or after reaching agreement on damages) to either return the deposit with a written statement of deductions or apply to the RTDRS for permission to keep it. Failure to meet this deadline forfeits the right to deductions.',
      },
      {
        title: 'RTDRS: Residential Tenancy Dispute Resolution Service',
        body: 'Alberta\'s RTDRS is a faster alternative to the courts for residential tenancy disputes. Applications can be resolved in 30-90 days, significantly faster than court proceedings. Hearings are conducted in-person or by telephone. Either party may apply for orders related to rent arrears, security deposits, termination, and repairs. Revun tracks all open RTDRS applications and hearing dates.',
      },
      {
        title: 'Calgary-Specific Utility Considerations',
        body: 'Alberta\'s electricity and natural gas markets are partially deregulated, meaning utility costs in landlord-paid rental units can fluctuate considerably based on commodity pricing. Calgary also charges separately for water, wastewater, and waste collection. Property managers should explicitly define which utilities are included in rent and track cost trends to protect NOI in landlord-paid scenarios.',
      },
    ],
    faqs: [
      {
        q: 'Is there rent control in Calgary?',
        a: 'No. Alberta has no rent control legislation, and Calgary has no additional municipal restrictions. Landlords can set any rent they choose for new tenancies and can increase rent for existing tenants with proper notice. The notice requirement for a periodic tenancy is 365 days\' written notice, and no increase is permitted within the first year of the tenancy. Revun tracks the 365-day notice window for each active tenancy and generates the required written notice.',
      },
      {
        q: 'What notice is required to increase rent in Alberta?',
        a: 'For a monthly (periodic) tenancy, landlords must give at least 365 days\' written notice of a rent increase, and the increase cannot take effect within the first year of the tenancy. For a fixed-term tenancy, rent cannot be increased during the term. When a fixed term ends and the tenancy becomes periodic, the 365-day requirement applies to any subsequent increase. There is no cap on the amount of increase. Revun generates the notice on the correct form and schedules it for the appropriate window.',
      },
      {
        q: 'How do energy sector cycles affect Calgary rental properties?',
        a: 'Calgary\'s rental market is materially linked to oil and gas employment. Energy sector downturns (2015-2016 and 2020) drove vacancy rates above 6% citywide, pushing rents down 10-20% in some submarkets. Recoveries have been sharp: the current cycle has compressed vacancy to near-historic lows. Property managers with Calgary portfolios should maintain a vacancy reserve, avoid excessively long fixed-term leases during strong market periods, and use Revun\'s occupancy forecasting to identify renewal risk before it becomes vacancy.',
      },
      {
        q: 'What are the security deposit rules in Alberta?',
        a: 'Security deposits in Alberta are capped at one month\'s rent and must be held in a trust account or in the manner prescribed by regulation. At the end of a tenancy, landlords have 10 business days from the date the tenant vacates (or from the date a damages agreement is reached) to return the deposit with a written statement of deductions, or to apply to the RTDRS. Missing the 10-business-day deadline means the landlord loses the right to claim any deductions. Revun tracks move-out dates and sends compliance alerts before the deadline.',
      },
      {
        q: 'Does Calgary require any municipal rental licensing?',
        a: 'No. Calgary does not require a general rental housing operator licence for standard residential rental properties. There are business licence requirements for specific use types (short-term rentals, rooming houses) but standard long-term residential rental in Calgary does not require municipal licensing. This contrasts with Toronto and some other Canadian cities. Landlords in Calgary operate primarily under the provincial Residential Tenancies Act.',
      },
    ],
  },
} as const

type CitySlug = keyof typeof cityData
type ProvinceSlug = 'ontario' | 'british-columbia' | 'alberta'

const validCombinations: Record<ProvinceSlug, CitySlug[]> = {
  ontario: ['toronto'],
  'british-columbia': ['vancouver'],
  alberta: ['calgary'],
}

// ── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return [
    { province: 'ontario', city: 'toronto' },
    { province: 'british-columbia', city: 'vancouver' },
    { province: 'alberta', city: 'calgary' },
  ]
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ province: string; city: string }>
}): Promise<Metadata> {
  const { province, city } = await params
  const data = cityData[city as CitySlug]
  if (!data) return { title: 'Not Found' }

  const canonical = buildCanonicalUrl(`/ca/${province}/${city}`)

  return {
    title: `Property Management in ${data.name} | Revun`,
    description: `Revun helps ${data.name} property managers handle compliance, rent collection, and tenant communication. Local market data, ${data.province}-specific workflows, and city-level regulatory tools built in.`,
    alternates: { canonical },
    openGraph: {
      title: `Property Management in ${data.name} | Revun`,
      description: data.tagline,
      url: canonical,
    },
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function CityPage({
  params,
}: {
  params: Promise<{ province: string; city: string }>
}) {
  const { province, city } = await params

  const provinceValid = validCombinations[province as ProvinceSlug]
  if (!provinceValid || !provinceValid.includes(city as CitySlug)) {
    notFound()
  }

  const data = cityData[city as CitySlug]

  // JSON-LD FAQPage schema
  const faqSchema = sanitizeJsonLd({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  })

  const breadcrumbSchema = sanitizeJsonLd(
    buildBreadcrumbSchema([
      { name: 'Home', url: 'https://revun.com/' },
      { name: 'Canada', url: 'https://revun.com/ca/' },
      { name: data.province, url: `https://revun.com/ca/${data.provinceSlug}/` },
      { name: data.name, url: `https://revun.com/ca/${data.provinceSlug}/${data.slug}/` },
    ])
  )

  const localBusinessSchema = sanitizeJsonLd(
    buildLocalBusinessSchema({
      name: `Revun - ${data.name}`,
      city: data.name,
      province: data.province,
      country: 'CA',
    })
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: localBusinessSchema }}
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-navy">
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-brand-blue-light">
              <MapPin className="size-4" />
              <span>{data.province}, Canada</span>
            </div>
            <h1 className="font-heading font-extrabold text-4xl text-white sm:text-5xl lg:text-6xl">
              Property Management{' '}
              <span className="text-brand-blue-light">in {data.name}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#D3D5DB]">
              {data.tagline}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors hover:bg-brand-blue-dark"
              >
                Book a Demo
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href={`/ca/${data.provinceSlug}/`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-brand-blue/30 px-8 text-base font-semibold text-[#D3D5DB] transition-colors hover:border-brand-blue-light hover:text-white"
              >
                {data.province} Overview
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Market Data ───────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              Market Snapshot
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
              The {data.name}{' '}
              <span className="text-brand-blue">rental market</span> in numbers
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-border bg-brand-off-white p-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-off-white0">
                  Median 1BR Rent
                </p>
                <p className="mt-2 font-heading text-3xl font-bold text-brand-graphite">
                  {data.market.medianRent1BR}
                </p>
                <p className="mt-1 text-xs text-brand-off-white0">City average, all unit types</p>
              </div>
              <div className="rounded-2xl border border-border bg-brand-off-white p-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-off-white0">
                  Vacancy Rate
                </p>
                <p className="mt-2 font-heading text-3xl font-bold text-brand-graphite">
                  {data.market.vacancyRate}
                </p>
                <p className="mt-1 text-xs text-brand-off-white0">CMHC primary rental market</p>
              </div>
              <div className="rounded-2xl border border-border bg-brand-off-white p-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-off-white0">
                  YoY Rent Change
                </p>
                <p className="mt-2 font-heading text-3xl font-bold text-brand-blue">
                  {data.market.yoyChange}
                </p>
                <p className="mt-1 text-xs text-brand-off-white0">Annual asking rent growth</p>
              </div>
              <div className="rounded-2xl border border-border bg-brand-off-white p-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-off-white0">
                  Rental Households
                </p>
                <p className="mt-2 font-heading text-3xl font-bold text-brand-graphite">
                  {data.market.totalRentalHouseholds}
                </p>
                <p className="mt-1 text-xs text-brand-off-white0">City census area estimate</p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="mt-12">
            <div className="rounded-2xl border border-border bg-brand-off-white p-8">
              <div className="flex items-start gap-4">
                <TrendingUp className="mt-1 size-5 shrink-0 text-brand-blue" />
                <p className="text-sm leading-relaxed text-[#475569]">
                  {data.market.context}
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Neighborhoods ─────────────────────────────────────────────────── */}
      <section className="bg-brand-off-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              Neighbourhood Guide
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
              {data.name} neighbourhoods{' '}
              <span className="text-brand-blue">property managers</span> operate in
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.neighborhoods.map((n) => (
                <div
                  key={n.name}
                  className="rounded-2xl border border-border bg-white p-7"
                >
                  <h3 className="mb-3 font-heading text-lg font-bold text-brand-graphite">
                    {n.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#475569]">
                    {n.description}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── City-Specific Services ─────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              Built for {data.name}
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
              How Revun handles{' '}
              <span className="text-brand-blue">{data.name}-specific</span> complexity
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-2">
              {data.services.map((s) => (
                <div
                  key={s.title}
                  className="flex gap-5 rounded-2xl border border-border bg-brand-off-white p-7"
                >
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-blue" />
                  <div>
                    <h3 className="mb-2 font-heading text-base font-bold text-brand-graphite">
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#475569]">
                      {s.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Local Regulations ─────────────────────────────────────────────── */}
      <section className="bg-brand-off-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              Regulatory Landscape
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
              {data.name} rental{' '}
              <span className="text-brand-blue">regulations</span> you need to know
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-2">
              {data.regulations.map((r) => (
                <div
                  key={r.title}
                  className="rounded-2xl border border-border bg-white p-7"
                >
                  <div className="mb-4 flex items-start gap-3">
                    <FileText className="mt-0.5 size-5 shrink-0 text-brand-blue" />
                    <h3 className="font-heading text-base font-bold text-brand-graphite">
                      {r.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#475569]">{r.body}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <RevealOnScroll className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              FAQ
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-graphite md:text-4xl">
              {data.name} property management{' '}
              <span className="text-brand-blue">questions</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="flex flex-col gap-5">
              {data.faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-border bg-brand-off-white p-7"
                >
                  <div className="flex items-start gap-4">
                    <HelpCircle className="mt-0.5 size-5 shrink-0 text-brand-blue" />
                    <div>
                      <h3 className="mb-3 font-heading text-base font-bold text-brand-graphite">
                        {faq.q}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#475569]">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-navy py-24 md:py-32">
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-blue-light">
              {data.name} Property Managers
            </p>
            <h2 className="font-heading font-extrabold text-4xl tracking-tight text-white md:text-5xl">
              Run your {data.name} portfolio{' '}
              <span className="text-brand-blue-light">without the paperwork</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-[#D3D5DB]">
              {data.province}-specific compliance, local regulatory workflows, and rent
              collection built for how {data.name} landlords actually operate.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors hover:bg-brand-blue-dark"
              >
                Book a Demo
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/pricing/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-brand-blue/30 px-8 text-base font-semibold text-[#D3D5DB] transition-colors hover:border-brand-blue-light hover:text-white"
              >
                View Pricing
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
