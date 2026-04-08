import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Smartphone,
  ArrowRight,
  Bell,
  CreditCard,
  Wrench,
  MessageSquare,
  Camera,
  BarChart3,
  FileText,
  Shield,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildWebPageSchema } from '@/lib/schema-builders'
import { SITE_URL } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'Download the Revun App | Manage Properties on the Go',
  description:
    'Download the Revun mobile app for iOS and Android. Manage properties, collect rent, handle maintenance, and communicate with tenants from anywhere.',
  alternates: { canonical: buildCanonicalUrl('/download') },
  openGraph: {
    title: 'Download the Revun App | Manage Properties on the Go',
    description:
      'Manage your entire property portfolio from your phone. Rent collection, maintenance, tenant screening, and more.',
    url: buildCanonicalUrl('/download'),
  },
}

/* ── Data ──────────────────────────────────────────────────────────────── */

const mobileFeatures = [
  {
    title: 'Push Notifications',
    description: 'Instant alerts for rent payments, maintenance requests, lease expirations, and tenant messages.',
    icon: Bell,
  },
  {
    title: 'Rent Collection',
    description: 'Track payments in real time. Send reminders, process late fees, and view payment history on the go.',
    icon: CreditCard,
  },
  {
    title: 'Maintenance Management',
    description: 'Receive work orders, assign vendors, approve estimates, and track completion from your phone.',
    icon: Wrench,
  },
  {
    title: 'Tenant Communication',
    description: 'Message tenants, send notices, and respond to inquiries with full conversation context.',
    icon: MessageSquare,
  },
  {
    title: 'Photo Documentation',
    description: 'Capture move-in/out photos, document maintenance issues, and attach images to work orders.',
    icon: Camera,
  },
  {
    title: 'Financial Overview',
    description: 'View owner statements, P&L summaries, and portfolio performance from anywhere.',
    icon: BarChart3,
  },
  {
    title: 'Lease Management',
    description: 'Review applications, send lease agreements for signature, and track lease status.',
    icon: FileText,
  },
  {
    title: 'Secure Access',
    description: 'Biometric login, bank-level encryption, and role-based permissions protect your data.',
    icon: Shield,
  },
]

/* ── SoftwareApplication schema for mobile app ── */

function buildMobileAppSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Revun Mobile App',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'iOS, Android',
    url: `${SITE_URL}/download/`,
    description:
      'Manage properties on the go with the Revun mobile app. Rent collection, maintenance management, tenant communication, and financial reporting from your phone.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CAD',
      description: 'Free to download. Subscription required for premium features.',
    },
    provider: {
      '@type': 'Organization',
      name: 'Revun',
      url: SITE_URL,
    },
    featureList: [
      'Push Notifications',
      'Rent Collection',
      'Maintenance Management',
      'Tenant Communication',
      'Photo Documentation',
      'Financial Overview',
      'Lease Management',
      'Biometric Login',
    ],
  }
}

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function DownloadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Download', url: 'https://revun.com/download/' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildMobileAppSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildWebPageSchema({
              name: 'Download the Revun App',
              description: 'Download the Revun mobile app for iOS and Android.',
              url: 'https://revun.com/download/',
            })
          ),
        }}
      />

      {/* ── Hero ── */}
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
          <RevealOnScroll>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#176FEB]/10">
              <Smartphone className="h-8 w-8 text-[#176FEB]" strokeWidth={1.8} />
            </div>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#176FEB]">
              Mobile App
            </p>
            <h1 className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight text-[#0A1628] sm:text-5xl lg:text-6xl">
              Manage properties{' '}
              <span className="text-[#176FEB]">on the go</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]">
              The Revun mobile app puts your entire property management operation in your pocket. Collect rent, handle maintenance, communicate with tenants, and track finances from anywhere.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Download Section ── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Download
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              Get the <span className="text-[#176FEB]">app</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.12} className="mt-12">
            <div className="grid gap-6 md:grid-cols-2">
              {/* iOS */}
              <div className="rounded-2xl border border-[#D3D5DB] bg-[#F5F6F8] p-8 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F2FE]">
                  <svg className="h-7 w-7 text-[#176FEB]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-[#2C2E33]">iOS</h3>
                <p className="mt-2 text-sm text-[#555860]">iPhone and iPad</p>
                <div className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-[#D3D5DB] px-8 text-base font-semibold text-[#555860]">
                  Coming Soon
                </div>
                <p className="mt-3 text-xs text-[#94A3B8]">iOS 16.0 or later required</p>
              </div>

              {/* Android */}
              <div className="rounded-2xl border border-[#D3D5DB] bg-[#F5F6F8] p-8 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F2FE]">
                  <svg className="h-7 w-7 text-[#176FEB]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.523 15.341c-.5 0-.91.41-.91.91s.41.91.91.91.91-.41.91-.91-.41-.91-.91-.91m-11.046 0c-.5 0-.91.41-.91.91s.41.91.91.91.91-.41.91-.91-.41-.91-.91-.91m11.4-6.027l1.95-3.37c.11-.19.04-.43-.15-.54-.19-.11-.43-.04-.54.15l-1.97 3.42c-1.47-.67-3.12-1.04-4.87-1.04s-3.4.37-4.87 1.04l-1.97-3.42c-.11-.19-.35-.26-.54-.15-.19.11-.26.35-.15.54l1.95 3.37C3.09 11.16 1.09 14.27 1 17.82h22c-.09-3.55-2.09-6.66-5.12-8.51M7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5m10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-[#2C2E33]">Android</h3>
                <p className="mt-2 text-sm text-[#555860]">Phone and tablet</p>
                <div className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-[#D3D5DB] px-8 text-base font-semibold text-[#555860]">
                  Coming Soon
                </div>
                <p className="mt-3 text-xs text-[#94A3B8]">Android 10 or later required</p>
              </div>
            </div>
          </RevealOnScroll>

          {/* QR Code Placeholder */}
          <RevealOnScroll className="mt-16 text-center">
            <div className="mx-auto max-w-sm rounded-2xl border border-[#D3D5DB] bg-[#F5F6F8] p-8">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
                Scan to Download
              </p>
              <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-xl border-2 border-dashed border-[#D3D5DB] bg-white">
                <span className="text-sm text-[#94A3B8]">QR Code</span>
              </div>
              <p className="mt-4 text-xs text-[#94A3B8]">
                Available when the app launches
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── What the App Does ── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Everything You Need
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              Your <span className="text-[#176FEB]">full operation</span> in your pocket
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#555860]">
              The Revun mobile app is not a stripped-down companion. It is the full platform, optimized for mobile. Everything you do on desktop, you can do on your phone.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Key Mobile Features ── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Key Features
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              Mobile <span className="text-[#176FEB]">features</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.06}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {mobileFeatures.map((f) => {
                const Icon = f.icon
                return (
                  <div
                    key={f.title}
                    className="rounded-2xl border border-[#D3D5DB] bg-white p-6 transition hover:border-[#176FEB]/40"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-5 w-5 text-[#176FEB]" />
                    </div>
                    <h3 className="mb-2 font-heading text-base font-bold text-[#2C2E33]">
                      {f.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#555860]">
                      {f.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Screenshots Placeholder ── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Screenshots
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] md:text-4xl">
              See it in <span className="text-[#176FEB]">action</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {['Dashboard', 'Maintenance', 'Payments', 'Messaging'].map((label) => (
                <div
                  key={label}
                  className="flex aspect-[9/16] items-center justify-center rounded-2xl border-2 border-dashed border-[#D3D5DB] bg-white"
                >
                  <div className="text-center">
                    <Smartphone className="mx-auto mb-2 h-8 w-8 text-[#D3D5DB]" />
                    <span className="text-sm font-medium text-[#94A3B8]">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="font-heading font-extrabold text-4xl tracking-tight text-[#0A1628] md:text-5xl">
              Get notified at{' '}
              <span className="text-[#176FEB]">launch</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-[#555860]">
              The Revun mobile app is coming soon. Start with the web platform today and be the first to know when the app launches.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/signup/"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors hover:bg-[#1259c1]"
              >
                Start Free on Web
              </Link>
              <Link
                href="/contact/"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors hover:bg-white"
              >
                Get Launch Updates
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* AEO quick answer */}
      <p className="sr-only">
        The Revun mobile app is coming soon for iOS and Android. It will allow property managers and landlords to manage properties on the go, including rent collection, maintenance management, tenant communication, photo documentation, financial reporting, and lease management. The app requires iOS 16.0 or Android 10 or later.
      </p>
    </>
  )
}
