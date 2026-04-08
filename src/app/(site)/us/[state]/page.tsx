import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, CheckCircle2, FileText, Shield, Clock } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { notFound } from 'next/navigation'

// ─────────────────────────────────────────────────────────────────────────────
// State data
// ─────────────────────────────────────────────────────────────────────────────

const stateData = {
  florida: {
    name: 'Florida',
    slug: 'florida',
    abbreviation: 'FL',
    heroSubtitle:
      'One of the largest US rental markets with landlord-friendly regulations, Chapter 83 compliance, and HOA coordination built in.',
    regulation: {
      title: 'Florida Residential Landlord and Tenant Act (Chapter 83)',
      body: 'Florida rental relationships are governed by the Florida Residential Landlord and Tenant Act (Chapter 83, Part II, Florida Statutes). Florida has no statewide rent control and preempts local governments from enacting it. Landlords must provide a 60-day written notice for rent increases on month-to-month tenancies. Security deposits must be held in a Florida banking institution and tenants must be notified of the deposit location within 30 days of receipt. Eviction actions are filed through the county court system with a 3-day notice for non-payment of rent.',
      highlights: [
        'No statewide rent control; local rent control preempted',
        '3-day notice for non-payment of rent (excluding weekends/holidays)',
        'Security deposit held in Florida banking institution',
        '60-day written notice for month-to-month rent increases',
        '15-day notice to terminate month-to-month tenancy',
        'Landlord must provide 30-day deposit notice to tenant',
      ],
    },
    valueProps: [
      {
        icon: FileText,
        title: 'Chapter 83 Notice Automation',
        description:
          'Generate 3-day pay-or-quit notices, 7-day cure-or-quit notices, and unconditional quit notices pre-filled with tenant and lease data. Notice periods calculated correctly excluding weekends and holidays.',
      },
      {
        icon: Shield,
        title: 'Security Deposit Compliance',
        description:
          'Deposit tracking with 30-day banking notification letters, interest calculation options, and 15/30-day return window tracking after lease termination with itemized deduction reports.',
      },
      {
        icon: CheckCircle2,
        title: 'HOA & Condo Association Integration',
        description:
          'Florida has more HOA-governed properties than any other state. Revun tracks HOA approval requirements, application fees, and restriction timelines for each managed property.',
      },
      {
        icon: Clock,
        title: 'Hurricane Season Preparedness',
        description:
          'Automated maintenance checklists, emergency contact workflows, and tenant communication templates for hurricane preparedness. Insurance document tracking for each property.',
      },
    ],
    cities: [
      { name: 'Miami', slug: 'miami' },
      { name: 'Orlando', slug: 'orlando' },
      { name: 'Tampa', slug: 'tampa' },
      { name: 'Jacksonville', slug: 'jacksonville' },
      { name: 'St. Petersburg', slug: 'st-petersburg' },
      { name: 'Fort Lauderdale', slug: 'fort-lauderdale' },
      { name: 'West Palm Beach', slug: 'west-palm-beach' },
      { name: 'Hollywood', slug: 'hollywood' },
      { name: 'Pembroke Pines', slug: 'pembroke-pines' },
      { name: 'Tallahassee', slug: 'tallahassee' },
    ],
    ctaText: 'Start managing properties in Florida',
  },

  texas: {
    name: 'Texas',
    slug: 'texas',
    abbreviation: 'TX',
    heroSubtitle:
      'High-growth rental market with no state income tax, strong landlord protections, and Texas Property Code compliance built in.',
    regulation: {
      title: 'Texas Property Code (Title 8) & Texas Landlord-Tenant Law',
      body: 'Texas rental relationships are governed by the Texas Property Code, Title 8, Chapter 92 (Residential Tenancies). Texas is one of the most landlord-friendly states in the US with no rent control, no statewide just-cause eviction requirements, and relatively fast eviction timelines. Landlords must provide a 3-day notice to vacate for non-payment before filing an eviction suit. Security deposits must be returned within 30 days of move-out with an itemized list of deductions. Texas requires landlords to provide tenants with specific statutory disclosures including flood risk information.',
      highlights: [
        'No rent control; state law preempts local rent control ordinances',
        '3-day notice to vacate for non-payment of rent',
        'Security deposit return within 30 days of move-out',
        'No state income tax on rental income',
        'Mandatory flood risk disclosure for tenants',
        'Landlord lien on tenant property permitted under lease terms',
      ],
    },
    valueProps: [
      {
        icon: FileText,
        title: 'Texas Property Code Notice Automation',
        description:
          'Generate 3-day notices to vacate, lease termination notices, and statutory disclosure documents pre-filled with property and tenant data. All notices comply with Texas Property Code requirements.',
      },
      {
        icon: Shield,
        title: 'Property Tax Tracking',
        description:
          'Texas has no state income tax but has among the highest property tax rates nationally. Revun tracks county appraisal district valuations, protest deadlines, and payment schedules across all managed properties.',
      },
      {
        icon: CheckCircle2,
        title: 'Rapid Eviction Workflow',
        description:
          'Texas offers one of the fastest eviction timelines in the US. Revun manages the full workflow from 3-day notice through Justice Court filing, hearing scheduling, and writ of possession tracking.',
      },
      {
        icon: Clock,
        title: 'Multi-Metro Portfolio Support',
        description:
          'Texas portfolios often span multiple metros with different county requirements. Revun adapts notice delivery, filing procedures, and tax schedules by county automatically.',
      },
    ],
    cities: [
      { name: 'Houston', slug: 'houston' },
      { name: 'San Antonio', slug: 'san-antonio' },
      { name: 'Dallas', slug: 'dallas' },
      { name: 'Fort Worth', slug: 'fort-worth' },
      { name: 'Austin', slug: 'austin' },
      { name: 'El Paso', slug: 'el-paso' },
      { name: 'Arlington', slug: 'arlington' },
      { name: 'Corpus Christi', slug: 'corpus-christi' },
      { name: 'Plano', slug: 'plano' },
      { name: 'Frisco', slug: 'frisco' },
    ],
    ctaText: 'Start managing properties in Texas',
  },

  california: {
    name: 'California',
    slug: 'california',
    abbreviation: 'CA',
    heroSubtitle:
      'The largest US rental market with complex tenant protection laws, AB 1482 rent cap compliance, and local ordinance tracking.',
    regulation: {
      title: 'California Civil Code & Tenant Protection Act (AB 1482)',
      body: 'California has among the most comprehensive tenant protection laws in the US. The Tenant Protection Act of 2019 (AB 1482) caps annual rent increases at 5% plus local CPI (max 10%) for covered properties and requires just-cause eviction for tenancies over 12 months. Many cities layer additional local rent stabilization ordinances on top. Security deposits are capped at one month\'s rent for unfurnished units (effective July 2024 under AB 12). Landlords must provide 30-day notice for increases under 10% and 90-day notice for increases of 10% or more.',
      highlights: [
        'AB 1482: rent cap of 5% + CPI (max 10%) for covered properties',
        'Just-cause eviction required after 12 months of tenancy',
        'Security deposit cap: 1 month\'s rent (AB 12, effective July 2024)',
        '30-day notice for rent increases under 10%',
        '90-day notice for rent increases of 10% or more',
        'Local rent stabilization layered in LA, SF, Oakland, San Jose, etc.',
      ],
    },
    valueProps: [
      {
        icon: FileText,
        title: 'AB 1482 Rent Cap Calculator',
        description:
          'Automatic rent increase limits calculated from regional CPI data. Revun determines whether each property is covered under AB 1482 and generates compliant notices with correct periods.',
      },
      {
        icon: Shield,
        title: 'Local Ordinance Compliance',
        description:
          'California has 20+ cities with their own rent stabilization ordinances. Revun tracks which local rules apply to each property and adjusts rent increase limits, notice periods, and eviction requirements accordingly.',
      },
      {
        icon: CheckCircle2,
        title: 'Just-Cause Eviction Workflow',
        description:
          'AB 1482 requires documented just cause for evictions after 12 months. Revun tracks tenancy duration, generates appropriate notices based on at-fault vs. no-fault grounds, and manages relocation assistance calculations.',
      },
      {
        icon: Clock,
        title: 'Habitability & Disclosure Compliance',
        description:
          'California requires extensive property disclosures including lead paint, mold, pest history, and proximity to sex offenders. Revun generates and tracks all required disclosure documents per property.',
      },
    ],
    cities: [
      { name: 'Los Angeles', slug: 'los-angeles' },
      { name: 'San Diego', slug: 'san-diego' },
      { name: 'San Jose', slug: 'san-jose' },
      { name: 'San Francisco', slug: 'san-francisco' },
      { name: 'Sacramento', slug: 'sacramento' },
      { name: 'Fresno', slug: 'fresno' },
      { name: 'Irvine', slug: 'irvine' },
      { name: 'Anaheim', slug: 'anaheim' },
      { name: 'Long Beach', slug: 'long-beach' },
      { name: 'Oakland', slug: 'oakland' },
    ],
    ctaText: 'Start managing properties in California',
  },

  'new-york': {
    name: 'New York',
    slug: 'new-york',
    abbreviation: 'NY',
    heroSubtitle:
      'Dense urban rental market with strict rent stabilization, HSTPA protections, and DHCR compliance workflows included.',
    regulation: {
      title: 'New York Real Property Law & Housing Stability and Tenant Protection Act (HSTPA)',
      body: 'New York has among the most tenant-protective rental laws in the US. The Housing Stability and Tenant Protection Act of 2019 (HSTPA) strengthened rent stabilization, limited security deposits to one month\'s rent, and extended eviction protections statewide. New York City has approximately 1 million rent-stabilized apartments administered by the Division of Housing and Community Renewal (DHCR). Upstate markets operate under state law without additional local rent stabilization. Eviction proceedings go through Housing Court (NYC) or local courts (upstate).',
      highlights: [
        'HSTPA: security deposit capped at one month\'s rent statewide',
        'Rent stabilization for ~1M NYC apartments administered by DHCR',
        '14-day notice required before filing non-payment eviction',
        '30/60/90-day termination notice based on tenancy length',
        'Preferential rent protections under HSTPA',
        'Mandatory lease renewal for rent-stabilized tenants',
      ],
    },
    valueProps: [
      {
        icon: FileText,
        title: 'DHCR Rent Stabilization Tracking',
        description:
          'Track rent-stabilized unit registrations, annual RGB increases, and Individual Apartment Improvement (IAI) calculations. Revun generates DHCR-compliant lease riders and renewal offers automatically.',
      },
      {
        icon: Shield,
        title: 'HSTPA Compliance Engine',
        description:
          'Security deposit limits, late fee caps, and termination notice requirements under HSTPA applied automatically based on tenancy duration and property type.',
      },
      {
        icon: CheckCircle2,
        title: 'Housing Court Workflow',
        description:
          'NYC Housing Court proceedings require meticulous documentation. Revun tracks all open cases, hearing dates, stipulations, and outstanding orders per unit.',
      },
      {
        icon: Clock,
        title: 'Multi-Borough Portfolio Management',
        description:
          'NYC portfolios span five boroughs with different HPD inspection schedules and housing code requirements. Revun adapts compliance workflows by borough and building classification.',
      },
    ],
    cities: [
      { name: 'New York City', slug: 'new-york-city' },
      { name: 'Buffalo', slug: 'buffalo' },
      { name: 'Rochester', slug: 'rochester' },
      { name: 'Yonkers', slug: 'yonkers' },
      { name: 'Syracuse', slug: 'syracuse' },
      { name: 'Albany', slug: 'albany' },
    ],
    ctaText: 'Start managing properties in New York',
  },

  illinois: {
    name: 'Illinois',
    slug: 'illinois',
    abbreviation: 'IL',
    heroSubtitle:
      'Major Midwest rental market centered on Chicago. RLTO compliance for Chicago landlords and statewide landlord-tenant rules.',
    regulation: {
      title: 'Illinois Landlord and Tenant Act & Chicago RLTO',
      body: 'Illinois rental relationships are governed by the Landlord and Tenant Act (765 ILCS 705-745) at the state level. Chicago layers on the Residential Landlord and Tenant Ordinance (RLTO), one of the most tenant-protective municipal codes in the US. The RLTO mandates specific lease disclosures, caps late fees, requires interest on security deposits, and provides tenants with extensive repair-and-deduct rights. Outside Chicago, landlords operate under the less restrictive state law. Illinois does not have statewide rent control, but Chicago adopted the Just Housing Amendment effective 2024.',
      highlights: [
        'Chicago RLTO: mandatory disclosures, interest on deposits, late fee caps',
        'Just Housing Amendment (Chicago): limits tenant screening criteria',
        'Statewide: 5-day notice for non-payment of rent',
        'Security deposit interest required in Chicago',
        'No statewide rent control',
        'Cook County Just Cause eviction ordinance effective 2024',
      ],
    },
    valueProps: [
      {
        icon: FileText,
        title: 'RLTO Compliance Automation',
        description:
          'Chicago\'s RLTO requires specific lease addenda, disclosure documents, and security deposit handling. Revun generates all required RLTO documents and tracks compliance deadlines automatically.',
      },
      {
        icon: Shield,
        title: 'Just Housing Amendment Screening',
        description:
          'Chicago\'s Just Housing Amendment restricts which criminal history and credit criteria landlords can use in tenant screening. Revun applies compliant screening criteria automatically for Chicago properties.',
      },
      {
        icon: CheckCircle2,
        title: 'Security Deposit Interest Tracking',
        description:
          'Chicago requires annual interest payments on security deposits. Revun calculates interest at the city-published rate and generates required annual statements and return documentation.',
      },
      {
        icon: Clock,
        title: 'Multi-Jurisdiction Portfolio Support',
        description:
          'Illinois portfolios often span Chicago (RLTO), Cook County (Just Cause), and suburban municipalities with different rules. Revun adapts compliance workflows by jurisdiction automatically.',
      },
    ],
    cities: [
      { name: 'Chicago', slug: 'chicago' },
      { name: 'Aurora', slug: 'aurora' },
      { name: 'Naperville', slug: 'naperville' },
      { name: 'Joliet', slug: 'joliet' },
      { name: 'Rockford', slug: 'rockford' },
    ],
    ctaText: 'Start managing properties in Illinois',
  },

  georgia: {
    name: 'Georgia',
    slug: 'georgia',
    abbreviation: 'GA',
    heroSubtitle:
      'Fast-growing Sunbelt rental market with landlord-friendly legal framework and Georgia-specific dispossessory proceedings.',
    regulation: {
      title: 'Georgia Landlord-Tenant Act (Title 44, Chapter 7)',
      body: 'Georgia rental relationships are governed by Title 44, Chapter 7 of the Georgia Code. Georgia is considered one of the most landlord-friendly states, with no rent control, no mandatory grace periods, and a relatively fast dispossessory (eviction) process. Landlords must provide a written demand for possession before filing a dispossessory proceeding. Security deposits have no statutory cap, but landlords must place deposits in an escrow account and provide tenants with a move-in inspection list within 3 business days of occupancy.',
      highlights: [
        'No rent control or just-cause eviction requirement',
        'Dispossessory proceedings filed in Magistrate Court',
        'No statutory cap on security deposits',
        'Escrow account required for deposits of properties with 10+ units',
        'Move-in inspection list required within 3 business days',
        '60-day notice for month-to-month termination by landlord',
      ],
    },
    valueProps: [
      {
        icon: FileText,
        title: 'Dispossessory Process Automation',
        description:
          'Generate demand-for-possession letters and track the full dispossessory timeline from filing through Magistrate Court hearing and writ of possession execution.',
      },
      {
        icon: Shield,
        title: 'Security Deposit Escrow Tracking',
        description:
          'Georgia requires escrow accounts for deposits in properties with 10+ units. Revun tracks escrow compliance, move-in inspection lists, and itemized deduction timelines.',
      },
      {
        icon: CheckCircle2,
        title: 'Atlanta Metro Compliance',
        description:
          'The Atlanta metro spans multiple counties with different Magistrate Court procedures. Revun adapts filing requirements, hearing schedules, and local rules by county.',
      },
      {
        icon: Clock,
        title: 'Rapid Market Growth Tools',
        description:
          'Georgia\'s high in-migration creates fast-moving rental markets. Revun provides market-rate analysis and lease renewal pricing tools to keep rents current with rapidly shifting conditions.',
      },
    ],
    cities: [
      { name: 'Atlanta', slug: 'atlanta' },
      { name: 'Savannah', slug: 'savannah' },
      { name: 'Augusta', slug: 'augusta' },
      { name: 'Columbus', slug: 'columbus' },
      { name: 'Macon', slug: 'macon' },
    ],
    ctaText: 'Start managing properties in Georgia',
  },

  'north-carolina': {
    name: 'North Carolina',
    slug: 'north-carolina',
    abbreviation: 'NC',
    heroSubtitle:
      'Rapidly growing rental market with landlord-friendly statutes, summary ejectment process, and Research Triangle demand.',
    regulation: {
      title: 'North Carolina General Statutes Chapter 42 (Landlord and Tenant)',
      body: 'North Carolina landlord-tenant relationships are governed by Chapter 42 of the General Statutes. The state is landlord-friendly with no rent control, no mandatory just-cause eviction, and a summary ejectment process through Magistrate Court. Landlords must provide a 10-day notice for non-payment before filing. Security deposits are capped at two months\' rent for leases longer than month-to-month, and landlords must hold deposits in a trust account at a licensed financial institution in North Carolina.',
      highlights: [
        'No rent control; no just-cause eviction requirement',
        '10-day notice for non-payment of rent',
        'Summary ejectment through Magistrate Court',
        'Security deposit cap: 2 months\' rent (leases > month-to-month)',
        'Trust account required for security deposits',
        'Landlord must provide move-in/move-out inspection report',
      ],
    },
    valueProps: [
      {
        icon: FileText,
        title: 'Summary Ejectment Workflow',
        description:
          'Track the full ejectment process from 10-day demand through Magistrate Court filing, hearing, and writ of possession. All required NC statutory forms generated automatically.',
      },
      {
        icon: Shield,
        title: 'Trust Account Compliance',
        description:
          'NC requires security deposits held in licensed NC financial institution trust accounts. Revun tracks trust account balances, provides move-in/move-out inspection documentation, and manages return timelines.',
      },
      {
        icon: CheckCircle2,
        title: 'Research Triangle Market Intelligence',
        description:
          'Raleigh-Durham\'s tech-driven growth creates unique rental dynamics. Revun provides market-rate analysis tuned to Triangle submarkets, corporate relocation patterns, and university demand cycles.',
      },
      {
        icon: Clock,
        title: 'Multi-Metro NC Portfolio Support',
        description:
          'NC portfolios often span Charlotte, the Triangle, and Triad metros. Revun adapts county-level filing procedures and local ordinance requirements across all NC jurisdictions.',
      },
    ],
    cities: [
      { name: 'Charlotte', slug: 'charlotte' },
      { name: 'Raleigh', slug: 'raleigh' },
      { name: 'Durham', slug: 'durham' },
      { name: 'Greensboro', slug: 'greensboro' },
      { name: 'Winston-Salem', slug: 'winston-salem' },
    ],
    ctaText: 'Start managing properties in North Carolina',
  },

  arizona: {
    name: 'Arizona',
    slug: 'arizona',
    abbreviation: 'AZ',
    heroSubtitle:
      'Fast-growing Sunbelt rental market with the Arizona Residential Landlord and Tenant Act and rapid eviction timelines.',
    regulation: {
      title: 'Arizona Residential Landlord and Tenant Act (A.R.S. Title 33, Chapter 10)',
      body: 'Arizona landlord-tenant relationships are governed by A.R.S. Title 33, Chapter 10. Arizona is considered landlord-friendly with no rent control, fast eviction timelines, and strong landlord remedies. Landlords must provide a 5-day notice for non-payment of rent. Security deposits are capped at one and a half months\' rent. The state preempts cities from enacting rent control. Eviction proceedings move relatively quickly through Justice Court, often resolving within 2-4 weeks from filing.',
      highlights: [
        'No rent control; state preempts local rent control',
        '5-day notice for non-payment of rent',
        'Security deposit cap: 1.5 months\' rent',
        'Fast eviction timelines through Justice Court (2-4 weeks)',
        'Landlord must return deposit within 14 business days',
        '30-day notice to terminate month-to-month tenancy',
      ],
    },
    valueProps: [
      {
        icon: FileText,
        title: 'Arizona Notice Automation',
        description:
          'Generate 5-day pay-or-quit notices, 10-day health-and-safety cure notices, and termination notices compliant with A.R.S. Title 33 requirements. All timelines calculated automatically.',
      },
      {
        icon: Shield,
        title: 'Rapid Eviction Workflow',
        description:
          'Arizona\'s fast Justice Court eviction timeline means deadlines are tight. Revun tracks every step from notice through filing, hearing, and writ of restitution with automated alerts.',
      },
      {
        icon: CheckCircle2,
        title: 'Pool & HVAC Compliance',
        description:
          'Arizona\'s climate requires year-round HVAC and pool maintenance. Revun tracks seasonal maintenance schedules, vendor appointments, and habitability requirements specific to desert properties.',
      },
      {
        icon: Clock,
        title: 'Phoenix Metro Multi-City Support',
        description:
          'The Phoenix metro spans Phoenix, Scottsdale, Mesa, Chandler, and Tempe with different municipal requirements. Revun adapts property management workflows by municipality automatically.',
      },
    ],
    cities: [
      { name: 'Phoenix', slug: 'phoenix' },
      { name: 'Tucson', slug: 'tucson' },
      { name: 'Mesa', slug: 'mesa' },
      { name: 'Scottsdale', slug: 'scottsdale' },
      { name: 'Chandler', slug: 'chandler' },
    ],
    ctaText: 'Start managing properties in Arizona',
  },

  colorado: {
    name: 'Colorado',
    slug: 'colorado',
    abbreviation: 'CO',
    heroSubtitle:
      'Growing mountain-state rental market with evolving tenant protections, recent rent stabilization legislation, and altitude-specific property concerns.',
    regulation: {
      title: 'Colorado Revised Statutes (Title 38, Article 12) & Recent Tenant Protections',
      body: 'Colorado landlord-tenant law is governed by C.R.S. Title 38, Article 12. Colorado has shifted significantly toward tenant protection in recent years. The state now limits late fees to the greater of $50 or 5% of monthly rent, requires landlords to provide 21 days before initiating eviction for non-payment, and limits security deposits to two months\' rent. Colorado has not enacted statewide rent control but allows local jurisdictions to explore rent stabilization measures following the repeal of the 1981 preemption in 2023.',
      highlights: [
        'Late fees capped at greater of $50 or 5% of monthly rent',
        '21-day notice before filing eviction for non-payment',
        'Security deposit cap: 2 months\' rent',
        'Local rent stabilization now permitted (preemption repealed 2023)',
        'Landlord must return deposit within 60 days (or 72 hours if emergency)',
        'Source of income discrimination prohibited statewide',
      ],
    },
    valueProps: [
      {
        icon: FileText,
        title: 'Evolving Compliance Tracking',
        description:
          'Colorado\'s landlord-tenant laws have changed rapidly since 2022. Revun stays current with legislative changes and updates notice templates, fee calculations, and disclosure requirements automatically.',
      },
      {
        icon: Shield,
        title: 'Late Fee & Notice Compliance',
        description:
          'Colorado\'s late fee caps and extended notice periods require precise tracking. Revun enforces the greater-of-$50-or-5% late fee rule and manages the 21-day non-payment notice timeline.',
      },
      {
        icon: CheckCircle2,
        title: 'High-Altitude Property Management',
        description:
          'Colorado properties face unique maintenance challenges: freeze-thaw pipe damage, wildfire mitigation, and high-altitude HVAC demands. Revun includes seasonal maintenance workflows specific to mountain-state properties.',
      },
      {
        icon: Clock,
        title: 'Denver Metro & Mountain Town Support',
        description:
          'Colorado portfolios span the Denver metro, Colorado Springs, and mountain resort towns with very different rental dynamics. Revun adapts to each submarket\'s seasonality and tenant profiles.',
      },
    ],
    cities: [
      { name: 'Denver', slug: 'denver' },
      { name: 'Colorado Springs', slug: 'colorado-springs' },
      { name: 'Aurora', slug: 'aurora-co' },
      { name: 'Fort Collins', slug: 'fort-collins' },
      { name: 'Boulder', slug: 'boulder' },
    ],
    ctaText: 'Start managing properties in Colorado',
  },

  'new-jersey': {
    name: 'New Jersey',
    slug: 'new-jersey',
    abbreviation: 'NJ',
    heroSubtitle:
      'Dense rental market with strong tenant protections, Anti-Eviction Act requirements, and municipal rent control in 100+ cities.',
    regulation: {
      title: 'New Jersey Anti-Eviction Act & Municipal Rent Control',
      body: 'New Jersey is one of the most tenant-protective states. The Anti-Eviction Act (N.J.S.A. 2A:18-61.1) requires landlords to demonstrate one of several enumerated just causes before evicting a residential tenant. Over 100 NJ municipalities have their own rent control ordinances. Security deposits are capped at one and a half months\' rent and must be held in an interest-bearing account. Landlords must annually provide tenants with a written statement of deposit amounts and accrued interest.',
      highlights: [
        'Anti-Eviction Act: just-cause eviction required statewide',
        '100+ municipalities with local rent control ordinances',
        'Security deposit cap: 1.5 months\' rent in interest-bearing account',
        'Annual deposit interest statement required',
        'Notice period varies by cause of eviction',
        'Lease renewal right for tenants (cannot refuse to renew without cause)',
      ],
    },
    valueProps: [
      {
        icon: FileText,
        title: 'Anti-Eviction Act Compliance',
        description:
          'Generate notices that satisfy NJ just-cause requirements. Revun tracks which statutory ground applies, generates the correct notice, and manages the Special Civil Part filing workflow.',
      },
      {
        icon: Shield,
        title: 'Municipal Rent Control Tracking',
        description:
          'With 100+ NJ municipalities enforcing rent control, keeping track of which rules apply where is critical. Revun maps each property to its municipal rent control ordinance and enforces the correct increase limits.',
      },
      {
        icon: CheckCircle2,
        title: 'Deposit Interest Compliance',
        description:
          'NJ requires interest-bearing deposit accounts and annual interest statements to tenants. Revun calculates interest, generates annual statements, and tracks compliance for every managed unit.',
      },
      {
        icon: Clock,
        title: 'NYC-Adjacent Portfolio Management',
        description:
          'Many NJ portfolios serve NYC commuters in Hudson and Bergen counties. Revun adapts to the unique dynamics of NYC-adjacent NJ markets including high turnover and transit-dependent tenant profiles.',
      },
    ],
    cities: [
      { name: 'Newark', slug: 'newark' },
      { name: 'Jersey City', slug: 'jersey-city' },
      { name: 'Paterson', slug: 'paterson' },
      { name: 'Elizabeth', slug: 'elizabeth' },
      { name: 'Trenton', slug: 'trenton' },
    ],
    ctaText: 'Start managing properties in New Jersey',
  },

  virginia: {
    name: 'Virginia',
    slug: 'virginia',
    abbreviation: 'VA',
    heroSubtitle:
      'Growing rental market with the Virginia Residential Landlord and Tenant Act, military tenant protections, and Northern Virginia metro demand.',
    regulation: {
      title: 'Virginia Residential Landlord and Tenant Act (VRLTA)',
      body: 'Virginia rental relationships are governed by the Virginia Residential Landlord and Tenant Act (VRLTA, Va. Code 55.1-1200 et seq.). Virginia has strengthened tenant protections in recent years including a statewide ban on source-of-income discrimination, limits on late fees to 10% of monthly rent, and a 14-day right-to-cure notice for non-payment. Security deposits are capped at two months\' rent. The large military population in Hampton Roads and Northern Virginia means SCRA compliance is critical for property managers.',
      highlights: [
        'No rent control statewide',
        '14-day pay-or-quit notice for non-payment',
        'Security deposit cap: 2 months\' rent',
        'Late fees capped at 10% of monthly rent or 10% of balance due',
        'Source of income discrimination prohibited statewide',
        'SCRA compliance critical for military-heavy markets',
      ],
    },
    valueProps: [
      {
        icon: FileText,
        title: 'VRLTA Notice Automation',
        description:
          'Generate 14-day pay-or-quit notices, 30-day termination notices, and lease violation cure notices compliant with VRLTA requirements. All statutory timelines enforced automatically.',
      },
      {
        icon: Shield,
        title: 'SCRA Military Tenant Compliance',
        description:
          'Virginia\'s large military population requires SCRA compliance for lease terminations, deployments, and PCS orders. Revun tracks military tenant status and applies SCRA protections automatically.',
      },
      {
        icon: CheckCircle2,
        title: 'NoVA Metro Market Intelligence',
        description:
          'Northern Virginia\'s proximity to DC creates unique rental dynamics tied to federal employment and contractor cycles. Revun provides submarket analysis tuned to NoVA\'s government-adjacent demand patterns.',
      },
      {
        icon: Clock,
        title: 'Multi-Region VA Portfolio Support',
        description:
          'Virginia portfolios span Northern Virginia, Hampton Roads, and Richmond with very different tenant profiles. Revun adapts compliance workflows and market analysis by region.',
      },
    ],
    cities: [
      { name: 'Virginia Beach', slug: 'virginia-beach' },
      { name: 'Richmond', slug: 'richmond' },
      { name: 'Arlington', slug: 'arlington-va' },
      { name: 'Norfolk', slug: 'norfolk' },
      { name: 'Alexandria', slug: 'alexandria' },
    ],
    ctaText: 'Start managing properties in Virginia',
  },

  washington: {
    name: 'Washington',
    slug: 'washington',
    abbreviation: 'WA',
    heroSubtitle:
      'Tech-driven rental market with strong tenant protections, just-cause eviction requirements, and Seattle-specific ordinances.',
    regulation: {
      title: 'Washington Residential Landlord-Tenant Act (RCW 59.18) & Local Ordinances',
      body: 'Washington landlord-tenant relationships are governed by RCW 59.18. Washington has enacted significant tenant protections including statewide just-cause eviction (effective 2024), limits on move-in fees, and required relocation assistance in certain circumstances. Seattle layers additional protections including the First-in-Time rule for tenant selection, mandatory RRIO (Rental Registration and Inspection Ordinance) compliance, and the Just Cause Eviction Ordinance. Security deposits must be held in a trust account and returned within 21 days.',
      highlights: [
        'Statewide just-cause eviction effective 2024',
        '14-day notice for non-payment of rent',
        'Security deposit returned within 21 days',
        'Seattle RRIO: mandatory rental registration and inspection',
        'Seattle First-in-Time tenant screening rule',
        'Limits on move-in fees (first/last/deposit only)',
      ],
    },
    valueProps: [
      {
        icon: FileText,
        title: 'Just-Cause Eviction Compliance',
        description:
          'Washington\'s statewide just-cause requirement means every eviction must cite a valid statutory ground. Revun tracks which causes apply and generates compliant notices for each situation.',
      },
      {
        icon: Shield,
        title: 'Seattle RRIO Compliance',
        description:
          'Seattle\'s Rental Registration and Inspection Ordinance requires registration of all rental units and periodic inspections. Revun tracks RRIO registration status, inspection schedules, and compliance deadlines.',
      },
      {
        icon: CheckCircle2,
        title: 'First-in-Time Screening Compliance',
        description:
          'Seattle\'s First-in-Time rule requires landlords to screen and accept tenants in application order. Revun enforces chronological screening workflows and documents compliance for each application cycle.',
      },
      {
        icon: Clock,
        title: 'Tech Sector Demand Tracking',
        description:
          'Seattle and Bellevue rental markets are tied to tech employment. Revun provides submarket analysis tuned to tech sector hiring cycles, return-to-office policies, and corporate relocation patterns.',
      },
    ],
    cities: [
      { name: 'Seattle', slug: 'seattle' },
      { name: 'Spokane', slug: 'spokane' },
      { name: 'Tacoma', slug: 'tacoma' },
      { name: 'Vancouver', slug: 'vancouver-wa' },
      { name: 'Bellevue', slug: 'bellevue' },
    ],
    ctaText: 'Start managing properties in Washington',
  },

  nevada: {
    name: 'Nevada',
    slug: 'nevada',
    abbreviation: 'NV',
    heroSubtitle:
      'Tourism-driven rental market with NRS 118A compliance, rapid population growth, and Las Vegas metro property management.',
    regulation: {
      title: 'Nevada Revised Statutes Chapter 118A (Landlord and Tenant)',
      body: 'Nevada landlord-tenant relationships are governed by NRS Chapter 118A. Nevada is generally landlord-friendly with no rent control and relatively fast eviction timelines. Landlords must provide a 7-day notice for non-payment of rent (5 judicial days). Security deposits are limited to three months\' rent and must be returned within 30 days of move-out. Nevada requires landlords to maintain habitable conditions including functional HVAC, which is critical in the Las Vegas climate. Clark County (Las Vegas) has additional business licensing requirements for rental operators.',
      highlights: [
        'No rent control statewide',
        '7-day notice for non-payment (5 judicial days)',
        'Security deposit cap: 3 months\' rent',
        'Deposit return within 30 days of move-out',
        'Mandatory HVAC maintenance (critical for desert climate)',
        'Clark County business license required for rental operations',
      ],
    },
    valueProps: [
      {
        icon: FileText,
        title: 'NRS 118A Notice Automation',
        description:
          'Generate 7-day pay-or-quit notices, 5-day notices for lease violations, and termination notices compliant with NRS 118A. Judicial day calculations handled automatically.',
      },
      {
        icon: Shield,
        title: 'Clark County Licensing Compliance',
        description:
          'Clark County requires business licenses for rental operations. Revun tracks license status, renewal deadlines, and required inspections for Las Vegas metro properties.',
      },
      {
        icon: CheckCircle2,
        title: 'Short-Term vs. Long-Term Management',
        description:
          'Las Vegas markets blend short-term and long-term rentals. Revun separates compliance workflows for each and tracks municipal short-term rental permit requirements.',
      },
      {
        icon: Clock,
        title: 'Desert Climate Maintenance',
        description:
          'Nevada\'s extreme heat requires year-round HVAC maintenance, pool upkeep, and xeriscaping compliance. Revun includes climate-specific maintenance schedules and vendor management.',
      },
    ],
    cities: [
      { name: 'Las Vegas', slug: 'las-vegas' },
      { name: 'Henderson', slug: 'henderson' },
      { name: 'Reno', slug: 'reno' },
      { name: 'North Las Vegas', slug: 'north-las-vegas' },
      { name: 'Sparks', slug: 'sparks' },
    ],
    ctaText: 'Start managing properties in Nevada',
  },

  pennsylvania: {
    name: 'Pennsylvania',
    slug: 'pennsylvania',
    abbreviation: 'PA',
    heroSubtitle:
      'Major rental market split between Philadelphia and Pittsburgh metros, with Philadelphia\'s unique licensing requirements and statewide Landlord-Tenant Act compliance.',
    regulation: {
      title: 'Pennsylvania Landlord and Tenant Act of 1951 & Philadelphia Code',
      body: 'Pennsylvania landlord-tenant law is governed by the Landlord and Tenant Act of 1951 (68 P.S. 250.101 et seq.). Pennsylvania does not have statewide rent control or just-cause eviction requirements. Philadelphia has significant additional requirements including mandatory rental license and inspection, the Fair Practices Ordinance limiting tenant screening criteria, and specific lead paint disclosure requirements. Security deposits are capped at two months\' rent for the first year and one month\'s rent for subsequent years. Deposits must be placed in an escrow account.',
      highlights: [
        'No statewide rent control or just-cause eviction',
        '10-day notice for non-payment (lease must specify)',
        'Security deposit: 2 months (year 1), 1 month (year 2+)',
        'Philadelphia: mandatory rental license and inspection',
        'Philadelphia: Fair Practices Ordinance for tenant screening',
        'Escrow account required for security deposits',
      ],
    },
    valueProps: [
      {
        icon: FileText,
        title: 'Philadelphia Rental License Tracking',
        description:
          'Philadelphia requires rental licenses and periodic inspections for all rental units. Revun tracks license status, inspection schedules, and renewal deadlines for every managed property.',
      },
      {
        icon: Shield,
        title: 'Lead Paint Compliance',
        description:
          'Philadelphia and older PA housing stock requires extensive lead paint disclosure and remediation tracking. Revun generates required disclosures and tracks abatement certification status.',
      },
      {
        icon: CheckCircle2,
        title: 'Dual-Metro Portfolio Management',
        description:
          'PA portfolios often span Philadelphia and Pittsburgh metros with different local requirements. Revun adapts compliance workflows, licensing requirements, and tax rules by municipality.',
      },
      {
        icon: Clock,
        title: 'Security Deposit Year Tracking',
        description:
          'PA\'s unusual two-tier deposit cap (2 months year 1, 1 month year 2+) requires tracking tenancy duration. Revun manages deposit reductions and refunds automatically at the anniversary date.',
      },
    ],
    cities: [
      { name: 'Philadelphia', slug: 'philadelphia' },
      { name: 'Pittsburgh', slug: 'pittsburgh' },
      { name: 'Allentown', slug: 'allentown' },
      { name: 'Erie', slug: 'erie' },
      { name: 'Reading', slug: 'reading' },
    ],
    ctaText: 'Start managing properties in Pennsylvania',
  },

  ohio: {
    name: 'Ohio',
    slug: 'ohio',
    abbreviation: 'OH',
    heroSubtitle:
      'Affordable Midwest rental market with Ohio Revised Code compliance, municipal registration requirements, and strong cash-flow potential.',
    regulation: {
      title: 'Ohio Revised Code Chapter 5321 (Landlords and Tenants)',
      body: 'Ohio landlord-tenant relationships are governed by ORC Chapter 5321. Ohio is generally landlord-friendly with no rent control and no statewide just-cause eviction requirement. Landlords must provide a 3-day notice for non-payment of rent before filing an eviction action. Security deposits have no statutory cap, but deposits exceeding one month\'s rent require the landlord to pay 5% annual interest. Several Ohio cities including Columbus, Cleveland, and Cincinnati have enacted local rental registration and inspection programs.',
      highlights: [
        'No rent control statewide',
        '3-day notice for non-payment of rent',
        'No statutory cap on security deposits',
        '5% annual interest on deposits exceeding 1 month\'s rent',
        'Local rental registration programs in major cities',
        '30-day notice to terminate month-to-month tenancy',
      ],
    },
    valueProps: [
      {
        icon: FileText,
        title: 'ORC Notice Automation',
        description:
          'Generate 3-day pay-or-quit notices and 30-day termination notices compliant with ORC Chapter 5321. Revun handles all statutory requirements and tracks delivery confirmation.',
      },
      {
        icon: Shield,
        title: 'Municipal Registration Compliance',
        description:
          'Columbus, Cleveland, and Cincinnati all have rental registration and inspection programs. Revun tracks registration status, inspection schedules, and compliance deadlines by municipality.',
      },
      {
        icon: CheckCircle2,
        title: 'Deposit Interest Calculations',
        description:
          'Ohio\'s 5% interest requirement on deposits exceeding one month\'s rent requires precise tracking. Revun calculates interest, generates statements, and manages refund timelines automatically.',
      },
      {
        icon: Clock,
        title: 'Cash-Flow Portfolio Analytics',
        description:
          'Ohio\'s affordable property prices create strong cash-flow opportunities. Revun provides NOI analysis, cap rate tracking, and portfolio performance reporting tuned to Ohio market conditions.',
      },
    ],
    cities: [
      { name: 'Columbus', slug: 'columbus' },
      { name: 'Cleveland', slug: 'cleveland' },
      { name: 'Cincinnati', slug: 'cincinnati' },
      { name: 'Toledo', slug: 'toledo' },
      { name: 'Akron', slug: 'akron' },
    ],
    ctaText: 'Start managing properties in Ohio',
  },

  michigan: {
    name: 'Michigan',
    slug: 'michigan',
    abbreviation: 'MI',
    heroSubtitle:
      'Revitalizing rental market with Truth in Renting Act compliance, district court eviction procedures, and Detroit metro management.',
    regulation: {
      title: 'Michigan Truth in Renting Act & Landlord-Tenant Relationships Act',
      body: 'Michigan landlord-tenant relationships are governed by the Truth in Renting Act (TIRA, MCL 554.631 et seq.) and the Landlord-Tenant Relationships Act. Michigan does not have rent control and eviction proceedings are handled through District Court. Landlords must provide a 7-day demand for possession for non-payment of rent. Security deposits are capped at one and a half months\' rent and must be held in a regulated financial institution. Michigan requires a detailed move-in checklist signed by both parties.',
      highlights: [
        'No rent control statewide',
        '7-day demand for possession for non-payment',
        'Security deposit cap: 1.5 months\' rent',
        'Deposit must be held in regulated financial institution',
        'Mandatory move-in condition checklist',
        'Deposit return within 30 days of move-out',
      ],
    },
    valueProps: [
      {
        icon: FileText,
        title: 'TIRA Compliance Automation',
        description:
          'Michigan\'s Truth in Renting Act prohibits certain lease clauses. Revun screens lease templates for TIRA violations and ensures all lease terms comply with Michigan statutory requirements.',
      },
      {
        icon: Shield,
        title: 'District Court Eviction Tracking',
        description:
          'Michigan evictions go through District Court with specific procedural requirements. Revun manages the full timeline from 7-day demand through summons, hearing, and order of eviction.',
      },
      {
        icon: CheckCircle2,
        title: 'Detroit Metro Revitalization Tools',
        description:
          'Detroit\'s housing revitalization creates unique management needs. Revun tracks rehabilitation tax credits, municipal licensing requirements, and lead paint abatement compliance for Detroit properties.',
      },
      {
        icon: Clock,
        title: 'Winter Maintenance Scheduling',
        description:
          'Michigan\'s harsh winters require proactive maintenance planning. Revun includes seasonal maintenance workflows for furnace inspections, pipe winterization, and snow removal scheduling.',
      },
    ],
    cities: [
      { name: 'Detroit', slug: 'detroit' },
      { name: 'Grand Rapids', slug: 'grand-rapids' },
      { name: 'Warren', slug: 'warren' },
      { name: 'Sterling Heights', slug: 'sterling-heights' },
      { name: 'Ann Arbor', slug: 'ann-arbor' },
    ],
    ctaText: 'Start managing properties in Michigan',
  },

  massachusetts: {
    name: 'Massachusetts',
    slug: 'massachusetts',
    abbreviation: 'MA',
    heroSubtitle:
      'Highly regulated rental market with strong tenant protections, Boston-specific ordinances, and university-driven demand cycles.',
    regulation: {
      title: 'Massachusetts General Laws Chapter 186 (Estates for Years and at Will)',
      body: 'Massachusetts landlord-tenant law is governed by MGL Chapter 186 and related statutes. Massachusetts is one of the most tenant-protective states with strict security deposit handling rules, a habitability standard enforced by the State Sanitary Code, and a right of first refusal for tenants in condominium conversions. Security deposits are capped at one month\'s rent and must be held in a separate, interest-bearing escrow account at a Massachusetts bank. Landlords must provide a detailed receipt and annual interest statements. Boston has additional requirements including the Jim Brooks Stabilization Act for certain developments.',
      highlights: [
        'Security deposit: 1 month\'s rent in interest-bearing escrow',
        'Detailed deposit receipt and annual interest statements required',
        '14-day notice for non-payment or lease termination',
        'State Sanitary Code habitability enforcement',
        'Tenant right of first refusal in condo conversions',
        'Boston: Jim Brooks Stabilization Act for certain properties',
      ],
    },
    valueProps: [
      {
        icon: FileText,
        title: 'Deposit Escrow Compliance',
        description:
          'Massachusetts has the strictest deposit handling rules in the US. Revun generates deposit receipts with all required information, tracks interest-bearing escrow accounts, and produces annual interest statements.',
      },
      {
        icon: Shield,
        title: 'State Sanitary Code Tracking',
        description:
          'Massachusetts enforces habitability through the State Sanitary Code (105 CMR 410). Revun tracks code requirements, inspection schedules, and violation remediation timelines for all managed properties.',
      },
      {
        icon: CheckCircle2,
        title: 'University Cycle Management',
        description:
          'Boston\'s September 1 lease turnover cycle is unique nationally. Revun manages the compressed September turnover window with bulk move-in/move-out scheduling, inspection workflows, and deposit processing.',
      },
      {
        icon: Clock,
        title: 'Condo Conversion Compliance',
        description:
          'Massachusetts gives tenants a right of first refusal in condo conversions. Revun tracks conversion notifications, response deadlines, and relocation assistance requirements when they apply.',
      },
    ],
    cities: [
      { name: 'Boston', slug: 'boston' },
      { name: 'Worcester', slug: 'worcester' },
      { name: 'Springfield', slug: 'springfield' },
      { name: 'Cambridge', slug: 'cambridge' },
      { name: 'Lowell', slug: 'lowell' },
    ],
    ctaText: 'Start managing properties in Massachusetts',
  },

  tennessee: {
    name: 'Tennessee',
    slug: 'tennessee',
    abbreviation: 'TN',
    heroSubtitle:
      'Fast-growing rental market with landlord-friendly Uniform Residential Landlord and Tenant Act compliance and no state income tax.',
    regulation: {
      title: 'Tennessee Uniform Residential Landlord and Tenant Act (T.C.A. 66-28)',
      body: 'Tennessee landlord-tenant relationships are governed by the Uniform Residential Landlord and Tenant Act (URLTA, T.C.A. 66-28). Tennessee is landlord-friendly with no rent control, no just-cause eviction requirement, and relatively fast eviction timelines through General Sessions Court. Landlords must provide a 14-day notice for non-payment before filing a detainer warrant. Security deposits have no statutory cap but must be held in a separate account at a Tennessee banking institution. Tennessee has no state income tax, making it attractive for real estate investors.',
      highlights: [
        'No rent control; no just-cause eviction requirement',
        '14-day notice for non-payment of rent',
        'No statutory cap on security deposits',
        'Deposits held in separate TN banking institution account',
        'Detainer warrant filed in General Sessions Court',
        'No state income tax on rental income',
      ],
    },
    valueProps: [
      {
        icon: FileText,
        title: 'URLTA Notice Automation',
        description:
          'Generate 14-day pay-or-quit notices, lease termination notices, and detainer warrant documentation compliant with T.C.A. 66-28. All statutory timelines tracked and enforced automatically.',
      },
      {
        icon: Shield,
        title: 'General Sessions Court Workflow',
        description:
          'Tennessee evictions proceed through General Sessions Court via detainer warrants. Revun manages the full workflow from 14-day notice through filing, hearing, and writ of possession.',
      },
      {
        icon: CheckCircle2,
        title: 'Nashville Growth Market Tools',
        description:
          'Nashville\'s rapid growth creates a dynamic rental market with shifting demand patterns. Revun provides market-rate analysis and lease renewal pricing tools tuned to Nashville\'s fast-moving conditions.',
      },
      {
        icon: Clock,
        title: 'Multi-Metro TN Portfolio Support',
        description:
          'Tennessee portfolios span Nashville, Memphis, Knoxville, and Chattanooga with different market dynamics. Revun adapts compliance workflows and market analysis by metro area.',
      },
    ],
    cities: [
      { name: 'Nashville', slug: 'nashville' },
      { name: 'Memphis', slug: 'memphis' },
      { name: 'Knoxville', slug: 'knoxville' },
      { name: 'Chattanooga', slug: 'chattanooga' },
      { name: 'Clarksville', slug: 'clarksville' },
    ],
    ctaText: 'Start managing properties in Tennessee',
  },
} as const

