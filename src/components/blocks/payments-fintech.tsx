'use client'

import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

const features = [
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    title: 'Rent Collection',
    description: 'Accept PAD (pre-authorized debit), credit card, and Interac e-Transfer. Automated reminders and receipts.',
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: 'Owner Disbursements',
    description: 'Automated owner payouts with detailed statements. Direct deposit to any Canadian or US bank account.',
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: 'Vendor Payments',
    description: 'Pay maintenance vendors and contractors directly through the platform. Track invoices and approvals.',
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    title: 'Financial Reporting',
    description: 'Real-time P&L, cash flow statements, and tax-ready reports. Export to QuickBooks, Xero, or CSV.',
  },
]

const paymentMethods = [
  'PAD',
  'Credit Card',
  'Interac e-Transfer',
  'Direct Deposit',
  'Wire Transfer',
  'ACH',
]

export function PaymentsFintech() {
  return (
    <section className="relative overflow-hidden bg-[#F5F6F8] py-12 md:py-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid bg-grid-mask opacity-[0.03]" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 translate-y-1/3 translate-x-1/4 w-[500px] h-[500px] rounded-full bg-[#176FEB]/[0.06] blur-[120px]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
          >
            Payments & Fintech
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-4xl font-normal text-[#0A1628] md:text-5xl"
          >
            Money in. Money out. <span className="text-keyword">Automated</span>.
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-xl text-lg text-[#555860]"
          >
            Rent collection, owner disbursements, vendor payments, and financial
            reporting - all in one platform.
          </motion.p>
        </RevealOnScroll>

        <RevealOnScroll className="mt-14 grid gap-6 sm:grid-cols-2" stagger={0.1}>
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={revealItem}
              className="group relative rounded-xl border border-[#E5E7EB] bg-white p-8 transition-all duration-200 hover:border-[#176FEB]/20 hover:shadow-card-hover"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-[#176FEB] opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true" />
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white">
                {feature.icon}
              </div>
              <h3 className="font-heading text-lg font-semibold text-[#0A1628]">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#555860]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </RevealOnScroll>

        {/* Payment method pills */}
        <RevealOnScroll className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {paymentMethods.map((method) => (
            <motion.span
              key={method}
              variants={revealItem}
              className="inline-flex items-center rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-sm font-medium text-[#555860]"
            >
              {method}
            </motion.span>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
