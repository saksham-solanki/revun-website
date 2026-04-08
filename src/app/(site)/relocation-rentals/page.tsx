import type { Metadata } from 'next'
import Link from 'next/link'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { MapPin, Home, FileKey2, Shield, Truck, CheckCircle2, ArrowRight } from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const metadata: Metadata = {
  title: 'Relocation Rentals - Find Your Next Home Before You Arrive | Revun',
  description:
    'Relocating to a new city? Find Revun-powered property managers offering remote applications, virtual tours, digital leases, and move-in coordination across Canada and the US.',
  alternates: { canonical: buildCanonicalUrl('/relocation-rentals') },
  openGraph: {
    title: 'Relocation Rentals - Find Your Next Home Before You Arrive | Revun',
    description:
      'Remote applications, virtual tours, and digital lease signing for relocating professionals across Canada and the United States.',
    url: buildCanonicalUrl('/relocation-rentals'),
  },
}

const steps = [
  { number: '01', title: 'Explore destination cities', description: 'Browse city pages for Toronto, Vancouver, Montreal, Miami, Dallas, and 100+ other cities with Revun-powered operators.' },
  { number: '02', title: 'Apply remotely', description: 'Complete your application online with identity verification, credit checks, and references - all from your current location.' },
  { number: '03', title: 'Virtual tour and digital lease', description: 'View the property virtually. Review and sign your lease digitally from any device.' },
  { number: '04', title: 'Coordinated move-in', description: 'Receive access instructions, utility setup guides, and move-in checklists before your arrival.' },
]

const features = [
  { icon: MapPin, title: 'City Coverage', description: 'Revun-powered operators across all major Canadian provinces and US states. Find properties wherever you are heading.' },
  { icon: Home, title: 'Virtual Tours', description: 'View properties remotely with video tours, 3D walkthroughs, and detailed photo galleries before committing.' },
  { icon: FileKey2, title: 'Digital Everything', description: 'Application, screening, lease signing, and document exchange - all handled digitally. No printing, mailing, or faxing.' },
  { icon: Shield, title: 'Verified Operators', description: 'Every Powered by Revun operator uses the same trusted platform for applications, screening, and lease management.' },
  { icon: Truck, title: 'Moving Coordination', description: 'Access moving services, utility setup, and insurance referrals through Revun add-on partners in your destination city.' },
  { icon: CheckCircle2, title: 'Instant Portal Access', description: 'Get tenant portal access before you arrive. Pay rent, submit requests, and communicate with your property manager from day one.' },
]

const faqs = [
  { q: 'Can I sign a lease without being in the city?', a: 'Yes. Revun-powered operators support fully digital lease signing. Review the lease on your device and sign with a legally binding e-signature from anywhere.' },
  { q: 'How do I verify the property is legitimate?', a: 'Revun-powered operators are verified platform users. You can request virtual tours, ask for additional photos, and verify operator credentials through the platform.' },
  { q: 'What if I need help after moving in?', a: 'Contact your assigned property manager directly for any property, maintenance, or service issues. They are your point of contact for all service-related matters.' },
  { q: 'Are there relocation-specific services?', a: 'Many Revun-powered operators offer relocation packages including move-in coordination, utility setup assistance, and local area orientation.' },
]

export default function RelocationRentalsPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://revun.com/' },
      { '@type': 'ListItem', position: 2, name: 'Relocation Rentals', item: buildCanonicalUrl('/relocation-rentals') },
    ],
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(faqJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F5F6F8]">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute right-[5%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(23,111,235,0.08)_0%,transparent_70%)] blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 pb-16 text-center lg:pt-32 lg:pb-24">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#176FEB]/20 text-[#176FEB]">
            <MapPin className="h-7 w-7" strokeWidth={1.8} />
          </div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-sm font-medium text-[#555860] backdrop-blur-sm">
            Relocation Rentals
          </p>
          <h1 className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight text-[#0A1628] sm:text-5xl md:text-6xl">
            Find Your Next Home Before You Arrive
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]">
            Relocating to a new city is stressful enough. Find Revun-powered property managers who make the rental process fully digital - from application to move-in.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/ca/" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#005CE8]">
              Explore Canadian Cities
            </Link>
            <Link href="/us/" className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors duration-150 hover:bg-white">
              Explore US Cities
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">How it works</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] sm:text-4xl">
              Four steps to your <span className="text-[#176FEB]">new home</span>
            </h2>
          </RevealOnScroll>
          <div className="relative">
            <div className="absolute left-[27px] top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-[#176FEB]/40 via-[#176FEB]/20 to-transparent lg:block" aria-hidden />
            <div className="space-y-8 lg:space-y-12">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-6 lg:gap-8">
                  <div className="flex shrink-0 flex-col items-center">
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#176FEB]/10 text-[#176FEB]">
                      <span className="font-heading text-lg font-bold">{step.number}</span>
                    </div>
                  </div>
                  <div className="pb-2 pt-2">
                    <h3 className="font-heading text-xl font-bold text-[#2C2E33]">{step.title}</h3>
                    <p className="mt-1.5 max-w-xl text-[0.938rem] leading-relaxed text-[#555860]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">What you get</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] sm:text-4xl">
              Relocation made <span className="text-[#176FEB]">simple</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll stagger={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="rounded-2xl border border-[#D3D5DB] bg-white p-7 transition-colors duration-150 hover:border-[#176FEB]/40">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#E8F2FE] text-[#176FEB]">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#2C2E33]">{f.title}</h3>
                  <p className="mt-2 text-[0.938rem] leading-relaxed text-[#555860]">{f.description}</p>
                </div>
              )
            })}
          </RevealOnScroll>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-center font-heading text-3xl font-bold tracking-tight text-[#2C2E33] sm:text-4xl">
            Frequently Asked <span className="text-[#176FEB]">Questions</span>
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-[#D3D5DB] bg-[#F5F6F8]">
                <summary className="flex cursor-pointer items-center justify-between px-6 py-5 font-heading text-base font-bold text-[#2C2E33] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="ml-4 shrink-0 text-[#176FEB] transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-5 text-[0.938rem] leading-relaxed text-[#555860]">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#F5F6F8] py-12">
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-heading font-extrabold text-3xl leading-tight tracking-tight text-[#0A1628] sm:text-4xl">Start your relocation search</h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-[#555860]">
            Browse cities across Canada and the United States to find Revun-powered rentals.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/ca/" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#005CE8]">
              Canada
            </Link>
            <Link href="/us/" className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors duration-150 hover:bg-white">
              United States
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
