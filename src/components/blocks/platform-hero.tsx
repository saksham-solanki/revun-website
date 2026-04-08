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
      className="relative min-h-[70vh] overflow-hidden bg-[#F5F6F8] pt-28 pb-20"
    >
      {/* Dot grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40"
        aria-hidden
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
            className="inline-block rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-sm font-medium text-[#555860]"
          >
            Platform Overview
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-display mt-8 text-4xl font-extrabold tracking-tight text-[#0A1628] sm:text-5xl md:text-6xl"
        >
          One <span style={{ color: '#176FEB' }}>Platform</span>. Every
          Workflow.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-lg text-[#555860] sm:text-xl"
        >
          Manage properties, tenants, maintenance, and financials from a single
          dashboard built for Canadian property managers.
        </motion.p>
      </motion.div>
    </section>
  )
}
