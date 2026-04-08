'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCounter } from '@/hooks/use-counter'
import { Sparkline } from '@/components/ui/sparkline'
import { ScoreRing } from '@/components/ui/score-ring'

export function DashboardProof() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const revenue = useCounter(284500, 2200, inView)
  const occupancy = useCounter(94, 1800, inView)
  const activeUnits = useCounter(847, 2000, inView)
  const satisfaction = useCounter(48, 1500, inView) // 4.8

  return (
    <section className="bg-brand-off-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs font-semibold mb-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-soft-ping rounded-full bg-brand-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-success" />
            </span>
            Live client data
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-normal text-brand-graphite">
            See your portfolio in <span className="text-keyword">real time</span>
          </h2>
          <p className="mt-4 text-[#555860] text-lg max-w-xl mx-auto">
            Track occupancy, revenue, maintenance, and tenant satisfaction from a single dashboard.
          </p>
        </div>

        {/* Dashboard frame */}
        <div ref={ref} className="mx-auto max-w-4xl">
          <div className="shadow-device rounded-2xl overflow-hidden bg-white border border-[#E5E7EB] transition-shadow duration-200 hover:shadow-editorial">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#F5F6F8] border-b border-[#E5E7EB]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FEBD2F]" />
                <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 flex justify-center">
                <span className="text-xs text-[#94A3B8] bg-white rounded-md px-3 py-1 border border-[#E5E7EB]">
                  app.revun.com/dashboard
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-soft-ping rounded-full bg-brand-success opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-success" />
                </span>
                Updated 2h ago
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-6 md:p-8">
              {/* KPI row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {/* Revenue */}
                <div className="rounded-xl border border-[#E5E7EB] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-1">Revenue</p>
                  <p className="text-2xl font-bold text-brand-graphite">${revenue.toLocaleString()}</p>
                  <Sparkline data={[12, 18, 15, 22, 28, 25, 32, 35, 30, 38]} width={80} height={20} className="mt-2" />
                </div>
                {/* Occupancy */}
                <div className="rounded-xl border border-[#E5E7EB] p-4 flex flex-col items-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-2">Occupancy</p>
                  <ScoreRing value={occupancy} size={72} strokeWidth={5} />
                </div>
                {/* Active Units */}
                <div className="rounded-xl border border-[#E5E7EB] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-1">Active Units</p>
                  <p className="text-2xl font-bold text-brand-graphite">{activeUnits.toLocaleString()}</p>
                  <Sparkline data={[50, 55, 58, 62, 65, 70, 72, 78, 80, 85]} width={80} height={20} color="#5EA500" className="mt-2" />
                </div>
                {/* Satisfaction */}
                <div className="rounded-xl border border-[#E5E7EB] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-1">Satisfaction</p>
                  <p className="text-2xl font-bold text-brand-graphite">{(satisfaction / 10).toFixed(1)}/5.0</p>
                  <div className="flex gap-0.5 mt-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill={i <= 4 ? '#F59E0B' : '#E5E7EB'}>
                        <path d="M10 1l2.47 5.01L18 6.87l-4 3.9.94 5.49L10 13.64l-4.94 2.62.94-5.49-4-3.9 5.53-.86L10 1z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mini bar chart */}
              <div className="rounded-xl border border-[#E5E7EB] p-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-brand-graphite">Monthly Revenue by Property</p>
                  <span className="text-xs text-[#94A3B8]">Last 6 months</span>
                </div>
                <div className="flex items-end gap-2 h-24">
                  {[45, 62, 58, 75, 82, 90].map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <motion.div
                        className="w-full rounded-t-sm bg-gradient-to-t from-[#0B5AD4] to-[#176FEB]"
                        initial={{ height: 0 }}
                        animate={inView ? { height: `${val}%` } : { height: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      />
                      <span className="text-[10px] text-[#94A3B8]">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
