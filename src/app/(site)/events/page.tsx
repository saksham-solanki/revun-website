import type { Metadata } from 'next'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'
import { EventsClient } from './client'

export const metadata: Metadata = {
  title: 'Events & Tours',
  description:
    'Schedule property tours, navigate to events, share locations with guests, and rate your experience. Built-in safety tools including PIN verification and emergency access.',
  alternates: { canonical: buildCanonicalUrl('/events') },
  openGraph: {
    title: 'Events & Tours | Revun',
    description:
      'Schedule, navigate, and manage property tours with built-in safety features.',
    url: buildCanonicalUrl('/events'),
  },
}

export default function EventsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Events & Tours', url: 'https://revun.com/events/' },
            ])
          ),
        }}
      />
      <EventsClient />
    </>
  )
}
