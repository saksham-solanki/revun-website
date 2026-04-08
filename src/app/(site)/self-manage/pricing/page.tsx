'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Check,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Wrench,
  FileSignature,
  BarChart3,
  Shield,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildFAQPageSchema, buildProductSchema } from '@/lib/schema-builders'

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

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Explore the platform with up to 2 units. No credit card required.',
    units: '1-2 units',
    highlighted: false,
    features: [
      'Up to 2 active units',
      'Listing creation',
      'Showing scheduling',
      'Tenant communication',
      'Document storage',
    ],
  },
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    description: 'Everything you need for a small portfolio. Up to 10 units.',
    units: 'Up to 10 units',
    highlighted: false,
    features: [
      'Up to 10 active units',
      'Listing syndication',
      'Tenant screening (pay per check)',
      'Digital lease signing',
      'Rent collection with auto-reminders',
      'Maintenance tracking',
      'Expense tracking',
    ],
  },
  {
    name: 'Growth',
    price: '$59',
    period: '/month',
    description: 'The full toolkit for growing landlords. Up to 25 units.',
    units: 'Up to 25 units',
    highlighted: true,
    badge: 'Most popular',
    features: [
      'Up to 25 active units',
      'Everything in Starter',
      'Priority tenant screening',
      'Rent reporting to credit bureaus',
      'Batch operations',
      'Portfolio dashboard',
      'Year-end tax summaries',
      'Priority support',
    ],
  },
  {
    name: 'Portfolio',
    price: '$99',
    period: '/month',
    description: 'For serious landlords managing up to 50 units.',
    units: 'Up to 50 units',
    highlighted: false,
    features: [
      'Up to 50 active units',
      'Everything in Growth',
      'Multi-property analytics',
      'Custom lease templates',
      'Vendor management',
      'API access',
      'Dedicated account manager',
      'Phone support',
    ],
  },
]

const addOns = [
  {
    icon: ShieldCheck,
    name: 'Tenant Screening',
    price: '$25/check',
    description: 'Credit check, identity verification, and background screening per applicant.',
  },
  {
    icon: CreditCard,
    name: 'Rent Guarantee',
    price: '2.5% of monthly rent',
    description: 'We guarantee your rent payment even if your tenant pays late or defaults.',
  },
  {
    icon: Wrench,
    name: 'Maintenance Coordination',
    price: '$15/request',
    description: 'We find, vet, and coordinate a contractor for your maintenance request.',
  },
  {
    icon: FileSignature,
    name: 'Legal Document Pack',
    price: '$49/year',
    description: 'Province-specific lease templates, notice forms, and legal document library.',
  },
  {
    icon: BarChart3,
    name: 'Rent Reporting',
    price: '$5/tenant/mo',
    description: 'Report on-time rent payments to credit bureaus to help your tenants build credit.',
  },
  {
    icon: Shield,
    name: 'Insurance Referral',
    price: 'Free',
    description: 'Connect your tenants with tenant insurance providers. No cost to you or your tenant.',
  },
]

const comparisonRows = [
  { item: 'Monthly cost (10 units)', revun: '$29-$59/mo', pm: '$1,200-$2,400/mo' },
  { item: 'Annual cost (10 units)', revun: '$348-$708/yr', pm: '$14,400-$28,800/yr' },
  { item: 'Annual savings', revun: '', pm: '', highlight: 'Save $13,700-$28,000+/year' },
  { item: 'Control over decisions', revun: 'Full control', pm: 'Limited' },
  { item: 'Direct tenant relationship', revun: 'Yes', pm: 'No' },
  { item: 'Lock-in contract', revun: 'None', pm: '6-12 months typical' },
  { item: 'Setup fees', revun: '$0', pm: '$200-$500' },
]

