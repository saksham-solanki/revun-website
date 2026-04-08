'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, FileText, MapPin, CreditCard, BarChart3, Users } from 'lucide-react'

/* ── Slide data ── */

const slides = [
  {
    icon: Search,
    heading: 'Discover Your Next Home',
    highlight: 'Discover',
    description:
      'Browse real-time listings, compare market prices, and find the perfect place to live or invest.',
  },
  {
    icon: FileText,
    heading: 'Ontario-Compliant Paperwork',
    highlight: 'Ontario-Compliant',
    description:
      'From OREA forms and leases to notices and signatures, Revun keeps everything aligned with RECO and the Residential Tenancies Act.',
  },
  {
    icon: MapPin,
    heading: 'Live Tracking, No Waiting Around',
    highlight: 'Live Tracking',
    description:
      'Track showings and maintenance visits live, get real-time updates, and use built-in directions or Uber when needed.',
  },
  {
    icon: CreditCard,
    heading: 'Payments, Financing & Rent Collection',
    highlight: 'Payments',
    description:
      'Send and receive money, pay in installments, access financing, and get rent deposited fast without waiting.',
  },
  {
    icon: BarChart3,
    heading: 'Your Entire Portfolio, Simplified',
    highlight: 'Portfolio',
    description:
      'Oversee tours, leases, and tenants effortlessly. Connect with experts directly for tenant placement, property management, legal, etc.',
  },
  {
    icon: Users,
    heading: 'Careers Across Multiple Brands',
    highlight: 'Careers',
    description:
      'Explore jobs in property management, real estate, maintenance, tech, and more across multiple companies in one place.',
  },
] as const

/* ── Helpers ── */

function highlightHeading(heading: string, highlight: string) {
  const idx = heading.indexOf(highlight)
  if (idx === -1) return <>{heading}</>
  const before = heading.slice(0, idx)
  const after = heading.slice(idx + highlight.length)
  return (
    <>
      {before}
      <span className="text-[#176FEB]">{highlight}</span>
      {after}
    </>
  )
}

/* ── Component ── */

export function OnboardingClient() {
  const router = useRouter()
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const isLast = current === slides.length - 1

  function goNext() {
    if (isLast) {
      router.push('/role/')
      return
    }
    setDirection(1)
    setCurrent((prev) => prev + 1)
  }

  function skip() {
    router.push('/role/')
  }

  const slide = slides[current]
  const Icon = slide.icon

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  }

  return (
    <div className="flex min-h-[480px] flex-col items-center justify-between">
      {/* Slide content */}
      <div className="relative w-full flex-1 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', duration: 0.3 }}
            className="flex flex-col items-center px-4 pt-8 text-center"
          >
            {/* Icon container */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F2FE] p-4">
              <Icon className="h-full w-full text-[#176FEB]" />
            </div>

            {/* Heading */}
            <h1 className="font-heading mb-3 text-2xl font-bold text-[#0A1628]">
              {highlightHeading(slide.heading, slide.highlight)}
            </h1>

            {/* Description */}
            <p className="max-w-sm text-base leading-relaxed text-[#555860]">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="mb-6 flex items-center gap-2">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === current ? 'bg-[#176FEB]' : 'bg-[#E5E7EB]'
            }`}
          />
        ))}
      </div>

      {/* Bottom row */}
      <div className="flex w-full items-center justify-between">
        <button
          type="button"
          onClick={skip}
          className="text-sm font-medium text-[#555860] transition-colors hover:text-[#176FEB]"
        >
          Skip
        </button>

        <button
          type="button"
          onClick={goNext}
          className="h-12 rounded-xl bg-[#176FEB] px-8 text-sm font-semibold text-white transition-colors hover:bg-[#1260d1]"
        >
          {isLast ? 'Get Started' : 'Next'}
        </button>
      </div>
    </div>
  )
}
