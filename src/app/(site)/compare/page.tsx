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
  // PM Software (additional)
  { name: 'Entrata', slug: 'entrata', category: 'PM Software', description: 'Compare Revun\'s flexible pricing against Entrata\'s enterprise-only platform for large multifamily portfolios.' },
  { name: 'MRI Software', slug: 'mri-software', category: 'PM Software', description: 'MRI Software targets enterprise real estate. See how Revun delivers similar power without the complexity.' },
  { name: 'TenantCloud', slug: 'tenantcloud', category: 'PM Software', description: 'TenantCloud targets small landlords. Revun scales from single units to enterprise portfolios.' },
  { name: 'Hemlane', slug: 'hemlane', category: 'PM Software', description: 'Hemlane offers hybrid PM and self-manage. Revun gives you the full platform without the hybrid limitations.' },
  { name: 'Avail', slug: 'avail', category: 'PM Software', description: 'Avail by Realtor.com offers DIY landlord tools. Revun adds professional-grade features on top.' },
  { name: 'TurboTenant', slug: 'turbo-tenant', category: 'PM Software', description: 'TurboTenant is free for landlords. See what you gain by upgrading to Revun\'s full platform.' },
  { name: 'Innago', slug: 'innago', category: 'PM Software', description: 'Innago is free PM software. Revun adds Canadian compliance, vendor dispatch, and brokerage tools.' },
  { name: 'Rentec Direct', slug: 'rentec-direct', category: 'PM Software', description: 'Rentec Direct offers affordable PM. Revun adds Canadian-first features and deeper automation.' },
  { name: 'SimplifyEm', slug: 'simplifyem', category: 'PM Software', description: 'SimplifyEm keeps it simple. Revun keeps it simple and adds compliance, communications, and scale.' },
  { name: 'ResMan', slug: 'resman', category: 'PM Software', description: 'ResMan targets multifamily operators. Revun covers multifamily plus every other property type.' },
  { name: 'PayProp', slug: 'payrop', category: 'PM Software', description: 'PayProp automates rental payments. Revun automates payments plus the entire PM workflow.' },
  // Canadian Platforms (additional)
  { name: 'RentMoola', slug: 'rentmoola', category: 'Canadian Platforms', description: 'RentMoola handles Canadian rent payments. Revun handles payments plus full property management.' },
  { name: 'Openroom', slug: 'openroom', category: 'Canadian Platforms', description: 'Openroom is a Canadian rental platform. Revun goes beyond listings with full operational tools.' },
  { name: 'Zumper', slug: 'zumper', category: 'Canadian Platforms', description: 'Zumper is a rental marketplace. Revun is a complete property management platform with listing syndication.' },
  { name: 'PadMapper', slug: 'padmapper', category: 'Canadian Platforms', description: 'PadMapper helps tenants find apartments. Revun helps property managers run their entire operation.' },
  { name: 'Rent Panda', slug: 'rent-panda', category: 'Canadian Platforms', description: 'Rent Panda serves Ontario landlords. Revun serves property managers across all Canadian provinces.' },
  // Brokerage/CRM (additional)
  { name: 'Dotloop', slug: 'dotloop', category: 'Brokerage/CRM', description: 'Dotloop handles transactions. Revun handles transactions plus ongoing property management operations.' },
  { name: 'SkySlope', slug: 'skyslope', category: 'Brokerage/CRM', description: 'SkySlope focuses on compliance. Revun builds compliance into a full property management workflow.' },
  { name: 'BrokerMint', slug: 'brokermint', category: 'Brokerage/CRM', description: 'BrokerMint is a back office tool. Revun is a front-to-back property management platform.' },
  { name: 'TransactionDesk', slug: 'transaction-desk', category: 'Brokerage/CRM', description: 'TransactionDesk manages forms and transactions. Revun manages the entire property lifecycle.' },
  { name: 'Wise Agent', slug: 'wise-agent', category: 'Brokerage/CRM', description: 'Wise Agent is a real estate CRM. Revun is a CRM plus full property management in one platform.' },
  { name: 'Top Producer', slug: 'top-producer', category: 'Brokerage/CRM', description: 'Top Producer is an agent CRM. Revun extends CRM with property operations, compliance, and accounting.' },
  { name: 'BoomTown', slug: 'boomtown', category: 'Brokerage/CRM', description: 'BoomTown generates leads. Revun manages leads plus the entire property management lifecycle.' },
  { name: 'Real Geeks', slug: 'real-geeks', category: 'Brokerage/CRM', description: 'Real Geeks offers agent websites and CRM. Revun offers CRM plus property management operations.' },
  { name: 'CINC', slug: 'cinc', category: 'Brokerage/CRM', description: 'CINC is a real estate lead platform. Revun converts leads into managed properties with a full PM suite.' },
  { name: 'LionDesk', slug: 'liondesk', category: 'Brokerage/CRM', description: 'LionDesk is a CRM for agents. Revun is a CRM plus property management platform for the full lifecycle.' },
  // Maintenance (additional)
  { name: 'HappyCo', slug: 'happyco', category: 'Maintenance', description: 'HappyCo handles inspections and ops. Revun handles inspections inside a full PM workflow.' },
  { name: 'UpKeep', slug: 'upkeep', category: 'Maintenance', description: 'UpKeep is a maintenance management tool. Revun embeds maintenance into your property management platform.' },
  { name: 'Housecall Pro', slug: 'housecall-pro', category: 'Maintenance', description: 'Housecall Pro is for field service businesses. Revun brings field service into property management.' },
  { name: 'MaintainX', slug: 'maintainx', category: 'Maintenance', description: 'MaintainX manages work orders. Revun manages work orders inside a full property operations platform.' },
  { name: 'FieldPulse', slug: 'fieldpulse', category: 'Maintenance', description: 'FieldPulse is field service management. Revun integrates field service with property management workflows.' },
  { name: 'AppWork', slug: 'appwork', category: 'Maintenance', description: 'AppWork handles property inspections. Revun handles inspections, maintenance, and full PM operations.' },
  { name: 'Building Engines', slug: 'building-engines', category: 'Maintenance', description: 'Building Engines runs building operations. Revun runs building operations plus full property management.' },
  // Communications (additional)
  { name: 'Aircall', slug: 'aircall', category: 'Communications', description: 'Aircall is a cloud phone system. Revun embeds calling into your property management workflow.' },
  { name: 'Zoom Phone', slug: 'zoom-phone', category: 'Communications', description: 'Zoom Phone is a business phone. Revun gives you business phone plus property management in one.' },
  { name: 'Intercom', slug: 'intercom', category: 'Communications', description: 'Intercom is a customer messaging platform. Revun builds tenant and owner messaging into your PM workflow.' },
  { name: 'Zendesk', slug: 'zendesk', category: 'Communications', description: 'Zendesk is customer service software. Revun is property management software with built-in service tools.' },
  { name: 'Freshdesk', slug: 'freshdesk', category: 'Communications', description: 'Freshdesk is a help desk tool. Revun is a property management platform with built-in help desk features.' },
  // Screening (additional)
  { name: 'Sure', slug: 'sure', category: 'Screening', description: 'Sure offers rent guarantee. Revun offers rent guarantee inside a complete property management platform.' },
  { name: 'TheGuarantors', slug: 'the-guarantors', category: 'Screening', description: 'TheGuarantors provides lease guarantees. Revun provides lease guarantees plus full PM operations.' },
  { name: 'Insurent', slug: 'insurent', category: 'Screening', description: 'Insurent offers lease guaranty. Revun offers guaranty plus screening, leasing, and property management.' },
  { name: 'Rhino', slug: 'rhino', category: 'Screening', description: 'Rhino replaces security deposits with insurance. Revun integrates deposit alternatives into your PM workflow.' },
  { name: 'Jetty', slug: 'jetty', category: 'Screening', description: 'Jetty offers renters insurance and deposit alternatives. Revun integrates these into full property management.' },
  { name: 'LeaseLock', slug: 'leaselock', category: 'Screening', description: 'LeaseLock provides lease insurance. Revun provides lease insurance integrated with your PM operations.' },
  { name: 'Trustii', slug: 'trustii', category: 'Screening', description: 'Trustii verifies tenant identity. Revun verifies identity as part of a complete screening and leasing pipeline.' },
  { name: 'Persona', slug: 'persona', category: 'Screening', description: 'Persona handles identity verification. Revun handles identity verification inside your property management workflow.' },
]

