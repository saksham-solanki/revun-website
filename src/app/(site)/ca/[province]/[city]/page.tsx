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
      'Toronto\'s rental market is the most active in Canada. High demand, low vacancy, and a layered regulatory environment - from provincial RTA requirements to Toronto-specific municipal licensing - means property managers need every process locked down.',
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
  saskatoon: {
    name: 'Saskatoon',
    province: 'Saskatchewan',
    provinceSlug: 'saskatchewan',
    slug: 'saskatoon',
    tagline: 'Saskatchewan\'s largest city, with a stable rental market and no rent control.',
    description:
      'Saskatoon is Saskatchewan\'s economic hub, driven by potash mining, agriculture, and a growing tech sector. The rental market is steady with moderate rents and manageable vacancy. Property managers operate under the Residential Tenancies Act, 2006 with the Office of Residential Tenancies (ORT) handling disputes. No rent control means pricing flexibility, but proper notice procedures are strictly enforced.',
    market: {
      medianRent1BR: '$1,100/mo',
      vacancyRate: '4.2%',
      yoyChange: '+3.1%',
      totalRentalHouseholds: '~38,000',
      context:
        'Saskatoon\'s rental market has been gradually tightening since 2022, driven by interprovincial migration from higher-cost provinces and steady university enrollment at the University of Saskatchewan. The potash and uranium mining sectors provide employment stability that supports consistent rental demand. New purpose-built rental construction has been modest, keeping vacancy in the 4-5% range citywide.',
    },
    neighborhoods: [
      {
        name: 'Broadway / Nutana',
        description:
          'Saskatoon\'s trendiest neighbourhood with a walkable commercial strip, independent restaurants, and proximity to the river. Rental stock mixes older character homes with legal suites and newer infill. Tenants skew young professional and pay a premium for the neighbourhood feel. Low turnover once tenants secure a unit.',
      },
      {
        name: 'City Park / Varsity View',
        description:
          'Adjacent to the University of Saskatchewan campus, this area sees strong student rental demand from September through April. Mix of older apartments, basement suites, and purpose-built student housing. Seasonal vacancy patterns require proactive turnover planning for summer months.',
      },
      {
        name: 'Stonebridge',
        description:
          'One of Saskatoon\'s newest suburban developments with family-oriented townhouses and detached homes with legal suites. Longer average tenancies and stable demand from families who are renting before purchasing. Newer building stock means lower maintenance costs.',
      },
      {
        name: 'Confederation Park',
        description:
          'Established suburban neighbourhood with a mix of older apartment buildings and single-family homes with basement suites. Affordable rents attract longer-term tenants. Proximity to shopping and transit corridors along 22nd Street keeps demand consistent.',
      },
      {
        name: 'Downtown Saskatoon',
        description:
          'Growing condo and apartment market in the city core. New mixed-use developments are adding rental supply near the River Landing area. Tenants include young professionals and government workers. Walkability and proximity to employment centres command modest rent premiums over suburban areas.',
      },
    ],
    services: [
      {
        title: 'ORT Dispute Resolution Support',
        description:
          'Evidence packages, payment histories, and inspection reports formatted for Office of Residential Tenancies hearings. Application tracking from filing to order with deadline alerts.',
      },
      {
        title: 'No Rent Control: Market-Rate Repricing',
        description:
          'Saskatchewan has no rent control. Revun enables systematic rent reviews at each lease renewal with market comparables and generates compliant rent increase notices with the required one-month notice period.',
      },
      {
        title: 'Security Deposit Interest Tracking',
        description:
          'Automatic interest calculation at the provincially prescribed rate on security deposits held. Move-out inspection workflows and deposit return within the legislated timeline.',
      },
      {
        title: 'University Tenant Turnover Planning',
        description:
          'Saskatoon\'s university-driven rental market creates predictable September-April demand cycles. Revun flags upcoming lease expirations in student-heavy areas and automates early renewal or re-listing workflows.',
      },
    ],
    regulations: [
      {
        title: 'No Rent Control in Saskatchewan',
        body: 'Saskatchewan has no rent control legislation. Landlords may increase rent by any amount with proper notice: one full rental period\'s written notice (typically one month for month-to-month tenancies). Rent increases cannot occur more frequently than once every 12 months. Revun tracks the 12-month window for each tenancy and generates the required written notice.',
      },
      {
        title: 'Security Deposit Rules',
        body: 'Security deposits in Saskatchewan are capped at one month\'s rent. Landlords must pay interest at the rate prescribed annually by the provincial government. At the end of a tenancy, landlords have seven business days after the move-out inspection to return the deposit or provide a written statement of deductions. Failure to conduct a move-out inspection within one week of vacancy limits the landlord\'s ability to claim deductions.',
      },
      {
        title: 'Office of Residential Tenancies (ORT)',
        body: 'The ORT is Saskatchewan\'s dispute resolution body for residential tenancies. It handles applications for rent arrears, security deposits, repairs, termination, and other tenancy disputes. Hearings are less formal than court and typically resolved within 30-60 days. Either party may apply. Revun tracks all open ORT applications and hearing dates with automated reminders.',
      },
    ],
    faqs: [
      {
        q: 'Is there rent control in Saskatoon?',
        a: 'No. Saskatchewan has no rent control. Landlords can increase rent by any amount with one full rental period\'s written notice, and increases cannot occur more than once every 12 months. Revun tracks notice windows and generates compliant written notices automatically.',
      },
      {
        q: 'What are the security deposit rules in Saskatchewan?',
        a: 'Security deposits are capped at one month\'s rent with mandatory interest at the provincially prescribed rate. Landlords have seven business days after the move-out inspection to return the deposit or provide a written statement of deductions. Revun calculates interest, tracks move-out dates, and sends compliance alerts.',
      },
      {
        q: 'How does the ORT dispute process work in Saskatoon?',
        a: 'The Office of Residential Tenancies handles all residential tenancy disputes in Saskatchewan. Applications can be filed online or in person and are typically resolved within 30-60 days through a hearing process. Revun tracks open applications, hearing dates, and deadlines.',
      },
      {
        q: 'What are typical property management fees in Saskatoon?',
        a: 'Full-service property management in Saskatoon typically runs 8-12% of gross monthly rent. Leasing fees for finding new tenants are usually 50-100% of one month\'s rent. Some firms offer flat per-unit fees. Saskatoon\'s lower rents compared to Vancouver or Toronto mean lower dollar-value fees even at similar percentages.',
      },
      {
        q: 'How does the university affect Saskatoon\'s rental market?',
        a: 'The University of Saskatchewan drives significant seasonal demand, particularly in neighbourhoods like Varsity View and City Park. Rental demand peaks in August-September and can soften in April-May as students leave. Property managers should plan for summer turnover in student-heavy areas and consider 12-month leases to reduce vacancy risk.',
      },
    ],
  },
  regina: {
    name: 'Regina',
    province: 'Saskatchewan',
    provinceSlug: 'saskatchewan',
    slug: 'regina',
    tagline: 'Saskatchewan\'s capital with government-sector stability and affordable rents.',
    description:
      'Regina\'s rental market benefits from government employment stability as the provincial capital. Rents are among the most affordable in Western Canada, and vacancy has been tightening as interprovincial migration increases. Property managers operate under the same Residential Tenancies Act, 2006 as Saskatoon, with ORT dispute resolution and no rent control.',
    market: {
      medianRent1BR: '$1,050/mo',
      vacancyRate: '4.8%',
      yoyChange: '+2.6%',
      totalRentalHouseholds: '~28,000',
      context:
        'Regina\'s rental market is anchored by government employment and the energy sector. The city has seen steady population growth from immigration programs targeting Saskatchewan. Vacancy has been gradually declining from its 2016-2018 highs. New rental construction has been limited, which should support continued rent growth as demand increases. The city\'s compact geography keeps commute times short, making all neighbourhoods viable for renters.',
    },
    neighborhoods: [
      {
        name: 'Cathedral',
        description:
          'Regina\'s most walkable neighbourhood with tree-lined streets, independent shops, and a strong sense of community. Older character homes with legal suites dominate the rental stock. Tenants tend to be longer-term and value the neighbourhood feel. Rents are slightly above city average for the character premium.',
      },
      {
        name: 'Downtown Regina',
        description:
          'The city\'s commercial core with a growing apartment market. Proximity to government offices, SaskTel Centre, and the revitalized City Square Plaza draws young professionals. New mixed-use developments are adding modern rental supply. Weekday foot traffic is strong; weekend activity is more limited.',
      },
      {
        name: 'Harbour Landing',
        description:
          'Regina\'s newest master-planned community in the southeast. Modern townhouses and apartments attract families and young professionals. Strong retail amenities and proximity to the Global Transportation Hub. Longer average tenancies and newer building stock keep maintenance costs manageable.',
      },
      {
        name: 'North Central',
        description:
          'One of Regina\'s most affordable rental areas with the highest concentration of rental housing. Older housing stock requires more maintenance attention. Strong demand from tenants seeking affordability. The area has seen targeted revitalization investment in recent years.',
      },
      {
        name: 'East Regina / Glencairn',
        description:
          'Established residential area with a mix of single-family homes with basement suites and older apartment buildings. Affordable rents and proximity to industrial employment areas. Stable, long-term tenant base with lower turnover than central neighbourhoods.',
      },
    ],
    services: [
      {
        title: 'ORT Dispute Resolution Support',
        description:
          'Evidence packages and payment histories formatted for Office of Residential Tenancies hearings. Application tracking and deadline alerts for all open disputes.',
      },
      {
        title: 'Government Tenant Workflows',
        description:
          'Regina\'s government employment base means many tenants have stable, long-term leases. Revun optimizes for lease renewal workflows and long-tenancy maintenance scheduling that matches the city\'s tenant profile.',
      },
      {
        title: 'Saskatchewan Notice Automation',
        description:
          'Generate rent increase notices, termination notices, and entry notices with correct notice periods calculated automatically under the SK Residential Tenancies Act.',
      },
      {
        title: 'Interac Rent Collection',
        description:
          'Native Interac e-Transfer for rent collection with automatic reconciliation, late payment tracking, and ORT-ready payment histories for dispute applications.',
      },
    ],
    regulations: [
      {
        title: 'No Rent Control in Saskatchewan',
        body: 'Saskatchewan has no rent control. Landlords may increase rent by any amount with one full rental period\'s written notice. Increases cannot occur more than once every 12 months. Revun tracks notice windows and generates compliant written notices for each tenancy.',
      },
      {
        title: 'Security Deposit Rules',
        body: 'Security deposits are capped at one month\'s rent with mandatory interest at the provincially prescribed rate. Landlords have seven business days after the move-out inspection to return the deposit with a written statement of deductions. Move-out inspections must occur within one week of vacancy.',
      },
      {
        title: 'Condition Reports Required',
        body: 'Saskatchewan requires condition reports at the start and end of each tenancy. Both parties should sign the move-in condition report. The move-out condition report is compared against the move-in report to determine deposit deductions. Revun generates and stores condition reports digitally with photo documentation.',
      },
    ],
    faqs: [
      {
        q: 'What are average rents in Regina?',
        a: 'Average one-bedroom rents in Regina are approximately $1,050/month, making it one of the most affordable rental markets in Western Canada. Two-bedroom units average around $1,250/month. Rents vary by neighbourhood, with Cathedral and Downtown commanding modest premiums over suburban areas.',
      },
      {
        q: 'How does government employment affect Regina\'s rental market?',
        a: 'As Saskatchewan\'s capital, Regina has a large government employment base that provides rental market stability. Government workers tend to have longer tenancies and reliable income. This reduces turnover and creates a more predictable revenue stream for property managers.',
      },
      {
        q: 'What notice is required to increase rent in Regina?',
        a: 'Landlords must give one full rental period\'s written notice (typically one month for month-to-month tenancies) for any rent increase. Increases cannot occur more than once every 12 months. There is no cap on the amount of increase. Revun generates compliant notices and tracks the 12-month window.',
      },
      {
        q: 'Are condition reports mandatory in Saskatchewan?',
        a: 'Yes. Condition reports are required at the start and end of each tenancy. Both parties should sign the move-in report. The move-out report is used to assess deposit deductions. Revun generates digital condition reports with photo documentation and stores them for each unit.',
      },
      {
        q: 'What are typical property management fees in Regina?',
        a: 'Full-service property management in Regina typically runs 8-12% of gross monthly rent. Some managers charge flat per-unit fees. Leasing fees are usually 50-100% of one month\'s rent. Regina\'s affordable rent levels mean lower absolute fees compared to larger Canadian cities.',
      },
    ],
  },
  moncton: {
    name: 'Moncton',
    province: 'New Brunswick',
    provinceSlug: 'new-brunswick',
    slug: 'moncton',
    tagline: 'New Brunswick\'s fastest-growing city, with rising rents and RTT-administered compliance.',
    description:
      'Moncton has emerged as one of Atlantic Canada\'s most dynamic rental markets, driven by immigration, interprovincial migration from higher-cost provinces, and a growing bilingual workforce. The Residential Tenancies Tribunal (RTT) administers disputes, and New Brunswick\'s rent increase cap program applies to all residential units. Property managers must navigate bilingual documentation requirements given NB\'s official bilingualism.',
    market: {
      medianRent1BR: '$1,000/mo',
      vacancyRate: '2.5%',
      yoyChange: '+5.8%',
      totalRentalHouseholds: '~22,000',
      context:
        'Moncton has been one of Canada\'s fastest-growing census metropolitan areas, with population growth driven by international immigration and Atlantic Immigration Program participants. Vacancy has compressed from above 6% in 2018 to below 3% by 2024. Rent growth has been among the strongest in Atlantic Canada, prompting the provincial government to introduce rent increase caps. New purpose-built rental construction is increasing but not yet sufficient to offset demand.',
    },
    neighborhoods: [
      {
        name: 'Downtown Moncton',
        description:
          'The city\'s commercial and cultural centre with a growing number of mixed-use developments. Main Street has been revitalized with restaurants, galleries, and co-working spaces. Young professionals and newcomers to Canada gravitate to the walkable core. Rents are the highest in the city but still well below national averages.',
      },
      {
        name: 'North End',
        description:
          'Primarily residential with a mix of older single-family homes with rental suites and small apartment buildings. The area has seen targeted investment and is slowly gentrifying. Affordable rents attract a diverse tenant base including families and students from Universite de Moncton.',
      },
      {
        name: 'Magnetic Hill Area',
        description:
          'Suburban growth area in Moncton\'s northwest with newer housing stock. Family-oriented tenants seeking space and proximity to schools. Longer average tenancies and lower maintenance costs due to newer construction. The area benefits from proximity to major retail and the Magnetic Hill tourism corridor.',
      },
      {
        name: 'Riverview (Adjacent)',
        description:
          'Technically a separate town but functionally part of Greater Moncton. Residential community across the Petitcodiac River with strong family appeal. Lower rents than Moncton proper with good school access. Many rental units are basement suites or secondary suites in single-family homes.',
      },
      {
        name: 'Dieppe (Adjacent)',
        description:
          'Predominantly francophone community adjacent to Moncton with strong population growth. New retail developments at Champlain Place area. Bilingual documentation is especially important in Dieppe. Growing rental supply from new construction near the Moncton airport corridor.',
      },
    ],
    services: [
      {
        title: 'NB Rent Cap Compliance',
        description:
          'New Brunswick\'s rent increase cap applied automatically to all scheduled increases. Notices generated with correct cap percentages and required two-month notice periods.',
      },
      {
        title: 'RTT Deposit Filing Workflows',
        description:
          'Security deposit tracking with Residential Tenancies Tribunal filing reminders within the 15-day window. Move-out reconciliation and return workflows within legislated timelines.',
      },
      {
        title: 'Bilingual Document Generation',
        description:
          'All notices, lease agreements, and tenant communications generated in English and French to meet New Brunswick\'s bilingual requirements. Particularly important for Dieppe and francophone tenant populations.',
      },
      {
        title: 'Immigration Tenant Onboarding',
        description:
          'Moncton\'s significant immigration-driven growth means many new tenants are unfamiliar with Canadian tenancy norms. Revun supports multilingual onboarding workflows and clear documentation of rights and obligations.',
      },
    ],
    regulations: [
      {
        title: 'NB Rent Increase Cap',
        body: 'New Brunswick introduced rent increase caps in 2022, limiting annual increases to a percentage set by the province. Landlords must give at least two months\' notice for rent increases using prescribed forms. The cap applies to all residential rental units. Revun tracks the annual cap rate and generates compliant notices automatically.',
      },
      {
        title: 'Security Deposit Rules',
        body: 'Security deposits in New Brunswick are capped at one month\'s rent and must be deposited with the Residential Tenancies Tribunal within 15 days of receipt. The RTT holds the deposit and interest until the end of the tenancy. This is unique to NB - the landlord does not retain the deposit. Revun tracks the 15-day filing deadline and manages the return process through RTT.',
      },
      {
        title: 'Residential Tenancies Tribunal',
        body: 'The RTT handles all residential tenancy disputes in New Brunswick including evictions, rent increase challenges, deposit claims, and repair orders. Applications can be filed online. Hearings are typically resolved within 30-60 days. Revun tracks all open RTT applications, hearing dates, and order compliance deadlines.',
      },
    ],
    faqs: [
      {
        q: 'Is there rent control in Moncton?',
        a: 'Yes. New Brunswick introduced rent increase caps in 2022 that apply province-wide including Moncton. Annual rent increases are limited to a percentage set by the province each year. Landlords must give at least two months\' notice. Revun applies the current cap rate automatically and generates compliant notices.',
      },
      {
        q: 'How do security deposits work in New Brunswick?',
        a: 'Security deposits are capped at one month\'s rent and must be deposited with the Residential Tenancies Tribunal within 15 days of receipt. Unlike most provinces, the landlord does not hold the deposit - the RTT holds it. Revun tracks the 15-day filing deadline and manages the return process.',
      },
      {
        q: 'Why is Moncton\'s rental market growing so fast?',
        a: 'Moncton has benefited from international immigration (particularly through the Atlantic Immigration Program), interprovincial migration from higher-cost provinces like Ontario and BC, and a growing bilingual workforce. Population growth has outpaced rental supply, compressing vacancy below 3% and driving rents up significantly.',
      },
      {
        q: 'Do I need bilingual leases in Moncton?',
        a: 'New Brunswick is officially bilingual. While not legally required for all private rental agreements, providing bilingual documentation is standard practice and expected by many tenants, especially in areas like Dieppe. Revun generates all documents in English and French.',
      },
      {
        q: 'What are typical property management fees in Moncton?',
        a: 'Full-service property management in Moncton typically runs 8-12% of gross monthly rent. The city\'s rapidly growing market has attracted more PM firms, increasing competition. Leasing fees are usually 50-100% of one month\'s rent.',
      },
    ],
  },
  'saint-john': {
    name: 'Saint John',
    province: 'New Brunswick',
    provinceSlug: 'new-brunswick',
    slug: 'saint-john',
    tagline: 'New Brunswick\'s port city with affordable rents and industrial-sector rental demand.',
    description:
      'Saint John is New Brunswick\'s largest city by area and its primary port and industrial centre. The rental market is affordable by Canadian standards, with demand driven by the Irving group of companies and related industrial employment. The RTT administers tenancy disputes, and the provincial rent cap program applies. Older housing stock in many neighbourhoods requires more active maintenance management.',
    market: {
      medianRent1BR: '$950/mo',
      vacancyRate: '5.2%',
      yoyChange: '+2.1%',
      totalRentalHouseholds: '~18,000',
      context:
        'Saint John\'s rental market is more affordable and less competitive than Moncton\'s, with vacancy still above 5% citywide. The city\'s economy is tied to industrial activity, particularly Irving-related enterprises. Population growth has been more modest than Moncton, but immigration programs are beginning to shift the trend. Older purpose-built rental stock in the south end and uptown areas requires ongoing maintenance investment.',
    },
    neighborhoods: [
      {
        name: 'Uptown Saint John',
        description:
          'The city\'s historic commercial core along King and Prince William streets. Heritage buildings converted to residential lofts and newer condo developments. Young professionals and newcomers are drawn to the walkability and waterfront access. Rents are the highest in the city but remain affordable by national standards.',
      },
      {
        name: 'South End',
        description:
          'Established residential neighbourhood near the harbour with older Victorian housing stock. Many homes have been converted to multi-unit rentals. The area is gentrifying slowly, with increasing demand from young professionals. Heritage building maintenance requires specialized attention.',
      },
      {
        name: 'East Side',
        description:
          'Working-class neighbourhood with affordable rents and proximity to industrial employment areas. Older apartment buildings and single-family rentals. Stable, long-term tenant base. The area benefits from lower vacancy than other affordable submarkets.',
      },
      {
        name: 'West Side',
        description:
          'Residential area across the harbour connected by the Harbour Bridge. More suburban feel with single-family homes and smaller apartment buildings. Family-oriented tenant base with longer tenancies. Rents are among the most affordable in the city.',
      },
      {
        name: 'Millidgeville / North End',
        description:
          'Growing area near the University of New Brunswick Saint John campus. Student rental demand supplements the general market. Mix of newer townhouse developments and older housing stock. Proximity to shopping centres along Millidge Avenue provides good amenities.',
      },
    ],
    services: [
      {
        title: 'NB Rent Cap Compliance',
        description:
          'Provincial rent increase cap applied automatically. Notices generated with correct percentages and two-month notice periods per NB legislation.',
      },
      {
        title: 'Heritage Building Maintenance',
        description:
          'Saint John\'s older housing stock requires proactive maintenance scheduling. Revun tracks seasonal maintenance tasks, vendor dispatch for heritage-appropriate repairs, and capital expenditure planning for aging buildings.',
      },
      {
        title: 'RTT Dispute Documentation',
        description:
          'Evidence packages formatted for Residential Tenancies Tribunal hearings with payment histories, inspection reports, and maintenance logs.',
      },
      {
        title: 'Interac Rent Collection',
        description:
          'Native Interac e-Transfer for rent collection with automatic reconciliation, late payment tracking, and RTT-ready payment histories for dispute applications.',
      },
    ],
    regulations: [
      {
        title: 'NB Rent Increase Cap',
        body: 'New Brunswick\'s rent increase cap applies to all residential rental units in Saint John. Annual increases are limited to the provincially set percentage. Landlords must provide two months\' notice using prescribed forms. Revun tracks the current cap rate and generates compliant notices.',
      },
      {
        title: 'Security Deposit Filing with RTT',
        body: 'Security deposits (max one month\'s rent) must be filed with the Residential Tenancies Tribunal within 15 days of receipt. The RTT holds the deposit throughout the tenancy. Revun tracks the 15-day filing deadline and manages the return process.',
      },
      {
        title: 'Heritage Building Considerations',
        body: 'Saint John has a significant inventory of heritage buildings, some subject to municipal heritage conservation requirements. Renovations or exterior modifications may require Heritage Development Board approval. Property managers should verify heritage status before planning capital improvements. Revun flags heritage-designated properties in portfolio reporting.',
      },
    ],
    faqs: [
      {
        q: 'How affordable is Saint John compared to other Canadian cities?',
        a: 'Saint John offers some of the most affordable rents in Canada, with average one-bedroom units around $950/month. This is roughly 60% below Toronto and 65% below Vancouver. The trade-off is lower population growth and higher vacancy, though both metrics are improving.',
      },
      {
        q: 'What industries drive Saint John\'s rental demand?',
        a: 'The Irving group of companies (oil refining, forestry, shipbuilding) is the dominant employer. Government services, healthcare at Saint John Regional Hospital, and the University of New Brunswick Saint John campus also contribute to rental demand. Industrial employment creates a stable, if cyclical, tenant base.',
      },
      {
        q: 'Do the NB rent caps apply in Saint John?',
        a: 'Yes. New Brunswick\'s rent increase caps apply province-wide including Saint John. Annual increases are limited to the provincially set percentage with two months\' notice required. Revun applies the current cap rate automatically.',
      },
      {
        q: 'How does the RTT deposit system work?',
        a: 'Unlike most provinces where landlords hold deposits, New Brunswick requires deposits to be filed with the Residential Tenancies Tribunal within 15 days of receipt. The RTT holds the deposit and accrued interest until the tenancy ends. Revun tracks the filing deadline and manages the return process.',
      },
      {
        q: 'Is Saint John\'s older housing stock a concern for property managers?',
        a: 'Saint John has a higher proportion of pre-1970 housing stock than most Canadian cities, particularly in the South End and Uptown areas. This requires more proactive maintenance management, heritage-sensitive renovations, and capital planning. Revun\'s maintenance scheduling and vendor dispatch help manage aging stock efficiently.',
      },
    ],
  },
  fredericton: {
    name: 'Fredericton',
    province: 'New Brunswick',
    provinceSlug: 'new-brunswick',
    slug: 'fredericton',
    tagline: 'New Brunswick\'s capital with university-driven demand and government stability.',
    description:
      'Fredericton is New Brunswick\'s capital and home to two universities (UNB and STU), creating a dual demand base of government workers and students. The rental market is moderately competitive with rents below the national average. RTT-administered compliance and the provincial rent cap apply. The city\'s compact size makes it manageable for property managers with smaller portfolios.',
    market: {
      medianRent1BR: '$1,050/mo',
      vacancyRate: '3.8%',
      yoyChange: '+4.2%',
      totalRentalHouseholds: '~16,000',
      context:
        'Fredericton\'s rental market has tightened notably since 2021, driven by immigration, university enrollment growth, and government employment stability. Vacancy has dropped from above 6% to below 4%. The city\'s two universities (University of New Brunswick and St. Thomas University) create predictable seasonal demand patterns. New rental construction has been modest but targeted at the student and young professional segments.',
    },
    neighborhoods: [
      {
        name: 'Downtown / Waterfront',
        description:
          'The city\'s commercial core along the Saint John River. Mix of heritage buildings, newer apartments, and government offices. Strong demand from government workers and professionals. Walkable with good access to restaurants, shops, and the Beaverbrook Art Gallery area.',
      },
      {
        name: 'University Area (UNB/STU)',
        description:
          'The neighbourhood surrounding the University of New Brunswick and St. Thomas University campuses on the hill. High student rental demand September through April. Mix of older homes with rental suites and purpose-built student housing. Seasonal vacancy patterns require turnover planning.',
      },
      {
        name: 'Southside / Forest Hill',
        description:
          'Residential area south of the river with a more suburban feel. Family-oriented tenants with longer tenancies. Mix of single-family homes with suites and townhouses. Proximity to schools and parks makes it attractive for renting families.',
      },
      {
        name: 'Northside',
        description:
          'Across the river from downtown, the Northside offers more affordable rents. Mix of older apartment buildings and single-family homes. Good access to the Trans-Canada Highway and industrial areas. Stable tenant base with lower turnover than student areas.',
      },
      {
        name: 'Knowledge Park / Prospect',
        description:
          'Newer development area in Fredericton\'s west end, anchored by the Knowledge Park technology campus. Growing rental demand from tech workers and professionals. Newer building stock with modern amenities. The area is still developing, which means evolving tenant demographics.',
      },
    ],
    services: [
      {
        title: 'NB Rent Cap Compliance',
        description:
          'Provincial rent increase cap applied automatically to all scheduled increases. Notices generated with correct cap percentages and two-month notice periods.',
      },
      {
        title: 'University Turnover Management',
        description:
          'Fredericton\'s dual-university market creates predictable September-April demand cycles. Revun automates early renewal workflows, summer re-listing, and turnover coordination for student-heavy portfolios.',
      },
      {
        title: 'Bilingual Document Generation',
        description:
          'Notices, leases, and tenant communications in English and French to meet New Brunswick\'s bilingual requirements and serve Fredericton\'s francophone population.',
      },
      {
        title: 'RTT Dispute Documentation',
        description:
          'Evidence packages formatted for Residential Tenancies Tribunal hearings with payment histories, inspection reports, and maintenance logs.',
      },
    ],
    regulations: [
      {
        title: 'NB Rent Increase Cap',
        body: 'New Brunswick\'s rent increase cap applies province-wide including Fredericton. Annual increases are limited to the provincially set percentage with two months\' notice required. Revun tracks the cap rate and generates compliant notices.',
      },
      {
        title: 'Security Deposit Filing with RTT',
        body: 'Security deposits (max one month\'s rent) must be filed with the Residential Tenancies Tribunal within 15 days of receipt. The RTT holds the deposit throughout the tenancy. Revun tracks the filing deadline.',
      },
      {
        title: 'Student Tenancy Considerations',
        body: 'Fredericton\'s significant student rental population creates specific compliance considerations. Fixed-term leases aligned to academic years (September-April) are common. The Residential Tenancies Act applies equally to student and non-student tenancies - there are no separate rules for student housing. Revun handles fixed-term lease tracking and end-of-term workflows.',
      },
    ],
    faqs: [
      {
        q: 'How do the universities affect Fredericton\'s rental market?',
        a: 'UNB and St. Thomas University together bring thousands of students who need off-campus housing. This creates strong September-April demand, particularly near campus. Property managers in the university area should plan for summer vacancy and use 12-month leases where possible to reduce turnover.',
      },
      {
        q: 'Is Fredericton\'s rental market competitive?',
        a: 'Fredericton\'s vacancy has dropped below 4%, making it more competitive than it was five years ago. Rents have grown over 4% year-over-year. The combination of government stability, university enrollment, and immigration is tightening the market. It remains more affordable than most major Canadian markets.',
      },
      {
        q: 'Do NB rent caps apply to student housing?',
        a: 'Yes. New Brunswick\'s rent increase caps apply to all residential rental units province-wide, including student rentals. There is no exemption for student housing. Landlords must comply with the annual cap and provide two months\' notice for any increase.',
      },
      {
        q: 'What are typical property management fees in Fredericton?',
        a: 'Property management fees in Fredericton typically range from 8-12% of gross monthly rent. The smaller market size means fewer PM firms, but competition is increasing as the rental market grows. Student-focused portfolios may command slightly higher management fees due to increased turnover.',
      },
      {
        q: 'Is bilingual documentation required in Fredericton?',
        a: 'New Brunswick is Canada\'s only officially bilingual province. While not legally required for all private leases, bilingual documentation is standard practice and expected. Fredericton has a notable francophone population. Revun generates all documents in English and French.',
      },
    ],
  },
  charlottetown: {
    name: 'Charlottetown',
    province: 'Prince Edward Island',
    provinceSlug: 'prince-edward-island',
    slug: 'charlottetown',
    tagline: 'PEI\'s capital with Canada\'s tightest per-capita rental market and IRAC rent control.',
    description:
      'Charlottetown is PEI\'s largest municipality and the epicentre of the island\'s housing crunch. Rapid population growth from immigration has outpaced housing supply, driving vacancy to near-zero levels. IRAC administers rent control with annual allowable increases, and property managers must navigate some of Canada\'s strictest tenant protection regulations. Despite its small size, Charlottetown requires the same level of compliance diligence as any major Canadian city.',
    market: {
      medianRent1BR: '$1,200/mo',
      vacancyRate: '1.1%',
      yoyChange: '+6.2%',
      totalRentalHouseholds: '~10,000',
      context:
        'Charlottetown has experienced the most dramatic rental market tightening of any Atlantic Canadian city. Immigration, particularly through the PEI Provincial Nominee Program, has driven population growth well beyond what the housing stock can absorb. Vacancy has been below 2% since 2020. IRAC rent control has limited landlords\' ability to reprice at market rates, creating a gap between controlled rents and market rents for new tenancies. New construction is accelerating but remains insufficient.',
    },
    neighborhoods: [
      {
        name: 'Downtown Charlottetown',
        description:
          'The historic centre with Victorian-era row houses, boutique shops, and the waterfront boardwalk. Many heritage homes have been converted to multi-unit rentals. The area attracts tourists in summer and students year-round (UPEI and Holland College are nearby). Rents are the highest on the island. Heritage building maintenance requires careful attention.',
      },
      {
        name: 'University Avenue Corridor',
        description:
          'The main commercial and institutional corridor running from downtown toward UPEI. Mixed-use buildings, older apartment stock, and newer student-oriented developments. High rental demand from university students and hospital workers (Queen Elizabeth Hospital is on this corridor). Seasonal demand patterns from the academic calendar.',
      },
      {
        name: 'West Royalty / Sherwood',
        description:
          'Suburban growth area north of downtown. Newer housing stock including townhouses and small apartment buildings. Family-oriented tenants with longer average tenancies. Proximity to big-box retail and the Trans-Canada Highway. Growing rental inventory as new subdivisions add secondary suites.',
      },
      {
        name: 'East Royalty / Hillsborough Park',
        description:
          'Established residential area east of downtown. Mix of older single-family homes with rental suites and small apartment buildings. More affordable rents than downtown. Stable tenant base including families and retirees. The area benefits from proximity to Charlottetown Airport.',
      },
      {
        name: 'Stratford (Adjacent)',
        description:
          'Growing community across the Hillsborough Bridge from Charlottetown. Rapid residential development with modern housing stock. Family appeal with newer schools and amenities. Technically a separate municipality but functionally part of the Charlottetown rental market. Rents are slightly below Charlottetown proper.',
      },
    ],
    services: [
      {
        title: 'IRAC Rent Cap Tracking',
        description:
          'Annual IRAC rent increase cap applied automatically to all scheduled increases. Above-guideline application documentation prepared when capital improvements or extraordinary costs justify it.',
      },
      {
        title: 'PEI Lease & Notice Templates',
        description:
          'Current PEI-compliant lease agreements and notice forms. Correct notice periods for termination, rent increases, and entry built into every workflow.',
      },
      {
        title: 'IRAC Dispute Preparation',
        description:
          'Evidence packages formatted for IRAC Residential Rental Property Board hearings. Payment histories, maintenance records, and inspection reports organized automatically.',
      },
      {
        title: 'Immigration Tenant Onboarding',
        description:
          'Charlottetown\'s rapid immigration-driven growth means many tenants are new to Canadian tenancy norms. Revun supports multilingual onboarding workflows and clear documentation.',
      },
    ],
    regulations: [
      {
        title: 'IRAC Rent Control',
        body: 'PEI\'s rent control applies to all residential rental units. Annual rent increases are capped at a percentage set by IRAC each year. Landlords must apply to IRAC for above-guideline increases supported by documented capital expenditures or extraordinary costs. Revun tracks the annual cap, generates compliant notices, and prepares above-guideline application packages.',
      },
      {
        title: 'Security Deposit Rules',
        body: 'Security deposits in PEI are capped at one month\'s rent. Landlords must provide a receipt. Deposits must be returned within 10 days of the end of the tenancy or the landlord must provide a statement of claim. IRAC handles disputes over deposit deductions.',
      },
      {
        title: 'Vacancy Decontrol Limits',
        body: 'PEI\'s rent control framework includes provisions around vacancy decontrol that limit how much landlords can increase rent between tenancies. The specifics are set by IRAC regulations and can change. Property managers must verify current vacancy decontrol rules before repricing a unit after a tenant moves out. Revun tracks current IRAC guidelines.',
      },
    ],
    faqs: [
      {
        q: 'How tight is Charlottetown\'s rental market?',
        a: 'Charlottetown has one of the tightest rental markets in Canada per capita, with vacancy below 2% since 2020. Immigration has driven population growth well beyond what housing supply can absorb. Finding a vacant unit is difficult for tenants, which means very low turnover for landlords.',
      },
      {
        q: 'How does IRAC rent control work?',
        a: 'IRAC sets an annual allowable rent increase percentage that applies to all residential rental units in PEI. Landlords can apply for above-guideline increases if they have documented capital expenditures or extraordinary costs. Revun applies the current cap automatically and prepares above-guideline applications when needed.',
      },
      {
        q: 'Can I increase rent to market rate when a tenant moves out?',
        a: 'PEI\'s vacancy decontrol rules may limit how much you can increase rent between tenancies. The specifics depend on current IRAC regulations. You should verify the current rules before repricing a vacant unit. Revun tracks IRAC guidelines and flags repricing limits during turnover workflows.',
      },
      {
        q: 'What are typical property management fees in Charlottetown?',
        a: 'Property management fees in Charlottetown typically range from 8-12% of gross monthly rent. The small market size means fewer PM firms, but the tight market and rent control complexity make professional management valuable. Some managers charge flat per-unit fees.',
      },
      {
        q: 'How does immigration affect Charlottetown\'s rental market?',
        a: 'PEI\'s Provincial Nominee Program has driven significant population growth, particularly in Charlottetown. Many newcomers rent for their first several years in Canada. This has been the primary driver of vacancy compression and rent growth. Property managers should be prepared for multicultural tenant populations and multilingual communication needs.',
      },
    ],
  },
  'st-johns': {
    name: "St. John's",
    province: 'Newfoundland and Labrador',
    provinceSlug: 'newfoundland-and-labrador',
    slug: 'st-johns',
    tagline: 'Newfoundland\'s capital with affordable rents and offshore energy sector rental demand.',
    description:
      'St. John\'s is the economic centre of Newfoundland and Labrador, with rental demand tied to the offshore oil and gas industry, Memorial University, and government services. The market is affordable by Canadian standards with no rent control. Property managers operate under the Residential Tenancies Act with Service NL oversight. The city\'s unique geography and weather create specific property maintenance considerations.',
    market: {
      medianRent1BR: '$950/mo',
      vacancyRate: '5.8%',
      yoyChange: '+1.8%',
      totalRentalHouseholds: '~22,000',
      context:
        'St. John\'s rental market has been recovering from the 2015-2020 energy sector downturn that pushed vacancy above 8%. The current 5.8% vacancy rate reflects a market still finding equilibrium. Offshore oil projects (Hebron, Terra Nova FPSO return) are stabilizing demand. Memorial University enrollment provides a consistent baseline. Rents remain among the most affordable of any Canadian provincial capital, attracting interprovincial migrants seeking lower cost of living.',
    },
    neighborhoods: [
      {
        name: 'Downtown / George Street',
        description:
          'St. John\'s historic downtown with colourful row houses, steep streets, and the famous George Street entertainment district. Older housing stock with character but requiring maintenance attention. Strong demand from young professionals and Memorial University students. Heritage building rules apply to many properties in the area.',
      },
      {
        name: 'Churchill Square / Elizabeth Avenue',
        description:
          'Commercial corridor with proximity to Memorial University campus and the Health Sciences Centre. Mix of apartment buildings and converted homes. Student rental demand is strong along Elizabeth Avenue. Medical professionals and university staff create a stable secondary tenant base.',
      },
      {
        name: 'Kenmount Road / Stavanger Drive',
        description:
          'Suburban commercial area with newer apartment developments and townhouses. Proximity to retail and offices. Attracts young professionals and families. Modern building stock means lower maintenance costs. Growing rental inventory from new construction.',
      },
      {
        name: 'Mount Pearl (Adjacent)',
        description:
          'Suburban municipality adjacent to St. John\'s with a family-oriented tenant base. Mix of older apartment buildings and single-family homes with suites. More affordable than St. John\'s proper. Long average tenancies and stable demand. Good school access makes it attractive for families.',
      },
      {
        name: 'Paradise (Adjacent)',
        description:
          'Rapidly growing suburban community north of St. John\'s. Newest housing stock in the metro area with modern amenities. Family-oriented with longer tenancies. Higher rents than older areas but lower maintenance costs. Limited rental supply makes vacancy low despite higher price points.',
      },
    ],
    services: [
      {
        title: 'NL Notice Period Automation',
        description:
          'Correct notice periods calculated automatically: six months for yearly tenancies, three months for monthly. Notices generated with legislated wording and delivery confirmation.',
      },
      {
        title: 'Offshore Energy Tenant Workflows',
        description:
          'St. John\'s energy sector means many tenants work rotational schedules (2 weeks on, 2 weeks off). Revun supports rent collection and communication workflows adapted to rotational worker patterns.',
      },
      {
        title: '75% Deposit Cap Tracking',
        description:
          'Security deposit collection enforced at NL\'s unique 75% of one month\'s rent cap. Move-out inspection workflows and deposit return within the legislated 15-business-day timeline.',
      },
      {
        title: 'Winter Maintenance Scheduling',
        description:
          'St. John\'s extreme winter weather requires proactive maintenance scheduling. Revun automates seasonal maintenance tasks, snow removal vendor dispatch, and freeze-prevention workflows for rental properties.',
      },
    ],
    regulations: [
      {
        title: 'No Rent Control in Newfoundland and Labrador',
        body: 'NL has no rent control. Landlords can increase rent by any amount with proper notice: three months for monthly tenancies, six months for yearly tenancies. No increase is permitted during the first year of a fixed-term tenancy. Revun tracks notice windows and generates compliant written notices.',
      },
      {
        title: '75% Security Deposit Cap',
        body: 'NL caps security deposits at 75% of one month\'s rent - the lowest cap in Canada. Landlords must return deposits within 15 business days of the end of the tenancy or provide a written statement of deductions. Revun enforces the 75% cap during collection and tracks the return deadline.',
      },
      {
        title: 'Service NL Enforcement',
        body: 'The Residential Tenancy Enforcement Unit within Service NL investigates complaints and can issue compliance orders. For monetary disputes exceeding the enforcement unit\'s scope, parties may proceed to Small Claims Court (up to $25,000). Revun tracks open complaints and compliance order deadlines.',
      },
    ],
    faqs: [
      {
        q: 'Is there rent control in St. John\'s?',
        a: 'No. Newfoundland and Labrador has no rent control. Landlords can increase rent by any amount with three months\' notice for monthly tenancies or six months\' notice for yearly tenancies. Revun tracks notice windows and generates compliant notices automatically.',
      },
      {
        q: 'Why is the security deposit cap only 75% in NL?',
        a: 'NL\'s Residential Tenancies Act caps security deposits at 75% of one month\'s rent, making it the lowest cap in Canada. This has been the standard since the Act was last amended. Landlords must work within this limit and can use Revun to enforce the cap during collection.',
      },
      {
        q: 'How does the offshore energy sector affect St. John\'s rentals?',
        a: 'Offshore oil and gas is the dominant economic driver. Energy sector employment creates demand for rentals, but it also creates cyclical risk - the 2015-2020 downturn pushed vacancy above 8%. Many energy workers are on rotational schedules, which creates unique communication and rent collection patterns. Revun supports rotational worker workflows.',
      },
      {
        q: 'What are average rents in St. John\'s?',
        a: 'Average one-bedroom rents in St. John\'s are approximately $950/month, making it one of Canada\'s most affordable provincial capitals. Two-bedroom units average around $1,150/month. The combination of higher vacancy and no rent control means rents are market-driven and responsive to economic conditions.',
      },
      {
        q: 'Does St. John\'s weather affect property management?',
        a: 'Yes, significantly. St. John\'s receives more snow than almost any other Canadian city and is subject to frequent freeze-thaw cycles, ice storms, and high winds. Property managers must plan for snow removal, roof ice dam prevention, frozen pipe mitigation, and storm damage response. Revun\'s seasonal maintenance scheduling helps manage these weather-related requirements.',
      },
    ],
  },
} as const

