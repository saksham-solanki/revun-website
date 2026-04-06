'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ── CTA Section ──────────────────────────────────────────────────────────── */

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-brand-indigo py-28 md:py-36">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-indigo via-brand-indigo-light to-brand-indigo" />

        {/* Gradient orbs */}
        <motion.div
          className="absolute left-[15%] top-[20%] h-[500px] w-[500px] rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 70%)' }}
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[10%] bottom-[10%] h-[400px] w-[400px] rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.4) 0%, transparent 70%)' }}
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 20, -30, 0],
            scale: [1, 0.95, 1.08, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-20" aria-hidden />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll>
          <motion.h2
            variants={revealItem}
            className="font-display italic text-3xl tracking-tight text-white md:text-5xl"
          >
            Start building on Revun today
          </motion.h2>

          <motion.p
            variants={revealItem}
            className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-brand-slate-300"
          >
            Join property managers, brokerages, and self-managing owners already
            running on Revun.
          </motion.p>

          <motion.div
            variants={revealItem}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/signup/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 text-base font-semibold text-brand-indigo transition-all hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-indigo"
            >
              Start Free
            </Link>
            <Link
              href="/demo/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 px-8 text-base font-semibold text-white transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-indigo"
            >
              Book a Demo
            </Link>
          </motion.div>

          <motion.p
            variants={revealItem}
            className="mt-6 text-sm text-brand-slate-400"
          >
            From $1/day per unit. No long-term contracts.
          </motion.p>
        </RevealOnScroll>
      </div>
    </section>
  )
}
