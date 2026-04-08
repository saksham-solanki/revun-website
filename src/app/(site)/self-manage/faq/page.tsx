'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildFAQPageSchema } from '@/lib/schema-builders'

/* ── Animation variants ─────────────────────────────────────────────── */

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

/* ── Data ────────────────────────────────────────────────────────────── */

interface FAQCategory {
  title: string
  questions: { question: string; answer: string }[]
}

const faqCategories: FAQCategory[] = [
  {
    title: 'Getting Started',
    questions: [
      {
        question: 'What is Revun Self-Manage?',
        answer:
          'Revun Self-Manage is a property management platform built for landlords who want to manage their own rental properties. It replaces spreadsheets, email chains, and disconnected tools with a single dashboard for listings, screening, leases, rent collection, and maintenance.',
      },
      {
        question: 'Do I need any property management experience?',
        answer:
          'No. Revun is designed for first-time landlords as well as experienced owners. The platform guides you through each step with templates, checklists, and built-in best practices. You do not need prior experience to get started.',
      },
      {
        question: 'How long does it take to set up?',
        answer:
          'Most landlords are fully set up in about 20 minutes. That includes creating your account, verifying your identity, adding your first property, connecting your bank account, and publishing your first listing.',
      },
      {
        question: 'Can I use Revun if I only have one property?',
        answer:
          'Absolutely. The Free tier supports up to 2 units at no cost. Many of our users manage a single rental property and use Revun to stay organized and professional.',
      },
      {
        question: 'Is Revun available in my province or state?',
        answer:
          'Revun is available across all Canadian provinces including Ontario, British Columbia, Alberta, Quebec, Nova Scotia, Manitoba, Saskatchewan, New Brunswick, Prince Edward Island, and Newfoundland and Labrador. US expansion is underway with initial coverage in key states.',
      },
      {
        question: 'Do I need to download an app?',
        answer:
          'Revun works in any web browser on desktop, tablet, or phone. A mobile app is available for iOS and Android for on-the-go management, but it is not required.',
      },
    ],
  },
  {
    title: 'Pricing & Billing',
    questions: [
      {
        question: 'How much does Revun cost?',
        answer:
          'Revun offers a Free tier for up to 2 units. Paid plans start at $29/month (Starter, up to 10 units), $59/month (Growth, up to 25 units), and $99/month (Portfolio, up to 50 units). All plans are month-to-month with no annual contracts.',
      },
      {
        question: 'Is there a free trial?',
        answer:
          'The Free tier is not a trial. It is a permanent free plan for landlords with 1-2 units. You can use it indefinitely. If you want to try paid features, you can upgrade and downgrade at any time.',
      },
      {
        question: 'Are there any hidden fees?',
        answer:
          'No. Monthly plan pricing is transparent and all-inclusive for platform access. Add-on services like tenant screening ($25/check) and rent guarantee (2.5% of rent) are optional and priced separately. Standard payment processing fees apply to rent collection.',
      },
      {
        question: 'Can I cancel at any time?',
        answer:
          'Yes. All plans are month-to-month. Cancel anytime from your account settings. Your data remains accessible for 30 days after cancellation.',
      },
      {
        question: 'How does billing work?',
        answer:
          'You are billed monthly on the anniversary of your sign-up date. We accept credit cards and pre-authorized debit. Invoices are available in your account settings.',
      },
      {
        question: 'Do you offer discounts for annual payment?',
        answer:
          'We are exploring annual billing options. Currently all plans are billed monthly. Join our mailing list to be notified when annual plans become available.',
      },
    ],
  },
  {
    title: 'Tenant Screening',
    questions: [
      {
        question: 'What does tenant screening include?',
        answer:
          'A full screening includes an Equifax credit report, identity verification, criminal background check, eviction history search, and employment verification. Results are delivered within minutes.',
      },
      {
        question: 'How much does screening cost?',
        answer:
          'Tenant screening costs $25 per check. This is a pay-per-use add-on available on all plans, including Free. There is no subscription required.',
      },
      {
        question: 'Can I make the applicant pay for the screening?',
        answer:
          'Yes. You can configure your application to have the applicant pay the screening fee. The fee is collected during the application process and applied to the screening.',
      },
      {
        question: 'How long does screening take?',
        answer:
          'Most screening results are delivered within 5-10 minutes. In rare cases where manual verification is needed, results can take up to 24 hours.',
      },
      {
        question: 'Is the screening compliant with privacy laws?',
        answer:
          'Yes. All screening is conducted in compliance with PIPEDA (Canada) and applicable provincial privacy legislation. Applicants provide explicit consent before any checks are run.',
      },
    ],
  },
  {
    title: 'Rent Collection',
    questions: [
      {
        question: 'How do tenants pay rent through Revun?',
        answer:
          'Tenants can pay by pre-authorized debit, credit card, or Interac e-transfer. They receive automatic reminders before rent is due and receipts after payment.',
      },
      {
        question: 'When do I receive the rent payment?',
        answer:
          'Rent payments are deposited to your connected bank account within 2-3 business days of the tenant\'s payment. Pre-authorized debit payments arrive faster as they are scheduled in advance.',
      },
      {
        question: 'What happens if a tenant pays late?',
        answer:
          'Revun sends automatic late payment reminders. You can configure late fees in your lease settings. The dashboard shows real-time payment status so you always know who has paid and who has not.',
      },
      {
        question: 'Can I set up automatic rent collection?',
        answer:
          'Yes. Pre-authorized debit lets you automatically collect rent on a set date each month. Tenants authorize the debit once and payments happen automatically.',
      },
      {
        question: 'Are there payment processing fees?',
        answer:
          'Standard payment processing fees apply. Pre-authorized debit is the most cost-effective option. Credit card payments carry a small percentage fee. Interac e-transfer fees vary by bank.',
      },
      {
        question: 'Can I track partial payments?',
        answer:
          'Yes. The payment ledger tracks all transactions including partial payments. You can see the full payment history and outstanding balance for each tenant at any time.',
      },
    ],
  },
  {
    title: 'Maintenance',
    questions: [
      {
        question: 'How do tenants submit maintenance requests?',
        answer:
          'Tenants submit requests through their tenant portal or the mobile app. They describe the issue, upload photos, and select a priority level. You receive an instant notification.',
      },
      {
        question: 'Can I assign maintenance requests to contractors?',
        answer:
          'Yes. You can assign requests to your own contractors or use the Maintenance Coordination add-on ($15/request) to have Revun find and coordinate a vetted contractor for you.',
      },
      {
        question: 'How do I track maintenance history?',
        answer:
          'Every maintenance request is logged with timestamps, photos, communications, and costs. You can view the full maintenance history for any unit from your dashboard.',
      },
      {
        question: 'Is there an emergency maintenance line?',
        answer:
          'The Emergency Line add-on ($10/month per property) provides 24/7 live answering for your tenants. Emergencies are triaged and contractors dispatched according to your preferences.',
      },
      {
        question: 'Can tenants see the status of their request?',
        answer:
          'Yes. Tenants see real-time status updates in their portal. They are notified when a request is acknowledged, when a contractor is assigned, and when the work is completed.',
      },
    ],
  },
  {
    title: 'Legal & Compliance',
    questions: [
      {
        question: 'Does Revun provide lease templates?',
        answer:
          'Yes. Revun includes basic lease templates on all plans. The Legal Document Pack add-on ($49/year) provides comprehensive, province-specific templates that are updated when legislation changes.',
      },
      {
        question: 'Are the lease templates legally valid?',
        answer:
          'Yes. Templates are drafted by legal professionals and comply with provincial residential tenancy legislation. However, we recommend reviewing any lease with a local legal professional for your specific situation.',
      },
      {
        question: 'Does Revun handle rent increase notices?',
        answer:
          'Yes. Revun provides rent increase notice templates and tracks the required notice periods for your province. The Compliance Alerts add-on sends automatic reminders before deadlines.',
      },
      {
        question: 'What about the Ontario Standard Lease?',
        answer:
          'Revun supports the Ontario Standard Lease form as required by provincial law. The template is pre-populated with your property and tenant information for easy completion.',
      },
      {
        question: 'How does Revun help with eviction processes?',
        answer:
          'Revun provides N-series notice templates (Ontario) and equivalent forms for other provinces. The platform tracks notice periods and deadlines. Note: Revun does not provide legal advice. For complex situations, consult a paralegal or lawyer.',
      },
      {
        question: 'Is my data secure?',
        answer:
          'Yes. Revun uses bank-level encryption for all data in transit and at rest. We comply with PIPEDA and applicable provincial privacy laws. Your data is stored in Canadian data centres.',
      },
    ],
  },
  {
    title: 'Account Management',
    questions: [
      {
        question: 'Can I manage multiple properties from one account?',
        answer:
          'Yes. Your dashboard shows all properties and units in one view. You can filter by property, unit, or tenant. Batch operations are available on Growth and Portfolio plans.',
      },
      {
        question: 'Can I give someone else access to my account?',
        answer:
          'The Portfolio plan includes team access features. You can invite a partner, assistant, or accountant with role-based permissions to manage specific properties or functions.',
      },
      {
        question: 'How do I export my data?',
        answer:
          'You can export tenant records, payment history, maintenance logs, and financial summaries in CSV or PDF format at any time. Your data belongs to you.',
      },
      {
        question: 'What happens to my data if I cancel?',
        answer:
          'Your data remains accessible for 30 days after cancellation. During this period you can export everything. After 30 days, data is permanently deleted in accordance with our privacy policy.',
      },
      {
        question: 'How do I contact support?',
        answer:
          'Support is available via in-app chat and email on all plans. Growth plan users receive priority support with faster response times. Portfolio plan users get dedicated phone support and an account manager.',
      },
    ],
  },
]

