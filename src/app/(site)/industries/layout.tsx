import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'

export const metadata: Metadata = {
  title: 'Industries | Revun',
  description:
    'Revun serves REITs, single-family operators, multifamily, student housing, senior living, vacation rentals, commercial property, affordable housing, and more.',
  alternates: { canonical: buildCanonicalUrl('/industries') },
  openGraph: {
    title: 'Industries | Revun',
    description:
      'Property management software built for your industry. From single-family homes to enterprise REITs.',
    url: buildCanonicalUrl('/industries'),
  },
}

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildBreadcrumbSchema([
            { name: 'Home', url: 'https://revun.com/' },
            { name: 'Industries', url: 'https://revun.com/industries/' },
          ])),
        }}
      />
      {children}
    </>
  )
}
