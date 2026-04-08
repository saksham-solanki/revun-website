import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Home, Headphones, ArrowRight, Mail, Phone, MapPin } from 'lucide-react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { ContactForm } from '@/components/blocks/contact-form'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'

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
  },
  {
    icon: Home,
    title: 'Start self-managing',
    description: 'For individual owners managing their own properties.',
    href: '/self-manage/',
    cta: 'Get started',
  },
  {
    icon: Headphones,
    title: 'Support',
    description: 'For existing Revun users who need help.',
    href: '/support/',
    cta: 'Open a ticket',
  },
] as const

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildBreadcrumbSchema([
            { name: 'Home', url: 'https://revun.com/' },
            { name: 'Contact', url: 'https://revun.com/contact/' },
          ])),
        }}
      />
      <section className="relative min-h-screen bg-white">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-[#176FEB]" aria-hidden />

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:pt-40">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* ── Left Column ── */}
          <div className="flex flex-col justify-center">
            <RevealOnScroll stagger={0.12}>
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#176FEB]">
                Contact
              </p>
              <h1 className="font-display font-extrabold text-4xl tracking-tight text-[#0A1628] md:text-5xl lg:text-6xl">
                Get in <span className="text-[#176FEB]">touch</span>
              </h1>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-[#555860]">
                Whether you are exploring Revun for your business or need help
                with an existing account, we are here.
              </p>
            </RevealOnScroll>

            {/* Contact path cards */}
            <RevealOnScroll className="mt-12 space-y-5" stagger={0.1}>
              {contactPaths.map((path) => {
                const Icon = path.icon
                return (
                  <Link
                    key={path.title}
                    href={path.href}
                    className="group flex items-start gap-4 rounded-xl border border-[#E5E7EB] bg-[#F5F6F8] p-5 hover:border-[#176FEB]/40"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#E8F2FE]">
                      <Icon className="h-5 w-5 text-[#176FEB]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-base font-bold text-[#0A1628]">
                        {path.title}
                      </h3>
                      <p className="mt-1 text-sm text-[#555860]">
                        {path.description}
                      </p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#D3D5DB] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#176FEB]" />
                  </Link>
                )
              })}
            </RevealOnScroll>

            {/* Contact info */}
            <RevealOnScroll className="mt-12 space-y-4">
              <div className="flex items-center gap-3 text-sm text-[#2C2E33]">
                <Mail className="h-4 w-4 text-[#176FEB]" />
                <a href="mailto:hello@revun.com" className="hover:text-[#176FEB] transition-colors">
                  hello@revun.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#2C2E33]">
                <Phone className="h-4 w-4 text-[#176FEB]" />
                <a href="tel:+1888738-8676" className="hover:text-[#176FEB] transition-colors">
                  +1 (888) REVUN-PM
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#2C2E33]">
                <MapPin className="h-4 w-4 text-[#176FEB]" />
                <span>Toronto, Canada</span>
              </div>
              <p className="pt-2 text-xs text-[#555860]">
                We typically respond within one business day.
              </p>
            </RevealOnScroll>
          </div>

          {/* ── Right Column: Form ── */}
          <RevealOnScroll className="flex flex-col justify-center">
            <div className="rounded-2xl border border-[#E5E7EB] bg-[#F5F6F8] p-8 md:p-10">
              <h2 className="mb-1 font-heading text-xl font-bold text-[#0A1628]">
                Send us a message
              </h2>
              <p className="mb-8 text-sm text-[#555860]">
                Fill out the form below and we will get back to you.
              </p>
              <ContactForm />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
    </>
  )
}
