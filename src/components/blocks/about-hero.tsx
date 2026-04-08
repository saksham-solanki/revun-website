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
    <section className="relative flex min-h-[65vh] items-center justify-center overflow-hidden bg-[#0A1628]">
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 bg-grid-dark bg-grid-mask opacity-30"
        aria-hidden
      />

      {/* Single blue radial gradient blob */}
      <div
        className="absolute right-[20%] top-[30%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(23,111,235,0.18)_0%,transparent_70%)] blur-3xl"
        aria-hidden
      />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 pt-36 pb-24 text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow pill */}
        <motion.div
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D3D5DB]/15 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="text-sm font-medium text-[#94A3B8]">
            About Revun
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-heading font-extrabold text-5xl leading-[1.08] tracking-tight text-white md:text-7xl"
        >
          Built for{' '}
          <span className="text-[#176FEB]">Canadian</span>
          <br className="hidden sm:block" /> Property Managers
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#94A3B8]"
        >
          Property management infrastructure designed from the ground up for the
          Canadian market, with full US coverage built in.
        </motion.p>
      </motion.div>
    </section>
  )
}
