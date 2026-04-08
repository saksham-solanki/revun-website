import { SITE_URL } from '@/lib/metadata'

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface LocalBusinessData {
  name: string
  city: string
  province: string
  country: string
}

export interface WebPageData {
  name: string
  description: string
  url: string
}

export function buildOrganizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Revun',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@revun.com',
      contactType: 'customer support',
      availableLanguage: 'English',
    },
  }
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function buildFAQPageSchema(faqs: FAQItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function buildLocalBusinessSchema(data: LocalBusinessData): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.name,
    url: SITE_URL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: data.city,
      addressRegion: data.province,
      addressCountry: data.country,
    },
    areaServed: {
      '@type': 'City',
      name: data.city,
    },
  }
}

export function buildWebPageSchema(data: WebPageData): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: data.name,
    description: data.description,
    url: data.url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Revun',
      url: SITE_URL,
    },
  }
}

/* ── WebSite schema (sitelinks searchbox) ──────────────────────────── */

export function buildWebSiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Revun',
    url: SITE_URL,
    description:
      'Canadian-native property management platform for landlords, property managers, and tenants across Canada and the United States.',
    publisher: {
      '@type': 'Organization',
      name: 'Revun',
      url: SITE_URL,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: ['en-CA', 'en-US'],
  }
}

/* ── Article schema for blog posts ─────────────────────────────────── */

export interface ArticleData {
  headline: string
  description: string
  datePublished: string
  dateModified?: string
  author?: string
  image?: string
  url: string
  category?: string
}

export function buildArticleSchema(data: ArticleData): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    description: data.description,
    datePublished: data.datePublished,
    ...(data.dateModified ? { dateModified: data.dateModified } : {}),
    author: {
      '@type': 'Organization',
      name: data.author || 'Revun',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Revun',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo-dark.svg`,
      },
    },
    ...(data.image ? { image: data.image } : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url,
    },
    ...(data.category ? { articleSection: data.category } : {}),
  }
}

/* ── ComparisonPage schema for vs pages ────────────────────────────── */

export function buildComparisonSchema(data: {
  revunName: string
  competitorName: string
  url: string
  description: string
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${data.revunName} vs ${data.competitorName}`,
    description: data.description,
    url: data.url,
    about: [
      {
        '@type': 'SoftwareApplication',
        name: data.revunName,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
      },
      {
        '@type': 'SoftwareApplication',
        name: data.competitorName,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
      },
    ],
    isPartOf: {
      '@type': 'WebSite',
      name: 'Revun',
      url: SITE_URL,
    },
  }
}

/* ── SoftwareApplication schema ─────────────────────────────────────── */

export function buildSoftwareApplicationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Revun',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: SITE_URL,
    description:
      'Canadian-native property management platform for landlords, property managers, and tenants. Covers rent collection, tenant screening, lease management, maintenance, accounting, and provincial compliance across Canada and the US.',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'CAD',
      lowPrice: '0',
      highPrice: '299',
      offerCount: 4,
      offers: [
        {
          '@type': 'Offer',
          name: 'Free',
          price: '0',
          priceCurrency: 'CAD',
          description: 'For 1-2 units. Core features included.',
        },
        {
          '@type': 'Offer',
          name: 'Starter',
          price: '29',
          priceCurrency: 'CAD',
          description: 'For growing portfolios up to 20 units.',
        },
        {
          '@type': 'Offer',
          name: 'Professional',
          price: '79',
          priceCurrency: 'CAD',
          description: 'For professional property managers.',
        },
        {
          '@type': 'Offer',
          name: 'Enterprise',
          price: '299',
          priceCurrency: 'CAD',
          description: 'For large portfolios and multi-location operations.',
        },
      ],
    },
    featureList: [
      'Rent Collection & Payments',
      'Tenant Screening',
      'Lease Management',
      'Maintenance Management',
      'Accounting & Reporting',
      'Owner Portal',
      'Tenant Portal',
      'Rent Guarantee',
      'Provincial Compliance Automation',
      'Listing Syndication',
      'Document Management',
      'Communication Hub',
    ],
    screenshot: `${SITE_URL}/og-default.png`,
    provider: {
      '@type': 'Organization',
      name: 'Revun',
      url: SITE_URL,
    },
  }
}

/* ── Product schema for pricing page ────────────────────────────────── */

export interface PricingTier {
  name: string
  price: string
  description: string
}

export function buildProductSchema(tiers: PricingTier[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Revun Property Management Platform',
    description:
      'All-in-one property management software for Canadian landlords and property managers. Rent collection, tenant screening, lease management, maintenance, and compliance.',
    brand: {
      '@type': 'Brand',
      name: 'Revun',
    },
    offers: tiers.map((tier) => ({
      '@type': 'Offer',
      name: tier.name,
      price: tier.price,
      priceCurrency: 'CAD',
      description: tier.description,
      availability: 'https://schema.org/InStock',
    })),
  }
}

/* ── HowTo schema ───────────────────────────────────────────────────── */

export interface HowToStep {
  name: string
  text: string
}

export function buildHowToSchema(data: {
  name: string
  description: string
  steps: HowToStep[]
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: data.name,
    description: data.description,
    step: data.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }
}

/* ── Service schema for solutions pages ─────────────────────────────── */

export function buildServiceSchema(data: {
  name: string
  description: string
  serviceType: string
  areaServed?: string[]
  url: string
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.name,
    description: data.description,
    serviceType: data.serviceType,
    provider: {
      '@type': 'Organization',
      name: 'Revun',
      url: SITE_URL,
    },
    areaServed: (data.areaServed ?? ['Canada', 'United States']).map(
      (area) => ({
        '@type': 'Country',
        name: area,
      })
    ),
    url: data.url,
  }
}
