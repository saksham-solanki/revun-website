'use client'

import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
}

export function PlatformHero() {
  return (
    <section
      className="relative min-h-[70vh] overflow-hidden pt-36 pb-24"
      style={{ backgroundColor: '#0A1628' }}
    >
      {/* Dot grid pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Radial gradient blob */}
      <div
        className="pointer-events-none absolute"
        aria-hidden
        style={{
          width: '800px',
          height: '800px',
          top: '-200px',
          right: '-100px',
          background:
            'radial-gradient(circle, rgba(23,111,235,0.12) 0%, transparent 70%)',
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
      >
        {/* Eyebrow pill */}
        <motion.div variants={fadeUp}>
          <span
            className="inline-block rounded-full border px-4 py-1.5 text-sm font-medium"
            style={{ borderColor: 'rgba(23,111,235,0.3)', color: '#94A3B8' }}
          >
            Platform Overview
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-heading mt-8 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
          style={{ color: '#FFFFFF' }}
        >
          One <span style={{ color: '#176FEB' }}>Platform</span>. Every
          Workflow.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-lg sm:text-xl"
          style={{ color: '#94A3B8' }}
        >
          Manage properties, tenants, maintenance, and financials from a single
          dashboard built for Canadian property managers.
        </motion.p>
      </motion.div>
    </section>
  )
}
