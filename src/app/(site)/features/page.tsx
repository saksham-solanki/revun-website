import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, CreditCard, Wrench, BookOpen, BarChart3, Users } from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Explore Revun platform features: tenant screening, rent collection, maintenance management, lease management, accounting, and owner portal.',
}

const features = [
  {
    slug: 'tenant-screening',
    icon: Users,
    title: 'Tenant Screening',
    description:
      'Credit checks, identity verification, and background screening powered by Equifax and TransUnion. Make informed decisions with comprehensive tenant reports.',
  },
  {
    slug: 'rent-collection',
    icon: CreditCard,
    title: 'Rent Collection',
    description:
      'Automated rent collection via ACH, credit card, and Interac e-Transfer. Auto-reminders, split payments, and real-time reconciliation.',
  },
  {
    slug: 'maintenance-management',
    icon: Wrench,
    title: 'Maintenance Management',
    description:
      'Tenant request portal, vendor routing, work order tracking, and proof-of-completion photos. AI-powered priority routing.',
  },
  {
    slug: 'lease-management',
    icon: FileText,
    title: 'Lease Management',
    description:
      'Province-specific lease templates, electronic signatures, automated renewals, and compliance tracking for LTB, RTB, TAL, and RTDRS.',
  },
  {
    slug: 'accounting',
    icon: BarChart3,
    title: 'Accounting & Reporting',
    description:
      'Real-time financial reporting, automated reconciliation, tax-ready statements, and owner disbursements. Integrates with QuickBooks and Xero.',
  },
  {
    slug: 'owner-portal',
    icon: BookOpen,
    title: 'Owner Portal',
    description:
      'Transparent owner dashboards with real-time occupancy, revenue tracking, expense reports, and document access. White-label ready.',
  },
]

export default function FeaturesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#F5F6F8] pt-32 pb-16 md:pt-40 md:pb-20">
        {/* Decorative dot grid */}
        <div className="absolute inset-0 bg-dot-grid opacity-40" aria-hidden="true" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <RevealOnScroll stagger={0.12}>
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
              Platform
            </p>
            <h1 className="mt-3 font-display text-4xl font-normal text-[#0A1628] md:text-5xl">
              Everything your property <span className="text-[#176FEB]">needs</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#555860]">
              Six core modules that replace fragmented tools with one connected platform.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <RevealOnScroll stagger={0.08}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => {
                const Icon = f.icon
                return (
                  <Link
                    key={f.slug}
                    href={`/features/${f.slug}/`}
                    className="group relative flex flex-col rounded-xl border border-[#E5E7EB] bg-white p-6 transition-all duration-200 hover:border-[#176FEB]/30 hover:shadow-md cursor-pointer"
                  >
                    <div
                      className="absolute inset-x-0 top-0 h-[2px] rounded-t-xl bg-[#176FEB] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE] transition-transform duration-200 group-hover:scale-110">
                      <Icon className="h-6 w-6 text-[#176FEB]" />
                    </div>
                    <h2 className="font-heading text-lg font-semibold text-[#0A1628]">
                      {f.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#555860]">
                      {f.description}
                    </p>
                    <span className="mt-4 text-sm font-medium text-[#176FEB] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      Learn more &rarr;
                    </span>
                  </Link>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
