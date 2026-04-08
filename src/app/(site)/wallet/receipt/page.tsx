import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { ReceiptClient } from './client'

export const metadata: Metadata = {
  title: 'Payment Receipt',
  description:
    'View your payment receipt and transaction details for your Revun wallet payment.',
  alternates: { canonical: buildCanonicalUrl('/wallet/receipt') },
  openGraph: {
    title: 'Payment Receipt | Revun',
    description:
      'View your payment receipt and transaction details.',
    url: buildCanonicalUrl('/wallet/receipt'),
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Payment Receipt',
  description:
    'View your payment receipt and transaction details for your Revun wallet payment.',
  url: 'https://revun.com/wallet/receipt/',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Revun',
    url: 'https://revun.com/',
  },
}

export default function ReceiptPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(jsonLd as Record<string, unknown>) }}
      />
      <ReceiptClient />
    </>
  )
}
