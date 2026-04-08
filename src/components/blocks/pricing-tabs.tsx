'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import NumberFlow from '@number-flow/react'
import { cn } from '@/lib/utils'
import { RevealOnScroll, revealItemBlur } from '@/components/ui/reveal-on-scroll'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Tier = {
  name: string
  monthlyPrice: string
  annualPrice?: string
  unit?: string
  description: string
  features: string[]
  cta: string
  ctaHref?: string
  popular?: boolean
  bg: string
}

const TIERS: Tier[] = [
  {
    name: 'Free',
    monthlyPrice: '$0',
    annualPrice: '$0',
    unit: '/mo',
    description: 'For individual owners (1-2 units)',
    features: [
      'Property profile',
      'Listing setup',
      'Showing scheduling',
      'Tenant chat',
      'Basic lease workflow',
      'Rent collection (ACH only)',
      'Maintenance intake',
      'Mobile app',
    ],
    cta: 'Start Free',
    ctaHref: '#',
    bg: 'bg-white',
  },
  {
    name: 'Growth',
    monthlyPrice: '$29',
    annualPrice: '$23',
    unit: '/unit/mo',
    description: 'For growing portfolios (3-25 units)',
    features: [
      'Everything in Free',
      'Listing distribution',
      'Offer workflow',
      'Lease automation',
      'Owner financial reports',
      'Vendor coordination',
      'Automation rules',
      'Screening integrations',
      'Priority email support',
    ],
    cta: 'Start Free Trial',
    ctaHref: '#',
    bg: 'bg-[#F5F6F8]',
  },
  {
    name: 'Professional',
    monthlyPrice: '$49',
    annualPrice: '$39',
    unit: '/unit/mo',
    description: 'For PMCs and brokerages (25-500 units)',
    popular: true,
    features: [
      'Everything in Growth',
      'Team management',
      'Compliance workflows',
      'Custom permissions',
      'Portfolio dashboard',
      'Multi-entity reporting',
      'Telephony routing',
      'API access',
      'Dedicated account manager',
    ],
    cta: 'Start Free Trial',
    ctaHref: '#',
    bg: 'bg-[#E8F2FE]',
  },
  {
    name: 'Enterprise',
    monthlyPrice: 'Custom',
    unit: '',
    description: 'For operators (500+ units)',
    features: [
      'Everything in Professional',
      'White-glove onboarding',
      'Custom infrastructure',
      'SLA guarantees',
      'Phased rollout plan',
      'Governance configuration',
      'Security audit',
      'Dedicated success team',
    ],
    cta: 'Contact Sales',
    ctaHref: '#',
    bg: 'bg-white',
  },
]

/* ------------------------------------------------------------------ */
/*  Card                                                               */
/* ------------------------------------------------------------------ */

function parsePrice(price: string): number {
  return parseInt(price.replace(/[^0-9]/g, ''), 10) || 0
}

function PricingCard({ tier, isAnnual }: { tier: Tier; isAnnual: boolean }) {
  const isCustom = tier.monthlyPrice === 'Custom'
  const numericPrice = isCustom
    ? 0
    : isAnnual && tier.annualPrice
      ? parsePrice(tier.annualPrice)
      : parsePrice(tier.monthlyPrice)

  return (
    <motion.div variants={revealItemBlur} className="flex">
      <div
        className={cn(
          'relative flex h-full w-full flex-col rounded-xl border border-[#D3D5DB] p-6 md:p-8',
          tier.bg,
          tier.popular && 'border-t-4 border-t-[#176FEB] ring-2 ring-brand-blue/20'
        )}
      >
        {/* Popular badge */}
        {tier.popular && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center rounded-full bg-[#176FEB] px-4 py-1 text-xs font-semibold tracking-wide text-white uppercase">
              Most Popular
            </span>
          </div>
        )}

        {/* Header */}
        <div className={cn('mb-6', tier.popular && 'mt-2')}>
          <h3 className="font-heading text-xl font-bold text-[#2C2E33]">{tier.name}</h3>
          <div className="mt-3 flex items-baseline gap-1">
            {isCustom ? (
              <span className="font-heading text-4xl font-bold text-[#0A1628]">Custom</span>
            ) : (
              <>
                <span className="font-heading text-4xl font-bold text-[#0A1628]">$</span>
                <NumberFlow
                  value={numericPrice}
                  className="font-heading text-4xl font-bold text-[#0A1628]"
                />
                {tier.unit && (
                  <span className="text-sm text-[#555860]">{tier.unit}</span>
                )}
              </>
            )}
          </div>
          {!isCustom && isAnnual && tier.annualPrice && (
            <p className="mt-1 text-xs text-[#176FEB] font-medium">
              Save 20% vs monthly ({tier.monthlyPrice}{tier.unit})
            </p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-[#555860]">
            {tier.description}
          </p>
        </div>

        {/* Features */}
        <ul className="mb-8 flex flex-1 flex-col gap-3">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-[#2C2E33]/80">
              <Check className="mt-0.5 size-4 shrink-0 text-[#176FEB]" strokeWidth={2.5} />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={tier.ctaHref || '#'}
          className={cn(
            'inline-flex h-11 items-center justify-center rounded-lg px-6 text-sm font-semibold transition-colors',
            tier.popular
              ? 'bg-[#176FEB] text-white hover:bg-[#1260CC] shadow-cta-glow'
              : 'border border-[#D3D5DB] bg-white text-[#2C2E33] hover:bg-[#F5F6F8]'
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
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3">
          <div className="relative inline-flex rounded-lg border border-[#D3D5DB] bg-[#F5F6F8] p-1">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className="relative z-10 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors"
            >
              {!isAnnual && (
                <motion.span
                  layoutId="pricing-pill"
                  className="absolute inset-0 rounded-lg bg-white shadow-sm"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className={cn('relative z-10', !isAnnual ? 'text-[#0A1628]' : 'text-[#555860]')}>
                Monthly
              </span>
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className="relative z-10 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors"
            >
              {isAnnual && (
                <motion.span
                  layoutId="pricing-pill"
                  className="absolute inset-0 rounded-lg bg-white shadow-sm"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className={cn('relative z-10', isAnnual ? 'text-[#0A1628]' : 'text-[#555860]')}>
                Annual
              </span>
            </button>
          </div>
          <span className="ml-1 rounded-full bg-[#E8F2FE] px-2.5 py-0.5 text-xs font-semibold text-[#176FEB]">
            Save 20%
          </span>
        </div>

        {/* Cards grid */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={isAnnual ? 'annual' : 'monthly'}
              variants={panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <RevealOnScroll
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
                stagger={0.08}
              >
                {TIERS.map((tier) => (
                  <PricingCard key={tier.name} tier={tier} isAnnual={isAnnual} />
                ))}
              </RevealOnScroll>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
