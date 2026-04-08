import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { WalletDashboardClient } from './client'

export const metadata: Metadata = {
  title: 'Wallet',
  description:
    'Manage your property financials in one place. See what you owe, track payments, manage investments, and send or withdraw funds from your Revun wallet.',
  alternates: { canonical: buildCanonicalUrl('/wallet') },
  openGraph: {
    title: 'Wallet | Revun',
    description:
      'Manage your property financials in one place. Track payments, manage investments, and send or withdraw funds.',
    url: buildCanonicalUrl('/wallet'),
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Revun Wallet',
  description:
    'Manage your property financials in one place. See what you owe, track payments, manage investments, and send or withdraw funds.',
  url: 'https://revun.com/wallet/',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Revun',
    url: 'https://revun.com/',
  },
}

export default function WalletPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(jsonLd as Record<string, unknown>) }}
      />
      <WalletDashboardClient />
    </>
  )
}
