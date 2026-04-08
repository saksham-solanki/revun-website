'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  Plus,
  Search,
  MoreVertical,
  ChevronRight,
} from 'lucide-react'

/* ---------- types ---------- */
type Tab = 'wallet' | 'stays' | 'investments'

interface Transaction {
  initials: string
  name: string
  type: string
  time: string
  amount: string
  color: string
}

/* ---------- mock data ---------- */
const TRANSACTIONS: Transaction[] = [
  { initials: 'JD', name: 'John D', type: 'Rent', time: '11:12 AM', amount: '$2,200.00', color: 'text-[#0A1628]' },
  {
    initials: '21',
    name: '2191 43rd Avenue',
    type: 'Maintenance',
    time: '11:12 AM',
    amount: '-$450.52',
    color: 'text-[#E7000B]',
  },
  {
    initials: 'AO',
    name: 'Aiden O',
    type: 'Advance payment',
    time: '11:12 AM',
    amount: '$4,400.00',
    color: 'text-[#0A1628]',
  },
  {
    initials: 'CR',
    name: 'Credit',
    type: 'Cleaning',
    time: '09:07 AM',
    amount: '+$250.00',
    color: 'text-[#5EA500]',
  },
]

const STAY_TRANSACTIONS: Transaction[] = [
  { initials: 'RP', name: 'Rent Payment', type: 'Monthly', time: 'Dec 01', amount: '$2,200.00', color: 'text-[#0A1628]' },
  { initials: 'UT', name: 'Utilities', type: 'Hydro', time: 'Nov 28', amount: '-$185.40', color: 'text-[#E7000B]' },
  { initials: 'PK', name: 'Parking', type: 'Monthly', time: 'Nov 15', amount: '$150.00', color: 'text-[#0A1628]' },
]

const CHART_DATA = [
  { month: 'Mar', income: 3200, expenses: 1800 },
  { month: 'Apr', income: 2800, expenses: 2200 },
  { month: 'May', income: 3600, expenses: 1500 },
  { month: 'Jun', income: 4000, expenses: 2000 },
  { month: 'Jul', income: 3400, expenses: 2600 },
  { month: 'Aug', income: 3800, expenses: 1900 },
]

const CHART_MAX = 4000

/* ================================================================== */
/*  Tab content components                                            */
/* ================================================================== */

function WalletAndDues() {
  return (
    <div className="space-y-6">
      {/* Amount due */}
      <div>
        <p className="text-sm text-[#555860]">Amount due</p>
        <p className="font-heading text-2xl font-bold text-[#0A1628]">$2,500.00</p>
        <p className="mt-1 text-sm text-[#555860]">Due by: 31/12/2025</p>
      </div>

      {/* Payment buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button className="h-12 w-full rounded-xl bg-[#176FEB] font-heading text-sm font-semibold text-white transition-colors hover:bg-[#1260d1]">
          Pay $57/week
        </button>
        <button className="h-12 w-full rounded-xl border border-[#E5E7EB] font-heading text-sm font-semibold text-[#0A1628] transition-colors hover:bg-[#F9FAFB]">
          Pay full
        </button>
      </div>

      {/* Promo card */}
      <div className="rounded-xl border border-[#FCD34D] bg-[#FEF3C7] p-4">
        <p className="font-heading text-sm font-semibold text-[#0A1628]">
          Congrats! You are eligible for up to $6,250 loan
        </p>
        <p className="mt-1 text-xs text-[#555860]">No repayment limit!</p>
        <a
          href="/wallet/"
          className="mt-2 inline-block text-sm font-semibold text-[#176FEB] transition-colors hover:text-[#1260d1]"
        >
          Get Flex Loan <ChevronRight className="inline size-4" />
        </a>
      </div>

      {/* Wallet balance */}
      <div className="flex items-center justify-between rounded-xl border border-[#E5E7EB] p-4">
        <span className="text-sm text-[#555860]">Wallet balance</span>
        <span className="font-heading text-xl font-bold text-[#0A1628]">$2,400.00</span>
      </div>
    </div>
  )
}

