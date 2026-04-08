'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

export function ReviewBadges() {
  return (
    <section className="border-y border-[#E5E7EB] bg-[#F5F6F8] py-4">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll className="flex items-center justify-center gap-3">
          <motion.div variants={revealItem} className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]"
              />
            ))}
          </motion.div>
          <motion.p variants={revealItem} className="text-sm text-[#555860]">
            Trusted by property managers across{' '}
            <span className="font-semibold text-[#0A1628]">all 10 Canadian provinces</span>
          </motion.p>
        </RevealOnScroll>
      </div>
    </section>
  )
}
