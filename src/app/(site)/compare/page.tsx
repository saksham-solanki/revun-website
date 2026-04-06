'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

const categories = [
  'All',
  'PM Software',
  'Canadian Platforms',
  'Brokerage/CRM',
  'Maintenance',
  'Communications',
  'Screening',
] as const

type Category = (typeof categories)[number]

interface Competitor {
  name: string
  slug: string
  category: Exclude<Category, 'All'>
}

const competitors: Competitor[] = [
  // PM Software
  { name: 'AppFolio', slug: 'appfolio', category: 'PM Software' },
  { name: 'Buildium', slug: 'buildium', category: 'PM Software' },
  { name: 'DoorLoop', slug: 'doorloop', category: 'PM Software' },
  { name: 'Yardi', slug: 'yardi', category: 'PM Software' },
  { name: 'Propertyware', slug: 'propertyware', category: 'PM Software' },
  { name: 'Rent Manager', slug: 'rent-manager', category: 'PM Software' },
  // Canadian Platforms
  { name: 'SingleKey', slug: 'singlekey', category: 'Canadian Platforms' },
  { name: 'liv.rent', slug: 'liv-rent', category: 'Canadian Platforms' },
  { name: 'FrontLobby', slug: 'frontlobby', category: 'Canadian Platforms' },
  { name: 'Rhenti', slug: 'rhenti', category: 'Canadian Platforms' },
  // Brokerage/CRM
  { name: 'Follow Up Boss', slug: 'follow-up-boss', category: 'Brokerage/CRM' },
  { name: 'kvCORE', slug: 'kvcore', category: 'Brokerage/CRM' },
  { name: 'Lone Wolf', slug: 'lone-wolf', category: 'Brokerage/CRM' },
  // Maintenance
  { name: 'Property Meld', slug: 'property-meld', category: 'Maintenance' },
  { name: 'Jobber', slug: 'jobber', category: 'Maintenance' },
  { name: 'ServiceTitan', slug: 'servicetitan', category: 'Maintenance' },
  // Communications
  { name: 'RingCentral', slug: 'ringcentral', category: 'Communications' },
  { name: 'OpenPhone', slug: 'openphone', category: 'Communications' },
  { name: 'Dialpad', slug: 'dialpad', category: 'Communications' },
  // Screening
  { name: 'TransUnion SmartMove', slug: 'transunion-smartmove', category: 'Screening' },
  { name: 'Naborly', slug: 'naborly', category: 'Screening' },
  { name: 'RentPrep', slug: 'rentprep', category: 'Screening' },
]

const categoryColors: Record<Exclude<Category, 'All'>, string> = {
  'PM Software': 'bg-violet-100 text-violet-700',
  'Canadian Platforms': 'bg-rose-100 text-rose-700',
  'Brokerage/CRM': 'bg-blue-100 text-blue-700',
  Maintenance: 'bg-emerald-100 text-emerald-700',
  Communications: 'bg-amber-100 text-amber-700',
  Screening: 'bg-indigo-100 text-indigo-700',
}

export default function ComparePage() {
  const [active, setActive] = useState<Category>('All')

  const filtered =
    active === 'All'
      ? competitors
      : competitors.filter((c) => c.category === active)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-indigo">
        <div className="absolute inset-0 bg-dot-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center sm:py-32 lg:px-8">
          <h1 className="font-display text-4xl italic text-white sm:text-5xl lg:text-6xl">
            See how Revun compares
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-200">
            Honest, detailed comparisons with the tools you might be considering.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="no-scrollbar flex gap-1 overflow-x-auto py-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  active === cat
                    ? 'bg-brand-violet text-white shadow-md'
                    : 'bg-brand-slate-100 text-brand-slate-600 hover:bg-brand-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Competitor Grid */}
      <section className="bg-brand-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll stagger={0.06}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((comp) => (
                <motion.div key={comp.slug} variants={revealItem}>
                  <Link
                    href={`/compare/revun-vs-${comp.slug}/`}
                    className="spotlight-card group flex flex-col justify-between rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-brand-violet-light"
                  >
                    <div>
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[comp.category]}`}
                      >
                        {comp.category}
                      </span>
                      <h3 className="mt-4 font-heading text-xl font-bold text-brand-indigo">
                        Revun vs {comp.name}
                      </h3>
                      <p className="mt-2 text-sm text-brand-slate-500">
                        See how Revun stacks up against {comp.name} across features,
                        pricing, and support.
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand-violet transition-colors group-hover:text-brand-violet-dark">
                      Compare
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-brand-indigo sm:text-3xl">
            Don&apos;t see your current tool?
          </h2>
          <p className="mt-4 text-brand-slate-500">
            We&apos;re adding new comparisons regularly. Request a specific comparison
            or book a demo to see how Revun fits your workflow.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact/"
              className="inline-flex h-11 items-center rounded-lg bg-brand-violet px-6 text-sm font-semibold text-white cta-primary-shadow hover:bg-brand-violet-dark"
            >
              Request a Comparison
            </Link>
            <Link
              href="/contact/"
              className="inline-flex h-11 items-center rounded-lg border border-border px-6 text-sm font-semibold text-brand-indigo hover:bg-brand-slate-50"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