/* Flatten all FAQs for schema */
const allFaqs = faqCategories.flatMap((cat) => cat.questions)

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function SelfManageFAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Self-Manage', url: 'https://revun.com/self-manage/' },
              { name: 'FAQ', url: 'https://revun.com/self-manage/faq/' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildFAQPageSchema(allFaqs)),
        }}
      />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-white">
        <motion.div
          className="mx-auto max-w-3xl px-6 pt-28 pb-16 text-center"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-brand-blue"
          >
            Frequently asked questions
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight text-foreground md:text-5xl"
          >
            Everything you need to{' '}
            <span className="text-brand-blue">know</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            Answers to common questions about self-managing your rental property with Revun.
            Written in plain language for first-time and experienced landlords alike.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Quick nav ─────────────────────────────────────────────── */}
      <section className="bg-brand-off-white py-8">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <motion.div variants={revealItem} className="flex flex-wrap justify-center gap-2">
              {faqCategories.map((cat) => (
                <a
                  key={cat.title}
                  href={`#${cat.title.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-brand-blue/30 hover:text-brand-blue"
                >
                  {cat.title}
                </a>
              ))}
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── FAQ Categories ────────────────────────────────────────── */}
      {faqCategories.map((category, catIndex) => (
        <section
          key={category.title}
          id={category.title.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}
          className={`py-12 ${
            catIndex % 2 === 0
              ? 'bg-white'
              : 'bg-brand-off-white'
          }`}
        >
          <div className="mx-auto max-w-3xl px-6">
            <RevealOnScroll className="text-center mb-12">
              <motion.h2
                variants={revealItem}
                className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              >
                {category.title}
              </motion.h2>
            </RevealOnScroll>

            <RevealOnScroll>
              <motion.div variants={revealItem} className="space-y-3">
                {category.questions.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-xl border border-border bg-card transition-all duration-200 hover:border-brand-blue/30"
                  >
                    <summary className="flex cursor-pointer items-center justify-between px-6 py-5 list-none [&::-webkit-details-marker]:hidden">
                      <span className="font-heading font-semibold text-foreground text-[15px] pr-4">
                        {faq.question}
                      </span>
                      <svg
                        className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <line x1="10" y1="4" x2="10" y2="16" />
                        <line x1="4" y1="10" x2="16" y2="10" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-5 -mt-1">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </motion.div>
            </RevealOnScroll>
          </div>
        </section>
      ))}

      {/* ── Bottom CTA ────────────────────────────────────────────── */}
      <section className="bg-white py-12">
        <RevealOnScroll className="mx-auto max-w-2xl px-6 text-center">
          <motion.h2
            variants={revealItem}
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Still have{' '}
            <span className="text-brand-blue">questions?</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
          >
            Our support team is here to help. Reach out anytime.
          </motion.p>
          <motion.div
            variants={revealItem}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/contact/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              Contact support
            </Link>
            <Link
              href="/self-manage/get-started/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-8 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Get started guide
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>
    </>
  )
}
