'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

const paths = [
  {
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="1" />
        <path d="M9 22V18h6v4M9 6h.01M15 6h.01M9 10h.01M15 10h.01M9 14h.01M15 14h.01" />
      </svg>
    ),
    eyebrow: 'Powered by Revun',
    title: 'Using Revun through your property manager?',
    description:
      'Contact your operator for service issues. They manage your property - Revun provides the software they run on.',
    cta: 'Learn about Powered by Revun',
    href: '/support/powered-by-revun/',
    bgClass: 'bg-[#E8F2FE]',
    iconBgClass: 'bg-brand-blue/10 text-brand-blue',
  },
  {
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
    eyebrow: 'Self-Manage',
    title: 'Managing your own property with Revun?',
    description:
      "We've got you covered. Access help articles, contact support, or book a call with our team.",
    cta: 'Get Self-Manage Support',
    href: '/support/self-manage/',
    bgClass: 'bg-[#F0FFF4]',
    iconBgClass: 'bg-brand-success/10 text-brand-success',
  },
]

export function HelpRouting() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
          >
            Support
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-4xl font-normal text-brand-graphite md:text-5xl"
          >
            Need <span className="text-keyword">help</span>?
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-xl text-lg text-brand-graphite/70"
          >
            How you get support depends on how you use Revun.
          </motion.p>
        </RevealOnScroll>

        <RevealOnScroll className="mt-14 grid gap-6 lg:grid-cols-2" stagger={0.12}>
          {paths.map((path) => (
            <motion.div
              key={path.title}
              variants={revealItem}
              className="group relative overflow-hidden rounded-xl border border-[#E5E7EB] bg-white transition-all duration-200 hover:border-brand-blue/20 hover:shadow-card-hover"
            >
              <div className={`${path.bgClass} px-8 py-6`}>
                <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${path.iconBgClass}`}>
                  {path.icon}
                </div>
                <p className="text-xs font-heading font-semibold uppercase tracking-wider text-[#94A3B8]">
                  {path.eyebrow}
                </p>
                <h3 className="mt-2 font-heading text-xl font-semibold text-brand-graphite">
                  {path.title}
                </h3>
              </div>
              <div className="px-8 py-6">
                <p className="text-sm leading-relaxed text-[#555860]">
                  {path.description}
                </p>
                <Link
                  href={path.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-blue-dark"
                >
                  {path.cta}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="M3.5 8h9" />
                    <path d="M9 4.5 12.5 8 9 11.5" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
