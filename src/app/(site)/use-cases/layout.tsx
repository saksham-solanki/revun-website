import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'

export const metadata: Metadata = {
  title: 'Use Cases | Revun',
  description:
    'Explore how Revun handles tenant screening, rent collection, lease management, maintenance coordination, accounting, and compliance automation.',
  alternates: { canonical: buildCanonicalUrl('/use-cases') },
  openGraph: {
    title: 'Use Cases | Revun',
    description:
      'See how Revun solves real property management challenges across every workflow.',
    url: buildCanonicalUrl('/use-cases'),
  },
}

export default function UseCasesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildBreadcrumbSchema([
            { name: 'Home', url: 'https://revun.com/' },
            { name: 'Use Cases', url: 'https://revun.com/use-cases/' },
          ])),
        }}
      />
      {children}
    </>
  )
}
