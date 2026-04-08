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
  description: string
}

const competitors: Competitor[] = [
  // PM Software
  { name: 'AppFolio', slug: 'appfolio', category: 'PM Software', description: 'Compare Revun\'s Canadian-first property management platform against AppFolio\'s US-centric tools and pricing.' },
  { name: 'Buildium', slug: 'buildium', category: 'PM Software', description: 'See how Revun stacks up against Buildium for lease management, accounting, and tenant portals.' },
  { name: 'DoorLoop', slug: 'doorloop', category: 'PM Software', description: 'Revun vs DoorLoop: which platform delivers better value for Canadian property managers?' },
  { name: 'Yardi', slug: 'yardi', category: 'PM Software', description: 'Enterprise-grade property management compared. See where Revun outperforms Yardi for mid-market managers.' },
  { name: 'Propertyware', slug: 'propertyware', category: 'PM Software', description: 'Propertyware focuses on single-family. Revun covers your entire portfolio under one roof.' },
  { name: 'Rent Manager', slug: 'rent-manager', category: 'PM Software', description: 'Rent Manager vs Revun: compare features, pricing, and Canadian compliance support side by side.' },
  // Canadian Platforms
  { name: 'SingleKey', slug: 'singlekey', category: 'Canadian Platforms', description: 'Both built for Canada. See how Revun\'s all-in-one platform compares to SingleKey\'s tenant screening focus.' },
  { name: 'liv.rent', slug: 'liv-rent', category: 'Canadian Platforms', description: 'liv.rent targets renters. Revun is built for property managers who need full operational control.' },
  { name: 'FrontLobby', slug: 'frontlobby', category: 'Canadian Platforms', description: 'FrontLobby handles rent reporting. Revun handles rent reporting plus everything else you need.' },
  { name: 'Rhenti', slug: 'rhenti', category: 'Canadian Platforms', description: 'Rhenti vs Revun: compare listing syndication, applications, and end-to-end management capabilities.' },
  // Brokerage/CRM
  { name: 'Follow Up Boss', slug: 'follow-up-boss', category: 'Brokerage/CRM', description: 'Follow Up Boss is a sales CRM. Revun is a property management platform with built-in relationship tools.' },
  { name: 'kvCORE', slug: 'kvcore', category: 'Brokerage/CRM', description: 'kvCORE serves brokerages. Revun serves property managers. See which fits your workflow better.' },
  { name: 'Lone Wolf', slug: 'lone-wolf', category: 'Brokerage/CRM', description: 'Lone Wolf focuses on transactions. Revun focuses on ongoing property management operations.' },
  // Maintenance
  { name: 'Property Meld', slug: 'property-meld', category: 'Maintenance', description: 'Property Meld is maintenance-only. Revun includes maintenance coordination inside a full PM platform.' },
  { name: 'Jobber', slug: 'jobber', category: 'Maintenance', description: 'Jobber is for field service businesses. Revun brings maintenance tracking into your property management workflow.' },
  { name: 'ServiceTitan', slug: 'servicetitan', category: 'Maintenance', description: 'ServiceTitan is built for contractors. Revun is built for the property managers who hire them.' },
  // Communications
  { name: 'RingCentral', slug: 'ringcentral', category: 'Communications', description: 'RingCentral is a generic phone system. Revun gives you tenant communications built into your PM workflow.' },
  { name: 'OpenPhone', slug: 'openphone', category: 'Communications', description: 'OpenPhone is a business phone app. Revun centralizes all tenant and owner communications in one place.' },
  { name: 'Dialpad', slug: 'dialpad', category: 'Communications', description: 'Dialpad is an AI communications platform. Revun embeds communication tools purpose-built for property management.' },
  // Screening
  { name: 'TransUnion SmartMove', slug: 'transunion-smartmove', category: 'Screening', description: 'TransUnion SmartMove is screening-only. Revun integrates screening directly into your leasing pipeline.' },
  { name: 'Naborly', slug: 'naborly', category: 'Screening', description: 'Naborly offers tenant screening for Canada. Revun offers screening plus the full management platform around it.' },
  { name: 'RentPrep', slug: 'rentprep', category: 'Screening', description: 'RentPrep handles background checks. Revun handles background checks, leasing, accounting, and more.' },
]

const badgeColors: Record<Exclude<Category, 'All'>, string> = {
  'PM Software': 'bg-[#E8F2FE] text-[#176FEB]',
  'Canadian Platforms': 'bg-[#E8F2FE] text-[#0B5AD4]',
  'Brokerage/CRM': 'bg-[#F5F6F8] text-[#555860]',
  Maintenance: 'bg-[#F5F6F8] text-[#555860]',
  Communications: 'bg-[#F5F6F8] text-[#555860]',
  Screening: 'bg-[#F5F6F8] text-[#555860]',
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
      <section className="bg-[#0A1628] py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <motion.h1
              variants={revealItem}
              className="font-heading font-extrabold text-4xl leading-tight text-white md:text-5xl lg:text-6xl"
            >
              See How Revun{' '}
              <span className="text-[#176FEB]">Compares</span>
            </motion.h1>
            <motion.p
              variants={revealItem}
              className="mx-auto mt-6 max-w-xl text-lg text-white/70"
            >
              Honest, side-by-side breakdowns so you can pick the right
              tool for your portfolio. No spin, just facts.
            </motion.p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="border-b border-[#D3D5DB] bg-white">
        <div className="mx-auto max-w-5xl overflow-x-auto px-6 py-5">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                  active === cat
                    ? 'bg-[#176FEB] text-white'
                    : 'bg-[#F5F6F8] text-[#555860] hover:bg-[#E8F2FE]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Competitor Grid */}
      <section className="bg-[#F5F6F8] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.08}
          >
            {filtered.map((comp) => (
              <motion.div key={comp.slug} variants={revealItem}>
                <Link
                  href={`/compare/revun-vs-${comp.slug}/`}
                  className="group flex h-full flex-col rounded-2xl border border-[#D3D5DB] bg-white p-6 transition-colors duration-150 hover:border-[#176FEB]"
                >
                  <span
                    className={`mb-4 inline-block w-fit rounded-full px-3 py-1 text-xs font-medium ${badgeColors[comp.category]}`}
                  >
                    {comp.category}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-[#2C2E33]">
                    Revun vs {comp.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#555860]">
                    {comp.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#176FEB]">
                    Read comparison
                    <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <RevealOnScroll>
            <motion.h2
              variants={revealItem}
              className="font-heading text-2xl font-bold text-[#2C2E33] md:text-3xl"
            >
              Don&apos;t see your current tool?
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="mx-auto mt-3 max-w-lg text-[#555860]"
            >
              We&apos;re adding new comparisons every week. Request one or
              jump straight into a demo to see Revun in action.
            </motion.p>
            <motion.div
              variants={revealItem}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/contact/"
                className="rounded-xl bg-[#176FEB] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1260d1]"
              >
                Request a Comparison
              </Link>
              <Link
                href="/demo/"
                className="rounded-xl border border-[#176FEB] px-6 py-3 text-sm font-semibold text-[#176FEB] transition-colors duration-150 hover:bg-[#E8F2FE]"
              >
                Book a Demo
              </Link>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
