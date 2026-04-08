import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { CompareDetailClient } from './client'

/* ── Types ────────────────────────────────────────────────────────────────── */

export interface CompareFeature {
  name: string
  revun: string
  competitor: string
}

export interface CompetitorFaq {
  question: string
  answer: string
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
  tldr: string[]
  faq: CompetitorFaq[]
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
    tldr: [
      'Revun supports Canadian provincial compliance natively; AppFolio is US-only',
      'Revun offers self-managing owner plans from $1/day; AppFolio requires 50+ units',
      'Revun includes brokerage and maintenance dispatch; AppFolio does not',
    ],
    faq: [
      {
        question: 'Is AppFolio available in Canada?',
        answer: 'AppFolio is designed for the US market and does not include Canadian provincial compliance, Interac payments, or province-specific lease templates. Revun is built for the Canadian market from the ground up.',
      },
      {
        question: 'Can small landlords use AppFolio?',
        answer: 'AppFolio requires a minimum of 50 units, which excludes most small landlords. Revun has no minimum unit requirement and offers self-managing owner plans starting at $1/day per unit.',
      },
      {
        question: 'Does Revun have the same features as AppFolio?',
        answer: 'Revun covers all core PM features (accounting, maintenance, screening, portals) and adds brokerage CRM, Canadian compliance, and multi-channel communications that AppFolio does not include.',
      },
      {
        question: 'How does Revun pricing compare to AppFolio?',
        answer: 'AppFolio charges from $1.40/unit/month with a 50-unit minimum. Revun offers transparent per-unit pricing from $1/day with no minimums and no hidden fees.',
      },
      {
        question: 'Can I switch from AppFolio to Revun?',
        answer: 'Yes. Revun offers guided onboarding and data migration support to help you transition from AppFolio with minimal disruption to your operations.',
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
    tldr: [
      'Revun has native Canadian compliance; Buildium is US-focused',
      'Revun includes brokerage CRM and leasing tools; Buildium does not',
      'Revun scales per-unit; Buildium uses flat monthly fees',
    ],
    faq: [
      {
        question: 'Is Buildium better than Revun for Canadian property managers?',
        answer: 'No. Buildium has limited Canadian support and lacks province-specific compliance workflows, Interac payments, and Canadian lease templates that Revun includes natively.',
      },
      {
        question: 'How does Buildium pricing compare to Revun?',
        answer: 'Buildium starts at $55/month for up to 20 units and increases with flat-fee tiers. Revun charges per-unit from $1/day, so you only pay for what you manage.',
      },
      {
        question: 'Does Revun include brokerage tools like Buildium?',
        answer: 'Revun includes a full brokerage CRM with deal management and leasing workflows. Buildium does not offer brokerage tools at all.',
      },
      {
        question: 'Can I migrate from Buildium to Revun?',
        answer: 'Yes. Revun provides guided onboarding and data migration assistance to help you move from Buildium without losing your operational history.',
      },
      {
        question: 'Does Buildium support Interac payments?',
        answer: 'No. Buildium supports ACH and credit card payments only. Revun supports Interac, rent collection, and vendor payouts natively for the Canadian market.',
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
    tldr: [
      'Revun includes Canadian provincial compliance; DoorLoop is US-focused',
      'Revun offers deeper workflow automation for vendor dispatch and multi-entity ops',
      'Revun combines PM, brokerage CRM, and maintenance dispatch in one platform',
    ],
    faq: [
      {
        question: 'Is DoorLoop available in Canada?',
        answer: 'DoorLoop is primarily designed for the US market. It does not include Canadian provincial compliance, Interac payments, or province-specific lease templates that Revun offers natively.',
      },
      {
        question: 'How does DoorLoop compare to Revun on pricing?',
        answer: 'DoorLoop starts at $59/month for up to 20 units with flat-fee tiers. Revun charges per-unit from $1/day with no minimums, making it more cost-effective as your portfolio scales.',
      },
      {
        question: 'Does Revun offer the same ease of use as DoorLoop?',
        answer: 'Yes. Revun provides a clean, modern interface with guided onboarding. It matches DoorLoop on usability while adding deeper automation for compliance and vendor workflows.',
      },
      {
        question: 'Can I switch from DoorLoop to Revun?',
        answer: 'Yes. Revun offers migration support and guided onboarding to help you transition from DoorLoop with minimal disruption.',
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
    tldr: [
      'Revun is built for long-term rentals; Guesty targets short-term and vacation rentals',
      'Revun charges flat per-unit pricing; Guesty takes 3-5% of revenue',
      'Revun includes provincial compliance and full lease lifecycle; Guesty does not',
    ],
    faq: [
      {
        question: 'Is Guesty good for long-term rentals?',
        answer: 'Guesty is designed primarily for short-term and vacation rentals with channel management for Airbnb, VRBO, and Booking.com. For long-term residential or commercial property management, Revun is purpose-built with full lease lifecycle tools.',
      },
      {
        question: 'How does Guesty pricing compare to Revun?',
        answer: 'Guesty charges 3-5% of revenue, which increases as your portfolio grows. Revun uses flat per-unit pricing from $1/day, keeping costs predictable regardless of revenue.',
      },
      {
        question: 'Does Revun support short-term rentals?',
        answer: 'Revun is focused on long-term residential and commercial property management. If you manage a mix of long-term and short-term, Revun handles the long-term portfolio while Guesty may complement for short-term.',
      },
      {
        question: 'Can I switch from Guesty to Revun?',
        answer: 'Yes. If you are transitioning your portfolio to long-term rentals, Revun offers guided onboarding and migration support.',
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
    tldr: [
      'Revun launches in days; Yardi takes 3-12 months to implement',
      'Revun has transparent per-unit pricing; Yardi uses opaque enterprise contracts',
      'Revun offers a modern interface; Yardi has a legacy UI requiring IT support',
    ],
    faq: [
      {
        question: 'Is Yardi overkill for mid-size portfolios?',
        answer: 'Yardi is built for enterprise portfolios and REITs, with long implementation timelines and high costs. Revun delivers comparable features for mid-size portfolios with faster setup and transparent pricing.',
      },
      {
        question: 'How long does it take to set up Revun vs Yardi?',
        answer: 'Revun launches in days with guided onboarding. Yardi implementations typically take 3-12 months and require dedicated consultants.',
      },
      {
        question: 'Does Revun have the same accounting features as Yardi?',
        answer: 'Revun includes full property accounting, owner statements, and financial reporting. For most residential and mixed-use portfolios, Revun covers the same accounting needs without Yardi complexity.',
      },
      {
        question: 'Can I switch from Yardi to Revun?',
        answer: 'Yes. Revun offers data migration support and guided onboarding to help you transition from Yardi without losing your financial history.',
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
    tldr: [
      'Revun is a full PM platform; SingleKey is screening + rent guarantee only',
      'Revun includes maintenance, accounting, and communications; SingleKey does not',
      'Revun offers flat per-unit pricing; SingleKey charges per-screening fees',
    ],
    faq: [
      {
        question: 'Is SingleKey better than Revun?',
        answer: 'SingleKey excels at tenant screening and rent guarantees, but it is not a property management platform. Revun includes screening as part of a complete PM system with maintenance, accounting, communications, and compliance tools.',
      },
      {
        question: 'Does Revun offer rent guarantee?',
        answer: 'Revun is building rent guarantee into the platform (coming soon). In the meantime, you can use SingleKey for rent guarantee alongside Revun for full property management.',
      },
      {
        question: 'Can I use SingleKey with Revun?',
        answer: 'Yes. Some property managers use SingleKey for rent guarantee while using Revun as their primary PM platform. As Revun adds rent guarantee, you will be able to consolidate into one platform.',
      },
      {
        question: 'Can I switch from SingleKey to Revun?',
        answer: 'Yes. Revun includes built-in tenant screening and a full PM suite. You can replace SingleKey for screening while gaining maintenance, accounting, leasing, and communications tools.',
      },
      {
        question: 'How does pricing compare between SingleKey and Revun?',
        answer: 'SingleKey charges per-screening fees plus rent guarantee premiums. Revun offers flat per-unit pricing from $1/day that includes screening and all PM features in one subscription.',
      },
    ],
  },
  {
    slug: 'propertyware',
    name: 'Propertyware',
    category: 'PM Software',
    description:
      'Property management software from RealPage focused on single-family rental portfolios.',
    pricingSummary: 'From $1/unit/month ($250 minimum)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Property Types', revun: 'Residential, commercial, mixed-use', competitor: 'Single-family focused' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-only' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Work order system' },
      { name: 'Self-Manage Option', revun: 'From $1/day per unit', competitor: 'Not available' },
      { name: 'Monthly Minimums', revun: 'No minimums', competitor: '$250/month minimum' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Email + portal messaging' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'ACH, credit card' },
    ],
    whyRevun: [
      {
        title: 'All property types, one platform',
        body: 'Propertyware focuses on single-family rentals. Revun handles residential, commercial, and mixed-use portfolios in one system.',
      },
      {
        title: 'No monthly minimums',
        body: 'Propertyware requires a $250/month minimum. Revun starts at $1/day per unit with no minimums, making it accessible for any portfolio size.',
      },
      {
        title: 'Built for Canada',
        body: 'Revun includes Canadian provincial compliance, Interac payments, and local lease templates. Propertyware is US-only.',
      },
    ],
    tldr: [
      'Revun covers all property types; Propertyware focuses on single-family',
      'Revun includes Canadian compliance; Propertyware is US-only',
      'Revun starts lower with no monthly minimums; Propertyware has $250+ minimums',
    ],
    faq: [
      {
        question: 'Is Propertyware available in Canada?',
        answer: 'No. Propertyware is a US-only platform from RealPage. It does not include Canadian provincial compliance, Interac payments, or province-specific lease templates. Revun is built for the Canadian market.',
      },
      {
        question: 'Can Propertyware handle multi-family or commercial properties?',
        answer: 'Propertyware is designed primarily for single-family rental portfolios. Revun handles residential, commercial, and mixed-use properties in one platform.',
      },
      {
        question: 'How does Propertyware pricing compare to Revun?',
        answer: 'Propertyware charges from $1/unit/month with a $250/month minimum. Revun starts at $1/day per unit with no minimums and no hidden fees.',
      },
      {
        question: 'Can I switch from Propertyware to Revun?',
        answer: 'Yes. Revun offers guided onboarding and data migration support to help you transition from Propertyware with minimal disruption to your operations.',
      },
      {
        question: 'Does Revun include vendor management like Propertyware?',
        answer: 'Yes. Revun includes full vendor management with dispatch workflows, work order tracking, and vendor payouts. It goes beyond Propertyware by adding multi-channel communications and brokerage CRM.',
      },
    ],
  },
  {
    slug: 'liv-rent',
    name: 'liv.rent',
    category: 'Canadian Platforms',
    description:
      'Canadian rental listing marketplace connecting landlords with tenants through verified listings.',
    pricingSummary: 'Free listings + premium plans',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Rental Listings', revun: 'Syndicated listing tools', competitor: 'Core product' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Vendor Management', revun: 'Full vendor dispatch + payouts', competitor: 'Not included' },
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Not included' },
      { name: 'Franchise Model', revun: 'Franchise offering for scale', competitor: 'Not available' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'In-app messaging only' },
    ],
    whyRevun: [
      {
        title: 'Full platform vs. listing marketplace',
        body: 'liv.rent is a rental listing marketplace. Revun is a complete property management platform that includes listings as one of many features.',
      },
      {
        title: 'Operations, not just discovery',
        body: 'Revun handles everything after the listing: screening, leasing, maintenance, accounting, vendor management, and compliance.',
      },
      {
        title: 'Scale with the franchise model',
        body: 'Revun offers a franchise model for property managers looking to scale their business. liv.rent has no franchise or scaling infrastructure.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; liv.rent is a rental listing marketplace',
      'Revun includes maintenance, accounting, and vendor management; liv.rent does not',
      'Revun offers franchise model for scale; liv.rent has no franchise offering',
    ],
    faq: [
      {
        question: 'Is liv.rent a property management platform?',
        answer: 'No. liv.rent is a rental listing marketplace that helps landlords find tenants. It does not include property management features like maintenance tracking, accounting, vendor management, or compliance tools. Revun is a full PM platform.',
      },
      {
        question: 'Can I use liv.rent with Revun?',
        answer: 'Yes. Some property managers use liv.rent for listing exposure while using Revun as their primary PM platform for operations, accounting, and compliance.',
      },
      {
        question: 'Does Revun include rental listings?',
        answer: 'Yes. Revun includes syndicated listing tools as part of the platform, along with screening, leasing, maintenance, accounting, and communications.',
      },
      {
        question: 'How does liv.rent pricing compare to Revun?',
        answer: 'liv.rent offers free listings with premium plans for additional features. Revun charges $1/day per unit for a complete PM platform. They serve different needs: liv.rent for tenant discovery, Revun for full property operations.',
      },
      {
        question: 'Does Revun offer a franchise model?',
        answer: 'Yes. Revun offers a franchise model for property managers looking to scale their business across multiple locations. liv.rent does not offer any franchise or scaling infrastructure.',
      },
    ],
  },
  {
    slug: 'rhenti',
    name: 'Rhenti',
    category: 'Canadian Platforms',
    description:
      'Canadian leasing automation platform targeting mid-market multifamily operators with lead-to-lease workflows.',
    pricingSummary: 'Custom quotes only',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Audience Segments', revun: 'Owners, managers, brokerages, franchises', competitor: 'Mid-market multifamily only' },
      { name: 'Pricing Transparency', revun: 'Self-serve transparent pricing', competitor: 'Custom quotes required' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Rent Guarantee', revun: 'Coming soon', competitor: 'Not included' },
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Not included' },
      { name: 'Leasing Automation', revun: 'Full lease lifecycle', competitor: 'Core product (lead-to-lease)' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Lead communications only' },
    ],
    whyRevun: [
      {
        title: 'Serves every audience segment',
        body: 'Rhenti targets mid-market multifamily operators only. Revun serves self-managing owners, property managers, brokerages, and franchises across all property types.',
      },
      {
        title: 'Transparent, self-serve pricing',
        body: 'Rhenti requires custom quotes for pricing. Revun offers transparent, self-serve pricing from $1/day per unit with no sales calls required.',
      },
      {
        title: 'Full PM ops, not just leasing',
        body: 'Rhenti focuses on lead-to-lease automation. Revun covers the full property management lifecycle including maintenance, accounting, compliance, and vendor management.',
      },
    ],
    tldr: [
      'Revun covers all audience segments; Rhenti targets mid-market multifamily only',
      'Revun has transparent self-serve pricing; Rhenti requires custom quotes',
      'Revun includes rent guarantee and full PM ops; Rhenti focuses on lead-to-lease',
    ],
    faq: [
      {
        question: 'Is Rhenti a full property management platform?',
        answer: 'No. Rhenti focuses on leasing automation (lead-to-lease workflows) for mid-market multifamily operators. It does not include maintenance tracking, accounting, vendor management, or compliance tools. Revun is a full PM platform.',
      },
      {
        question: 'Can small landlords use Rhenti?',
        answer: 'Rhenti targets mid-market multifamily operators and requires custom quotes. Revun serves all audience segments including self-managing owners, with transparent pricing from $1/day per unit.',
      },
      {
        question: 'How does Rhenti pricing compare to Revun?',
        answer: 'Rhenti requires custom quotes with no published pricing. Revun offers transparent, self-serve pricing from $1/day per unit with no sales calls or custom negotiations required.',
      },
      {
        question: 'Does Revun include leasing automation like Rhenti?',
        answer: 'Yes. Revun includes full lease lifecycle management from lead generation through lease signing, renewals, and compliance. It covers the same leasing workflows as Rhenti plus full property operations.',
      },
      {
        question: 'Can I switch from Rhenti to Revun?',
        answer: 'Yes. Revun covers all of Rhenti leasing automation features plus maintenance, accounting, vendor management, and compliance. Migration support is available.',
      },
    ],
  },
  {
    slug: 'frontlobby',
    name: 'FrontLobby',
    category: 'Canadian Platforms',
    description:
      'Canadian rent reporting platform that reports tenant rent payments to credit bureaus.',
    pricingSummary: 'Per-tenant rent reporting fees',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Rent Reporting', revun: 'Included in platform', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Not included' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Not included' },
      { name: 'Leasing Tools', revun: 'Full lease lifecycle', competitor: 'Not included' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Rent tracking only' },
    ],
    whyRevun: [
      {
        title: 'Complete platform vs. single feature',
        body: 'FrontLobby does rent reporting only. Revun is a complete property management platform that includes rent reporting as part of the subscription.',
      },
      {
        title: 'Everything in one subscription',
        body: 'Revun includes screening, leasing, maintenance, accounting, payments, and rent reporting in one platform. FrontLobby requires separate tools for all other PM functions.',
      },
      {
        title: 'No per-tenant fees for reporting',
        body: 'FrontLobby charges per-tenant for rent reporting. Revun includes rent reporting as part of the flat per-unit platform fee.',
      },
    ],
    tldr: [
      'Revun is a complete PM platform; FrontLobby does rent reporting only',
      'Revun includes screening, leasing, maintenance, and payments; FrontLobby has one feature',
      'Revun includes rent reporting as part of the platform; FrontLobby charges separately',
    ],
    faq: [
      {
        question: 'Is FrontLobby a property management platform?',
        answer: 'No. FrontLobby is a rent reporting platform that reports tenant payments to credit bureaus. It does not include property management features like screening, maintenance, accounting, or leasing. Revun is a full PM platform that includes rent reporting.',
      },
      {
        question: 'Does Revun include rent reporting?',
        answer: 'Yes. Revun includes rent reporting as part of the platform subscription. You do not need a separate tool like FrontLobby for credit bureau reporting.',
      },
      {
        question: 'Can I use FrontLobby with Revun?',
        answer: 'You can, but it is not necessary. Revun includes rent reporting as part of the platform, so you would not need to pay separately for FrontLobby.',
      },
      {
        question: 'How does FrontLobby pricing compare to Revun?',
        answer: 'FrontLobby charges per-tenant fees for rent reporting only. Revun charges $1/day per unit for a complete PM platform that includes rent reporting, screening, maintenance, accounting, and more.',
      },
      {
        question: 'Can I switch from FrontLobby to Revun?',
        answer: 'Yes. Revun includes rent reporting natively, so you can consolidate from FrontLobby plus your existing PM tools into one platform.',
      },
    ],
  },
  /* ── PM Software (additional) ──────────────────────────────────────────── */
  {
    slug: 'entrata',
    name: 'Entrata',
    category: 'PM Software',
    description: 'Enterprise property management platform for large multifamily portfolios with integrated marketing, leasing, and resident services.',
    pricingSummary: 'Custom enterprise pricing',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Portfolio Scale', revun: 'Any size, no minimums', competitor: 'Enterprise-only (250+ units)' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-only' },
      { name: 'Setup Time', revun: 'Days, not months', competitor: '6-18 month implementation' },
      { name: 'Self-Manage Option', revun: 'From $1/day per unit', competitor: 'Not available' },
      { name: 'Resident Portal', revun: 'Full portal with financials', competitor: 'ResidentPortal suite' },
      { name: 'Leasing Automation', revun: 'Full lease lifecycle', competitor: 'Entrata Leasing' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Email + portal messaging' },
      { name: 'Pricing Transparency', revun: 'Self-serve transparent pricing', competitor: 'Custom quotes only' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'ACH, credit card' },
    ],
    whyRevun: [
      {
        title: 'No enterprise-only gatekeeping',
        body: 'Entrata requires 250+ units and months of implementation. Revun serves any portfolio size with setup in days.',
      },
      {
        title: 'Built for Canadian operations',
        body: 'Revun includes province-specific compliance, Interac payments, and Canadian lease templates. Entrata is US-only.',
      },
      {
        title: 'Transparent, predictable pricing',
        body: 'Entrata requires custom enterprise quotes. Revun offers self-serve pricing from $1/day per unit with no hidden fees.',
      },
    ],
    tldr: [
      'Revun serves any portfolio size; Entrata requires 250+ units minimum',
      'Revun launches in days; Entrata takes 6-18 months to implement',
      'Revun includes Canadian compliance; Entrata is US-only',
    ],
    faq: [
      {
        question: 'Is Entrata available in Canada?',
        answer: 'No. Entrata is designed for the US multifamily market and does not include Canadian provincial compliance, Interac payments, or province-specific lease templates. Revun is built for the Canadian market from the ground up.',
      },
      {
        question: 'Can mid-size portfolios use Entrata?',
        answer: 'Entrata is enterprise-focused with a 250+ unit minimum and lengthy implementation. Revun has no minimum unit requirement and launches in days.',
      },
      {
        question: 'How does Entrata pricing compare to Revun?',
        answer: 'Entrata uses custom enterprise pricing with long contracts. Revun offers transparent per-unit pricing from $1/day with no minimums and no hidden fees.',
      },
      {
        question: 'Who should choose Entrata over Revun?',
        answer: 'Entrata is a strong choice for large US-based multifamily operators with 1,000+ units who need deep integration with US-specific marketing and leasing tools. For Canadian operators or mid-size portfolios, Revun is the better fit.',
      },
    ],
  },
  {
    slug: 'mri-software',
    name: 'MRI Software',
    category: 'PM Software',
    description: 'Enterprise real estate software covering commercial, residential, and investment management for global operators.',
    pricingSummary: 'Custom enterprise pricing',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Setup Time', revun: 'Days, not months', competitor: '6-24 month implementation' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'Some Canadian support' },
      { name: 'Self-Manage Option', revun: 'From $1/day per unit', competitor: 'Not available' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'MRI WorkSpecs' },
      { name: 'Modern UX', revun: 'Clean, intuitive interface', competitor: 'Legacy interface' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Commercial CRM only' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Email + portal messaging' },
      { name: 'Open API', revun: 'RESTful API included', competitor: 'MRI Open Connect (paid add-on)' },
      { name: 'Pricing Transparency', revun: 'Self-serve transparent pricing', competitor: 'Custom quotes only' },
    ],
    whyRevun: [
      {
        title: 'Modern platform, modern timeline',
        body: 'MRI implementations take 6-24 months with consultants. Revun launches in days with guided onboarding and a modern interface.',
      },
      {
        title: 'All-in-one without the modules',
        body: 'MRI sells modules separately. Revun includes everything - PM, brokerage CRM, maintenance, communications - in one subscription.',
      },
      {
        title: 'No IT team required',
        body: 'MRI often requires dedicated IT support. Revun is self-serve with no technical expertise needed.',
      },
    ],
    tldr: [
      'Revun launches in days; MRI takes 6-24 months',
      'Revun includes all features in one subscription; MRI charges for modules',
      'Revun is self-serve; MRI requires dedicated IT support',
    ],
    faq: [
      {
        question: 'Is MRI Software overkill for residential portfolios?',
        answer: 'MRI is built for enterprise commercial and residential. For most residential portfolios, Revun offers the same core features with faster setup and simpler pricing.',
      },
      {
        question: 'How does MRI pricing compare to Revun?',
        answer: 'MRI uses custom enterprise pricing with modular add-ons. Revun offers transparent per-unit pricing from $1/day with all features included.',
      },
      {
        question: 'Who should choose MRI over Revun?',
        answer: 'MRI is strong for large global operators managing billions in commercial assets who need deep investment management tools. For residential and mid-market portfolios, Revun is faster, simpler, and more cost-effective.',
      },
    ],
  },
  {
    slug: 'tenantcloud',
    name: 'TenantCloud',
    category: 'PM Software',
    description: 'Cloud-based property management software targeting small landlords and self-managing owners.',
    pricingSummary: 'Free plan + paid from $15.60/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-focused' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Basic work orders' },
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Basic owner reports' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'In-app messaging' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'ACH, credit card' },
      { name: 'Scale Support', revun: 'Any size portfolio', competitor: 'Best for <75 units' },
      { name: 'Vendor Dispatch', revun: 'Full vendor dispatch + payouts', competitor: 'Basic vendor directory' },
    ],
    whyRevun: [
      {
        title: 'Grows with you',
        body: 'TenantCloud works for small portfolios but struggles at scale. Revun handles 1 to 10,000+ units without changing platforms.',
      },
      {
        title: 'Canadian-first compliance',
        body: 'TenantCloud is US-focused. Revun includes provincial compliance, Interac payments, and Canadian lease templates natively.',
      },
      {
        title: 'Professional-grade vendor dispatch',
        body: 'TenantCloud offers basic vendor directories. Revun includes full dispatch workflows, GPS tracking, and vendor payouts.',
      },
    ],
    tldr: [
      'Revun scales to any size; TenantCloud is best for small portfolios under 75 units',
      'Revun includes Canadian compliance natively; TenantCloud is US-focused',
      'Revun includes full vendor dispatch; TenantCloud has basic vendor features',
    ],
    faq: [
      {
        question: 'Is TenantCloud free?',
        answer: 'TenantCloud offers a free plan with limited features for up to 75 units, plus paid plans from $15.60/month. Revun offers a complete platform from $1/day per unit with all features included.',
      },
      {
        question: 'Who should choose TenantCloud over Revun?',
        answer: 'TenantCloud is a solid choice for US-based landlords with fewer than 10 units who want a free basic tool. For Canadian operators or anyone planning to scale, Revun is the better long-term investment.',
      },
      {
        question: 'Can I switch from TenantCloud to Revun?',
        answer: 'Yes. Revun offers guided onboarding and data migration support to help you transition from TenantCloud with minimal disruption.',
      },
    ],
  },
  {
    slug: 'hemlane',
    name: 'Hemlane',
    category: 'PM Software',
    description: 'Hybrid property management platform blending DIY tools with optional local agent support.',
    pricingSummary: 'From $2/unit/month (self-manage)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-only' },
      { name: 'Hybrid Model', revun: 'Full platform + franchise model', competitor: 'Core offering (DIY + agent)' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Agent-assisted repairs' },
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Basic dashboard' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Email + phone forwarding' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Basic income/expense' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'ACH only' },
    ],
    whyRevun: [
      {
        title: 'Full platform, not a hybrid',
        body: 'Hemlane mixes DIY tools with optional local agents. Revun gives you a complete platform you control without relying on third-party agents.',
      },
      {
        title: 'Canadian compliance built in',
        body: 'Hemlane is US-only. Revun includes province-specific compliance, Interac, and Canadian lease templates natively.',
      },
      {
        title: 'Scale through franchise, not agents',
        body: 'Revun offers a franchise model for scaling your business. Hemlane depends on local agent networks you do not control.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; Hemlane is a hybrid DIY + agent model',
      'Revun includes Canadian compliance; Hemlane is US-only',
      'Revun scales via franchise model; Hemlane relies on local agent networks',
    ],
    faq: [
      {
        question: 'Is Hemlane available in Canada?',
        answer: 'No. Hemlane is a US-only platform. It does not include Canadian provincial compliance, Interac payments, or province-specific lease templates.',
      },
      {
        question: 'Who should choose Hemlane over Revun?',
        answer: 'Hemlane is good for US landlords who want a mix of DIY tools and local agent support for maintenance. For Canadian operators or those wanting full control, Revun is the better choice.',
      },
      {
        question: 'Can I switch from Hemlane to Revun?',
        answer: 'Yes. Revun offers guided onboarding and data migration support to help you transition from Hemlane.',
      },
    ],
  },
  {
    slug: 'avail',
    name: 'Avail',
    category: 'PM Software',
    description: 'DIY landlord tools from Realtor.com for finding tenants, signing leases, and collecting rent.',
    pricingSummary: 'Free plan + Unlimited Plus at $7/unit/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-only' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Basic maintenance requests' },
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Not included' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'In-app messaging only' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Basic income/expense tracking' },
      { name: 'Vendor Dispatch', revun: 'Full vendor dispatch + payouts', competitor: 'Not included' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'ACH rent collection' },
      { name: 'Scale Support', revun: 'Any size portfolio', competitor: 'Best for small landlords' },
    ],
    whyRevun: [
      {
        title: 'Professional-grade tools',
        body: 'Avail is designed for DIY landlords. Revun delivers professional-grade features like vendor dispatch, full accounting, and owner portals.',
      },
      {
        title: 'Canadian market support',
        body: 'Avail is US-only. Revun includes Interac, provincial compliance, and Canadian lease templates.',
      },
      {
        title: 'Scale without switching',
        body: 'Avail works for a few units but lacks the depth for growth. Revun scales from one unit to thousands without changing platforms.',
      },
    ],
    tldr: [
      'Revun is professional-grade PM; Avail is DIY landlord tools',
      'Revun includes Canadian compliance; Avail is US-only',
      'Revun scales to any portfolio size; Avail is best for small landlords',
    ],
    faq: [
      {
        question: 'Is Avail free?',
        answer: 'Avail offers a free plan with limited features. The Unlimited Plus plan costs $7/unit/month. Revun offers a complete PM platform from $1/day per unit.',
      },
      {
        question: 'Who should choose Avail over Revun?',
        answer: 'Avail is a good choice for US-based landlords with 1-3 units who want basic free tools. For Canadian operators or anyone managing more than a handful of units, Revun provides much more value.',
      },
      {
        question: 'Can I switch from Avail to Revun?',
        answer: 'Yes. Revun offers guided onboarding and data migration support. Many landlords upgrade from Avail when they outgrow basic tools.',
      },
    ],
  },
  {
    slug: 'turbo-tenant',
    name: 'TurboTenant',
    category: 'PM Software',
    description: 'Free landlord software for marketing rentals, screening tenants, and collecting rent online.',
    pricingSummary: 'Free for landlords (tenant-paid screening)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-only' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Basic maintenance requests' },
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Not included' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Basic expense tracking' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'In-app messaging' },
      { name: 'Vendor Dispatch', revun: 'Full vendor dispatch + payouts', competitor: 'Not included' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'ACH rent collection' },
    ],
    whyRevun: [
      {
        title: 'Beyond free basics',
        body: 'TurboTenant is free but limited. Revun includes full accounting, vendor dispatch, and owner portals that TurboTenant does not offer.',
      },
      {
        title: 'Canadian compliance included',
        body: 'TurboTenant is US-only. Revun includes provincial compliance, Interac payments, and Canadian-specific lease templates.',
      },
      {
        title: 'Tenant-friendly screening model',
        body: 'TurboTenant charges tenants for screening. Revun includes screening in the platform subscription so landlords control the experience.',
      },
    ],
    tldr: [
      'Revun is a complete PM platform; TurboTenant offers limited free tools',
      'Revun includes screening in the subscription; TurboTenant charges tenants separately',
      'Revun supports Canadian compliance; TurboTenant is US-only',
    ],
    faq: [
      {
        question: 'Is TurboTenant really free?',
        answer: 'TurboTenant is free for landlords, but tenants pay for screening and the feature set is limited. Revun includes screening in the platform fee alongside full accounting, vendor dispatch, and compliance tools.',
      },
      {
        question: 'Who should choose TurboTenant over Revun?',
        answer: 'TurboTenant is a reasonable choice for US landlords with 1-2 units who want zero cost. For Canadian operators or anyone needing professional features, Revun is the better investment.',
      },
      {
        question: 'Can I switch from TurboTenant to Revun?',
        answer: 'Yes. Revun offers guided onboarding to help you upgrade from TurboTenant free tools to a complete property management platform.',
      },
    ],
  },
  {
    slug: 'innago',
    name: 'Innago',
    category: 'PM Software',
    description: 'Free property management software for small to mid-size landlords with online rent collection and lease management.',
    pricingSummary: 'Free (revenue from tenant services)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-only' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Basic work orders' },
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Not included' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Email only' },
      { name: 'Vendor Dispatch', revun: 'Full vendor dispatch + payouts', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Basic financials' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'ACH rent collection' },
    ],
    whyRevun: [
      {
        title: 'Professional features, not just free',
        body: 'Innago is free but basic. Revun includes vendor dispatch, full accounting, communications hub, and owner portals.',
      },
      {
        title: 'Built for Canada',
        body: 'Innago is US-only. Revun includes provincial compliance, Interac, and Canadian lease templates.',
      },
      {
        title: 'Scales with your business',
        body: 'Innago works for small landlords but lacks enterprise features. Revun scales from one unit to thousands.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; Innago is free but basic',
      'Revun includes Canadian compliance; Innago is US-only',
      'Revun scales to enterprise; Innago is best for small landlords',
    ],
    faq: [
      {
        question: 'Is Innago really free?',
        answer: 'Innago is free for landlords but generates revenue through tenant services and has limited features. Revun offers a complete platform from $1/day per unit.',
      },
      {
        question: 'Who should choose Innago over Revun?',
        answer: 'Innago works for US landlords with a few units who want zero upfront cost. For Canadian operators or growing portfolios, Revun is the better investment.',
      },
      {
        question: 'Can I switch from Innago to Revun?',
        answer: 'Yes. Revun offers guided onboarding and data migration to help you upgrade from Innago.',
      },
    ],
  },
  {
    slug: 'rentec-direct',
    name: 'Rentec Direct',
    category: 'PM Software',
    description: 'Affordable property management and tenant screening software for landlords and property managers.',
    pricingSummary: 'From $45/month (up to 25 units)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-only' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Basic work orders' },
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Owner access included' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Email + portal' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Trust accounting included' },
      { name: 'Vendor Dispatch', revun: 'Full vendor dispatch + payouts', competitor: 'Basic vendor tracking' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'ACH rent collection' },
    ],
    whyRevun: [
      {
        title: 'Canadian-first platform',
        body: 'Rentec Direct is US-only. Revun includes Interac, provincial compliance, and Canadian lease templates.',
      },
      {
        title: 'Deeper maintenance automation',
        body: 'Rentec Direct has basic work orders. Revun includes full vendor dispatch with GPS tracking, photo capture, and automated invoicing.',
      },
      {
        title: 'Multi-channel communications',
        body: 'Rentec Direct offers email and portal messaging. Revun adds SMS, VoIP calling, and in-app messaging in one hub.',
      },
    ],
    tldr: [
      'Revun includes Canadian compliance; Rentec Direct is US-only',
      'Revun has full vendor dispatch; Rentec Direct has basic work orders',
      'Revun includes multi-channel communications; Rentec Direct is email-only',
    ],
    faq: [
      {
        question: 'Is Rentec Direct available in Canada?',
        answer: 'No. Rentec Direct is a US-only platform. Revun is built for the Canadian market with provincial compliance and Interac payments.',
      },
      {
        question: 'Who should choose Rentec Direct over Revun?',
        answer: 'Rentec Direct is strong for US-based property managers who need affordable trust accounting. For Canadian operators, Revun is the clear choice.',
      },
      {
        question: 'Can I switch from Rentec Direct to Revun?',
        answer: 'Yes. Revun offers guided onboarding and data migration support for Rentec Direct users.',
      },
    ],
  },
  {
    slug: 'simplifyem',
    name: 'SimplifyEm',
    category: 'PM Software',
    description: 'Simple, straightforward property management software for landlords who want basics without complexity.',
    pricingSummary: 'From $25/month (up to 10 units)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-only' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Basic tracking' },
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Basic reports' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Email only' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Third-party integration' },
      { name: 'Vendor Dispatch', revun: 'Full vendor dispatch + payouts', competitor: 'Not included' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'ACH rent collection' },
    ],
    whyRevun: [
      {
        title: 'Simple and powerful',
        body: 'SimplifyEm keeps it simple but lacks depth. Revun is equally intuitive but includes vendor dispatch, communications, and compliance.',
      },
      {
        title: 'Canadian compliance included',
        body: 'SimplifyEm is US-only. Revun includes provincial compliance, Interac, and Canadian lease templates.',
      },
      {
        title: 'Room to grow',
        body: 'SimplifyEm works for small portfolios but cannot scale. Revun grows with your business from 1 to 10,000+ units.',
      },
    ],
    tldr: [
      'Revun is simple and powerful; SimplifyEm is simple but limited',
      'Revun includes Canadian compliance; SimplifyEm is US-only',
      'Revun scales to enterprise; SimplifyEm is best for small portfolios',
    ],
    faq: [
      {
        question: 'Is SimplifyEm good for Canadian landlords?',
        answer: 'No. SimplifyEm is US-only and lacks Canadian compliance. Revun is purpose-built for the Canadian market.',
      },
      {
        question: 'Who should choose SimplifyEm over Revun?',
        answer: 'SimplifyEm works for US landlords with fewer than 10 units who want the absolute simplest tool. For anyone planning to grow, Revun is the better choice.',
      },
      {
        question: 'Can I switch from SimplifyEm to Revun?',
        answer: 'Yes. Revun offers guided onboarding to help you upgrade from SimplifyEm.',
      },
    ],
  },
  {
    slug: 'resman',
    name: 'ResMan',
    category: 'PM Software',
    description: 'Multifamily property management platform with accounting, maintenance, and marketing tools.',
    pricingSummary: 'Custom pricing per unit',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Property Types', revun: 'Residential, commercial, mixed-use', competitor: 'Multifamily only' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-only' },
      { name: 'Self-Manage Option', revun: 'From $1/day per unit', competitor: 'Not available' },
      { name: 'Brokerage Tools', revun: 'Full CRM + deal management', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Email + portal messaging' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Built-in work orders' },
      { name: 'Marketing Tools', revun: 'Listing syndication + SEO', competitor: 'ResMan marketing suite' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'ACH, credit card' },
      { name: 'Pricing Transparency', revun: 'Self-serve transparent pricing', competitor: 'Custom quotes only' },
    ],
    whyRevun: [
      {
        title: 'All property types, one platform',
        body: 'ResMan focuses on multifamily only. Revun handles residential, commercial, and mixed-use portfolios.',
      },
      {
        title: 'Canadian market support',
        body: 'ResMan is US-only. Revun includes provincial compliance, Interac, and Canadian lease templates.',
      },
      {
        title: 'Transparent pricing',
        body: 'ResMan requires custom quotes. Revun offers self-serve pricing from $1/day per unit with no sales calls needed.',
      },
    ],
    tldr: [
      'Revun covers all property types; ResMan is multifamily only',
      'Revun includes Canadian compliance; ResMan is US-only',
      'Revun has transparent pricing; ResMan requires custom quotes',
    ],
    faq: [
      {
        question: 'Can ResMan handle commercial properties?',
        answer: 'ResMan focuses on multifamily. Revun handles residential, commercial, and mixed-use properties in one platform.',
      },
      {
        question: 'Who should choose ResMan over Revun?',
        answer: 'ResMan is strong for large US multifamily operators who want deep marketing tools. For Canadian operators or mixed-use portfolios, Revun is the better fit.',
      },
      {
        question: 'Can I switch from ResMan to Revun?',
        answer: 'Yes. Revun offers guided onboarding and data migration to help you transition from ResMan.',
      },
    ],
  },
  {
    slug: 'payrop',
    name: 'PayProp',
    category: 'PM Software',
    description: 'Automated rental payment platform that handles tenant payments, reconciliation, and owner disbursements.',
    pricingSummary: 'Percentage-based fee on collections',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Payments only' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Not included' },
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Payment reports only' },
      { name: 'Leasing Tools', revun: 'Full lease lifecycle', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Not included' },
      { name: 'Payment Automation', revun: 'Included in platform', competitor: 'Core product' },
      { name: 'Reconciliation', revun: 'Automated reconciliation', competitor: 'Real-time reconciliation' },
    ],
    whyRevun: [
      {
        title: 'Complete platform vs. payment tool',
        body: 'PayProp handles rental payments only. Revun is a complete PM platform that includes automated payments alongside maintenance, leasing, and compliance.',
      },
      {
        title: 'Flat pricing, not percentage-based',
        body: 'PayProp charges a percentage of collections. Revun charges flat per-unit pricing that does not increase as your revenue grows.',
      },
      {
        title: 'All PM operations in one place',
        body: 'With Revun, payments are part of a unified workflow including screening, leasing, maintenance, and owner reporting.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; PayProp handles payments only',
      'Revun uses flat per-unit pricing; PayProp charges a percentage of collections',
      'Revun includes maintenance, leasing, and compliance; PayProp has one function',
    ],
    faq: [
      {
        question: 'Is PayProp a property management platform?',
        answer: 'No. PayProp is a rental payment automation tool. It does not include maintenance, leasing, screening, or compliance features. Revun is a full PM platform.',
      },
      {
        question: 'Who should choose PayProp over Revun?',
        answer: 'PayProp is a good choice if you already have a PM system and only need better payment automation. If you want an all-in-one platform, Revun is the better investment.',
      },
      {
        question: 'Can I switch from PayProp to Revun?',
        answer: 'Yes. Revun includes automated rent collection and owner disbursements, so you can consolidate PayProp into your PM platform.',
      },
    ],
  },
  /* ── Canadian Platforms (additional) ────────────────────────────────────── */
  {
    slug: 'rentmoola',
    name: 'RentMoola',
    category: 'Canadian Platforms',
    description: 'Canadian online rent payment platform enabling tenants to pay rent digitally and earn rewards.',
    pricingSummary: 'Transaction-based fees',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Rent Payments', revun: 'Built-in with Interac + more', competitor: 'Core product' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Not included' },
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Not included' },
      { name: 'Leasing Tools', revun: 'Full lease lifecycle', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Not included' },
      { name: 'Rewards Program', revun: 'Not included', competitor: 'Rewards on rent payments' },
    ],
    whyRevun: [
      {
        title: 'Complete platform vs. payment tool',
        body: 'RentMoola handles rent payments. Revun handles payments plus screening, leasing, maintenance, accounting, and compliance.',
      },
      {
        title: 'No per-transaction fees',
        body: 'RentMoola charges transaction fees on every payment. Revun includes payments in the flat per-unit subscription.',
      },
      {
        title: 'Full property operations',
        body: 'Revun covers every aspect of property management. RentMoola covers one step in the workflow.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; RentMoola handles payments only',
      'Revun includes payments in the subscription; RentMoola charges per transaction',
      'Revun includes maintenance, leasing, and compliance; RentMoola has one function',
    ],
    faq: [
      {
        question: 'Is RentMoola a property management platform?',
        answer: 'No. RentMoola is a rent payment platform. It does not include PM features like maintenance, leasing, screening, or compliance.',
      },
      {
        question: 'Does Revun support the same payment methods as RentMoola?',
        answer: 'Yes. Revun supports Interac, ACH, credit card, and other payment methods alongside full PM features.',
      },
      {
        question: 'Can I switch from RentMoola to Revun?',
        answer: 'Yes. Revun includes rent collection natively, so you can consolidate RentMoola into your full PM platform.',
      },
    ],
  },
  {
    slug: 'openroom',
    name: 'Openroom',
    category: 'Canadian Platforms',
    description: 'Canadian rental platform connecting landlords with potential tenants through listings and applications.',
    pricingSummary: 'Free listings + premium features',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Rental Listings', revun: 'Syndicated listing tools', competitor: 'Core product' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Application collection' },
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'In-app messaging' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Not included' },
    ],
    whyRevun: [
      {
        title: 'Full operations, not just listings',
        body: 'Openroom is a rental listing platform. Revun handles the entire property lifecycle from listing through ongoing management.',
      },
      {
        title: 'One platform for everything',
        body: 'Instead of using Openroom for listings and separate tools for everything else, Revun consolidates all PM functions.',
      },
      {
        title: 'Professional screening and accounting',
        body: 'Openroom collects applications. Revun includes full screening, accounting, and compliance tools.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; Openroom is a listing platform',
      'Revun includes screening, accounting, and maintenance; Openroom does not',
      'Revun consolidates all PM tools; Openroom covers one step in the workflow',
    ],
    faq: [
      {
        question: 'Is Openroom a property management platform?',
        answer: 'No. Openroom is a rental listing and application platform. Revun is a full PM platform that includes listings alongside maintenance, accounting, and compliance.',
      },
      {
        question: 'Can I use Openroom with Revun?',
        answer: 'Yes, but Revun includes listing syndication tools, so you may not need Openroom separately.',
      },
      {
        question: 'Can I switch from Openroom to Revun?',
        answer: 'Yes. Revun includes listing tools plus a complete PM suite. You can consolidate your listing and management tools into one platform.',
      },
    ],
  },
  {
    slug: 'zumper',
    name: 'Zumper',
    category: 'Canadian Platforms',
    description: 'Online rental marketplace for apartment and home listings with instant applications.',
    pricingSummary: 'Free for landlords',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Rental Listings', revun: 'Syndicated listing tools', competitor: 'Core product' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Zumper Pro screening' },
      { name: 'Lease Management', revun: 'Full lease lifecycle', competitor: 'Not included' },
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Listing inquiries only' },
    ],
    whyRevun: [
      {
        title: 'Beyond the marketplace',
        body: 'Zumper helps you find tenants. Revun helps you find tenants and manage the entire property lifecycle after move-in.',
      },
      {
        title: 'Full property management',
        body: 'Zumper is a listing marketplace. Revun includes listings plus maintenance, accounting, compliance, and communications.',
      },
      {
        title: 'One platform, zero gaps',
        body: 'Revun eliminates the need for separate listing, screening, leasing, and management tools.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; Zumper is a rental marketplace',
      'Revun covers the entire property lifecycle; Zumper covers tenant discovery only',
      'Revun includes compliance and accounting; Zumper has no PM features',
    ],
    faq: [
      {
        question: 'Is Zumper a property management platform?',
        answer: 'No. Zumper is a rental marketplace that helps landlords list properties and find tenants. Revun is a full PM platform covering leasing through ongoing management.',
      },
      {
        question: 'Can I use Zumper with Revun?',
        answer: 'Yes. Some landlords use Zumper for additional listing exposure alongside Revun for full property management.',
      },
      {
        question: 'Does Revun include listing syndication?',
        answer: 'Yes. Revun includes listing syndication tools so you can publish to multiple platforms from one place.',
      },
    ],
  },
  {
    slug: 'padmapper',
    name: 'PadMapper',
    category: 'Canadian Platforms',
    description: 'Apartment search platform aggregating rental listings from across the web with map-based search.',
    pricingSummary: 'Free for landlords',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Rental Listings', revun: 'Syndicated listing tools', competitor: 'Aggregated listings' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Not included' },
      { name: 'Owner Portals', revun: 'Full portal with financials', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Not included' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Not included' },
    ],
    whyRevun: [
      {
        title: 'Full platform vs. listing aggregator',
        body: 'PadMapper aggregates listings for tenants. Revun is a complete property management platform for landlords and managers.',
      },
      {
        title: 'Manage, not just market',
        body: 'PadMapper helps tenants find apartments. Revun helps property managers run their entire operation.',
      },
      {
        title: 'All PM functions included',
        body: 'Revun includes screening, leasing, maintenance, accounting, and compliance. PadMapper has none of these.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; PadMapper is a listing aggregator',
      'Revun covers all PM functions; PadMapper covers tenant search only',
      'Revun serves property managers; PadMapper serves apartment seekers',
    ],
    faq: [
      {
        question: 'Is PadMapper for landlords or tenants?',
        answer: 'PadMapper is primarily a tenant-facing search tool. Revun is built for landlords and property managers who need operational tools.',
      },
      {
        question: 'Can I list on PadMapper through Revun?',
        answer: 'Revun includes listing syndication tools. Check current integrations for PadMapper compatibility, or list separately alongside Revun.',
      },
      {
        question: 'Does PadMapper help with property management?',
        answer: 'No. PadMapper is a listing aggregator only. Revun is a complete property management platform.',
      },
    ],
  },
  {
    slug: 'rent-panda',
    name: 'Rent Panda',
    category: 'Canadian Platforms',
    description: 'Ontario-focused landlord tools for tenant screening, lease agreements, and landlord education.',
    pricingSummary: 'Pay-per-service (screening, leases)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Geographic Coverage', revun: 'All Canadian provinces', competitor: 'Ontario-focused' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Core product' },
      { name: 'Lease Templates', revun: 'All provinces, auto-populated', competitor: 'Ontario lease templates' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Not included' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Not included' },
    ],
    whyRevun: [
      {
        title: 'Nationwide, not Ontario-only',
        body: 'Rent Panda focuses on Ontario. Revun covers all Canadian provinces with province-specific compliance.',
      },
      {
        title: 'Complete platform vs. point tools',
        body: 'Rent Panda offers screening and leases as separate purchases. Revun includes everything in one subscription.',
      },
      {
        title: 'Full PM operations',
        body: 'Revun handles maintenance, accounting, payments, and communications. Rent Panda offers screening and templates only.',
      },
    ],
    tldr: [
      'Revun covers all provinces; Rent Panda focuses on Ontario',
      'Revun is a full PM platform; Rent Panda offers screening and leases only',
      'Revun uses flat subscription pricing; Rent Panda charges per service',
    ],
    faq: [
      {
        question: 'Does Rent Panda work outside Ontario?',
        answer: 'Rent Panda focuses primarily on Ontario. Revun covers all Canadian provinces with province-specific compliance, lease templates, and notice workflows.',
      },
      {
        question: 'Who should choose Rent Panda over Revun?',
        answer: 'Rent Panda is reasonable for Ontario landlords who only need occasional screening or lease generation. For ongoing property management, Revun is the better investment.',
      },
      {
        question: 'Can I switch from Rent Panda to Revun?',
        answer: 'Yes. Revun includes tenant screening and lease templates for all provinces, plus full PM operations.',
      },
    ],
  },
  /* ── Brokerage/CRM (additional) ────────────────────────────────────────── */
  {
    slug: 'dotloop',
    name: 'Dotloop',
    category: 'Brokerage/CRM',
    description: 'Transaction management platform for real estate brokerages with e-signatures and compliance tracking.',
    pricingSummary: 'From $31.99/month (individual)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Transaction Management', revun: 'Deal tracking + management', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'E-Signatures', revun: 'Built-in e-signatures', competitor: 'Core feature' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Compliance', revun: 'Provincial compliance automation', competitor: 'Transaction compliance' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Not included' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-focused' },
    ],
    whyRevun: [
      {
        title: 'Beyond transactions',
        body: 'Dotloop ends at closing. Revun covers transactions plus ongoing property management, maintenance, and accounting.',
      },
      {
        title: 'Canadian compliance built in',
        body: 'Dotloop is US-focused. Revun includes provincial compliance for FINTRAC, RECO, and province-specific regulations.',
      },
      {
        title: 'One platform for the full lifecycle',
        body: 'Revun handles transactions, leasing, maintenance, and accounting in one place. No need for Dotloop plus separate PM tools.',
      },
    ],
    tldr: [
      'Revun covers the full property lifecycle; Dotloop covers transactions only',
      'Revun includes Canadian compliance; Dotloop is US-focused',
      'Revun replaces Dotloop plus your PM tools with one platform',
    ],
    faq: [
      {
        question: 'Is Dotloop a property management platform?',
        answer: 'No. Dotloop focuses on transaction management and e-signatures. It does not include PM features like maintenance, accounting, or rent collection.',
      },
      {
        question: 'Who should choose Dotloop over Revun?',
        answer: 'Dotloop is strong for US brokerages that need deep transaction compliance and already have a separate PM system. For Canadian brokerages or those wanting one platform, Revun is the better choice.',
      },
      {
        question: 'Can I switch from Dotloop to Revun?',
        answer: 'Yes. Revun includes transaction management and e-signatures plus full PM operations.',
      },
    ],
  },
  {
    slug: 'skyslope',
    name: 'SkySlope',
    category: 'Brokerage/CRM',
    description: 'Real estate compliance and transaction management platform with audit trails and digital forms.',
    pricingSummary: 'Custom brokerage pricing',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Compliance Tracking', revun: 'Provincial compliance automation', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Digital Forms', revun: 'Built-in forms + templates', competitor: 'DigiSign + Forms' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Not included' },
      { name: 'Audit Trail', revun: 'Full audit logging', competitor: 'Core feature' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-focused' },
    ],
    whyRevun: [
      {
        title: 'Compliance plus operations',
        body: 'SkySlope focuses on transaction compliance. Revun includes compliance inside a full PM platform with maintenance, accounting, and communications.',
      },
      {
        title: 'Canadian regulatory support',
        body: 'SkySlope targets US regulations. Revun covers FINTRAC, RECO, and province-specific compliance for Canadian brokerages.',
      },
      {
        title: 'One subscription, everything included',
        body: 'Revun includes compliance, forms, CRM, and PM in one platform. No need for SkySlope plus separate operational tools.',
      },
    ],
    tldr: [
      'Revun includes compliance inside a full PM platform; SkySlope is compliance-only',
      'Revun covers Canadian regulations; SkySlope is US-focused',
      'Revun replaces SkySlope plus your PM tools with one platform',
    ],
    faq: [
      {
        question: 'Is SkySlope available in Canada?',
        answer: 'SkySlope is primarily US-focused. Revun includes Canadian provincial compliance, FINTRAC, and RECO workflows.',
      },
      {
        question: 'Who should choose SkySlope over Revun?',
        answer: 'SkySlope is excellent for large US brokerages with deep compliance audit needs. For Canadian brokerages or those wanting compliance inside a PM platform, Revun is better.',
      },
      {
        question: 'Can I switch from SkySlope to Revun?',
        answer: 'Yes. Revun includes compliance tracking and audit trails plus full property management operations.',
      },
    ],
  },
  {
    slug: 'brokermint',
    name: 'BrokerMint',
    category: 'Brokerage/CRM',
    description: 'Real estate back office platform for commission tracking, transaction management, and agent accounting.',
    pricingSummary: 'From $99/month per office',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Commission Tracking', revun: 'Built-in commission management', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Agent-level accounting' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Not included' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Not included' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-focused' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Commission payouts' },
    ],
    whyRevun: [
      {
        title: 'Front-to-back platform',
        body: 'BrokerMint is back office only. Revun covers front office (CRM, listings) through back office (accounting, compliance) in one platform.',
      },
      {
        title: 'Property management included',
        body: 'BrokerMint does not include PM features. Revun includes maintenance, tenant screening, and rent collection.',
      },
      {
        title: 'Canadian compliance',
        body: 'BrokerMint is US-focused. Revun includes FINTRAC, RECO, and provincial compliance workflows.',
      },
    ],
    tldr: [
      'Revun is a front-to-back platform; BrokerMint is back office only',
      'Revun includes PM features; BrokerMint covers commissions and accounting only',
      'Revun includes Canadian compliance; BrokerMint is US-focused',
    ],
    faq: [
      {
        question: 'Is BrokerMint a property management platform?',
        answer: 'No. BrokerMint focuses on brokerage back office operations like commission tracking. Revun covers both brokerage and property management.',
      },
      {
        question: 'Who should choose BrokerMint over Revun?',
        answer: 'BrokerMint is good for US brokerages that need deep commission tracking and already have separate PM tools. For Canadian brokerages wanting one platform, Revun is better.',
      },
      {
        question: 'Can I switch from BrokerMint to Revun?',
        answer: 'Yes. Revun includes commission management plus full PM operations in one platform.',
      },
    ],
  },
  {
    slug: 'transaction-desk',
    name: 'TransactionDesk',
    category: 'Brokerage/CRM',
    description: 'Digital forms and transaction management platform from Lone Wolf for real estate agents and brokerages.',
    pricingSummary: 'Included with Lone Wolf or per-agent pricing',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Digital Forms', revun: 'Built-in forms + templates', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'E-Signatures', revun: 'Built-in e-signatures', competitor: 'Authentisign integration' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Not included' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'Canadian forms available' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Not included' },
    ],
    whyRevun: [
      {
        title: 'Beyond forms and transactions',
        body: 'TransactionDesk manages forms and transactions. Revun manages forms plus ongoing PM operations, maintenance, and accounting.',
      },
      {
        title: 'One platform, not a point tool',
        body: 'TransactionDesk requires additional tools for PM. Revun covers transactions and property management in one subscription.',
      },
      {
        title: 'Deeper compliance automation',
        body: 'TransactionDesk has Canadian forms. Revun automates province-specific compliance workflows, notices, and audit trails.',
      },
    ],
    tldr: [
      'Revun covers transactions plus full PM; TransactionDesk covers forms only',
      'Revun automates compliance workflows; TransactionDesk provides forms',
      'Revun is one platform; TransactionDesk requires additional PM tools',
    ],
    faq: [
      {
        question: 'Is TransactionDesk a property management platform?',
        answer: 'No. TransactionDesk manages digital forms and transactions. It does not include PM features like maintenance, accounting, or rent collection.',
      },
      {
        question: 'Does TransactionDesk work in Canada?',
        answer: 'TransactionDesk has Canadian forms through its Lone Wolf partnership. Revun goes further with automated provincial compliance workflows.',
      },
      {
        question: 'Can I switch from TransactionDesk to Revun?',
        answer: 'Yes. Revun includes digital forms, e-signatures, and transaction management plus full PM operations.',
      },
    ],
  },
  {
    slug: 'wise-agent',
    name: 'Wise Agent',
    category: 'Brokerage/CRM',
    description: 'Real estate CRM with contact management, transaction tracking, and marketing automation for agents.',
    pricingSummary: 'From $49/month per agent',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'CRM', revun: 'Full CRM + deal management', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Marketing Automation', revun: 'Listing syndication + email', competitor: 'Drip campaigns + landing pages' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Email + some texting' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-focused' },
      { name: 'Transaction Management', revun: 'Deal tracking + management', competitor: 'Basic transaction tracking' },
    ],
    whyRevun: [
      {
        title: 'CRM plus property management',
        body: 'Wise Agent is a CRM only. Revun combines CRM with full property management, maintenance, and accounting.',
      },
      {
        title: 'Canadian market support',
        body: 'Wise Agent is US-focused. Revun includes Canadian compliance, Interac, and provincial lease templates.',
      },
      {
        title: 'End-to-end workflow',
        body: 'Wise Agent manages contacts. Revun manages contacts through the entire property lifecycle.',
      },
    ],
    tldr: [
      'Revun combines CRM with full PM; Wise Agent is CRM only',
      'Revun includes Canadian compliance; Wise Agent is US-focused',
      'Revun covers the full property lifecycle; Wise Agent covers lead management',
    ],
    faq: [
      {
        question: 'Is Wise Agent a property management platform?',
        answer: 'No. Wise Agent is a real estate CRM. It does not include PM features like maintenance, accounting, or rent collection.',
      },
      {
        question: 'Who should choose Wise Agent over Revun?',
        answer: 'Wise Agent is strong for US agents who need deep drip campaigns and landing pages. For agents who also manage properties, Revun covers both.',
      },
      {
        question: 'Can I switch from Wise Agent to Revun?',
        answer: 'Yes. Revun includes CRM plus full PM operations, so you can consolidate Wise Agent into one platform.',
      },
    ],
  },
  {
    slug: 'top-producer',
    name: 'Top Producer',
    category: 'Brokerage/CRM',
    description: 'Real estate CRM and lead management platform with MLS integration and automated follow-up.',
    pricingSummary: 'From $129/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'CRM', revun: 'Full CRM + deal management', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'MLS Integration', revun: 'Listing syndication', competitor: 'MLS data integration' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Email + phone' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US + some Canadian MLS' },
      { name: 'Lead Automation', revun: 'Lead capture + nurturing', competitor: 'Smart targeting + follow-up' },
    ],
    whyRevun: [
      {
        title: 'CRM plus operations',
        body: 'Top Producer is a CRM. Revun combines CRM with property management, maintenance, and accounting.',
      },
      {
        title: 'From lead to long-term management',
        body: 'Top Producer helps you close deals. Revun helps you close deals and manage properties long-term.',
      },
      {
        title: 'Better value',
        body: 'Top Producer starts at $129/month for CRM only. Revun includes CRM plus full PM from $1/day per unit.',
      },
    ],
    tldr: [
      'Revun combines CRM with full PM; Top Producer is CRM only',
      'Revun covers lead to long-term management; Top Producer covers lead to close',
      'Revun offers better value with PM included; Top Producer is $129/month for CRM',
    ],
    faq: [
      {
        question: 'Is Top Producer a property management platform?',
        answer: 'No. Top Producer is a real estate CRM focused on lead management and deal closing. Revun combines CRM with full PM.',
      },
      {
        question: 'Who should choose Top Producer over Revun?',
        answer: 'Top Producer is strong for high-volume agents who need deep MLS integration and automated follow-up. For agents who also manage properties, Revun covers both.',
      },
      {
        question: 'Can I switch from Top Producer to Revun?',
        answer: 'Yes. Revun includes CRM and lead management plus full property management in one platform.',
      },
    ],
  },
  {
    slug: 'boomtown',
    name: 'BoomTown',
    category: 'Brokerage/CRM',
    description: 'Real estate lead generation and CRM platform with IDX websites and predictive analytics.',
    pricingSummary: 'From $1,000+/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Lead Generation', revun: 'Listing syndication + SEO', competitor: 'Core product (IDX + ads)' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'CRM', revun: 'Full CRM + deal management', competitor: 'Built-in CRM' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Email + text' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-focused' },
      { name: 'Predictive Analytics', revun: 'Portfolio analytics', competitor: 'Lead scoring + prediction' },
    ],
    whyRevun: [
      {
        title: 'Lead gen plus property management',
        body: 'BoomTown generates leads. Revun manages leads plus the entire property lifecycle after conversion.',
      },
      {
        title: 'Fraction of the cost',
        body: 'BoomTown costs $1,000+/month for lead generation. Revun includes CRM plus full PM from $1/day per unit.',
      },
      {
        title: 'Canadian market focus',
        body: 'BoomTown targets US markets. Revun is built for the Canadian market with provincial compliance.',
      },
    ],
    tldr: [
      'Revun includes CRM plus full PM; BoomTown is lead generation only',
      'Revun costs a fraction of BoomTown; BoomTown starts at $1,000+/month',
      'Revun is Canadian-first; BoomTown is US-focused',
    ],
    faq: [
      {
        question: 'Is BoomTown worth the cost?',
        answer: 'BoomTown is effective for high-volume lead generation but costs $1,000+/month. Revun includes CRM and PM from $1/day per unit. The right choice depends on whether you need lead gen or operational tools.',
      },
      {
        question: 'Who should choose BoomTown over Revun?',
        answer: 'BoomTown is ideal for teams spending heavily on lead generation who already have PM tools. For those wanting one platform for leads and operations, Revun is better.',
      },
      {
        question: 'Can I use BoomTown with Revun?',
        answer: 'Yes. Some teams use BoomTown for lead gen and Revun for property management. Revun also includes its own CRM if you want to consolidate.',
      },
    ],
  },
  {
    slug: 'real-geeks',
    name: 'Real Geeks',
    category: 'Brokerage/CRM',
    description: 'Real estate agent websites and CRM platform with IDX integration and lead management tools.',
    pricingSummary: 'From $299/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Agent Websites', revun: 'Not included (PM-focused)', competitor: 'Core product (IDX sites)' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'CRM', revun: 'Full CRM + deal management', competitor: 'Built-in CRM' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Email + text' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-focused' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Not included' },
    ],
    whyRevun: [
      {
        title: 'Operations, not just marketing',
        body: 'Real Geeks builds agent websites. Revun manages properties and operations after the marketing brings in leads.',
      },
      {
        title: 'Property management included',
        body: 'Real Geeks does not include PM. Revun covers CRM, maintenance, accounting, and compliance in one platform.',
      },
      {
        title: 'Canadian compliance',
        body: 'Real Geeks is US-focused. Revun includes provincial compliance, FINTRAC, and RECO workflows.',
      },
    ],
    tldr: [
      'Revun is a PM platform with CRM; Real Geeks builds agent websites',
      'Revun includes property management; Real Geeks does not',
      'Revun includes Canadian compliance; Real Geeks is US-focused',
    ],
    faq: [
      {
        question: 'Does Real Geeks include property management?',
        answer: 'No. Real Geeks focuses on agent websites and lead generation. Revun focuses on property management with built-in CRM.',
      },
      {
        question: 'Who should choose Real Geeks over Revun?',
        answer: 'Real Geeks is ideal for agents who need IDX websites for lead generation. For agents who manage properties, Revun is the better platform.',
      },
      {
        question: 'Can I use Real Geeks with Revun?',
        answer: 'Yes. Use Real Geeks for your agent website and Revun for property management and CRM.',
      },
    ],
  },
  {
    slug: 'cinc',
    name: 'CINC',
    category: 'Brokerage/CRM',
    description: 'Real estate lead generation platform with AI-powered CRM, IDX websites, and advertising management.',
    pricingSummary: 'From $899/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Lead Generation', revun: 'Listing syndication + SEO', competitor: 'Core product (AI + ads)' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'CRM', revun: 'Full CRM + deal management', competitor: 'AI-powered CRM' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'AI text + email' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-focused' },
      { name: 'Ad Management', revun: 'Not included', competitor: 'Google + Facebook ad management' },
    ],
    whyRevun: [
      {
        title: 'PM platform, not lead gen',
        body: 'CINC focuses on lead generation and ad management. Revun focuses on property management with built-in CRM.',
      },
      {
        title: 'Dramatically lower cost',
        body: 'CINC starts at $899/month for lead generation. Revun includes CRM plus full PM from $1/day per unit.',
      },
      {
        title: 'Canadian market',
        body: 'CINC targets US real estate markets. Revun is built for Canada with provincial compliance.',
      },
    ],
    tldr: [
      'Revun is a PM platform with CRM; CINC is a lead generation platform',
      'Revun starts at $1/day per unit; CINC starts at $899/month',
      'Revun is Canadian-first; CINC is US-focused',
    ],
    faq: [
      {
        question: 'Is CINC a property management platform?',
        answer: 'No. CINC is a lead generation and advertising platform for real estate agents. Revun is a property management platform with CRM.',
      },
      {
        question: 'Who should choose CINC over Revun?',
        answer: 'CINC is ideal for teams spending heavily on real estate advertising. For property management, Revun is the better tool.',
      },
      {
        question: 'Can I use CINC with Revun?',
        answer: 'Yes. Use CINC for lead generation and Revun for property management. They serve different purposes.',
      },
    ],
  },
  {
    slug: 'liondesk',
    name: 'LionDesk',
    category: 'Brokerage/CRM',
    description: 'Real estate CRM with video email, texting, and lead management for agents and teams.',
    pricingSummary: 'From $25/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'CRM', revun: 'Full CRM + deal management', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Video Email', revun: 'Not included', competitor: 'Core feature' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Email, text, video' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-focused' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Not included' },
    ],
    whyRevun: [
      {
        title: 'CRM plus property management',
        body: 'LionDesk is a CRM. Revun combines CRM with full property management, maintenance, and accounting.',
      },
      {
        title: 'Property operations included',
        body: 'LionDesk has no PM features. Revun includes rent collection, maintenance, compliance, and owner portals.',
      },
      {
        title: 'Canadian compliance',
        body: 'LionDesk is US-focused. Revun includes provincial compliance for the Canadian market.',
      },
    ],
    tldr: [
      'Revun combines CRM with full PM; LionDesk is CRM only',
      'Revun includes property operations; LionDesk has no PM features',
      'Revun is Canadian-first; LionDesk is US-focused',
    ],
    faq: [
      {
        question: 'Is LionDesk a property management platform?',
        answer: 'No. LionDesk is a real estate CRM focused on communication and lead management. Revun combines CRM with full PM.',
      },
      {
        question: 'Who should choose LionDesk over Revun?',
        answer: 'LionDesk is good for agents who want video email and texting features. For agents who also manage properties, Revun covers both CRM and PM.',
      },
      {
        question: 'Can I switch from LionDesk to Revun?',
        answer: 'Yes. Revun includes CRM with multi-channel communications plus full property management.',
      },
    ],
  },
  /* ── Maintenance (additional) ──────────────────────────────────────────── */
  {
    slug: 'happyco',
    name: 'HappyCo',
    category: 'Maintenance',
    description: 'Property inspections and operations platform for multifamily operators with mobile-first tools.',
    pricingSummary: 'Custom pricing per property',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Property Inspections', revun: 'Built-in inspection workflows', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Turn management' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Not included' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-focused' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Not included' },
    ],
    whyRevun: [
      {
        title: 'Inspections inside a full PM platform',
        body: 'HappyCo focuses on inspections and turn management. Revun includes inspections alongside maintenance, accounting, and compliance.',
      },
      {
        title: 'One platform for everything',
        body: 'HappyCo requires separate PM tools. Revun covers inspections, maintenance, leasing, and accounting in one subscription.',
      },
      {
        title: 'Canadian compliance',
        body: 'HappyCo is US-focused. Revun includes provincial compliance for Canadian operators.',
      },
    ],
    tldr: [
      'Revun is a full PM platform with inspections; HappyCo is inspections-only',
      'Revun includes accounting and compliance; HappyCo requires separate tools',
      'Revun covers Canadian compliance; HappyCo is US-focused',
    ],
    faq: [
      {
        question: 'Is HappyCo a property management platform?',
        answer: 'No. HappyCo focuses on inspections and turn management. Revun is a full PM platform that includes inspection workflows.',
      },
      {
        question: 'Who should choose HappyCo over Revun?',
        answer: 'HappyCo is strong for large US multifamily operators who need deep inspection analytics and already have a PM system. For Canadian operators or those wanting one platform, Revun is better.',
      },
      {
        question: 'Can I switch from HappyCo to Revun?',
        answer: 'Yes. Revun includes inspection workflows plus full property management.',
      },
    ],
  },
  {
    slug: 'upkeep',
    name: 'UpKeep',
    category: 'Maintenance',
    description: 'Maintenance management platform with work order tracking, asset management, and mobile-first tools.',
    pricingSummary: 'From $45/user/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Work Orders', revun: 'Full dispatch + vendor workflow', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Asset Management', revun: 'Property asset tracking', competitor: 'Core feature' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Not included' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'Not property-specific' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Not included' },
    ],
    whyRevun: [
      {
        title: 'PM-integrated maintenance',
        body: 'UpKeep is a standalone maintenance tool. Revun integrates maintenance into the full property management workflow.',
      },
      {
        title: 'Property management included',
        body: 'UpKeep does not include PM features. Revun includes rent collection, screening, leasing, and compliance.',
      },
      {
        title: 'Per-unit vs. per-user pricing',
        body: 'UpKeep charges per user. Revun charges per unit, which scales better as your team grows.',
      },
    ],
    tldr: [
      'Revun integrates maintenance into full PM; UpKeep is maintenance-only',
      'Revun includes PM features; UpKeep requires separate tools',
      'Revun charges per unit; UpKeep charges per user',
    ],
    faq: [
      {
        question: 'Is UpKeep designed for property management?',
        answer: 'UpKeep is a general maintenance management tool used across industries. Revun is purpose-built for property management with maintenance integrated.',
      },
      {
        question: 'Who should choose UpKeep over Revun?',
        answer: 'UpKeep is strong for facility management teams who need deep asset tracking. For property managers, Revun integrates maintenance with PM operations.',
      },
      {
        question: 'Can I switch from UpKeep to Revun?',
        answer: 'Yes. Revun includes maintenance management plus full PM operations in one platform.',
      },
    ],
  },
  {
    slug: 'housecall-pro',
    name: 'Housecall Pro',
    category: 'Maintenance',
    description: 'Field service management software for home service contractors with scheduling, dispatch, and invoicing.',
    pricingSummary: 'From $65/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Field Service', revun: 'Vendor dispatch + tracking', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Scheduling', revun: 'Maintenance scheduling', competitor: 'Core feature' },
      { name: 'Invoicing', revun: 'Automated from work orders', competitor: 'Core feature' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Basic invoicing' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Customer notifications' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'Not property-specific' },
    ],
    whyRevun: [
      {
        title: 'Built for property managers, not contractors',
        body: 'Housecall Pro is built for contractors. Revun is built for property managers who hire contractors.',
      },
      {
        title: 'Full PM platform included',
        body: 'Housecall Pro handles field service only. Revun includes leasing, accounting, screening, and compliance.',
      },
      {
        title: 'Vendor management from the PM side',
        body: 'Revun lets you dispatch, track, and pay vendors within your property management workflow.',
      },
    ],
    tldr: [
      'Revun is for property managers; Housecall Pro is for contractors',
      'Revun includes full PM; Housecall Pro is field service only',
      'Revun manages vendors from the PM perspective; Housecall Pro manages jobs from the contractor perspective',
    ],
    faq: [
      {
        question: 'Is Housecall Pro for property managers?',
        answer: 'No. Housecall Pro is designed for home service contractors. Revun is designed for property managers who coordinate with contractors.',
      },
      {
        question: 'Who should choose Housecall Pro over Revun?',
        answer: 'Housecall Pro is right for contractors and maintenance companies. For property managers who dispatch and manage vendors, Revun is the better tool.',
      },
      {
        question: 'Can my vendors use Housecall Pro while I use Revun?',
        answer: 'Yes. Your vendors can use Housecall Pro for their business while you use Revun for property management and vendor coordination.',
      },
    ],
  },
  {
    slug: 'maintainx',
    name: 'MaintainX',
    category: 'Maintenance',
    description: 'Work order and procedure management platform for maintenance teams with mobile-first design.',
    pricingSummary: 'Free plan + paid from $16/user/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Work Orders', revun: 'Full dispatch + vendor workflow', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Procedures', revun: 'Maintenance checklists', competitor: 'Core feature (SOPs)' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'In-app messaging' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'Not property-specific' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Not included' },
    ],
    whyRevun: [
      {
        title: 'Property-focused maintenance',
        body: 'MaintainX is a general work order tool. Revun integrates maintenance into property management with tenant and owner context.',
      },
      {
        title: 'Full PM operations',
        body: 'MaintainX requires separate PM tools. Revun includes maintenance, leasing, accounting, and compliance in one platform.',
      },
      {
        title: 'Per-unit pricing',
        body: 'MaintainX charges per user. Revun charges per unit, which is more predictable as your team grows.',
      },
    ],
    tldr: [
      'Revun integrates maintenance into PM; MaintainX is standalone work orders',
      'Revun includes full PM operations; MaintainX requires additional tools',
      'Revun charges per unit; MaintainX charges per user',
    ],
    faq: [
      {
        question: 'Is MaintainX designed for property management?',
        answer: 'MaintainX is a general maintenance platform used across industries. Revun is purpose-built for property management with maintenance integrated.',
      },
      {
        question: 'Who should choose MaintainX over Revun?',
        answer: 'MaintainX is great for maintenance teams who need deep SOP management across industries. For property managers, Revun integrates maintenance with PM.',
      },
      {
        question: 'Can I switch from MaintainX to Revun?',
        answer: 'Yes. Revun includes work order management plus full PM operations.',
      },
    ],
  },
  {
    slug: 'fieldpulse',
    name: 'FieldPulse',
    category: 'Maintenance',
    description: 'Field service management platform for contractors with scheduling, invoicing, and customer management.',
    pricingSummary: 'From $99/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Field Service', revun: 'Vendor dispatch + tracking', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Scheduling', revun: 'Maintenance scheduling', competitor: 'Core feature' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Basic invoicing' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Customer notifications' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'Not property-specific' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Payment collection' },
    ],
    whyRevun: [
      {
        title: 'For property managers, not contractors',
        body: 'FieldPulse is built for service contractors. Revun is built for property managers who coordinate maintenance.',
      },
      {
        title: 'Full PM platform',
        body: 'FieldPulse handles field service. Revun handles field service coordination plus leasing, accounting, and compliance.',
      },
      {
        title: 'Vendor management perspective',
        body: 'Revun manages vendors from the property manager side, including dispatch, tracking, and automated payments.',
      },
    ],
    tldr: [
      'Revun is for property managers; FieldPulse is for contractors',
      'Revun includes full PM; FieldPulse is field service only',
      'Revun coordinates vendors from PM side; FieldPulse manages jobs from contractor side',
    ],
    faq: [
      {
        question: 'Is FieldPulse for property managers?',
        answer: 'No. FieldPulse is designed for field service contractors. Revun is designed for property managers.',
      },
      {
        question: 'Who should choose FieldPulse over Revun?',
        answer: 'FieldPulse is right for maintenance contractors. Property managers should use Revun for vendor coordination within their PM workflow.',
      },
      {
        question: 'Can I switch from FieldPulse to Revun?',
        answer: 'If you are a property manager using FieldPulse, yes. Revun includes maintenance coordination plus full PM.',
      },
    ],
  },
  {
    slug: 'appwork',
    name: 'AppWork',
    category: 'Maintenance',
    description: 'Property inspection and maintenance app for multifamily operators with photo-based workflows.',
    pricingSummary: 'Custom pricing',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Property Inspections', revun: 'Built-in inspection workflows', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Photo Documentation', revun: 'Before/after photo capture', competitor: 'Core feature' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Not included' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-focused' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Not included' },
    ],
    whyRevun: [
      {
        title: 'Inspections inside full PM',
        body: 'AppWork is inspection-focused. Revun includes inspections alongside maintenance, leasing, accounting, and compliance.',
      },
      {
        title: 'One platform, not a point tool',
        body: 'AppWork requires separate PM tools. Revun consolidates inspections with all PM operations.',
      },
      {
        title: 'Canadian compliance',
        body: 'AppWork is US-focused. Revun includes provincial compliance for Canadian operators.',
      },
    ],
    tldr: [
      'Revun is a full PM platform with inspections; AppWork is inspections only',
      'Revun includes accounting and compliance; AppWork requires separate tools',
      'Revun covers Canadian compliance; AppWork is US-focused',
    ],
    faq: [
      {
        question: 'Is AppWork a property management platform?',
        answer: 'No. AppWork focuses on property inspections and maintenance documentation. Revun is a full PM platform.',
      },
      {
        question: 'Who should choose AppWork over Revun?',
        answer: 'AppWork is strong for operators who need deep inspection analytics alongside an existing PM system. For one-platform operations, Revun is better.',
      },
      {
        question: 'Can I switch from AppWork to Revun?',
        answer: 'Yes. Revun includes inspection workflows plus full PM operations.',
      },
    ],
  },
  {
    slug: 'building-engines',
    name: 'Building Engines',
    category: 'Maintenance',
    description: 'Building operations platform for commercial property teams with work orders, inspections, and tenant experience tools.',
    pricingSummary: 'Custom enterprise pricing',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Building Ops', revun: 'Full maintenance + vendor dispatch', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Ops-focused only' },
      { name: 'Tenant Experience', revun: 'Tenant portal + communications', competitor: 'Core feature' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Leasing Tools', revun: 'Full lease lifecycle', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Tenant requests' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'US-focused' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Not included' },
    ],
    whyRevun: [
      {
        title: 'Full PM, not just building ops',
        body: 'Building Engines focuses on building operations. Revun covers building ops plus leasing, accounting, and compliance.',
      },
      {
        title: 'Residential and commercial',
        body: 'Building Engines targets commercial. Revun handles residential, commercial, and mixed-use properties.',
      },
      {
        title: 'Transparent pricing',
        body: 'Building Engines uses custom enterprise pricing. Revun offers transparent per-unit pricing.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; Building Engines focuses on building operations',
      'Revun covers residential and commercial; Building Engines is commercial-only',
      'Revun has transparent pricing; Building Engines uses enterprise quotes',
    ],
    faq: [
      {
        question: 'Is Building Engines a property management platform?',
        answer: 'Building Engines focuses on building operations for commercial properties. Revun is a full PM platform covering leasing, accounting, and compliance.',
      },
      {
        question: 'Who should choose Building Engines over Revun?',
        answer: 'Building Engines is strong for large commercial operators who need deep building ops tools. For mixed-use or residential, Revun is the better fit.',
      },
      {
        question: 'Can I switch from Building Engines to Revun?',
        answer: 'Yes. Revun includes building operations plus full PM for residential and commercial properties.',
      },
    ],
  },
  /* ── Communications (additional) ───────────────────────────────────────── */
  {
    slug: 'aircall',
    name: 'Aircall',
    category: 'Communications',
    description: 'Cloud phone system for teams with call routing, analytics, and CRM integrations.',
    pricingSummary: 'From $30/user/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Phone System', revun: 'Built-in VoIP calling', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Call Routing', revun: 'Property-based routing', competitor: 'Advanced call routing' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Not included' },
      { name: 'Multi-Channel', revun: 'Email, SMS, calling, in-app', competitor: 'Phone + some SMS' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'Not property-specific' },
    ],
    whyRevun: [
      {
        title: 'Calling inside your PM workflow',
        body: 'Aircall is a standalone phone system. Revun embeds calling into your property management workflow with tenant and owner context.',
      },
      {
        title: 'No separate phone subscription',
        body: 'With Revun, communications are included in your PM subscription. No need for a separate Aircall account.',
      },
      {
        title: 'Full PM platform',
        body: 'Aircall handles phone calls. Revun handles calls plus maintenance, leasing, accounting, and compliance.',
      },
    ],
    tldr: [
      'Revun includes calling in the PM platform; Aircall is a standalone phone system',
      'Revun includes full PM; Aircall handles calls only',
      'Revun eliminates the need for a separate phone subscription',
    ],
    faq: [
      {
        question: 'Does Revun include phone calling?',
        answer: 'Yes. Revun includes built-in VoIP calling as part of the communications hub alongside email, SMS, and in-app messaging.',
      },
      {
        question: 'Who should choose Aircall over Revun?',
        answer: 'Aircall is excellent for teams that need advanced call center features. For property managers, Revun includes calling inside the PM workflow.',
      },
      {
        question: 'Can I use Aircall with Revun?',
        answer: 'You can, but Revun includes built-in calling so it may not be necessary.',
      },
    ],
  },
  {
    slug: 'zoom-phone',
    name: 'Zoom Phone',
    category: 'Communications',
    description: 'Business phone system from Zoom with cloud PBX, call routing, and video integration.',
    pricingSummary: 'From $13/user/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Phone System', revun: 'Built-in VoIP calling', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Video Meetings', revun: 'Not included', competitor: 'Zoom Meetings integration' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Not included' },
      { name: 'Multi-Channel', revun: 'Email, SMS, calling, in-app', competitor: 'Phone + SMS + video' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'Not property-specific' },
    ],
    whyRevun: [
      {
        title: 'Communications in context',
        body: 'Zoom Phone is a generic phone system. Revun provides calling within your property management workflow with full tenant and owner context.',
      },
      {
        title: 'All PM features included',
        body: 'Zoom Phone handles calls only. Revun handles calls plus maintenance, leasing, accounting, and compliance.',
      },
      {
        title: 'One subscription',
        body: 'Revun includes calling in the PM subscription. No separate Zoom Phone account needed.',
      },
    ],
    tldr: [
      'Revun includes calling in the PM platform; Zoom Phone is standalone',
      'Revun provides property context for calls; Zoom Phone is generic',
      'Revun includes full PM; Zoom Phone is phone-only',
    ],
    faq: [
      {
        question: 'Does Revun replace Zoom Phone?',
        answer: 'For property management communications, yes. Revun includes built-in VoIP calling. You may still want Zoom for video meetings.',
      },
      {
        question: 'Who should choose Zoom Phone over Revun?',
        answer: 'Zoom Phone is ideal for teams that need deep video conferencing integration. For PM-focused calling, Revun is more efficient.',
      },
      {
        question: 'Can I use Zoom Phone with Revun?',
        answer: 'Yes. Some teams use Zoom for video meetings and Revun for PM-integrated calling and communications.',
      },
    ],
  },
  {
    slug: 'intercom',
    name: 'Intercom',
    category: 'Communications',
    description: 'Customer messaging platform with live chat, chatbots, and help center for support teams.',
    pricingSummary: 'From $39/seat/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Live Chat', revun: 'Built-in in-app messaging', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Chatbots', revun: 'Not included', competitor: 'AI chatbot (Fin)' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Multi-Channel', revun: 'Email, SMS, calling, in-app', competitor: 'Chat, email, social' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'Not property-specific' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Not included' },
    ],
    whyRevun: [
      {
        title: 'PM-native messaging',
        body: 'Intercom is a generic messaging platform. Revun builds tenant and owner communications into your property management workflow.',
      },
      {
        title: 'Full PM included',
        body: 'Intercom handles messaging only. Revun handles messaging plus maintenance, leasing, accounting, and compliance.',
      },
      {
        title: 'Property context in every conversation',
        body: 'Revun connects every message to the relevant property, unit, lease, and maintenance history.',
      },
    ],
    tldr: [
      'Revun includes messaging in the PM platform; Intercom is standalone messaging',
      'Revun connects messages to property context; Intercom is generic',
      'Revun includes full PM; Intercom handles communications only',
    ],
    faq: [
      {
        question: 'Does Revun include live chat?',
        answer: 'Revun includes in-app messaging, email, SMS, and calling as part of the communications hub. Every conversation is connected to property context.',
      },
      {
        question: 'Who should choose Intercom over Revun?',
        answer: 'Intercom is excellent for SaaS companies and e-commerce. For property management communications, Revun provides better context and workflow integration.',
      },
      {
        question: 'Can I use Intercom with Revun?',
        answer: 'You can, but Revun includes built-in communications that are purpose-built for property management.',
      },
    ],
  },
  {
    slug: 'zendesk',
    name: 'Zendesk',
    category: 'Communications',
    description: 'Customer service software with ticketing, help center, and multi-channel support for service teams.',
    pricingSummary: 'From $55/agent/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Ticketing', revun: 'Maintenance + request tracking', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Help Center', revun: 'Tenant FAQ portal', competitor: 'Core feature' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Multi-Channel', revun: 'Email, SMS, calling, in-app', competitor: 'Email, chat, phone, social' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'Not property-specific' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Not included' },
    ],
    whyRevun: [
      {
        title: 'Property-native ticketing',
        body: 'Zendesk is generic customer service. Revun connects every request to properties, units, leases, and maintenance history.',
      },
      {
        title: 'Full PM operations',
        body: 'Zendesk handles tickets. Revun handles tickets plus maintenance dispatch, accounting, leasing, and compliance.',
      },
      {
        title: 'Built for property management',
        body: 'Revun ticketing is designed for tenant requests, maintenance coordination, and owner communications.',
      },
    ],
    tldr: [
      'Revun includes ticketing in the PM platform; Zendesk is generic customer service',
      'Revun connects tickets to property context; Zendesk is industry-agnostic',
      'Revun includes full PM; Zendesk handles support only',
    ],
    faq: [
      {
        question: 'Does Revun replace Zendesk?',
        answer: 'For property management communications and ticketing, yes. Revun includes request tracking connected to your PM operations.',
      },
      {
        question: 'Who should choose Zendesk over Revun?',
        answer: 'Zendesk is ideal for large support teams across industries. For property management, Revun provides better workflow integration.',
      },
      {
        question: 'Can I use Zendesk with Revun?',
        answer: 'You can, but Revun includes built-in communications and ticketing purpose-built for property management.',
      },
    ],
  },
  {
    slug: 'freshdesk',
    name: 'Freshdesk',
    category: 'Communications',
    description: 'Help desk software with ticketing, automation, and multi-channel support for customer service teams.',
    pricingSummary: 'Free plan + paid from $15/agent/month',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Ticketing', revun: 'Maintenance + request tracking', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Automation', revun: 'PM workflow automation', competitor: 'Ticket automation' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Multi-Channel', revun: 'Email, SMS, calling, in-app', competitor: 'Email, chat, phone' },
      { name: 'Canadian Compliance', revun: 'Province-specific workflows', competitor: 'Not property-specific' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Not included' },
    ],
    whyRevun: [
      {
        title: 'PM-specific help desk',
        body: 'Freshdesk is a generic help desk. Revun provides property-specific request tracking connected to units, leases, and maintenance.',
      },
      {
        title: 'Full PM platform',
        body: 'Freshdesk handles tickets. Revun handles tickets plus the full property management lifecycle.',
      },
      {
        title: 'One platform for everything',
        body: 'Revun eliminates the need for Freshdesk plus separate PM tools. Everything lives in one subscription.',
      },
    ],
    tldr: [
      'Revun includes help desk in the PM platform; Freshdesk is standalone',
      'Revun connects tickets to PM context; Freshdesk is industry-agnostic',
      'Revun replaces Freshdesk plus PM tools with one platform',
    ],
    faq: [
      {
        question: 'Does Revun include help desk features?',
        answer: 'Yes. Revun includes request tracking, ticketing, and multi-channel communications connected to your PM operations.',
      },
      {
        question: 'Who should choose Freshdesk over Revun?',
        answer: 'Freshdesk is excellent for general customer support teams. For property management, Revun provides better context and workflow integration.',
      },
      {
        question: 'Can I switch from Freshdesk to Revun?',
        answer: 'Yes. Revun includes help desk features plus full PM operations in one platform.',
      },
    ],
  },
  /* ── Screening (additional) ────────────────────────────────────────────── */
  {
    slug: 'sure',
    name: 'Sure',
    category: 'Screening',
    description: 'Rent guarantee and insurance platform protecting landlords from missed rent payments.',
    pricingSummary: 'Premium-based (% of rent)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Rent Guarantee', revun: 'Coming soon', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Part of underwriting' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Not included' },
      { name: 'Lease Management', revun: 'Full lease lifecycle', competitor: 'Not included' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Guarantee payouts' },
    ],
    whyRevun: [
      {
        title: 'Full platform, not just insurance',
        body: 'Sure provides rent guarantee insurance. Revun provides a full PM platform with rent guarantee coming soon as an integrated feature.',
      },
      {
        title: 'Screening included',
        body: 'Sure uses screening for underwriting only. Revun includes full tenant screening as part of your leasing pipeline.',
      },
      {
        title: 'All PM operations',
        body: 'Revun handles maintenance, accounting, communications, and compliance. Sure covers one financial product.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; Sure offers rent guarantee only',
      'Revun includes screening and leasing; Sure uses screening for underwriting',
      'Revun covers all PM operations; Sure covers one financial product',
    ],
    faq: [
      {
        question: 'Does Revun offer rent guarantee?',
        answer: 'Revun is building rent guarantee into the platform (coming soon). In the meantime, you can use Sure alongside Revun.',
      },
      {
        question: 'Who should choose Sure over Revun?',
        answer: 'Sure is right if you only need rent guarantee and already have a PM system. For full PM plus upcoming guarantee, choose Revun.',
      },
      {
        question: 'Can I use Sure with Revun?',
        answer: 'Yes. You can use Sure for rent guarantee while Revun handles property management. As Revun adds guarantee, you can consolidate.',
      },
    ],
  },
  {
    slug: 'the-guarantors',
    name: 'TheGuarantors',
    category: 'Screening',
    description: 'Lease guarantee and renters insurance platform helping tenants qualify for apartments they could not otherwise afford.',
    pricingSummary: 'Premium-based (tenant-paid)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Lease Guarantee', revun: 'Coming soon', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Part of underwriting' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Renters Insurance', revun: 'Not included', competitor: 'Included offering' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Not included' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Not included' },
    ],
    whyRevun: [
      {
        title: 'Full PM vs. financial product',
        body: 'TheGuarantors offers lease guarantees. Revun is a full PM platform with guarantee coming soon as an integrated feature.',
      },
      {
        title: 'Operational tools included',
        body: 'TheGuarantors has no PM features. Revun includes maintenance, accounting, leasing, and communications.',
      },
      {
        title: 'Canadian compliance',
        body: 'TheGuarantors focuses on US markets. Revun includes provincial compliance for Canadian operators.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; TheGuarantors offers lease guarantees only',
      'Revun includes PM operations; TheGuarantors is a financial product',
      'Revun covers Canadian compliance; TheGuarantors is US-focused',
    ],
    faq: [
      {
        question: 'Is TheGuarantors available in Canada?',
        answer: 'TheGuarantors primarily serves US markets. Revun is built for Canadian operations with provincial compliance.',
      },
      {
        question: 'Can I use TheGuarantors with Revun?',
        answer: 'Yes. You can use TheGuarantors for lease guarantees while Revun handles property management.',
      },
      {
        question: 'Does Revun offer lease guarantees?',
        answer: 'Revun is building lease guarantee into the platform (coming soon). Currently, you can use TheGuarantors alongside Revun.',
      },
    ],
  },
  {
    slug: 'insurent',
    name: 'Insurent',
    category: 'Screening',
    description: 'Lease guaranty program helping renters qualify for apartments without traditional guarantors.',
    pricingSummary: 'Premium-based (tenant-paid)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Lease Guaranty', revun: 'Coming soon', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Part of underwriting' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Not included' },
      { name: 'Lease Management', revun: 'Full lease lifecycle', competitor: 'Not included' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Not included' },
    ],
    whyRevun: [
      {
        title: 'Full platform, not just guaranty',
        body: 'Insurent provides lease guaranty. Revun provides a full PM platform with guaranty coming soon as an integrated feature.',
      },
      {
        title: 'Operational infrastructure',
        body: 'Insurent has no PM features. Revun covers maintenance, accounting, communications, and compliance.',
      },
      {
        title: 'Canadian market focus',
        body: 'Insurent is US-focused. Revun is built for the Canadian market.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; Insurent is lease guaranty only',
      'Revun includes all PM operations; Insurent is a single financial product',
      'Revun is Canadian-first; Insurent is US-focused',
    ],
    faq: [
      {
        question: 'Is Insurent available in Canada?',
        answer: 'Insurent primarily serves US markets, mainly New York. Revun is built for Canadian operations.',
      },
      {
        question: 'Can I use Insurent with Revun?',
        answer: 'Yes. You can use Insurent for lease guaranty while Revun handles property management.',
      },
      {
        question: 'Does Revun offer lease guaranty?',
        answer: 'Revun is building lease guarantee into the platform (coming soon).',
      },
    ],
  },
  {
    slug: 'rhino',
    name: 'Rhino',
    category: 'Screening',
    description: 'Security deposit insurance replacing traditional cash deposits with affordable monthly insurance premiums.',
    pricingSummary: 'From $19/month (tenant-paid)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Deposit Alternative', revun: 'Coming soon', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Not included' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Not included' },
      { name: 'Lease Management', revun: 'Full lease lifecycle', competitor: 'Not included' },
      { name: 'Claims Process', revun: 'Not yet available', competitor: 'Built-in claims' },
    ],
    whyRevun: [
      {
        title: 'Full PM platform',
        body: 'Rhino replaces security deposits. Revun is a complete PM platform with deposit alternatives coming soon.',
      },
      {
        title: 'One platform for all operations',
        body: 'Rhino handles one aspect of leasing. Revun handles all aspects of property management.',
      },
      {
        title: 'Canadian compliance',
        body: 'Rhino is US-focused. Revun includes provincial compliance for Canadian operations.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; Rhino is deposit insurance only',
      'Revun covers all PM operations; Rhino covers one leasing step',
      'Revun is Canadian-first; Rhino is US-focused',
    ],
    faq: [
      {
        question: 'Does Revun offer deposit alternatives?',
        answer: 'Revun is building deposit alternatives into the platform (coming soon). Currently, you can use Rhino alongside Revun.',
      },
      {
        question: 'Who should choose Rhino over Revun?',
        answer: 'Rhino is right if you only need deposit insurance and already have a PM system. For full PM operations, choose Revun.',
      },
      {
        question: 'Is Rhino available in Canada?',
        answer: 'Rhino primarily serves US markets. Revun is built for Canadian operations.',
      },
    ],
  },
  {
    slug: 'jetty',
    name: 'Jetty',
    category: 'Screening',
    description: 'Renters insurance and security deposit alternatives helping renters move in faster with lower upfront costs.',
    pricingSummary: 'From $5/month (renters insurance)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Renters Insurance', revun: 'Not included', competitor: 'Core product' },
      { name: 'Deposit Alternative', revun: 'Coming soon', competitor: 'Jetty Deposit' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Tenant Screening', revun: 'Built-in with partner integrations', competitor: 'Not included' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Not included' },
      { name: 'Lease Management', revun: 'Full lease lifecycle', competitor: 'Not included' },
    ],
    whyRevun: [
      {
        title: 'Full PM vs. insurance product',
        body: 'Jetty offers renters insurance and deposit alternatives. Revun is a full PM platform with deposit alternatives coming soon.',
      },
      {
        title: 'Complete property operations',
        body: 'Jetty covers two financial products. Revun covers the entire property management lifecycle.',
      },
      {
        title: 'Canadian market',
        body: 'Jetty is US-focused. Revun is built for the Canadian market.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; Jetty offers insurance and deposit alternatives',
      'Revun covers all PM operations; Jetty covers two financial products',
      'Revun is Canadian-first; Jetty is US-focused',
    ],
    faq: [
      {
        question: 'Is Jetty available in Canada?',
        answer: 'Jetty primarily serves US markets. Revun is built for Canadian operations with provincial compliance.',
      },
      {
        question: 'Can I use Jetty with Revun?',
        answer: 'Yes. You can use Jetty for renters insurance and deposit alternatives while Revun handles property management.',
      },
      {
        question: 'Does Revun offer renters insurance?',
        answer: 'Revun does not currently offer renters insurance. Deposit alternatives are coming soon.',
      },
    ],
  },
  {
    slug: 'leaselock',
    name: 'LeaseLock',
    category: 'Screening',
    description: 'Lease insurance platform eliminating security deposits entirely with AI-powered risk assessment.',
    pricingSummary: 'Premium-based (operator-paid)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Lease Insurance', revun: 'Coming soon', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'AI Risk Assessment', revun: 'Screening with integrations', competitor: 'Core feature' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Not included' },
      { name: 'Deposit Elimination', revun: 'Coming soon', competitor: 'Core offering' },
      { name: 'Claims Management', revun: 'Not yet available', competitor: 'Built-in' },
    ],
    whyRevun: [
      {
        title: 'Full PM platform',
        body: 'LeaseLock provides lease insurance. Revun provides a full PM platform with lease insurance coming soon.',
      },
      {
        title: 'End-to-end operations',
        body: 'LeaseLock covers one financial product. Revun covers the entire property management lifecycle.',
      },
      {
        title: 'Canadian compliance',
        body: 'LeaseLock focuses on US multifamily. Revun includes Canadian provincial compliance.',
      },
    ],
    tldr: [
      'Revun is a full PM platform; LeaseLock provides lease insurance',
      'Revun covers all operations; LeaseLock handles one financial product',
      'Revun is Canadian-first; LeaseLock targets US multifamily',
    ],
    faq: [
      {
        question: 'Is LeaseLock available in Canada?',
        answer: 'LeaseLock primarily serves US multifamily operators. Revun is built for Canadian operations.',
      },
      {
        question: 'Can I use LeaseLock with Revun?',
        answer: 'Yes. You can use LeaseLock for deposit elimination while Revun handles PM. As Revun builds this in, you can consolidate.',
      },
      {
        question: 'Does Revun eliminate security deposits?',
        answer: 'Revun is building deposit alternatives into the platform (coming soon).',
      },
    ],
  },
  {
    slug: 'trustii',
    name: 'Trustii',
    category: 'Screening',
    description: 'Identity verification and tenant screening platform using biometric and document verification for landlords.',
    pricingSummary: 'Per-verification fees',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Identity Verification', revun: 'Built-in with partner integrations', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'Biometric Verification', revun: 'Partner-provided', competitor: 'Core feature' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Not included' },
      { name: 'Tenant Screening', revun: 'Full screening pipeline', competitor: 'ID verification only' },
      { name: 'Payments', revun: 'Rent, vendor payouts, Interac', competitor: 'Not included' },
    ],
    whyRevun: [
      {
        title: 'Full screening pipeline',
        body: 'Trustii handles identity verification. Revun includes identity verification as part of a full screening and leasing pipeline.',
      },
      {
        title: 'Complete PM platform',
        body: 'Trustii is a point tool. Revun is a full PM platform that includes verification inside the leasing workflow.',
      },
      {
        title: 'No per-verification fees',
        body: 'Trustii charges per verification. Revun includes screening in the platform subscription.',
      },
    ],
    tldr: [
      'Revun includes ID verification in the full PM platform; Trustii is verification only',
      'Revun includes screening in the subscription; Trustii charges per verification',
      'Revun is a complete PM platform; Trustii is a point tool',
    ],
    faq: [
      {
        question: 'Does Revun include identity verification?',
        answer: 'Yes. Revun includes identity verification as part of the screening pipeline, integrated with your leasing workflow.',
      },
      {
        question: 'Who should choose Trustii over Revun?',
        answer: 'Trustii is right for operators who need deep biometric verification. For full PM with integrated screening, choose Revun.',
      },
      {
        question: 'Can I use Trustii with Revun?',
        answer: 'Yes. Some operators use Trustii for enhanced verification alongside Revun for property management.',
      },
    ],
  },
  {
    slug: 'persona',
    name: 'Persona',
    category: 'Screening',
    description: 'Identity verification platform used across industries for KYC, document verification, and fraud prevention.',
    pricingSummary: 'Custom pricing (per verification)',
    revunPricingSummary: 'From $1/day per unit',
    features: [
      { name: 'Identity Verification', revun: 'Built-in with partner integrations', competitor: 'Core product' },
      { name: 'Property Management', revun: 'Full PM platform', competitor: 'Not included' },
      { name: 'KYC/AML', revun: 'FINTRAC compliance', competitor: 'Enterprise KYC platform' },
      { name: 'Maintenance Tracking', revun: 'Full dispatch + vendor workflow', competitor: 'Not included' },
      { name: 'Accounting', revun: 'Full property accounting', competitor: 'Not included' },
      { name: 'Communications Hub', revun: 'Email, SMS, calling, in-app', competitor: 'Not included' },
      { name: 'Tenant Screening', revun: 'Full screening pipeline', competitor: 'ID verification only' },
      { name: 'Document Verification', revun: 'Part of screening', competitor: 'Core feature' },
    ],
    whyRevun: [
      {
        title: 'Property-specific verification',
        body: 'Persona is a general identity platform. Revun includes tenant-specific verification inside the leasing pipeline.',
      },
      {
        title: 'Full PM platform',
        body: 'Persona is an API tool. Revun is a complete PM platform with verification built into the screening workflow.',
      },
      {
        title: 'No integration required',
        body: 'Persona requires API integration. Revun includes verification out of the box as part of the platform.',
      },
    ],
    tldr: [
      'Revun includes verification in the PM platform; Persona is a developer API',
      'Revun is ready to use; Persona requires API integration',
      'Revun is a complete PM platform; Persona is an identity verification tool',
    ],
    faq: [
      {
        question: 'Is Persona designed for property management?',
        answer: 'No. Persona is a general identity verification platform used across industries. Revun includes property-specific verification in the leasing pipeline.',
      },
      {
        question: 'Who should choose Persona over Revun?',
        answer: 'Persona is right for companies building custom identity verification flows. For property managers, Revun includes verification out of the box.',
      },
      {
        question: 'Does Revun use Persona?',
        answer: 'Revun uses partner integrations for identity verification. The specific providers may vary but the feature is included in the platform.',
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

  const canonicalUrl = buildCanonicalUrl(`/compare/${competitor}`)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://revun.com'

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Compare',
        item: buildCanonicalUrl('/compare'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Revun vs ${data.name}`,
        item: canonicalUrl,
      },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Revun vs ${data.name}: Property Management Software Comparison`,
    description: `See how Revun compares to ${data.name} across features, pricing, and support. ${data.description}`,
    datePublished: '2026-04-08',
    publisher: {
      '@type': 'Organization',
      name: 'Revun',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(breadcrumbSchema as Record<string, unknown>) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(faqSchema as Record<string, unknown>) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(articleSchema as Record<string, unknown>) }}
      />
      <CompareDetailClient data={data} />
    </>
  )
}
