'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ------------------------------------------------------------------ */
/*  Payment method definitions                                        */
/* ------------------------------------------------------------------ */

const paymentMethods = [
  {
    id: 'apple-pay',
    label: 'Apple Pay',
    subtitle: null,
    recommended: true,
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
    ),
  },
  {
    id: 'authorize-net',
    label: 'authorize.net',
    subtitle: null,
    recommended: false,
    icon: (
      <div className="flex items-center gap-1">
        <svg className="h-5 w-8" viewBox="0 0 32 20" fill="none" aria-hidden="true">
          <rect width="32" height="20" rx="3" fill="#1A1F71" />
          <text x="6" y="14" fill="#fff" fontSize="8" fontWeight="bold">VISA</text>
        </svg>
        <svg className="h-5 w-8" viewBox="0 0 32 20" fill="none" aria-hidden="true">
          <rect width="32" height="20" rx="3" fill="#EB001B" fillOpacity="0.1" />
          <circle cx="12" cy="10" r="7" fill="#EB001B" />
          <circle cx="20" cy="10" r="7" fill="#F79E1B" />
        </svg>
      </div>
    ),
  },
  {
    id: 'bank-deposit',
    label: 'Bank deposit',
    subtitle: 'Cheque, cash',
    recommended: false,
    icon: (
      <svg className="h-6 w-6 text-[#555860]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
  },
  {
    id: 'bill-payment',
    label: 'Bill payment',
    subtitle: null,
    recommended: false,
    icon: (
      <svg className="h-6 w-6 text-[#555860]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
]

/* ------------------------------------------------------------------ */
/*  Breakdown data                                                    */
/* ------------------------------------------------------------------ */

const lineItems = [
  { label: 'Previous due', amount: '$2,000.00' },
  { label: 'Rent - Dec 2025', amount: '$2,000.00' },
  { label: 'Parking - Dec 2025', amount: '$130.00' },
]

const total = '$4,130.00'

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function PaymentMethodsClient() {
  const [selected, setSelected] = useState('apple-pay')
  const router = useRouter()

  function handlePay() {
    router.push('/wallet/receipt/')
  }

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-12 sm:px-6 lg:px-8">
      {/* ---- Header ---- */}
      <RevealOnScroll className="mb-8 text-center">
        <motion.h1 variants={revealItem} className="font-display text-3xl tracking-tight text-[#0A1628] sm:text-4xl">
          Pay <span className="text-[#176FEB]">Your</span> Way
        </motion.h1>
        <motion.p variants={revealItem} className="mt-3 text-base text-[#555860]">
          Choose the payment method that works best for you, every time.
        </motion.p>
      </RevealOnScroll>

      {/* ---- Payment methods card ---- */}
      <motion.div
        className="rounded-xl border border-[#E5E7EB] p-6 shadow-editorial"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="mb-4 text-lg font-semibold text-[#0A1628]">Payment Methods</h2>

        <fieldset>
          <legend className="sr-only">Select a payment method</legend>
          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const isSelected = selected === method.id
              return (
                <label
                  key={method.id}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors ${
                    isSelected
                      ? 'border-[#176FEB] bg-[#E8F2FE]/30'
                      : 'border-[#E5E7EB] hover:border-[#D3D5DB]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment-method"
                    value={method.id}
                    checked={isSelected}
                    onChange={() => setSelected(method.id)}
                    className="h-4 w-4 border-[#D3D5DB] text-[#176FEB] focus:ring-[#176FEB]"
                  />
                  <span className="flex-shrink-0">{method.icon}</span>
                  <span className="flex flex-col">
                    <span className="flex items-center gap-2 text-sm font-medium text-[#0A1628]">
                      {method.label}
                      {method.recommended && (
                        <span className="inline-flex items-center rounded-full bg-[#176FEB]/10 px-2 py-0.5 text-xs font-medium text-[#176FEB]">
                          Recommended
                        </span>
                      )}
                    </span>
                    {method.subtitle && (
                      <span className="text-xs text-[#555860]">{method.subtitle}</span>
                    )}
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>
      </motion.div>

      {/* ---- Breakdown ---- */}
      <motion.div
        className="mt-6 rounded-xl border border-[#E5E7EB] p-6 shadow-editorial"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <h2 className="mb-4 text-lg font-semibold text-[#0A1628]">Breakdown</h2>

        <ul className="space-y-3">
          {lineItems.map((item) => (
            <li key={item.label} className="flex items-center justify-between text-sm">
              <span className="text-[#555860]">{item.label}</span>
              <span className="font-medium text-[#0A1628]">{item.amount}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between border-t border-[#E5E7EB] pt-4">
          <span className="text-sm font-semibold text-[#0A1628]">Total</span>
          <span className="text-sm font-bold text-[#0A1628]">{total}</span>
        </div>
      </motion.div>

      {/* ---- Pay button ---- */}
      <button
        type="button"
        onClick={handlePay}
        className="mt-6 h-14 w-full rounded-xl bg-[#176FEB] text-base font-semibold text-white transition-colors hover:bg-[#1260D1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176FEB] focus-visible:ring-offset-2"
      >
        Pay
      </button>

      {/* ---- Back link ---- */}
      <div className="mt-4 text-center">
        <Link href="/wallet/" className="text-sm text-[#176FEB] hover:underline">
          Back to Wallet
        </Link>
      </div>
    </section>
  )
}
