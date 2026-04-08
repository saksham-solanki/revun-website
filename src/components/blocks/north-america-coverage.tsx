'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

const canadianProvinces = [
  { name: 'Ontario', abbr: 'ON' },
  { name: 'British Columbia', abbr: 'BC' },
  { name: 'Alberta', abbr: 'AB' },
  { name: 'Quebec', abbr: 'QC' },
  { name: 'Manitoba', abbr: 'MB' },
  { name: 'Saskatchewan', abbr: 'SK' },
  { name: 'Nova Scotia', abbr: 'NS' },
  { name: 'New Brunswick', abbr: 'NB' },
  { name: 'Newfoundland & Labrador', abbr: 'NL' },
  { name: 'Prince Edward Island', abbr: 'PE' },
]

const usStates = [
  { name: 'New York', abbr: 'NY' },
  { name: 'California', abbr: 'CA' },
  { name: 'Texas', abbr: 'TX' },
  { name: 'Florida', abbr: 'FL' },
  { name: 'Illinois', abbr: 'IL' },
  { name: 'Washington', abbr: 'WA' },
]

export function NorthAmericaCoverage() {
  return (
    <section className="bg-[#F5F6F8] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
          >
            Coverage
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-4xl font-normal text-brand-graphite md:text-5xl"
          >
            Built for <span className="text-keyword">Canada</span>. Expanding across North America.
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-xl text-lg text-brand-graphite/70"
          >
            Provincial and state compliance built into every workflow. No
            workarounds, no manual overrides.
          </motion.p>
        </RevealOnScroll>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Canada */}
          <RevealOnScroll>
            <motion.div
              variants={revealItem}
              className="group relative rounded-xl border border-[#E5E7EB] bg-white p-8 transition-all duration-200 hover:border-[#176FEB]/20 hover:shadow-card-hover"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-[#176FEB] opacity-0 transition-opacity duration-200 group-hover:opacity-100 rounded-t-xl" aria-hidden="true" />
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E8F2FE] text-lg">
                    &#127464;&#127462;
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-brand-graphite">
                      Canada
                    </h3>
                    <p className="text-xs text-[#555860]">All 10 provinces covered</p>
                  </div>
                </div>
                <Link
                  href="/ca/"
                  className="text-sm font-medium text-brand-blue hover:underline"
                >
                  Explore &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {canadianProvinces.map((prov) => (
                  <div
                    key={prov.abbr}
                    className="flex items-center gap-2 rounded-lg bg-[#F5F6F8] px-3 py-2"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-brand-blue/10 text-[10px] font-bold text-brand-blue">
                      {prov.abbr}
                    </span>
                    <span className="text-sm text-brand-graphite">{prov.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </RevealOnScroll>

          {/* United States */}
          <RevealOnScroll>
            <motion.div
              variants={revealItem}
              className="group relative rounded-xl border border-[#E5E7EB] bg-white p-8 transition-all duration-200 hover:border-[#176FEB]/20 hover:shadow-card-hover"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-[#176FEB] opacity-0 transition-opacity duration-200 group-hover:opacity-100 rounded-t-xl" aria-hidden="true" />
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E8F2FE] text-lg">
                    &#127482;&#127480;
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-brand-graphite">
                      United States
                    </h3>
                    <p className="text-xs text-[#555860]">Expanding coverage</p>
                  </div>
                </div>
                <Link
                  href="/us/"
                  className="text-sm font-medium text-brand-blue hover:underline"
                >
                  Explore &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {usStates.map((state) => (
                  <div
                    key={state.abbr}
                    className="flex items-center gap-2 rounded-lg bg-[#F5F6F8] px-3 py-2"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-brand-blue/10 text-[10px] font-bold text-brand-blue">
                      {state.abbr}
                    </span>
                    <span className="text-sm text-brand-graphite">{state.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg bg-[#E8F2FE] px-4 py-3">
                <p className="text-xs text-brand-blue font-medium">
                  More states coming soon. Contact us for early access in your state.
                </p>
              </div>
            </motion.div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