function MyStays() {
  return (
    <div className="space-y-6">
      {/* Financial overview */}
      <p className="font-heading text-sm font-semibold text-[#0A1628]">Financial overview</p>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-[#E5E7EB] p-4">
          <p className="text-xs text-[#555860]">Deposits</p>
          <p className="font-heading text-lg font-bold text-[#0A1628]">$4,650.00</p>
        </div>
        <div className="rounded-xl border border-[#E5E7EB] p-4">
          <p className="text-xs text-[#555860]">Payments</p>
          <p className="font-heading text-lg font-bold text-[#176FEB]">$27,621.98</p>
        </div>
        <div className="rounded-xl border border-[#E5E7EB] p-4">
          <p className="text-xs text-[#555860]">Posted Items</p>
          <p className="font-heading text-lg font-bold text-[#E7000B]">$29,821.98</p>
        </div>
      </div>

      {/* Unpaid items */}
      <div className="flex items-center justify-between rounded-xl border border-[#E5E7EB] p-4">
        <span className="text-sm text-[#555860]">Unpaid items</span>
        <a
          href="/wallet/"
          className="font-heading text-sm font-semibold text-[#176FEB] transition-colors hover:text-[#1260d1]"
        >
          $1,250.00 <ChevronRight className="inline size-4" />
        </a>
      </div>

      {/* Transaction list */}
      <div className="space-y-1">
        <p className="font-heading text-sm font-semibold text-[#0A1628]">Transactions</p>
        <ul className="divide-y divide-[#E5E7EB]">
          {STAY_TRANSACTIONS.map((tx) => (
            <li key={`${tx.name}-${tx.time}`} className="flex items-center gap-3 py-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#E8F2FE] font-heading text-xs font-semibold text-[#176FEB]">
                {tx.initials}
              </span>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-[#0A1628]">{tx.name}</p>
                <p className="text-xs text-[#555860]">
                  {tx.type} &middot; {tx.time}
                </p>
              </div>
              <span className={`font-heading text-sm font-semibold ${tx.color}`}>{tx.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function MyInvestments() {
  return (
    <div className="space-y-6">
      {/* Net income */}
      <div>
        <p className="text-sm text-[#555860]">Net income</p>
        <p className="font-heading text-2xl font-bold text-[#0A1628]">$200,900.00</p>
      </div>

      {/* Income / Expenses row */}
      <div className="flex gap-6">
        <div>
          <p className="text-xs text-[#555860]">Income</p>
          <p className="font-heading text-lg font-bold text-[#5EA500]">$246,900.00</p>
        </div>
        <div>
          <p className="text-xs text-[#555860]">Expenses</p>
          <p className="font-heading text-lg font-bold text-[#E7000B]">$85,621.98</p>
        </div>
      </div>

      {/* Bar chart */}
      <div className="rounded-xl border border-[#E5E7EB] p-4">
        <div className="flex items-end gap-4">
          {/* Y-axis labels */}
          <div className="flex flex-col justify-between text-right text-[10px] text-[#555860]" style={{ height: 160 }}>
            <span>$4k</span>
            <span>$3k</span>
            <span>$2k</span>
            <span>$1k</span>
          </div>

          {/* Bars */}
          <div className="flex flex-1 items-end justify-between gap-2">
            {CHART_DATA.map((d) => (
              <div key={d.month} className="flex flex-col items-center gap-1">
                <div className="flex items-end gap-1" style={{ height: 160 }}>
                  <div
                    className="w-4 rounded-t bg-[#176FEB]"
                    style={{ height: (d.income / CHART_MAX) * 160 }}
                  />
                  <div
                    className="w-4 rounded-t bg-[#E7000B]"
                    style={{ height: (d.expenses / CHART_MAX) * 160 }}
                  />
                </div>
                <span className="text-[10px] text-[#555860]">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex gap-4">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-[#176FEB]" />
            <span className="text-xs text-[#555860]">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-[#E7000B]" />
            <span className="text-xs text-[#555860]">Expenses</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ================================================================== */
/*  Main client component                                             */
/* ================================================================== */

const TABS: { key: Tab; label: string }[] = [
  { key: 'wallet', label: 'Wallet & Dues' },
  { key: 'stays', label: 'My Stays' },
  { key: 'investments', label: 'My Investments' },
]

const ACTION_BUTTONS = [
  { icon: ArrowDownLeft, label: 'Request' },
  { icon: ArrowUpRight, label: 'Send' },
  { icon: Wallet, label: 'Withdraw' },
  { icon: Plus, label: 'Add' },
] as const

export function WalletDashboardClient() {
  const [activeTab, setActiveTab] = useState<Tab>('wallet')

  return (
    <main className="bg-[#F9FAFB]">
      {/* -------- Hero -------- */}
      <section className="relative border-b border-[#E5E7EB] bg-white py-12 lg:py-14 overflow-hidden">
        {/* Ambient blob */}
        <div className="absolute top-0 right-[-200px] h-[400px] w-[400px] rounded-full bg-[#176FEB]/[0.04] blur-[100px]" aria-hidden="true" />
        <RevealOnScroll className="mx-auto max-w-3xl px-4 text-center relative z-10">
          <motion.p variants={revealItem} className="font-heading text-xs font-semibold uppercase tracking-widest text-[#176FEB]">
            Wallet
          </motion.p>
          <motion.h1 variants={revealItem} className="mt-3 font-display text-3xl font-bold text-[#0A1628] sm:text-4xl lg:text-5xl">
            Your Property <span className="text-[#176FEB]">Financials</span>
          </motion.h1>
          <motion.p variants={revealItem} className="mt-4 text-base text-[#555860] sm:text-lg">
            See what you owe, track payments, manage investments, and send or withdraw funds - all
            from one dashboard.
          </motion.p>
        </RevealOnScroll>
      </section>

      <div className="mx-auto max-w-2xl space-y-6 px-4 py-10">
        {/* -------- Dashboard card -------- */}
        <motion.div
          className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-editorial"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-[#0A1628]">My Finances</h2>
            <span className="text-xs text-[#555860]">User ID: 34343243</span>
          </div>

          {/* Tabs */}
          <div className="mt-5 flex gap-1 rounded-xl border border-[#E5E7EB] p-1">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                  activeTab === tab.key
                    ? 'bg-[#176FEB] text-white'
                    : 'text-[#555860] hover:bg-[#F3F4F6]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="mt-6">
            {activeTab === 'wallet' && <WalletAndDues />}
            {activeTab === 'stays' && <MyStays />}
            {activeTab === 'investments' && <MyInvestments />}
          </div>
        </motion.div>

        {/* -------- Action buttons -------- */}
        <RevealOnScroll className="flex items-center justify-center gap-6" stagger={0.08}>
          {ACTION_BUTTONS.map((action) => (
            <motion.button
              key={action.label}
              variants={revealItem}
              className="flex flex-col items-center gap-2"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F2FE] text-[#176FEB] transition-colors hover:bg-[#d4e6fd]">
                <action.icon className="size-5" />
              </span>
              <span className="text-xs text-[#555860]">{action.label}</span>
            </motion.button>
          ))}
        </RevealOnScroll>

        {/* -------- Recent transactions -------- */}
        <motion.div
          className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-editorial"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-sm font-semibold text-[#0A1628]">
              Wallet transactions
            </h3>
            <button className="text-[#555860] transition-colors hover:text-[#0A1628]">
              <Search className="size-4" />
            </button>
          </div>

          <ul className="mt-4 divide-y divide-[#E5E7EB]">
            {TRANSACTIONS.map((tx) => (
              <li key={`${tx.name}-${tx.time}-${tx.amount}`} className="flex items-center gap-3 py-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#E8F2FE] font-heading text-xs font-semibold text-[#176FEB]">
                  {tx.initials}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-[#0A1628]">{tx.name}</p>
                  <p className="text-xs text-[#555860]">
                    {tx.type} &middot; {tx.time}
                  </p>
                </div>
                <span className={`font-heading text-sm font-semibold ${tx.color}`}>
                  {tx.amount}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </main>
  )
}
