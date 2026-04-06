'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Tier = {
  name: string
  price: string
  unit?: string
  note?: string
  description: string
  features: string[]
  cta: string
  ctaHref?: string
  popular?: boolean
}

type TabData = {
  id: string
  label: string
  description: string
  tiers: Tier[]
  gridCols?: string
}

const TABS: TabData[] = [
  {
    id: 'self-manage',
    label: 'Self-Manage',
    description: 'For individual owners managing their own properties.',
    tiers: [
      {
        name: 'Lite',
        price: '$1',
        unit: '/day per active unit',
        description: 'Everything you need to manage a single property.',
        features: [
          'Property profile',
          'Listing setup',
          'Showing scheduling',
          'Tenant chat',
          'Basic lease workflow',
          'Rent collection',
          'Maintenance intake',
          'Mobile app',
        ],
        cta: 'Start for $1/day',
        ctaHref: '#',
      },
      {
        name: 'Pro',
        price: '$2',
        unit: '/day per active unit',
        popular: true,
        description: 'More automation. More reach. Less busywork.',
        features: [
          'Everything in Lite',
          'Listing distribution',
          'Offer workflow',
          'Lease automation',
          'Owner wallet',
          'Vendor coordination',
          'Automation rules',
          'Screening integrations',
        ],
        cta: 'Go Pro',
        ctaHref: '#',
      },
      {
        name: 'Max',
        price: '$3',
        unit: '/day per active unit',
        description: 'Full control for growing portfolios.',
        features: [
          'Everything in Pro',
          'Portfolio dashboard',
          'Multi-property reporting',
          'Compliance workflows',
          'Custom permissions',
          'Vendor tracking',
          'Priority support',
        ],
        cta: 'Get Max',
        ctaHref: '#',
      },
    ],
  },
  {
    id: 'agent-brokerage',
    label: 'Agent & Brokerage',
    description: 'Built for licensed agents and teams.',
    gridCols: 'lg:grid-cols-2',
    tiers: [
      {
        name: 'Agent Starter',
        price: '$149',
        unit: '/mo per user',
        description: 'Everything an agent needs from day one.',
        features: [
          'CRM',
          'Listings',
          'Showings',
          'Offers',
          'Documents',
          'Signatures',
          'Task/calendar',
          'Messaging',
          '60-day guided trial',
        ],
        cta: 'Start Trial',
        ctaHref: '#',
      },
      {
        name: 'Agent Pro',
        price: '$249',
        unit: '/mo per user',
        popular: true,
        description: 'Advanced tools for high-volume agents.',
        features: [
          'Everything in Starter',
          'Advanced documents',
          'Compliance',
          'Offer packages',
          'Calling/video',
          'Analytics',
        ],
        cta: 'Go Pro',
        ctaHref: '#',
      },
      {
        name: 'Brokerage Core',
        price: '$499',
        unit: '/mo',
        description: 'Foundation for growing brokerages.',
        features: [
          'Team CRM',
          'Document system',
          'Deal pipeline',
          'Compliance',
          'Permissions',
          'Launch program',
        ],
        cta: 'Start Trial',
        ctaHref: '#',
      },
      {
        name: 'Brokerage Growth',
        price: '$999',
        unit: '/mo',
        description: 'Scale your brokerage operations.',
        features: [
          'Everything in Core',
          'Training',
          'Analytics',
          'Premium support',
          'Automation',
          'Telephony routing',
        ],
        cta: 'Contact Sales',
        ctaHref: '#',
      },
    ],
  },
  {
    id: 'operator',
    label: 'Operator',
    description: 'For property management companies at scale.',
    tiers: [
      {
        name: 'Core',
        price: '$999',
        unit: '/mo',
        description: 'Foundational property management operations.',
        features: [
          'Owner/tenant/vendor workflows',
          'Communications',
          'Maintenance intake',
          'Payments',
          'Reporting',
        ],
        cta: 'Book Demo',
        ctaHref: '#',
      },
      {
        name: 'Growth',
        price: '$2,499',
        unit: '/mo',
        popular: true,
        description: 'Advanced automation for growing teams.',
        features: [
          'Advanced automation',
          'Routing rules',
          'Staffing tools',
          'Dashboards',
          'Integrations',
          'Implementation support',
        ],
        cta: 'Book Demo',
        ctaHref: '#',
      },
      {
        name: 'Max',
        price: '$4,999',
        unit: '/mo',
        description: 'Enterprise-grade property management.',
        features: [
          'Enterprise controls',
          'Custom workflows',
          'Financial operations',
          'Advanced reporting',
          'API layer',
        ],
        cta: 'Book Demo',
        ctaHref: '#',
      },
    ],
  },
  {
    id: 'maintenance',
    label: 'Maintenance',
    description: 'Purpose-built for maintenance and trades companies.',
    tiers: [
      {
        name: 'Core',
        price: '$399',
        unit: '/mo',
        description: 'Run your maintenance operation end-to-end.',
        features: [
          'Job intake',
          'Dispatching',
          'Scheduling',
          'Work orders',
          'Proof uploads',
          'Customer communication',
          'Invoicing',
        ],
        cta: 'Book Demo',
        ctaHref: '#',
      },
      {
        name: 'Growth',
        price: '$899',
        unit: '/mo',
        popular: true,
        description: 'Scale your team with better visibility.',
        features: [
          'CRM',
          'Team dashboards',
          'Training',
          'Communication tools',
          'Technician tracking',
          'Quick pay',
        ],
        cta: 'Book Demo',
        ctaHref: '#',
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Tailored for large-scale operations.',
        features: [
          'Advanced reporting',
          'API access',
          'Custom dispatch',
          'Enterprise onboarding',
        ],
        cta: 'Contact Sales',
        ctaHref: '#',
      },
    ],
  },
  {
    id: 'enterprise',
    label: 'Enterprise',
    description: 'Custom infrastructure for large organizations.',
    tiers: [
      {
        name: 'Enterprise',
        price: 'Custom',
        description:
          'White-glove onboarding, phased rollout, governance, security configuration, and custom infrastructure, all tailored to your organization.',
        features: [
          'Custom pricing',
          'White-glove onboarding',
          'Phased rollout plan',
          'Governance and compliance',
          'Security configuration',
          'Custom infrastructure',
          'Dedicated account team',
          'SLA guarantees',
        ],
        cta: 'Request Consultation',
        ctaHref: '#',
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Card                                                               */
/* ------------------------------------------------------------------ */

function PricingCard({ tier, isEnterpriseSolo }: { tier: Tier; isEnterpriseSolo?: boolean }) {
  return (
    <motion.div variants={revealItem}>
      <div
        className={cn(
          'relative flex h-full flex-col rounded-xl border bg-card p-6 transition-shadow hover:shadow-lg md:p-8',
          tier.popular && 'ring-2 ring-brand-violet shadow-lg',
          isEnterpriseSolo && 'mx-auto max-w-2xl text-center'
        )}
      >
        {/* Popular badge */}
        {tier.popular && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center rounded-full bg-brand-violet px-4 py-1 text-xs font-semibold tracking-wide text-white uppercase">
              Most Popular
            </span>
          </div>
        )}

        {/* Header */}
        <div className={cn('mb-6', tier.popular && 'mt-2')}>
          <h3 className="font-heading text-xl font-bold text-foreground">{tier.name}</h3>
          <div className="mt-3 flex items-baseline gap-1">
            {tier.price === 'Custom' ? (
              <span className="font-heading text-4xl font-bold text-foreground">Custom</span>
            ) : (
              <>
                <span className="font-heading text-4xl font-bold text-foreground">
                  {tier.price}
                </span>
                {tier.unit && (
                  <span className="text-sm text-muted-foreground">{tier.unit}</span>
                )}
              </>
            )}
          </div>
          {tier.note && (
            <p className="mt-1 text-xs text-muted-foreground">{tier.note}</p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {tier.description}
          </p>
        </div>

        {/* Features */}
        <ul
          className={cn(
            'mb-8 flex flex-1 flex-col gap-3',
            isEnterpriseSolo && 'mx-auto grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-2'
          )}
        >
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
              <Check className="mt-0.5 size-4 shrink-0 text-brand-violet" strokeWidth={2.5} />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={tier.ctaHref || '#'}
          className={cn(
            'inline-flex h-11 items-center justify-center rounded-lg px-6 text-sm font-semibold transition-all',
            tier.popular
              ? 'bg-brand-violet text-white cta-primary-shadow hover:bg-brand-violet-dark'
              : 'border border-border bg-background text-foreground hover:bg-muted'
          )}
        >
          {tier.cta}
        </a>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Tab panel animation                                                */
/* ------------------------------------------------------------------ */

const panelVariants = {
  enter: { opacity: 0, y: 12 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function PricingTabs() {
  const [active, setActive] = useState('self-manage')

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Tab triggers */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-xl bg-muted p-1.5">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={cn(
                  'relative rounded-lg px-4 py-2 text-sm font-medium transition-all',
                  active === tab.id
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {active === tab.id && (
                  <motion.span
                    layoutId="pricing-tab-pill"
                    className="absolute inset-0 rounded-lg bg-background shadow-sm"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab panels */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            {TABS.filter((t) => t.id === active).map((tab) => (
              <motion.div
                key={tab.id}
                variants={panelVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {/* Description */}
                <p className="mb-10 text-center text-base text-muted-foreground">
                  {tab.description}
                </p>

                {/* Cards grid */}
                <RevealOnScroll
                  className={cn(
                    'grid gap-6',
                    tab.id === 'enterprise'
                      ? 'grid-cols-1'
                      : tab.gridCols
                        ? `grid-cols-1 md:grid-cols-2 ${tab.gridCols}`
                        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  )}
                  stagger={0.08}
                >
                  {tab.tiers.map((tier) => (
                    <PricingCard
                      key={tier.name}
                      tier={tier}
                      isEnterpriseSolo={tab.id === 'enterprise'}
                    />
                  ))}
                </RevealOnScroll>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
