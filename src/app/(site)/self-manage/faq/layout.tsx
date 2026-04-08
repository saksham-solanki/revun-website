import type { Metadata } from 'next'
import { buildCanonicalUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'FAQ | Self-Manage | Revun',
  description:
    'Frequently asked questions about Revun Self-Manage. Answers about pricing, tenant screening, rent collection, maintenance, leases, and compliance.',
  alternates: { canonical: buildCanonicalUrl('/self-manage/faq') },
  openGraph: {
    title: 'FAQ | Self-Manage | Revun',
    description: 'Common questions about self-managing properties with Revun.',
    url: buildCanonicalUrl('/self-manage/faq'),
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
