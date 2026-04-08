import type { Metadata } from 'next'
import Link from 'next/link'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { Building2, Users, FileKey2, Banknote, BarChart3, Shield, ArrowRight } from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const metadata: Metadata = {
  title: 'Corporate Housing Workflow Management | Revun',
  description:
    'Manage corporate housing programs with employer billing, employee onboarding, furnished unit tracking, compliance reporting, and HR/travel system integration.',
  alternates: { canonical: buildCanonicalUrl('/corporate-housing') },
  openGraph: {
    title: 'Corporate Housing Workflow Management | Revun',
    description: 'Employer billing, employee onboarding, and compliance reporting for corporate housing operators.',
    url: buildCanonicalUrl('/corporate-housing'),
  },
}

const features = [
  { icon: Building2, title: 'Corporate Account Management', description: 'Manage multiple corporate clients with separate billing, reporting, and unit allocation. Dedicated account dashboards per employer.' },
  { icon: Users, title: 'Employee Onboarding', description: 'Streamlined move-in process for corporate tenants. Pre-approved applications, welcome packages, and orientation guides.' },
  { icon: Banknote, title: 'Employer Billing', description: 'Invoice employers directly with consolidated billing. Support for cost centers, project codes, and purchase order references.' },
  { icon: FileKey2, title: 'Lease & Contract Automation', description: 'Corporate lease templates with employer guarantees, duration flexibility, and auto-renewal terms. Batch processing supported.' },
  { icon: BarChart3, title: 'Occupancy & Utilization Reporting', description: 'Track occupancy rates, average stay duration, cost per employee, and utilization metrics across your corporate housing portfolio.' },
  { icon: Shield, title: 'Compliance & Insurance', description: 'Corporate housing compliance documentation, liability coverage tracking, and regulatory reporting for housing stipend programs.' },
]

const useCases = [
  { title: 'Employee Relocation', description: 'Provide temporary housing for employees relocating to a new office. Seamless handoff from HR to housing.' },
  { title: 'Project-Based Housing', description: 'House construction crews, consultants, or project teams for defined periods. Flexible terms with project-aligned billing.' },
  { title: 'Executive Housing', description: 'Premium furnished units for senior leaders and visiting executives. Concierge-level service coordination.' },
  { title: 'Intern & Training Programs', description: 'Batch housing for seasonal interns, training cohorts, or rotational programs. Group management tools included.' },
]

const faqs = [
  { q: 'How does corporate billing work?', a: 'You set up corporate accounts with billing profiles. Invoices are generated per employer with line items for each employee housing unit. Support for purchase orders, cost centers, and consolidated monthly billing.' },
  { q: 'Can employees self-serve their housing?', a: 'Yes. Employees receive portal access to view their unit details, submit maintenance requests, and access move-in information. The corporate account manager maintains oversight.' },
  { q: 'Does Revun integrate with HR systems?', a: 'Revun supports integration with major HR and travel management systems through API and webhook connections. Custom integrations available for enterprise accounts.' },
  { q: 'How are security deposits handled for corporate tenants?', a: 'Corporate accounts can choose between per-employee deposits, corporate-guaranteed deposits, or deposit-free arrangements backed by the employer agreement.' },
]

export default function CorporateHousingPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://revun.com/' },
      { '@type': 'ListItem', position: 2, name: 'Corporate Housing', item: buildCanonicalUrl('/corporate-housing') },
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
          <div className="absolute right-[5%] top-[20%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(23,111,235,0.08)_0%,transparent_70%)] blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 pb-16 text-center lg:pt-32 lg:pb-24">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#176FEB]/20 text-[#176FEB]">
            <Building2 className="h-7 w-7" strokeWidth={1.8} />
          </div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-sm font-medium text-[#555860] backdrop-blur-sm">
            Corporate Housing
          </p>
          <h1 className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight text-[#0A1628] sm:text-5xl md:text-6xl">
            Corporate Housing Operations, Centralized
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]">
            Manage corporate housing programs with employer billing, employee onboarding, compliance reporting, and portfolio-wide utilization analytics.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/demo/" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#005CE8]">
              Book a Demo
            </Link>
            <Link href="/solutions/reits/" className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors duration-150 hover:bg-white">
              Enterprise Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">Platform capabilities</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] sm:text-4xl">
              Built for corporate <span className="text-[#176FEB]">housing operators</span>
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

      {/* Use Cases */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">Use cases</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#2C2E33] sm:text-4xl">
              Who uses corporate <span className="text-[#176FEB]">housing</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll stagger={0.1} className="grid gap-6 sm:grid-cols-2">
            {useCases.map((uc) => (
              <div key={uc.title} className="rounded-2xl border border-[#D3D5DB] bg-[#F5F6F8] p-7">
                <h3 className="font-heading text-lg font-bold text-[#2C2E33]">{uc.title}</h3>
                <p className="mt-2 text-[0.938rem] leading-relaxed text-[#555860]">{uc.description}</p>
              </div>
            ))}
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
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-heading font-extrabold text-3xl leading-tight tracking-tight text-[#0A1628] sm:text-4xl">
            Ready to centralize corporate housing?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-[#555860]">
            Book a demo and see how Revun streamlines corporate housing operations.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/demo/" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#005CE8]">
              Book a Demo
            </Link>
            <Link href="/contact/" className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors duration-150 hover:bg-white">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
