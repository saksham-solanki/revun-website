import type { Metadata } from 'next'
import { Inter, Instrument_Sans, Instrument_Serif, Geist_Mono } from 'next/font/google'
import { GoogleTagManager } from '@next/third-parties/google'
import { buildOrganizationSchema, buildWebSiteSchema, buildSoftwareApplicationSchema } from '@/lib/schema-builders'
import { sanitizeJsonLd } from '@/lib/utils'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-sans',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-display',
  weight: '400',
  style: ['normal', 'italic'],
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://revun.com'),
  title: {
    default: 'Revun | Property Management Infrastructure for Canada and the United States',
    template: '%s | Revun',
  },
  description:
    'One platform for property management, leasing, maintenance, brokerage, and self-managing owners. Replace fragmented tools with Revun.',
  keywords: [
    'property management software',
    'rental management platform',
    'property management Canada',
    'property management USA',
    'landlord software',
    'self-managing landlord',
    'property management SaaS',
    'Revun',
  ],
  authors: [{ name: 'Revun', url: 'https://revun.com' }],
  creator: 'Revun',
  publisher: 'Revun',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'Revun',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Revun - Property Management Infrastructure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@RevunHQ',
    creator: '@RevunHQ',
    images: ['/og-default.png'],
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-CA': '/',
      'en-US': '/us/',
      'x-default': '/',
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '',
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-CA"
      className={`${inter.variable} ${instrumentSans.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: sanitizeJsonLd(buildOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: sanitizeJsonLd(buildWebSiteSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: sanitizeJsonLd(buildSoftwareApplicationSchema()),
          }}
        />
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        {children}
      </body>
    </html>
  )
}
