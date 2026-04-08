import type { Metadata } from 'next'
import { buildCanonicalUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Powered by Revun Support | Revun',
  description:
    'Your service provider uses Revun as their software platform. Learn how to find your operator, understand who handles what, and get the support you need.',
  alternates: { canonical: buildCanonicalUrl('/support/powered-by-revun') },
  openGraph: {
    title: 'Powered by Revun Support | Revun',
    description:
      'Support information for users whose service provider uses Revun as their software platform.',
    url: buildCanonicalUrl('/support/powered-by-revun'),
  },
}

export default function PoweredByRevunSupportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
