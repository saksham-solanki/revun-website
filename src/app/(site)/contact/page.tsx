import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Home, Headphones, ArrowRight } from 'lucide-react'
import { ContactForm } from '@/components/blocks/contact-form'
import { buildCanonicalUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Revun. Book a demo, start self-managing, or reach our support team.',
  alternates: { canonical: buildCanonicalUrl('/contact') },
  openGraph: {
    title: 'Contact | Revun',
    description: 'Book a demo or get in touch with our team.',
    url: buildCanonicalUrl('/contact'),
  },
}

const contactPaths = [
  {
    icon: Calendar,
    title: 'Book a demo',
    description: 'For property management companies, brokerages, and operators.',
    href: '/demo/',
    cta: 'Schedule a call',
    accent: 'text-brand-violet',
    bg: 'bg-brand-violet/10',
  },
  {
    icon: Home,
    title: 'Start self-managing',
    description: 'For individual owners managing their own properties.',
    href: '/self-manage/',
    cta: 'Get started',
    accent: 'text-brand-amber',
    bg: 'bg-brand-amber/10',
  },
  {
    icon: Headphones,
    title: 'Support',
    description: 'For existing Revun users who need help with their account.',
    href: '/support/',
    cta: 'Open a ticket',
    accent: 'text-emerald-600',
    bg: 'bg-emerald-500/10',
  },
] as const

export default function ContactPage() {
  return (
    <section className="relative min-h-screen bg-white">
      {/* Decorative top bar */}
      <div className="h-1 w-full bg-gradient-to-r from-brand-violet via-brand-amber to-brand-violet" aria-hidden />

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:pt-40">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* ── Left Column ── */}
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-violet">
              Contact
            </p>
            <h1 className="font-display italic text-4xl tracking-tight text-brand-indigo md:text-5xl lg:text-6xl">
              Get in touch
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-brand-slate-600">
              Whether you are exploring Revun for your business or need help
              with an existing account, we are here.
            </p>

            {/* Contact paths */}
            <div className="mt-12 space-y-5">
              {contactPaths.map((path) => {
                const Icon = path.icon
                return (
                  <Link
                    key={path.title}
                    href={path.href}
                    className="group flex items-start gap-4 rounded-xl border border-brand-slate-200 bg-brand-slate-50 p-5 transition-all duration-200 hover:border-brand-slate-300 hover:shadow-md"
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${path.bg}`}
                    >
                      <Icon className={`h-5 w-5 ${path.accent}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-base font-bold text-brand-indigo">
                        {path.title}
                      </h3>
                      <p className="mt-1 text-sm text-brand-slate-600">
                        {path.description}
                      </p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-brand-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-violet" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* ── Right Column: Form ── */}
          <div className="flex flex-col justify-center">
            <div className="rounded-2xl border border-brand-slate-200 bg-brand-slate-50 p-8 md:p-10">
              <h2 className="mb-1 font-heading text-xl font-bold text-brand-indigo">
                Send us a message
              </h2>
              <p className="mb-8 text-sm text-brand-slate-500">
                We typically respond within one business day.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
