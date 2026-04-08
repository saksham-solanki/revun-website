'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ShieldCheck,
  CreditCard,
  Wrench,
  FileSignature,
  BarChart3,
  Shield,
  Search,
  Truck,
  Zap,
  Home,
  Scale,
  Lightbulb,
  Check,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema } from '@/lib/schema-builders'

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

interface AddOn {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { strokeWidth?: number }>
  name: string
  price: string
  description: string
  details: string[]
}

interface Category {
  title: string
  description: string
  addOns: AddOn[]
}

const categories: Category[] = [
  {
    title: 'Screening & Verification',
    description: 'Know who you are renting to with thorough background and identity checks.',
    addOns: [
      {
        icon: ShieldCheck,
        name: 'Tenant Screening',
        price: '$25/check',
        description: 'Full credit check, identity verification, and background screening per applicant.',
        details: [
          'Equifax credit report',
          'Identity verification',
          'Criminal background check',
          'Eviction history search',
          'Employment verification',
          'Results in minutes',
        ],
      },
      {
        icon: Search,
        name: 'Reference Check',
        price: '$10/check',
        description: 'Automated reference checks sent to previous landlords and employers.',
        details: [
          'Previous landlord questionnaire',
          'Employer verification call',
          'Automated follow-ups',
          'Summary report delivered',
        ],
      },
    ],
  },
  {
    title: 'Financial Services',
    description: 'Protect your income and help your tenants build credit.',
    addOns: [
      {
        icon: CreditCard,
        name: 'Rent Guarantee',
        price: '2.5% of monthly rent',
        description: 'We guarantee your rent payment even if your tenant pays late or defaults.',
        details: [
          'Guaranteed payment by the 5th',
          'Covers up to 3 months of arrears',
          'No deductible or claim process',
          'Automatic enrollment available',
          'Eviction cost coverage included',
        ],
      },
      {
        icon: BarChart3,
        name: 'Rent Reporting',
        price: '$5/tenant/mo',
        description: 'Report on-time rent payments to credit bureaus. Help your tenants build credit.',
        details: [
          'Reports to Equifax and TransUnion',
          'Automatic monthly reporting',
          'Tenant receives credit boost',
          'Incentivizes on-time payment',
          'Retention tool for good tenants',
        ],
      },
    ],
  },
  {
    title: 'Maintenance',
    description: 'Get help with repairs without hiring a full-time property manager.',
    addOns: [
      {
        icon: Wrench,
        name: 'Maintenance Coordination',
        price: '$15/request',
        description: 'We find, vet, and coordinate a qualified contractor for your maintenance request.',
        details: [
          'Vetted local contractors',
          'Quote comparison',
          'Scheduling and access coordination',
          'Photo documentation',
          'Quality follow-up',
        ],
      },
      {
        icon: Zap,
        name: 'Emergency Line',
        price: '$10/mo per property',
        description: '24/7 emergency phone line for your tenants. We triage and dispatch.',
        details: [
          '24/7 live answering',
          'Emergency triage protocol',
          'Contractor dispatch for emergencies',
          'You stay informed via app',
        ],
      },
    ],
  },
  {
    title: 'Legal & Compliance',
    description: 'Stay compliant with provincial regulations without hiring a lawyer.',
    addOns: [
      {
        icon: FileSignature,
        name: 'Legal Document Pack',
        price: '$49/year',
        description: 'Province-specific lease templates, notice forms, and legal document library.',
        details: [
          'Province-specific lease templates',
          'N-series notice forms (Ontario)',
          'RTB forms (BC)',
          'Rent increase notice templates',
          'Move-in/move-out checklists',
          'Updated when legislation changes',
        ],
      },
      {
        icon: Scale,
        name: 'Compliance Alerts',
        price: '$5/mo per unit',
        description: 'Automated reminders for rent increase deadlines, lease renewals, and regulatory notices.',
        details: [
          'Rent increase deadline alerts',
          'Lease renewal reminders',
          'Provincial regulation updates',
          'Required notice period tracking',
        ],
      },
    ],
  },
  {
    title: 'Insurance & Protection',
    description: 'Protect your property and connect your tenants with coverage.',
    addOns: [
      {
        icon: Shield,
        name: 'Insurance Referral',
        price: 'Free',
        description: 'Connect your tenants with tenant insurance providers. No cost to you or your tenant.',
        details: [
          'Pre-vetted insurance partners',
          'Tenant receives personalized quote',
          'Digital proof of insurance stored',
          'Renewal reminders included',
        ],
      },
      {
        icon: Home,
        name: 'Landlord Insurance Review',
        price: 'Free',
        description: 'Get a complimentary review of your landlord insurance coverage from our partners.',
        details: [
          'Coverage gap analysis',
          'Market comparison',
          'No obligation to switch',
          'Annual review reminders',
        ],
      },
    ],
  },
  {
    title: 'Moving & Utilities',
    description: 'Help your tenants settle in quickly with move-in services.',
    addOns: [
      {
        icon: Truck,
        name: 'Moving Concierge',
        price: 'Free',
        description: 'Connect your tenants with vetted moving companies and utility setup services.',
        details: [
          'Moving company quotes',
          'Utility setup assistance',
          'Internet provider comparison',
          'Move-in checklist',
        ],
      },
      {
        icon: Lightbulb,
        name: 'Utility Transfer',
        price: 'Free',
        description: 'Automated utility transfer reminders and guides for your tenants.',
        details: [
          'Province-specific utility guides',
          'Transfer deadline reminders',
          'Confirmation tracking',
          'Move-out utility return',
        ],
      },
    ],
  },
]