type StateSlug = keyof typeof stateData

const slugList = Object.keys(stateData) as StateSlug[]

// ─────────────────────────────────────────────────────────────────────────────
// Static generation
// ─────────────────────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return slugList.map((slug) => ({ state: slug }))
}

// ─────────────────────────────────────────────────────────────────────────────
// Metadata
// ─────────────────────────────────────────────────────────────────────────────

type Props = {
  params: Promise<{ state: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params
  const data = stateData[state as StateSlug]

  if (!data) {
    return { title: 'State Not Found | Revun' }
  }

  const title = `Property Management in ${data.name} | Revun`
  const description = `Revun handles ${data.regulation.title} compliance for ${data.name} property managers. ${data.heroSubtitle}`
  const url = buildCanonicalUrl(`/us/${data.slug}`)

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

export default async function StatePage({ params }: Props) {
  const { state } = await params
  const data = stateData[state as StateSlug]

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
              { name: 'United States', url: 'https://revun.com/us/' },
              { name: data.name, url: `https://revun.com/us/${data.slug}/` },
            ])
          ),
        }}
      />
      {/* ── Hero ── */}
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              United States / {data.name}
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
                href="/us/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors duration-100 hover:border-[#E5E7EB] hover:text-[#555860]"
              >
                All States
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
                    href={`/us/${data.slug}/${city.slug}/`}
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
