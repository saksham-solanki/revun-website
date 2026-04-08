'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Building2,
  Phone,
  Mail,
  MessageSquare,
  ChevronDown,
  AlertCircle,
  Shield,
  Wrench,
  FileText,
  CreditCard,
  Users,
  ArrowRight,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { useState } from 'react'
import { buildBreadcrumbSchema, buildFAQPageSchema, buildWebPageSchema } from '@/lib/schema-builders'
import { sanitizeJsonLd } from '@/lib/utils'

/* ── Animation variants ─────────────────────────────────────────────── */

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

/* ── FAQ data ────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: 'What does "Powered by Revun" mean?',
    answer:
      'It means your property management company, brokerage, or maintenance provider uses Revun as their software platform to manage properties, tenants, and services. Your direct service relationship is with that operator, not with Revun.',
  },
  {
    question: 'Who do I contact for maintenance issues?',
    answer:
      'Contact your property management company or maintenance provider directly. Their contact information should be in your tenant portal, your lease agreement, or any correspondence they have sent you. Revun does not handle maintenance requests on behalf of operators.',
  },
  {
    question: 'Can Revun help me with my lease or rental agreement?',
    answer:
      'No. Your lease is between you and your property manager or landlord. Revun provides the software platform they use, but we do not manage lease terms, rental rates, or tenancy agreements. Contact your operator directly for lease-related questions.',
  },
  {
    question: 'I cannot log into my portal. What should I do?',
    answer:
      'First, try resetting your password using the "Forgot password" link on the login page. If that does not work, contact your property manager or operator. They manage user accounts for their tenants and can reset your credentials or re-send your invitation.',
  },
  {
    question: 'Why am I being directed to Revun if my relationship is with my property manager?',
    answer:
      'Revun is the technology platform your property manager uses. Sometimes links or branding within the platform may reference Revun. For any service-related questions, your property manager is your primary point of contact.',
  },
  {
    question: 'What if my property manager is unresponsive?',
    answer:
      'If you cannot reach your property manager, check your lease agreement for alternative contact methods. If you believe there is a platform-related technical issue preventing communication, you can report it to Revun at support@revun.com and we will investigate the technical side.',
  },
  {
    question: 'Does Revun have access to my personal data?',
    answer:
      'Revun processes data on behalf of your property manager as a platform provider. Your data is governed by your property manager\'s privacy policy and Revun\'s data processing agreement. We use bank-level encryption and are SOC 2 compliant.',
  },
]

/* ── Operator types ──────────────────────────────────────────────────── */

const operatorTypes = [
  {
    title: 'Property Management Companies',
    description: 'Full-service PMCs managing residential and commercial portfolios.',
    icon: Building2,
    href: '/solutions/property-managers/',
  },
  {
    title: 'Real Estate Brokerages',
    description: 'Brokerages offering property management alongside sales.',
    icon: Users,
    href: '/solutions/brokerages/',
  },
  {
    title: 'Maintenance Companies',
    description: 'Service providers handling repairs, inspections, and upkeep.',
    icon: Wrench,
    href: '/solutions/maintenance-companies/',
  },
]

/* ── FAQ Accordion ───────────────────────────────────────────────────── */

