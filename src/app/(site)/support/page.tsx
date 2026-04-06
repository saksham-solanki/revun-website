'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Building2, User, ChevronDown } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { useState } from 'react'

/* ── Animation variants ─────────────────────────────────────────────── */

const heroStagger = {
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

/* ── FAQ data ────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: 'How do I know if I am a "Powered by Revun" user or a Self-Manage user?',
    answer:
      'If your property management company, brokerage, or maintenance provider gave you login credentials or directed you to a portal, you are a Powered by Revun user. If you signed up directly on revun.com to manage your own properties, you are a Self-Manage user.',
  },
  {
    question: 'I forgot my password. How do I reset it?',
    answer:
      'Click "Forgot password" on the login page and enter your email address. You will receive a reset link within a few minutes. If you do not see the email, check your spam folder.',
  },
  {
    question: 'How do I contact my property manager?',
    answer:
      'If you use a Powered by Revun company, your property manager\'s contact information is available in your tenant portal. Look for the "Contact" or "My Manager" section after logging in.',
  },
  {
    question: 'Can I switch from Self-Manage to a managed service?',
    answer:
      'Yes. Contact our support team and we can help you transition your properties to a Revun-powered property management company in your area.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Revun uses bank-level encryption for all data in transit and at rest. We are SOC 2 compliant and perform regular security audits. Your personal and financial data is never shared with third parties without your explicit consent.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit and debit cards, as well as pre-authorized bank debits (PAD) for Canadian users and ACH for US users.',
  },
]

/* ── FAQ Accordion ───────────────────────────────────────────────────── */

function FAQItem({ faq }: { faq: (typeof faqs)[number] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="pr-4 font-heading text-base font-semibold text-foreground">
          {faq.question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-[0.938rem] leading-relaxed text-muted-foreground">
          {faq.answer}
        </p>
      </motion.div>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function SupportPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-indigo">
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-indigo via-[#13103a] to-[#0B0A1A]" />
          <div className="absolute inset-0 bg-dot-grid opacity-20" />
          <div className="absolute left-[20%] top-[30%] h-[350px] w-[350px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.25)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute right-[15%] top-[15%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.15)_0%,transparent_70%)] blur-3xl" />
        </div>

        <motion.div
          className="relative z-10 mx-auto max-w-3xl px-6 pt-36 pb-24 text-center"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-brand-violet-light"
          >
            Support
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display italic text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl"
          >
            How can we help?
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-slate-300"
          >
            Choose the path that matches your situation to find the right support.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Two-path cards ────────────────────────────────────────── */}
      <section className="bg-brand-slate-50 py-24 dark:bg-[#0B0A1A]">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll
            stagger={0.15}
            className="grid gap-6 md:grid-cols-2"
          >
            {/* Left: Powered by Revun */}
            <motion.div
              variants={revealItem}
              className="flex flex-col rounded-2xl border border-border bg-brand-indigo p-8 text-white dark:border-white/8"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <Building2 className="h-6 w-6 text-brand-violet-light" strokeWidth={1.8} />
              </div>
              <h2 className="font-heading text-xl font-bold">
                I use a Powered by Revun company
              </h2>
              <p className="mt-3 flex-1 text-[0.938rem] leading-relaxed text-brand-slate-300">
                Your property management company, brokerage, or maintenance provider uses Revun to manage your experience. For questions about your lease, maintenance requests, payments, or showings, contact your property manager directly.
              </p>
              <Link
                href="/help/"
                className="mt-8 inline-flex h-11 items-center justify-center rounded-xl border border-white/20 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Contact Your Operator
              </Link>
            </motion.div>

            {/* Right: Self-Manage */}
            <motion.div
              variants={revealItem}
              className="flex flex-col rounded-2xl border border-border bg-card p-8 dark:border-white/8 dark:bg-card"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-violet/10 dark:bg-brand-violet/20">
                <User className="h-6 w-6 text-brand-violet" strokeWidth={1.8} />
              </div>
              <h2 className="font-heading text-xl font-bold text-foreground">
                I am a Revun Self-Manage user
              </h2>
              <p className="mt-3 flex-1 text-[0.938rem] leading-relaxed text-muted-foreground">
                You manage your own properties directly through Revun. Access our help center, guides, and support team.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/help/"
                  className="cta-primary-shadow inline-flex h-11 items-center justify-center rounded-xl bg-brand-violet text-sm font-semibold text-white transition-all hover:bg-brand-violet-dark"
                >
                  Visit Help Center
                </Link>
                <Link
                  href="/contact/"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-border text-sm font-semibold text-foreground transition-all hover:bg-muted"
                >
                  Contact Support
                </Link>
              </div>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="bg-white py-24 dark:bg-[#0B0A1A]">
        <div className="mx-auto max-w-2xl px-6">
          <RevealOnScroll className="text-center">
            <motion.p
              variants={revealItem}
              className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-violet"
            >
              FAQ
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Common questions
            </motion.h2>
          </RevealOnScroll>

          <RevealOnScroll className="mt-12">
            <motion.div
              variants={revealItem}
              className="divide-y divide-border rounded-2xl border border-border bg-card p-6 dark:border-white/8 dark:bg-card"
            >
              {faqs.map((faq) => (
                <FAQItem key={faq.question} faq={faq} />
              ))}
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
