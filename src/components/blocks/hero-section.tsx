'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

/* ── Stagger orchestrator ─────────────────────────────────────────────────── */

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
}

/* ── Animated gradient orb ────────────────────────────────────────────────── */

function GradientOrb({
  className,
  color,
  delay = 0,
}: {
  className: string
  color: string
  delay?: number
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      style={{ background: color }}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -40, 20, 0],
        scale: [1, 1.08, 0.95, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      aria-hidden
    />
  )
}

/* ── Floating proof chip ──────────────────────────────────────────────────── */

function ProofChip({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className: string
  delay?: number
}) {
  return (
    <motion.div
      className={`glass-dark rounded-xl px-4 py-2.5 text-sm font-heading font-medium text-white/90 ${className}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 + delay, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/* ── Hero section ─────────────────────────────────────────────────────────── */

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-indigo">
      {/* Gradient mesh background */}
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-indigo via-[#13103a] to-[#0B0A1A]" />
        <GradientOrb
          className="left-[10%] top-[20%] h-[500px] w-[500px] opacity-30"
          color="radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)"
          delay={0}
        />
        <GradientOrb
          className="right-[5%] top-[10%] h-[600px] w-[600px] opacity-20"
          color="radial-gradient(circle, rgba(167,139,250,0.35) 0%, transparent 70%)"
          delay={4}
        />
        <GradientOrb
          className="left-[30%] bottom-[10%] h-[400px] w-[400px] opacity-25"
          color="radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)"
          delay={8}
        />
      </div>

      {/* Dot grid overlay */}
      <div className="absolute inset-0 bg-dot-grid opacity-40" aria-hidden />

      {/* Floating proof chips */}
      <ProofChip
        className="absolute right-[6%] top-[22%] hidden lg:block"
        delay={0}
      >
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
          12,000+ Units Managed
        </span>
      </ProofChip>

      <ProofChip
        className="absolute left-[6%] bottom-[22%] hidden lg:block"
        delay={0.3}
      >
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
          99.9% Uptime
        </span>
      </ProofChip>

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 pt-32 pb-24 text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow badge */}
        <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-amber opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-amber" />
          </span>
          <span className="text-sm font-medium text-brand-amber-light">
            Now in beta
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={fadeUp}
          className="font-display italic text-5xl leading-[1.08] tracking-tight text-white md:text-7xl"
        >
          One platform for every{' '}
          <br className="hidden sm:block" />
          property workflow
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-slate-300"
        >
          Revun replaces disconnected tools with a single operating system for
          property management, leasing, brokerage, maintenance, and self-managing
          owners across Canada and the United States.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/signup/"
            className="cta-primary-shadow inline-flex h-12 items-center justify-center rounded-xl bg-brand-violet px-8 text-base font-semibold text-white transition-all hover:bg-brand-violet-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-brand-indigo"
          >
            Start Free
          </Link>
          <Link
            href="/demo/"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 px-8 text-base font-semibold text-white transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-brand-indigo"
          >
            Book a Demo
          </Link>
        </motion.div>

        {/* Pricing teaser */}
        <motion.p
          variants={fadeIn}
          className="mt-6 text-sm text-brand-slate-400"
        >
          From $1/day per unit. No credit card required.
        </motion.p>
      </motion.div>
    </section>
  )
}