const workflowSteps = [
  {
    number: '01',
    title: 'Choose your plan',
    description: 'Start with any self-manage plan. Add-ons are available on all tiers, including Free.',
  },
  {
    number: '02',
    title: 'Browse add-ons',
    description: 'Review available add-ons from your dashboard. Enable the ones that fit your needs.',
  },
  {
    number: '03',
    title: 'Activate instantly',
    description: 'One click to activate. Add-ons integrate directly into your existing workflows.',
  },
  {
    number: '04',
    title: 'Pay as you go',
    description: 'Most add-ons are pay-per-use. No subscriptions unless you choose a monthly service.',
  },
]

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function SelfManageAddOnsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Self-Manage', url: 'https://revun.com/self-manage/' },
              { name: 'Add-Ons', url: 'https://revun.com/self-manage/add-ons/' },
            ])
          ),
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
            Add-ons marketplace
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight text-foreground md:text-5xl"
          >
            Only pay for what you{' '}
            <span className="text-brand-blue">actually need</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            Screening, rent guarantee, maintenance coordination, legal documents, and more.
            Add services to your plan one at a time, no bundles required.
          </motion.p>
        </motion.div>
      </section>

      {/* ── How add-ons work ──────────────────────────────────────── */}
      <section className="bg-brand-off-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll className="text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-blue"
            >
              How it works
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Add-ons integrate into your{' '}
              <span className="text-brand-blue">existing workflow</span>
            </motion.h2>
          </RevealOnScroll>

          <RevealOnScroll
            stagger={0.1}
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {workflowSteps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={revealItem}
                className="relative text-center"
              >
                {/* Connector line between steps on desktop */}
                {i < workflowSteps.length - 1 && (
                  <div
                    className="absolute top-7 left-[calc(50%+2rem)] right-0 hidden h-px bg-border lg:block"
                    aria-hidden
                  />
                )}
                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-blue/20 bg-white">
                  <span className="font-heading text-sm font-bold text-brand-blue">{step.number}</span>
                </div>
                <h3 className="mt-4 font-heading text-base font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────────────── */}
      {categories.map((category, catIndex) => (
        <section
          key={category.title}
          className={`py-12 ${
            catIndex % 2 === 0
              ? 'bg-white'
              : 'bg-brand-off-white'
          }`}
        >
          <div className="mx-auto max-w-6xl px-6">
            <RevealOnScroll className="text-center">
              <motion.h2
                variants={revealItem}
                className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                {category.title}
              </motion.h2>
              <motion.p
                variants={revealItem}
                className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground"
              >
                {category.description}
              </motion.p>
            </RevealOnScroll>

            <RevealOnScroll
              stagger={0.08}
              className="mt-12 grid gap-6 sm:grid-cols-2"
            >
              {category.addOns.map((addon) => {
                const Icon = addon.icon
                return (
                  <motion.div
                    key={addon.name}
                    variants={revealItem}
                    className="flex flex-col rounded-2xl border border-border bg-card p-8 transition-colors hover:border-brand-blue/30"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-lg font-bold text-foreground">
                          {addon.name}
                        </h3>
                        <p className="mt-0.5 text-sm font-semibold text-brand-blue">{addon.price}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-[0.938rem] leading-relaxed text-muted-foreground">
                      {addon.description}
                    </p>
                    <ul className="mt-4 flex-1 space-y-2">
                      {addon.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2 text-sm text-foreground">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              })}
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
            Start with the platform.{' '}
            <span className="text-brand-blue">Add what you need.</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
          >
            Every add-on is available on every plan, including Free.
          </motion.p>
          <motion.div
            variants={revealItem}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/self-manage/pricing/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-blue px-8 text-base font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              View pricing
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
