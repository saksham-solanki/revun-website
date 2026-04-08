'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

const personas = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
    watermarkIcon: (
      <svg className="h-32 w-32 text-brand-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
    gradientFrom: '#E8F2FE',
    title: (
      <>
        Property <span className="text-accent">Owners</span>
      </>
    ),
    description:
      'Manage your own properties with institutional-grade tools. Screening, leasing, payments, and maintenance in one place.',
    href: '/solutions/self-managing-owners/',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="1" />
        <path d="M9 22V18h6v4M9 6h.01M15 6h.01M9 10h.01M15 10h.01M9 14h.01M15 14h.01" />
      </svg>
    ),
    watermarkIcon: (
      <svg className="h-32 w-32 text-brand-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="1" />
        <path d="M9 22V18h6v4M9 6h.01M15 6h.01M9 10h.01M15 10h.01M9 14h.01M15 14h.01" />
      </svg>
    ),
    gradientFrom: '#E8F2FE',
    title: (
      <>
        Property <span className="text-accent">Managers</span>
      </>
    ),
    description:
      'Replace fragmented systems with one infrastructure layer. Scale operations across your entire portfolio.',
    href: '/solutions/property-management-companies/',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a6.5 6.5 0 0113 0" />
      </svg>
    ),
    watermarkIcon: (
      <svg className="h-32 w-32 text-brand-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a6.5 6.5 0 0113 0" />
      </svg>
    ),
    gradientFrom: '#E8F2FE',
    title: (
      <>
        <span className="text-accent">Tenants</span>
      </>
    ),
    description:
      'Find verified rentals, apply online, pay rent, and request maintenance from one app.',
    href: '/solutions/tenants/',
  },
]

export function AudienceRouter() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll className="text-center">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
          >
            Solutions
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-heading text-3xl font-bold text-brand-graphite md:text-4xl"
          >
            Built for how you actually <span className="text-accent">work</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-2xl text-lg text-brand-graphite/70"
          >
            Whether you manage one unit or one thousand, Revun adapts to your role.
          </motion.p>
        </RevealOnScroll>

        <RevealOnScroll className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {personas.map((persona) => (
            <motion.div key={persona.href} variants={revealItem}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Link
                  href={persona.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[#E5E7EB] bg-white p-6 transition-all hover:border-brand-blue/20 hover:shadow-card-hover"
                >
                  {/* Hover gradient overlay */}
                  <div
                    className="absolute inset-0 rounded-xl bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ backgroundImage: `linear-gradient(to bottom right, ${persona.gradientFrom}, transparent)` }}
                    aria-hidden="true"
                  />

                  {/* Watermark icon */}
                  <div className="absolute -right-4 -bottom-4 opacity-[0.06]" aria-hidden="true">
                    {persona.watermarkIcon}
                  </div>

                  {/* Content (above overlays) */}
                  <div className="relative">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-blue/8 text-brand-blue transition-colors group-hover:bg-brand-blue/12">
                      {persona.icon}
                    </div>

                    <h3 className="mt-4 font-heading text-lg font-semibold text-brand-graphite">
                      {persona.title}
                    </h3>

                    <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-graphite/70">
                      {persona.description}
                    </p>

                    <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-brand-blue">
                      Learn more
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
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
