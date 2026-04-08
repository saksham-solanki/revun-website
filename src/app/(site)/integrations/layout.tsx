import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'

export const metadata: Metadata = {
  title: 'Integrations',
  description:
    'Revun integrates with 40+ tools including QuickBooks, Xero, Stripe, DocuSign, Twilio, and more. Connect your existing workflow in minutes.',
  alternates: { canonical: buildCanonicalUrl('/integrations') },
  openGraph: {
    title: 'Integrations | Revun',
    description:
      'Connect Revun with 40+ accounting, payment, screening, and communication tools.',
    url: buildCanonicalUrl('/integrations'),
  },
}

export default function IntegrationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildBreadcrumbSchema([
            { name: 'Home', url: 'https://revun.com/' },
            { name: 'Integrations', url: 'https://revun.com/integrations/' },
          ])),
        }}
      />
      {children}
    </>
  )
}
