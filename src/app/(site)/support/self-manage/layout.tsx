import type { Metadata } from 'next'
import { buildCanonicalUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Self-Manage Support | Revun',
  description:
    'Get support for your Revun Self-Manage account. Access help resources for account setup, billing, tenant screening, rent collection, maintenance, and more.',
  alternates: { canonical: buildCanonicalUrl('/support/self-manage') },
  openGraph: {
    title: 'Self-Manage Support | Revun',
    description:
      'Support resources for Revun Self-Manage customers who pay Revun directly for self-management tools.',
    url: buildCanonicalUrl('/support/self-manage'),
  },
}

export default function SelfManageSupportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
