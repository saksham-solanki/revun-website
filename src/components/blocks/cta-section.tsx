'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ── CTA Section ──────────────────────────────────────────────────────────── */

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-28 md:py-36">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-dark bg-grid-mask" aria-hidden />
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[400px] h-[400px] rounded-full bg-brand-blue/10 blur-[100px]" aria-hidden />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll>
          <motion.h2
            variants={revealItem}
            className="font-heading text-3xl font-extrabold tracking-tight text-white md:text-5xl"
          >
            Start building on <span className="text-accent">Revun</span> today
          </motion.h2>

          <motion.p
            variants={revealItem}
            className="mx-auto mt-5 max-w-lg text-lg text-[#94A3B8]"
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
              className="shadow-cta-glow inline-flex h-14 items-center justify-center rounded-xl bg-white px-10 text-base font-semibold text-brand-navy transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
            >
              Start Free
            </Link>
            <Link
              href="/demo/"
              className="inline-flex h-14 items-center justify-center rounded-xl border border-white/20 px-8 text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
            >
              Book a Demo
            </Link>
          </motion.div>

          <motion.p
            variants={revealItem}
            className="mt-6 text-sm text-[#64748B]"
          >
            From $1/day per unit. No long-term contracts.
          </motion.p>
        </RevealOnScroll>
      </div>
    </section>
  )
}
