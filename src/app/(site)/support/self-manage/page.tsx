'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  User,
  Mail,
  MessageSquare,
  Phone,
  BookOpen,
  ChevronDown,
  CreditCard,
  Shield,
  Wrench,
  FileText,
  Home,
  BarChart3,
  ArrowRight,
  Rocket,
  HelpCircle,
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
    question: 'How do I add a new property to my account?',
    answer:
      'Log into your dashboard, click "Add Property," and follow the guided setup. You will enter the property address, unit details, and upload any relevant documents. Properties are live within minutes.',
  },
  {
    question: 'How do I screen a tenant?',
    answer:
      'Navigate to the Screening section in your dashboard, enter the applicant\'s information, and submit a screening request. Revun partners with Equifax and TransUnion to provide credit, criminal, and eviction checks. Results are typically available within minutes.',
  },
  {
    question: 'How does rent collection work?',
    answer:
      'Set up rent collection by adding your bank account and configuring payment schedules for each tenant. Tenants can pay via credit card, debit card, or pre-authorized bank debit. Funds are deposited directly to your account.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer:
      'Yes. Go to Account > Billing > Change Plan. Upgrades take effect immediately. Downgrades take effect at the end of your current billing period. Prorated credits are applied automatically.',
  },
  {
    question: 'How do I generate a lease agreement?',
    answer:
      'Use the Lease Builder in your dashboard. Select your province, customize the terms, add tenant information, and send for digital signature. Revun provides province-specific templates that comply with local regulations.',
  },
  {
    question: 'What if a tenant does not pay rent on time?',
    answer:
      'Revun sends automated payment reminders before and after the due date. You can configure late fees, generate N4/equivalent notices, and track payment history. If you have rent guarantee enabled, you are covered for missed payments.',
  },
  {
    question: 'How do I cancel my account?',
    answer:
      'Go to Account > Settings > Cancel Account. You can export all your data before cancelling. Active leases and tenant records will be available for download for 30 days after cancellation.',
  },
]

/* ── Support channels ────────────────────────────────────────────────── */

const supportChannels = [
  {
    title: 'Help Center',
    description: 'Browse guides, tutorials, and step-by-step walkthroughs for every feature.',
    icon: BookOpen,
    action: 'Browse Articles',
    href: '/help/',
  },
  {
    title: 'Email Support',
    description: 'Send us a detailed message and we will respond within one business day.',
    icon: Mail,
    action: 'support@revun.com',
    href: 'mailto:support@revun.com',
  },
  {
    title: 'Live Chat',
    description: 'Chat with our support team in real time during business hours (9 AM - 6 PM ET).',
    icon: MessageSquare,
    action: 'Start Chat',
    href: '/contact/',
  },
  {
    title: 'Phone Support',
    description: 'Available for Professional and Enterprise plan customers during business hours.',
    icon: Phone,
    action: 'Call Support',
    href: '/contact/',
  },
]

/* ── Common topics ───────────────────────────────────────────────────── */

