'use client'

import { motion } from 'framer-motion'
import { RevealOnScroll, revealItemBlur } from '@/components/ui/reveal-on-scroll'

const testimonials = [
  {
    quote: "Revun replaced four different tools we were using. Our team saves 15 hours per week on admin alone.",
    name: "Sarah Chen",
    role: "Property Manager, Vancouver",
    initials: "SC",
  },
  {
    quote: "The rent guarantee feature gave us the confidence to expand our portfolio. We added 40 units in 6 months.",
    name: "Marcus Williams",
    role: "Portfolio Owner, Toronto",
    initials: "MW",
  },
  {
    quote: "As a self-managing landlord, Revun makes me look like a professional PM company. My tenants love the app.",
    name: "Priya Sharma",
    role: "Self-Managing Owner, Calgary",
    initials: "PS",
  },
]

function StarRating() {
  return (
    <div className="flex gap-0.5 mb-4">
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill="#F59E0B">
          <path d="M10 1l2.47 5.01L18 6.87l-4 3.9.94 5.49L10 13.64l-4.94 2.62.94-5.49-4-3.9 5.53-.86L10 1z" />
        </svg>
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll className="text-center mb-16">
          <motion.p variants={revealItemBlur} className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue">
            Testimonials
          </motion.p>
          <motion.h2 variants={revealItemBlur} className="mt-3 font-heading text-3xl md:text-4xl font-bold text-brand-graphite">
            Trusted by property managers across <span className="text-accent">Canada</span>
          </motion.h2>
        </RevealOnScroll>

        <RevealOnScroll className="grid gap-8 md:grid-cols-3" stagger={0.15}>
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={revealItemBlur}
              className="rounded-xl border border-[#E5E7EB] bg-white p-8 transition-all duration-300 hover:shadow-card-hover"
            >
              <StarRating />
              <p className="text-brand-graphite text-sm leading-relaxed mb-8 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue text-sm font-bold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-graphite">{t.name}</p>
                  <p className="text-xs text-[#555860]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
