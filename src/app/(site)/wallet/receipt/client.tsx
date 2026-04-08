'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ------------------------------------------------------------------ */
/*  Summary row data                                                  */
/* ------------------------------------------------------------------ */

const summaryRows = [
  {
    label: 'Type',
    value: 'Rent',
    icon: (
      <svg className="h-5 w-5 text-[#176FEB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Paid by',
    value: 'Amelia W',
    avatar: 'AW',
    avatarBg: 'bg-blue-100 text-blue-700',
  },
  {
    label: 'Received by',
    value: 'RVPM',
    avatar: 'RV',
    avatarBg: 'bg-emerald-100 text-emerald-700',
  },
  {
    label: 'Paid to',
    value: 'John D',
    avatar: 'JD',
    avatarBg: 'bg-amber-100 text-amber-700',
  },
  {
    label: 'Case no.',
    value: '87654321',
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function ReceiptClient() {
  function handleDownload() {
    // Placeholder for receipt download logic
    window.print()
  }

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-12 sm:px-6 lg:px-8">
      {/* ---- Header ---- */}
      <RevealOnScroll className="mb-8 text-center">
        <motion.h1 variants={revealItem} className="mb-4 font-heading text-xl font-semibold tracking-tight text-[#0A1628]">
          Transaction detail
        </motion.h1>

        {/* Paid badge */}
        <motion.div variants={revealItem} className="mb-4 flex justify-center">
          <span className="inline-flex items-center rounded-full bg-[#5EA500]/10 px-3 py-1 text-sm font-medium text-[#5EA500]">
            Paid
          </span>
        </motion.div>

        {/* Amount */}
        <motion.p variants={revealItem} className="font-heading text-4xl font-bold text-[#0A1628]">$2,500.00</motion.p>

        {/* Currency note */}
        <motion.p variants={revealItem} className="mt-2 text-sm text-[#555860]">
          All payments are processed in Canadian dollars (CAD).
        </motion.p>
      </RevealOnScroll>

      {/* ---- Summary card ---- */}
      <motion.div
        className="rounded-xl border border-[#E5E7EB] p-6 shadow-editorial"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="mb-4 text-lg font-semibold text-[#0A1628]">Summary</h2>

        <ul>
          {summaryRows.map((row, idx) => (
            <li
              key={row.label}
              className={`flex items-center justify-between py-3 ${
                idx < summaryRows.length - 1 ? 'border-b border-[#E5E7EB]' : ''
              }`}
            >
              <span className="text-sm text-[#555860]">{row.label}</span>
              <span className="flex items-center gap-2 text-sm font-medium text-[#0A1628]">
                {row.icon && row.icon}
                {row.avatar && (
                  <span
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${row.avatarBg}`}
                  >
                    {row.avatar}
                  </span>
                )}
                {row.value}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* ---- Download receipt button ---- */}
      <motion.button
        type="button"
        onClick={handleDownload}
        className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] text-sm font-semibold text-[#0A1628] transition-colors hover:bg-[#F5F6F8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176FEB] focus-visible:ring-offset-2"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        Download Receipt
      </motion.button>

      {/* ---- Back to wallet link ---- */}
      <div className="mt-4 text-center">
        <Link href="/wallet/" className="text-sm text-[#176FEB] hover:underline">
          Back to Wallet
        </Link>
      </div>
    </section>
  )
}
