'use client'

import { motion } from 'framer-motion'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function AboutHero() {
  return (
    <section className="relative flex min-h-[65vh] items-center justify-center overflow-hidden bg-[#F5F6F8]">
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 bg-dot-grid opacity-40"
        aria-hidden
      />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 pt-28 pb-20 text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow pill */}
        <motion.div
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5"
        >
          <span className="text-sm font-medium text-[#555860]">
            About Revun
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-display font-extrabold text-5xl leading-[1.08] tracking-tight text-[#0A1628] md:text-7xl"
        >
          Built for{' '}
          <span className="text-[#176FEB]">Canadian</span>
          <br className="hidden sm:block" /> Property Managers
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#555860]"
        >
          Property management infrastructure designed from the ground up for the
          Canadian market, with full US coverage built in.
        </motion.p>
      </motion.div>
    </section>
  )
}
