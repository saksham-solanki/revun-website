import type { Metadata } from 'next'
import { CheckCircle2 } from 'lucide-react'
import { DemoForm } from './client'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'

export const metadata: Metadata = {
  title: 'Book a Demo',
  description:
    'Schedule a personalized demo of the Revun property management platform. See tenant screening, rent collection, and compliance automation in action.',
  alternates: { canonical: buildCanonicalUrl('/demo') },
  openGraph: {
    title: 'Book a Demo | Revun',
    description:
      'Schedule a personalized demo of the Revun property management platform. See tenant screening, rent collection, and compliance automation in action.',
    url: buildCanonicalUrl('/demo'),
  },
}

const bulletPoints = [
  '30-minute personalized demo',
  'See features tailored to your portfolio',
  'Learn about provincial compliance automation',
  'No commitment required',
] as const

export default function DemoPage() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-20 right-[-200px] h-[500px] w-[500px] rounded-full bg-[#176FEB]/[0.04] blur-[120px]" aria-hidden="true" />
      <div className="absolute bottom-[-100px] left-[-150px] h-[400px] w-[400px] rounded-full bg-[#176FEB]/[0.03] blur-[100px]" aria-hidden="true" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Book a Demo', url: 'https://revun.com/demo/' },
            ])
          ),
        }}
      />

      {/* Top accent bar */}
      <div className="h-1 w-full bg-[#176FEB]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-32 md:pt-40">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* ── Left Column: Info ── */}
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
              Book a Demo
            </p>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-[#0A1628] md:text-5xl lg:text-6xl">
              See Revun in <span className="text-[#176FEB]">action</span>
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[#555860]">
              Get a personalized walkthrough of the Revun platform. See how
              Canadian landlords and property managers are saving time and
              collecting rent faster.
            </p>

            {/* Bullet points */}
            <ul className="mt-10 space-y-4">
              {bulletPoints.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#176FEB]" />
                  <span className="text-base text-[#2C2E33]">{point}</span>
                </li>
              ))}
            </ul>

            {/* Trust line */}
            <p className="mt-12 text-sm font-medium text-[#555860]">
              Join <span className="font-bold text-[#0A1628]">12,000+</span> units already on Revun
            </p>
          </div>

          {/* ── Right Column: Form ── */}
          <div className="flex flex-col justify-center">
            <div className="rounded-2xl border border-[#E5E7EB] bg-[#F5F6F8] p-8 md:p-10">
              <h2 className="mb-1 font-heading text-xl font-bold text-[#0A1628]">
                Book your demo
              </h2>
              <p className="mb-8 text-sm text-[#555860]">
                Fill out the form below and we will schedule your walkthrough.
              </p>
              <DemoForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
