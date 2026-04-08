import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { InvestmentPage } from './client'

export const metadata: Metadata = {
  title: 'Investment Dashboard | Revun',
  description:
    'Manage your real estate investments from one dashboard. Track occupancy, schedule tours, review offers, handle maintenance, monitor financials, and guarantee your rent with Revun.',
  alternates: { canonical: buildCanonicalUrl('/investment') },
  openGraph: {
    title: 'Investment Dashboard | Revun',
    description:
      'Your entire investment portfolio in one place. Occupancy tracking, tour scheduling, offer management, financials, and rent guarantee.',
    url: buildCanonicalUrl('/investment'),
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildBreadcrumbSchema([
            { name: 'Home', url: 'https://revun.com/' },
            { name: 'Investment', url: 'https://revun.com/investment/' },
          ])),
        }}
      />
      <InvestmentPage />
    </>
  )
}
