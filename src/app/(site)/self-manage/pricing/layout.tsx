import type { Metadata } from 'next'
import { buildCanonicalUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Self-Manage Pricing | Revun',
  description:
    'Revun Self-Manage pricing starts free for 1-2 units. Paid plans from $29/month. No annual contracts, cancel anytime.',
  alternates: { canonical: buildCanonicalUrl('/self-manage/pricing') },
  openGraph: {
    title: 'Self-Manage Pricing | Revun',
    description: 'Transparent pricing for self-managing landlords. Free tier available.',
    url: buildCanonicalUrl('/self-manage/pricing'),
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
