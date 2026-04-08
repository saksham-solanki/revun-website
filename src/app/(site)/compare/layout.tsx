import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'

export const metadata: Metadata = {
  title: 'Compare Property Management Software',
  description:
    'Compare Revun against AppFolio, Buildium, DoorLoop, SingleKey, liv.rent, and more. See feature-by-feature breakdowns for Canadian property managers.',
  alternates: { canonical: buildCanonicalUrl('/compare') },
  openGraph: {
    title: 'Compare Property Management Software | Revun',
    description:
      'Side-by-side comparisons of Revun vs top property management platforms.',
    url: buildCanonicalUrl('/compare'),
  },
}

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildBreadcrumbSchema([
            { name: 'Home', url: 'https://revun.com/' },
            { name: 'Compare', url: 'https://revun.com/compare/' },
          ])),
        }}
      />
      {children}
    </>
  )
}
