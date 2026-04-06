export interface SeoFields {
  metaTitle?: string
  metaDescription?: string
  ogImage?: {
    asset: { _ref: string }
    alt?: string
  }
  keywords?: string[]
}

export interface PublishingControls {
  canonicalOverride?: string
  noindex?: boolean
  includedInSitemap?: boolean
  redirectTo?: string
  publishedAt?: string
  updatedAt?: string
  author?: string
}

export interface AudienceTrack {
  _id: string
  name: string
  slug: { current: string }
  label: string
  description: string
  icon?: string
  ctaLabel: string
  ctaHref: string
}

export interface Solution {
  _id: string
  title: string
  slug: { current: string }
  audienceTrack: AudienceTrack
  headline: string
  subheadline: string
  features: SolutionFeature[]
  body?: unknown[]
  seo?: SeoFields
  publishing?: PublishingControls
}

export interface SolutionFeature {
  title: string
  description: string
  icon?: string
}

export interface PricingPackage {
  _id: string
  name: string
  slug: { current: string }
  tier: 'self-manage' | 'agent' | 'brokerage' | 'operator' | 'maintenance' | 'enterprise'
  price: number
  priceUnit: '/day' | '/month' | '/user' | 'custom'
  priceNote?: string
  targetAudience?: AudienceTrack
  features: string[]
  highlightedFeatures?: string[]
  ctaLabel: string
  ctaHref: string
  popular?: boolean
  seo?: SeoFields
}

export interface Competitor {
  _id: string
  name: string
  slug: { current: string }
  logo?: { asset: { _ref: string }; alt?: string }
  category: string
  website?: string
  description?: string
  pricingSummary?: string
  seo?: SeoFields
  publishing?: PublishingControls
}

export interface ComparisonPage {
  _id: string
  title: string
  slug: { current: string }
  competitor: Competitor
  featureRows: FeatureRow[]
  body?: unknown[]
  seo?: SeoFields
  publishing?: PublishingControls
}

export interface FeatureRow {
  feature: string
  revunValue: string
  competitorValue: string
  category?: string
}

export interface Integration {
  _id: string
  name: string
  slug: { current: string }
  logo?: { asset: { _ref: string }; alt?: string }
  category: IntegrationCategory
  website?: string
  description?: string
  setupDifficulty?: 'easy' | 'medium' | 'advanced'
  status: 'available' | 'coming-soon' | 'beta'
  body?: unknown[]
  seo?: SeoFields
  publishing?: PublishingControls
}

export interface IntegrationCategory {
  _id: string
  name: string
  slug: { current: string }
}

export interface Province {
  _id: string
  title: string
  slug: { current: string }
  country: 'ca' | 'us'
  abbreviation?: string
  description?: string
  heroImage?: { asset: { _ref: string }; alt?: string }
  seo?: SeoFields
  publishing?: PublishingControls
}

export interface City {
  _id: string
  title: string
  slug: { current: string }
  province: Province
  population?: number
  rentalMarketSize?: string
  description?: string
  heroImage?: { asset: { _ref: string }; alt?: string }
  seo?: SeoFields
  publishing?: PublishingControls
}

export interface HelpArticle {
  _id: string
  title: string
  slug: { current: string }
  category: string
  body?: unknown[]
  seo?: SeoFields
  publishing?: PublishingControls
}

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  coverImage?: { asset: { _ref: string }; alt?: string }
  body?: unknown[]
  seo?: SeoFields
  publishing?: PublishingControls
}
