import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'Revun serves self-managing owners, property management companies, brokerages, leasing companies, maintenance companies, and REITs. Find the right solution for your role.',
  alternates: { canonical: buildCanonicalUrl('/solutions') },
  openGraph: {
    title: 'Solutions | Revun',
    description:
      'Property management solutions for every role in the rental ecosystem.',
    url: buildCanonicalUrl('/solutions'),
  },
}

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildBreadcrumbSchema([
            { name: 'Home', url: 'https://revun.com/' },
            { name: 'Solutions', url: 'https://revun.com/solutions/' },
          ])),
        }}
      />
      {children}
    </>
  )
}
