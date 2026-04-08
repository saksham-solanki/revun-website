import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { PaymentMethodsClient } from './client'

export const metadata: Metadata = {
  title: 'Make Payment',
  description:
    'Choose your preferred payment method and complete your property payment securely through the Revun wallet.',
  alternates: { canonical: buildCanonicalUrl('/wallet/pay') },
  openGraph: {
    title: 'Make Payment | Revun',
    description:
      'Choose your preferred payment method and complete your property payment securely.',
    url: buildCanonicalUrl('/wallet/pay'),
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Make Payment',
  description:
    'Choose your preferred payment method and complete your property payment securely through the Revun wallet.',
  url: 'https://revun.com/wallet/pay/',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Revun',
    url: 'https://revun.com/',
  },
}

export default function PayPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(jsonLd as Record<string, unknown>) }}
      />
      <PaymentMethodsClient />
    </>
  )
}
