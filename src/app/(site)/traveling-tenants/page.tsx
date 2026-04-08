import type { Metadata } from 'next'
import Link from 'next/link'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { Plane, Shield, FileKey2, Home, MapPin, CheckCircle2, ArrowRight } from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const metadata: Metadata = {
  title: 'Traveling Tenants - Find Revun-Powered Rentals | Revun',
  description:
    'Relocating or traveling for work? Find property managers powered by Revun with secure applications, digital leases, and remote move-in across Canada and the United States.',
  alternates: { canonical: buildCanonicalUrl('/traveling-tenants') },
  openGraph: {
    title: 'Traveling Tenants - Find Revun-Powered Rentals | Revun',
    description:
      'Secure applications, digital leases, and remote move-in with Revun-powered property managers across Canada and the United States.',
    url: buildCanonicalUrl('/traveling-tenants'),
  },
}

const features = [
  { icon: Shield, title: 'Secure Online Application', description: 'Apply from anywhere with encrypted forms, identity verification, and document uploads. No in-person visits required.' },
  { icon: FileKey2, title: 'Digital Lease Signing', description: 'Review and sign your lease digitally from any device. Legally binding e-signatures with full audit trail.' },
  { icon: Home, title: 'Remote Move-In', description: 'Receive access instructions, utility setup guides, and move-in checklists before you arrive. Walk in ready.' },
  { icon: MapPin, title: 'City Guides', description: 'Explore neighborhoods, amenities, transit, and local tips for every city where Revun operators manage properties.' },
  { icon: Plane, title: 'Relocation Support', description: 'Moving services, insurance referrals, and utility setup coordination through Revun add-on partners.' },
  { icon: CheckCircle2, title: 'Tenant Portal Access', description: 'Manage your rental from day one. Pay rent, submit maintenance requests, and communicate with your property manager.' },
]

const faqs = [
  { q: 'How do I find a Revun-powered rental?', a: 'Browse our city pages to find property managers in your destination city. Each operator powered by Revun offers online applications and digital lease signing.' },
  { q: 'Can I apply without visiting in person?', a: 'Yes. Revun-powered operators support fully remote applications including identity verification, credit checks, and reference checks - all online.' },
  { q: 'Who do I contact for property issues?', a: 'Your service relationship is with the property manager or operator, not directly with Revun. Contact your assigned operator for any property, lease, or maintenance issues.' },
  { q: 'Is my personal data secure?', a: 'Yes. Revun uses bank-level encryption for all personal and financial data. Your information is only shared with the operator you apply with.' },
]

export default function TravelingTenantsPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://revun.com/' },
      { '@type': 'ListItem', position: 2, name: 'Traveling Tenants', item: buildCanonicalUrl('/traveling-tenants') },
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
          <div className="absolute -left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(23,111,235,0.08)_0%,transparent_70%)] blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 pb-16 text-center lg:pt-32 lg:pb-24">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#176FEB]/20 text-[#176FEB]">
            <Plane className="h-7 w-7" strokeWidth={1.8} />
          </div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-sm font-medium text-[#555860]">
            For Traveling & Relocating Tenants
          </p>
          <h1 className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight text-[#0A1628] sm:text-5xl md:text-6xl">
            Moving to a New City? We Have Got You Covered.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]">
            Find property managers powered by Revun across Canada and the United States. Apply securely, sign your lease digitally, and move in without the stress.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/ca/" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#005CE8]">
              Explore Canada
            </Link>
            <Link href="/us/" className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors duration-150 hover:bg-white">
              Explore United States
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">How it works</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] sm:text-4xl">
              Rent from <span className="text-[#176FEB]">anywhere</span>
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

      {/* Important notice */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll className="rounded-2xl border border-[#176FEB]/20 bg-[#E8F2FE] p-8">
            <h2 className="font-heading text-2xl font-bold text-[#2C2E33]">Important: Your Operator is Your Point of Contact</h2>
            <p className="mt-4 text-[0.938rem] leading-relaxed text-[#555860]">
              When you rent through a Revun-powered property manager, your service relationship is with that operator. For property issues, maintenance requests, lease questions, or service concerns, contact your assigned property manager directly. Revun powers the software experience - your operator provides the service.
            </p>
            <Link href="/support/powered-by-revun/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#176FEB] hover:text-[#1259c0]">
              Learn more about support routing <ArrowRight className="h-4 w-4" />
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-8 text-center font-heading text-3xl font-bold tracking-tight text-[#2C2E33] sm:text-4xl">
            Frequently Asked <span className="text-[#176FEB]">Questions</span>
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-[#D3D5DB] bg-white">
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
          <h2 className="font-heading font-extrabold text-3xl leading-tight tracking-tight text-[#0A1628] sm:text-4xl">
            Find your next home
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-[#555860]">
            Explore cities across Canada and the United States where Revun-powered operators manage quality rental properties.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/ca/" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#005CE8]">
              Browse Canada
            </Link>
            <Link href="/us/" className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors duration-150 hover:bg-white">
              Browse United States
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