const topics = [
  { title: 'Account Setup', description: 'Create your account, add properties, invite tenants.', icon: Rocket },
  { title: 'Billing & Payments', description: 'Manage your subscription, invoices, and payment methods.', icon: CreditCard },
  { title: 'Tenant Screening', description: 'Run credit checks, background checks, and reference checks.', icon: Shield },
  { title: 'Rent Collection', description: 'Set up payment schedules, track payments, handle late fees.', icon: BarChart3 },
  { title: 'Maintenance', description: 'Create work orders, dispatch vendors, track repairs.', icon: Wrench },
  { title: 'Leases & Legal Docs', description: 'Generate leases, notices, and compliance documents.', icon: FileText },
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

export default function SelfManageSupportPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Support', url: 'https://revun.com/support/' },
              { name: 'Self-Manage', url: 'https://revun.com/support/self-manage/' },
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
              name: 'Self-Manage Support',
              description: 'Support resources for Revun Self-Manage customers.',
              url: 'https://revun.com/support/self-manage/',
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
          <motion.div variants={fadeUp} className="mb-6 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white">
              <User className="h-7 w-7 text-[#176FEB]" strokeWidth={1.8} />
            </div>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-[#176FEB]"
          >
            Self-Manage Support
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight text-[#0A1628] sm:text-5xl"
          >
            We are here to{' '}
            <span className="text-[#176FEB]">help</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]"
          >
            You pay Revun directly for self-management tools. Our support team is ready to assist you with any questions about the platform.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Support Channels ──────────────────────────────────────── */}
      <section className="bg-brand-off-white py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]"
            >
              Get Help
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Support <span className="text-[#176FEB]">channels</span>
            </motion.h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-2">
              {supportChannels.map((channel) => {
                const Icon = channel.icon
                return (
                  <motion.div key={channel.title} variants={revealItem}>
                    <Link
                      href={channel.href}
                      className="group flex flex-col rounded-2xl border border-[#D3D5DB] bg-white p-8 transition-colors hover:border-[#176FEB]/40"
                    >
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                        <Icon className="h-6 w-6 text-[#176FEB]" />
                      </div>
                      <h3 className="mb-2 font-heading text-lg font-bold text-foreground">
                        {channel.title}
                      </h3>
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                        {channel.description}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#176FEB] transition-colors group-hover:underline">
                        {channel.action}
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

      {/* ── Common Topics ─────────────────────────────────────────── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]"
            >
              Common Topics
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              What can we help <span className="text-[#176FEB]">with?</span>
            </motion.h2>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.08}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {topics.map((topic) => {
                const Icon = topic.icon
                return (
                  <motion.div
                    key={topic.title}
                    variants={revealItem}
                    className="rounded-2xl border border-[#D3D5DB] bg-white p-8 transition-colors hover:border-[#176FEB]/40"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FE]">
                      <Icon className="h-6 w-6 text-[#176FEB]" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold text-foreground">
                      {topic.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {topic.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Getting Started Resources ─────────────────────────────── */}
      <section className="bg-[#F5F6F8] py-12">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll className="mb-10 text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#176FEB]"
            >
              Getting Started
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              New to <span className="text-[#176FEB]">Self-Manage?</span>
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="mx-auto mt-4 max-w-xl text-muted-foreground"
            >
              Follow these steps to get your first property set up and running on Revun.
            </motion.p>
          </RevealOnScroll>

          <RevealOnScroll stagger={0.1}>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  step: '01',
                  title: 'Create Your Account',
                  description: 'Sign up for free at revun.com. No credit card required. Choose the Self-Manage path during onboarding.',
                },
                {
                  step: '02',
                  title: 'Add Your Property',
                  description: 'Enter your property details, upload photos, and configure units. Import existing tenant data if applicable.',
                },
                {
                  step: '03',
                  title: 'Start Managing',
                  description: 'List vacancies, screen tenants, collect rent, handle maintenance, and generate reports from day one.',
                },
              ].map((s) => (
                <motion.div
                  key={s.step}
                  variants={revealItem}
                  className="rounded-2xl border border-[#D3D5DB] bg-white p-8"
                >
                  <span className="mb-4 block font-mono text-sm font-semibold text-[#176FEB]">
                    Step {s.step}
                  </span>
                  <h3 className="mb-2 font-heading text-lg font-bold text-foreground">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="bg-white py-12">
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
              Ready to <span className="text-[#176FEB]">get started?</span>
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="mx-auto mt-5 max-w-lg text-lg text-[#555860]"
            >
              Start managing your properties with Revun today. Free plan available with no credit card required.
            </motion.p>
            <motion.div
              variants={revealItem}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/signup/"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-colors hover:bg-[#1461d0]"
              >
                Start Free
              </Link>
              <Link
                href="/help/"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 text-base font-semibold text-[#0A1628] transition-colors hover:bg-white"
              >
                Visit Help Center
              </Link>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* AEO quick answer */}
      <p className="sr-only">
        Revun Self-Manage support is available for property owners who pay Revun directly for self-management tools. Support channels include the help center, email at support@revun.com, live chat, and phone support. Common topics include account setup, billing, tenant screening, rent collection, maintenance management, and lease generation.
      </p>
    </>
  )
}