type CitySlug = keyof typeof cityData
type ProvinceSlug = 'ontario' | 'british-columbia' | 'alberta' | 'saskatchewan' | 'new-brunswick' | 'prince-edward-island' | 'newfoundland-and-labrador'

const validCombinations: Record<ProvinceSlug, CitySlug[]> = {
  ontario: ['toronto'],
  'british-columbia': ['vancouver'],
  alberta: ['calgary'],
  saskatchewan: ['saskatoon', 'regina'],
  'new-brunswick': ['moncton', 'saint-john', 'fredericton'],
  'prince-edward-island': ['charlottetown'],
  'newfoundland-and-labrador': ['st-johns'],
}

// ── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return [
    { province: 'ontario', city: 'toronto' },
    { province: 'british-columbia', city: 'vancouver' },
    { province: 'alberta', city: 'calgary' },
    { province: 'saskatchewan', city: 'saskatoon' },
    { province: 'saskatchewan', city: 'regina' },
    { province: 'new-brunswick', city: 'moncton' },
    { province: 'new-brunswick', city: 'saint-john' },
    { province: 'new-brunswick', city: 'fredericton' },
    { province: 'prince-edward-island', city: 'charlottetown' },
    { province: 'newfoundland-and-labrador', city: 'st-johns' },
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
      <section className="relative overflow-hidden bg-[#F5F6F8]">
        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-16 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-brand-blue">
              <MapPin className="size-4" />
              <span>{data.province}, Canada</span>
            </div>
            <h1 className="font-display font-extrabold text-4xl text-[#0A1628] sm:text-5xl lg:text-6xl">
              Property Management{' '}
              <span className="text-brand-blue">in {data.name}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#555860]">
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
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-brand-blue/30 px-8 text-base font-semibold text-[#555860] transition-colors hover:border-brand-blue-light hover:text-[#0A1628]"
              >
                {data.province} Overview
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Market Data ───────────────────────────────────────────────────── */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll className="mb-8 text-center">
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
                <p className="text-xs font-semibold uppercase tracking-widest text-[#555860]">
                  Median 1BR Rent
                </p>
                <p className="mt-2 font-heading text-3xl font-bold text-brand-graphite">
                  {data.market.medianRent1BR}
                </p>
                <p className="mt-1 text-xs text-[#555860]">City average, all unit types</p>
              </div>
              <div className="rounded-2xl border border-border bg-brand-off-white p-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#555860]">
                  Vacancy Rate
                </p>
                <p className="mt-2 font-heading text-3xl font-bold text-brand-graphite">
                  {data.market.vacancyRate}
                </p>
                <p className="mt-1 text-xs text-[#555860]">CMHC primary rental market</p>
              </div>
              <div className="rounded-2xl border border-border bg-brand-off-white p-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#555860]">
                  YoY Rent Change
                </p>
                <p className="mt-2 font-heading text-3xl font-bold text-brand-blue">
                  {data.market.yoyChange}
                </p>
                <p className="mt-1 text-xs text-[#555860]">Annual asking rent growth</p>
              </div>
              <div className="rounded-2xl border border-border bg-brand-off-white p-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#555860]">
                  Rental Households
                </p>
                <p className="mt-2 font-heading text-3xl font-bold text-brand-graphite">
                  {data.market.totalRentalHouseholds}
                </p>
                <p className="mt-1 text-xs text-[#555860]">City census area estimate</p>
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
      <section className="bg-brand-off-white py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll className="mb-8 text-center">
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
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll className="mb-8 text-center">
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
      <section className="bg-brand-off-white py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll className="mb-8 text-center">
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
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <RevealOnScroll className="mb-8 text-center">
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
      <section className="relative overflow-hidden bg-[#176FEB] py-12 md:py-12">
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/60">
              {data.name} Property Managers
            </p>
            <h2 className="font-heading font-extrabold text-4xl tracking-tight text-white md:text-5xl">
              Run your {data.name} portfolio{' '}
              <span className="text-white/80">without the paperwork</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-white/80">
              {data.province}-specific compliance, local regulatory workflows, and rent
              collection built for how {data.name} landlords actually operate.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-8 text-base font-semibold text-[#176FEB] transition-colors hover:bg-white/90"
              >
                Book a Demo
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/pricing/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-8 text-base font-semibold text-white transition-colors hover:bg-white/10"
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