const badgeColors: Record<Exclude<Category, 'All'>, string> = {
  'PM Software': 'bg-[#E8F2FE] text-[#176FEB]',
  'Canadian Platforms': 'bg-[#E8F2FE] text-[#0B5AD4]',
  'Brokerage/CRM': 'bg-[#F5F6F8] text-[#555860]',
  Maintenance: 'bg-[#F5F6F8] text-[#555860]',
  Communications: 'bg-[#F5F6F8] text-[#555860]',
  Screening: 'bg-[#F5F6F8] text-[#555860]',
}

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
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
      <section className="bg-[#F5F6F8] py-12 md:py-12">
        <motion.div
          className="mx-auto max-w-3xl px-6 text-center"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-[#176FEB]"
          >
            Comparisons
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-normal text-[#0A1628] md:text-5xl lg:text-6xl"
          >
            See How Revun{' '}
            <span className="text-[#176FEB]">Compares</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-lg text-[#555860]"
          >
            Honest, side-by-side breakdowns so you can pick the right
            tool for your portfolio. No spin, just facts.
          </motion.p>
        </motion.div>
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
      <section className="bg-[#F5F6F8] py-14">
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
      <section className="relative overflow-hidden bg-white py-14">
        <div className="absolute left-[15%] top-[20%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(23,111,235,0.08)_0%,transparent_70%)] blur-3xl" aria-hidden />
        <div className="absolute right-[10%] bottom-[10%] h-[250px] w-[250px] rounded-full bg-[radial-gradient(circle,rgba(23,111,235,0.06)_0%,transparent_70%)] blur-3xl" aria-hidden />
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
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
