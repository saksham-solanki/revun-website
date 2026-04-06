import type { Metadata } from 'next'
import type { SeoFields } from '@/types/sanity'

export function generatePageMetadata({
  seo,
  path,
  fallbackTitle,
  fallbackDescription,
}: {
  seo?: SeoFields
  path: string
  fallbackTitle: string
  fallbackDescription: string
}): Metadata {
  const title = seo?.metaTitle || fallbackTitle
  const description = seo?.metaDescription || fallbackDescription
  const canonicalPath = path.endsWith('/') ? path : `${path}/`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      images: ['/og-default.png'],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: ['/og-default.png'],
    },
  }
}