function FAQItem({ faq }: { faq: (typeof faqs)[number] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="pr-4 font-heading text-base font-semibold text-foreground">
          {faq.question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-[0.938rem] leading-relaxed text-muted-foreground">
          {faq.answer}
        </p>
      </motion.div>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function PoweredByRevunSupportPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Support', url: 'https://revun.com/support/' },
              { name: 'Powered by Revun', url: 'https://revun.com/support/powered-by-revun/' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildFAQPageSchema(
              faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))
            )
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildWebPageSchema({
              name: 'Powered by Revun Support',
              description: 'Support information for users whose service provider uses Revun as their software platform.',
              url: 'https://revun.com/support/powered-by-revun/',
            })
          ),
        }}
      />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-[#F5F6F8]">
        <motion.div
          className="mx-auto max-w-3xl px-6 pt-24 pb-16 text-center"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-[#176FEB]"
          >
            Powered by Revun
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight text-[#0A1628] sm:text-5xl"
          >
            Your provider uses{' '}
            <span className="text-[#176FEB]">Revun</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]"
          >
            Your service provider uses Revun as their software platform. For property, lease, maintenance, or service issues, contact your assigned operator directly.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Important Notice ──────────────────────────────────────── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <motion.div
              variants={revealItem}
              className="rounded-2xl border border-[#176FEB]/20 bg-[#E8F2FE] p-8"
            >
              <div className="flex items-start gap-4">
                <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-[#176FEB]" />
                <div>
                  <h2 className="font-heading text-lg font-bold text-[#2C2E33]">
                    Important: Your support comes from your operator
                  </h2>
                  <p className="mt-2 text-[0.938rem] leading-relaxed text-[#555860]">
                    Revun is the software platform your property manager, brokerage, or maintenance company uses. Your service relationship, including lease terms, maintenance requests, payment questions, and property issues, is with your operator, not with Revun directly.
                  </p>
                </div>
              </div>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── How to Find Your Operator ─────────────────────────────── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]"
            >
              Find Your Operator
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              How to contact your{' '}
              <span className="text-[#176FEB]">service provider</span>
            </motion.h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: FileText,
                  title: 'Check Your Lease',
                  description:
                    'Your lease or rental agreement contains your property manager\'s name, phone number, and email address.',
                },
                {
                  icon: MessageSquare,
                  title: 'Tenant Portal',
                  description:
                    'Log into your tenant portal and look for the "Contact" or "My Manager" section to find your operator\'s details.',
                },
                {
                  icon: Mail,
                  title: 'Previous Correspondence',
                  description:
                    'Check your email for messages from your property manager. Their contact information is typically in the email signature.',
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    variants={revealItem}
                    className="rounded-2xl border border-[#D3D5DB] bg-white p-8"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-6 w-6 text-[#176FEB]" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Responsibility Split ──────────────────────────────────── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]"
            >
              Who Handles What
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Understanding <span className="text-[#176FEB]">responsibilities</span>
            </motion.h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Operator responsibilities */}
              <motion.div
                variants={revealItem}
                className="rounded-2xl border border-[#D3D5DB] bg-white p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                  <Building2 className="h-6 w-6 text-[#176FEB]" />
                </div>
                <h3 className="mb-4 font-heading text-xl font-bold text-foreground">
                  Your Operator Handles
                </h3>
                <ul className="space-y-3">
                  {[
                    'Lease terms and rental agreements',
                    'Rent amounts and payment deadlines',
                    'Maintenance requests and repairs',
                    'Property inspections and move-in/out',
                    'Tenant communication and notices',
                    'Eviction proceedings and disputes',
                    'Security deposits and refunds',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#176FEB]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Revun responsibilities */}
              <motion.div
                variants={revealItem}
                className="rounded-2xl border border-[#D3D5DB] bg-white p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                  <Shield className="h-6 w-6 text-[#176FEB]" />
                </div>
                <h3 className="mb-4 font-heading text-xl font-bold text-foreground">
                  Revun Handles
                </h3>
                <ul className="space-y-3">
                  {[
                    'Software platform uptime and reliability',
                    'Data security and encryption',
                    'Platform feature development',
                    'Payment processing infrastructure',
                    'Portal login and access (technical issues)',
                    'Bug fixes and platform improvements',
                    'Integration connectivity',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#176FEB]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Operator Types ────────────────────────────────────────── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]"
            >
              Operator Types
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Common <span className="text-[#176FEB]">Powered by Revun</span> operators
            </motion.h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-3">
              {operatorTypes.map((op) => {
                const Icon = op.icon
                return (
                  <motion.div key={op.title} variants={revealItem}>
                    <Link
                      href={op.href}
                      className="group flex flex-col rounded-2xl border border-[#D3D5DB] bg-white p-8 transition-colors hover:border-[#176FEB]/40"
                    >
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                        <Icon className="h-6 w-6 text-[#176FEB]" />
                      </div>
                      <h3 className="mb-2 font-heading text-lg font-bold text-foreground">
                        {op.title}
                      </h3>
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                        {op.description}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#176FEB] transition-colors group-hover:underline">
                        Learn more
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-2xl px-6">
          <RevealOnScroll className="text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-blue"
            >
              FAQ
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Common <span className="text-brand-blue">questions</span>
            </motion.h2>
          </RevealOnScroll>

          <RevealOnScroll className="mt-12">
            <motion.div
              variants={revealItem}
              className="divide-y divide-border rounded-2xl border border-border bg-card p-6"
            >
              {faqs.map((faq) => (
                <FAQItem key={faq.question} faq={faq} />
              ))}
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <motion.h2
              variants={revealItem}
              className="font-heading font-extrabold text-4xl tracking-tight text-[#0A1628] md:text-5xl"
            >
              Need <span className="text-[#176FEB]">technical</span> support?
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="mx-auto mt-5 max-w-lg text-lg text-[#555860]"
            >
              If you are experiencing a technical issue with the Revun platform itself, our team can help.
            </motion.p>
            <motion.div
              variants={revealItem}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/contact/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors hover:bg-[#1461d0]"
              >
                Report a Technical Issue
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/support/"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors hover:bg-white"
              >
                Back to Support
              </Link>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* AEO quick answer */}
      <p className="sr-only">
        If you use a Powered by Revun company, your property management company, brokerage, or maintenance provider uses Revun as their software platform. For questions about your lease, maintenance, payments, or property, contact your operator directly. Revun provides the technology platform but does not manage properties or tenant relationships.
      </p>
    </>
  )
}