const faqs = [
  {
    question: 'Can I try Revun before paying?',
    answer:
      'Yes. The Free tier lets you manage up to 2 units with no credit card required. You can explore the full platform before upgrading.',
  },
  {
    question: 'What happens if I go over my unit limit?',
    answer:
      'You will receive a notification when you are approaching your limit. You can upgrade to the next tier at any time. We never disable access to your existing units.',
  },
  {
    question: 'Are there any hidden fees?',
    answer:
      'No. The monthly price covers platform access. Add-ons like tenant screening and rent guarantee are optional and priced transparently. Payment processing fees from Stripe or Interac apply to rent collection.',
  },
  {
    question: 'Can I switch plans at any time?',
    answer:
      'Yes. Upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle. No penalties or lock-in contracts.',
  },
  {
    question: 'How does pricing compare to hiring a property manager?',
    answer:
      'A property manager typically charges 8-12% of monthly rent. For a $2,000/month rental, that is $160-$240/month per unit. Revun starts at $29/month for up to 10 units, saving you thousands per year.',
  },
  {
    question: 'Do I pay per unit or per property?',
    answer:
      'Plans are based on the number of active units. A single-family home counts as one unit. A duplex counts as two units. Only units with active tenants or listings count toward your limit.',
  },
]

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function SelfManagePricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Self-Manage', url: 'https://revun.com/self-manage/' },
              { name: 'Pricing', url: 'https://revun.com/self-manage/pricing/' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildProductSchema([
              { name: 'Free', price: '0', description: 'For 1-2 units. Core features included.' },
              { name: 'Starter', price: '29', description: 'For up to 10 units. Full toolkit.' },
              { name: 'Growth', price: '59', description: 'For up to 25 units. Portfolio tools.' },
              { name: 'Portfolio', price: '99', description: 'For up to 50 units. Full suite.' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildFAQPageSchema(faqs)),
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
            Self-manage pricing
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight text-foreground md:text-5xl"
          >
            From <span className="text-brand-blue">$1/day</span> per unit
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            Free for up to 2 units. No credit card required. No annual contracts. Cancel anytime.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Pricing Tiers ─────────────────────────────────────────── */}
      <section className="bg-brand-off-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <RevealOnScroll
            stagger={0.08}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {tiers.map((tier) => (
              <motion.div
                key={tier.name}
                variants={revealItem}
                className={`relative flex flex-col rounded-2xl border p-8 ${
                  tier.highlighted
                    ? 'border-brand-blue bg-brand-blue/5'
                    : 'border-border bg-card'
                }`}
              >
                {tier.highlighted && 'badge' in tier && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-blue px-4 py-1 text-xs font-semibold text-white">
                    {tier.badge}
                  </span>
                )}
                <h3 className="font-heading text-xl font-bold text-foreground">{tier.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-bold text-foreground">{tier.price}</span>
                  <span className="text-sm text-muted-foreground">{tier.period}</span>
                </div>
                <p className="mt-1 text-xs font-medium text-brand-blue">{tier.units}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {tier.description}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/pricing/"
                  className={`mt-8 inline-flex h-11 items-center justify-center rounded-xl text-sm font-semibold transition-colors ${
                    tier.highlighted
                      ? 'bg-brand-blue text-white hover:bg-brand-blue-dark'
                      : 'border border-border text-foreground hover:bg-muted'
                  }`}
                >
                  {tier.price === '$0' ? 'Get started free' : `Start with ${tier.name}`}
                </Link>
              </motion.div>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Add-Ons ───────────────────────────────────────────────── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-blue"
            >
              Add-ons
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Pay only for what you{' '}
              <span className="text-brand-blue">need</span>
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground"
            >
              Optional services you can add to any plan. No bundles, no surprises.
            </motion.p>
          </RevealOnScroll>

          <RevealOnScroll
            stagger={0.08}
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {addOns.map((addon) => {
              const Icon = addon.icon
              return (
                <motion.div
                  key={addon.name}
                  variants={revealItem}
                  className="flex flex-col rounded-2xl border border-border bg-card p-8 transition-colors hover:border-brand-blue/30"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {addon.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-brand-blue">{addon.price}</p>
                  <p className="mt-2 flex-1 text-[0.938rem] leading-relaxed text-muted-foreground">
                    {addon.description}
                  </p>
                </motion.div>
              )
            })}
          </RevealOnScroll>

          <RevealOnScroll className="mt-10 text-center">
            <motion.div variants={revealItem}>
              <Link
                href="/self-manage/add-ons/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-colors hover:underline"
              >
                Explore all add-ons <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Comparison: Revun vs PM ───────────────────────────────── */}
      <section className="bg-brand-off-white py-12">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll className="text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-blue"
            >
              Cost comparison
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Revun vs. hiring a{' '}
              <span className="text-brand-blue">property manager</span>
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground"
            >
              A typical PM charges 8-12% of rent. For a $2,000/month unit, that is $160-$240/month. Here is how Revun compares.
            </motion.p>
          </RevealOnScroll>

          <RevealOnScroll className="mt-12">
            <motion.div
              variants={revealItem}
              className="overflow-hidden rounded-2xl border border-border"
            >
              <div className="grid grid-cols-3 border-b border-border bg-brand-off-white">
                <div className="px-6 py-4 text-sm font-semibold text-muted-foreground" />
                <div className="border-l border-border px-6 py-4 text-center">
                  <span className="font-heading text-sm font-bold text-foreground">Revun</span>
                  <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-brand-blue/10 px-2 py-0.5 text-xs font-semibold text-brand-blue">
                    Self-manage
                  </span>
                </div>
                <div className="border-l border-border px-6 py-4 text-center">
                  <span className="font-heading text-sm font-bold text-muted-foreground">PM Company</span>
                </div>
              </div>

              {comparisonRows.map((row, i) =>
                row.highlight ? (
                  <div
                    key={row.item}
                    className="flex items-center justify-center border-b border-border bg-brand-blue/5 px-6 py-5 last:border-0"
                  >
                    <span className="font-heading text-sm font-bold text-brand-blue">
                      {row.highlight}
                    </span>
                  </div>
                ) : (
                  <div
                    key={row.item}
                    className={`grid grid-cols-3 border-b border-border last:border-0 ${
                      i % 2 === 1
                        ? 'bg-brand-off-white/50'
                        : 'bg-white'
                    }`}
                  >
                    <div className="px-6 py-4 text-sm font-medium text-foreground">
                      {row.item}
                    </div>
                    <div className="flex items-center justify-center border-l border-border px-6 py-4">
                      <span className="text-sm font-semibold text-brand-blue">{row.revun}</span>
                    </div>
                    <div className="flex items-center justify-center border-l border-border px-6 py-4">
                      <span className="text-sm text-muted-foreground">{row.pm}</span>
                    </div>
                  </div>
                )
              )}
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-3xl px-6">
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
              Pricing <span className="text-brand-blue">questions</span>
            </motion.h2>
          </RevealOnScroll>

          <RevealOnScroll className="mt-12">
            <motion.div variants={revealItem} className="space-y-3">
              {faqs.map((faq) => (
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

      {/* ── Bottom CTA ────────────────────────────────────────────── */}
      <section className="bg-brand-off-white py-12">
        <RevealOnScroll className="mx-auto max-w-2xl px-6 text-center">
          <motion.h2
            variants={revealItem}
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Start managing for{' '}
            <span className="text-brand-blue">$1/day</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
          >
            Free tier available. No credit card required. Upgrade when you are ready.
          </motion.p>
          <motion.div
            variants={revealItem}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/pricing/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              Get started free
            </Link>
            <Link
              href="/self-manage/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-8 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Back to Self-Manage
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>
    </>
  )
}
