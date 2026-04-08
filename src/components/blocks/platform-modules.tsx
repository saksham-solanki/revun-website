'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  CreditCard,
  Wrench,
  Shield,
  BarChart3,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

const modules = [
  {
    title: 'Leasing & Applications',
    icon: FileText,
    description: 'From vacancy to signed lease, fully automated. List properties, manage showings, screen applicants, and execute leases digitally.',
    capabilities: [
      'Listing syndication to 20+ sites',
      'Online showing scheduler with calendar sync',
      'Digital application with auto-screening',
      'Province-specific lease generation',
      'E-signature with DocuSign integration',
    ],
    stat: { value: '20+', label: 'listing sites' },
    href: '/features/lease-management/',
  },
  {
    title: 'Rent Collection',
    icon: CreditCard,
    description: 'Automated rent collection with ACH, credit card, and Interac e-Transfer. Never chase a payment again.',
    capabilities: [
      'ACH, credit card, and Interac support',
      'Automated payment reminders',
      'Split payments for roommates',
      'Late fee automation',
      'Real-time reconciliation with QuickBooks/Xero',
    ],
    stat: { value: '97.8%', label: 'on-time rate' },
    href: '/features/rent-collection/',
  },
  {
    title: 'Maintenance',
    icon: Wrench,
    description: 'Tenant request portal, AI-powered routing, vendor dispatch, and proof-of-completion tracking.',
    capabilities: [
      'Tenant portal with photo uploads',
      'AI priority classification',
      'Vendor matching and dispatch',
      'Work order lifecycle tracking',
      'Before/after proof with sign-off',
    ],
    stat: { value: '3x', label: 'faster resolution' },
    href: '/features/maintenance-management/',
  },
  {
    title: 'Tenant Screening',
    icon: Shield,
    description: 'Credit, criminal, and eviction checks through Equifax and TransUnion. Results in minutes, not days.',
    capabilities: [
      'Equifax + TransUnion credit reports',
      'Criminal background checks',
      'Eviction history lookup',
      'Income and employment verification',
      'Side-by-side applicant comparison',
    ],
    stat: { value: '< 2min', label: 'for results' },
    href: '/features/tenant-screening/',
  },
  {
    title: 'Financial Reporting',
    icon: BarChart3,
    description: 'Owner statements, P&L, cash flow, and tax-ready reports. Syncs with QuickBooks and Xero.',
    capabilities: [
      'Real-time portfolio dashboards',
      'Automated bank reconciliation',
      'T4A and CRA-ready tax reports',
      'Owner disbursements with statements',
      'One-click QuickBooks/Xero export',
    ],
    stat: { value: '100%', label: 'tax ready' },
    href: '/features/accounting/',
  },
  {
    title: 'Communications',
    icon: MessageSquare,
    description: 'Email, SMS, calling, and in-app messaging. Every conversation tied to the right tenant and property.',
    capabilities: [
      'Unified inbox across channels',
      'SMS and email templates',
      'In-app messaging with tenants',
      'Automated notifications',
      'Full conversation history by unit',
    ],
    stat: { value: '4', label: 'channels unified' },
    href: '/features/',
  },
]

export function PlatformModules() {
  const [active, setActive] = useState(0)
  const selected = modules[active]

  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll className="mb-12 text-center" stagger={0.12}>
          <motion.p variants={revealItem} className="mb-3 text-sm font-heading font-semibold uppercase tracking-widest text-[#176FEB]">
            Core Modules
          </motion.p>
          <motion.h2 variants={revealItem} className="font-display text-3xl font-normal text-[#0A1628] md:text-4xl">
            Everything your <span className="text-[#176FEB]">operation</span> needs
          </motion.h2>
        </RevealOnScroll>

        <div className="grid items-start gap-8 lg:grid-cols-[280px_1fr]">
          {/* Left: module tabs */}
          <RevealOnScroll>
            <motion.div variants={revealItem} className="space-y-1">
              {modules.map((m, i) => {
                const Icon = m.icon
                const isActive = active === i
                return (
                  <button
                    key={m.title}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-[#176FEB] text-white'
                        : 'text-[#555860] hover:bg-[#F5F6F8]'
                    }`}
                  >
                    <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-white' : 'text-[#176FEB]'}`} />
                    <span className={`text-sm font-medium ${isActive ? 'text-white font-semibold' : ''}`}>
                      {m.title}
                    </span>
                  </button>
                )
              })}
            </motion.div>
          </RevealOnScroll>

          {/* Right: selected module detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-[#E5E7EB] bg-[#F5F6F8] p-8"
            >
              <div className="grid gap-8 md:grid-cols-2">
                {/* Left content */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#176FEB]">
                      <selected.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-[#0A1628]">{selected.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-[#555860]">{selected.description}</p>

                  {/* Stat */}
                  <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3">
                    <span className="font-heading text-2xl font-bold text-[#176FEB]">{selected.stat.value}</span>
                    <span className="text-xs text-[#555860]">{selected.stat.label}</span>
                  </div>

                  <div className="mt-6">
                    <Link
                      href={selected.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#176FEB] transition-colors hover:text-[#0B5AD4]"
                    >
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Right: capabilities checklist */}
                <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
                  <p className="mb-4 text-xs font-heading font-semibold uppercase tracking-wider text-[#9CA3AF]">Capabilities</p>
                  <ul className="space-y-3">
                    {selected.capabilities.map((cap, i) => (
                      <motion.li
                        key={cap}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: i * 0.06 }}
                        className="flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#5EA500]" />
                        <span className="text-sm text-[#555860]">{cap}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
