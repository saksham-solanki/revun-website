'use client'

import { motion } from 'framer-motion'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function AboutHero() {
  return (
    <section className="relative flex min-h-[65vh] items-center justify-center overflow-hidden bg-brand-indigo">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-indigo via-[#13103a] to-[#0B0A1A]" />
        <div className="absolute right-[20%] top-[30%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.2)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute left-[15%] bottom-[25%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.12)_0%,transparent_70%)] blur-3xl" />
      </div>
      <div className="absolute inset-0 bg-dot-grid opacity-30" aria-hidden />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 pt-36 pb-24 text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="text-sm font-medium text-brand-violet-light">
            About Revun
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-display italic text-5xl leading-[1.08] tracking-tight text-white md:text-7xl"
        >
          Building the infrastructure layer
          <br className="hidden sm:block" /> for property management
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-slate-300"
        >
          Revun exists because property management is still run on disconnected
          tools, manual processes, and fragmented communication. We are changing
          that.
        </motion.p>
      </motion.div>
    </section>
  )
}
