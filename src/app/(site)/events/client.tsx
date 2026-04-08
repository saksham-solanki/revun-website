'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Calendar,
  MapPin,
  Clock,
  Navigation,
  Shield,
  Star,
  Plus,
  SlidersHorizontal,
  Phone,
  Mic,
  AlertTriangle,
  Users,
  Car,
  Share2,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ── Sample event data ── */

const upcomingEvents = [
  {
    id: 1,
    type: 'Confirmed Tour',
    status: 'confirmed',
    property: '1241-123 Main Street',
    city: 'Niagara Falls, ON',
    date: 'Thu, May 15',
    time: '10:30 AM',
    image: null,
  },
  {
    id: 2,
    type: 'Scheduled Tour',
    status: 'scheduled',
    property: '704-75 Portland St.',
    city: 'Mississauga, ON',
    date: 'Wed, May 14',
    time: '10:30 AM',
    image: null,
  },
  {
    id: 3,
    type: 'Pending Confirmation',
    status: 'pending',
    property: '55 Harbour Square, Unit 3201',
    city: 'Toronto, ON',
    date: 'Fri, May 16',
    time: '2:00 PM',
    image: null,
  },
]

const features = [
  {
    icon: Calendar,
    title: 'Everything, Scheduled',
    description: 'Update events, reschedule if needed, or use directions and ride options to get there on time.',
    color: 'bg-[#176FEB]',
  },
  {
    icon: MapPin,
    title: 'See Events on the Map',
    description: 'View all your upcoming events by location, so you can plan where you are going next.',
    color: 'bg-[#176FEB]',
  },
  {
    icon: Navigation,
    title: 'Navigate the Best Route',
    description: 'See the route, share your location, and invite others so everyone arrives on time.',
    color: 'bg-[#176FEB]',
  },
  {
    icon: Shield,
    title: 'Start Your Tour Safely',
    description: 'Live arrival updates, property details, and a secure PIN to start once your agent arrives.',
    color: 'bg-[#176FEB]',
  },
  {
    icon: Star,
    title: 'Rate Your Experience',
    description: 'Your feedback helps keep schedules accurate and events running smoothly.',
    color: 'bg-[#176FEB]',
  },
  {
    icon: Phone,
    title: 'Safety Tools, Built In',
    description: 'Quick access to help, recordings, and verification, so you feel confident during the tour.',
    color: 'bg-[#176FEB]',
  },
]

const safetyTools = [
  { icon: Mic, label: 'Meet Audio Recording', description: 'Record tours for your records' },
  { icon: CheckCircle2, label: 'Verify Meet with Codes', description: 'PIN-based agent verification' },
  { icon: Share2, label: 'Share Location', description: 'Share live location with contacts' },
  { icon: Phone, label: 'Emergency Services', description: 'Quick access to 911' },
]

/* ── Status badge ── */

function StatusBadge({ status }: { status: string }) {
  const styles = {
    confirmed: 'bg-[#5EA500]/10 text-[#5EA500]',
    scheduled: 'bg-[#176FEB]/10 text-[#176FEB]',
    pending: 'bg-[#F59E0B]/10 text-[#F59E0B]',
  }
  const labels = {
    confirmed: 'Confirmed',
    scheduled: 'Scheduled',
    pending: 'Pending',
  }
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status as keyof typeof styles] || styles.pending}`}>
      {labels[status as keyof typeof labels] || status}
    </span>
  )
}

/* ── Main component ── */

export function EventsClient() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#F5F6F8] py-14 overflow-hidden">
        {/* Ambient blob */}
        <div className="absolute top-[-100px] left-[-150px] h-[400px] w-[400px] rounded-full bg-[#176FEB]/[0.04] blur-[100px]" aria-hidden="true" />
        <RevealOnScroll className="mx-auto max-w-4xl px-6 text-center relative z-10">
          <motion.p variants={revealItem} className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
            Events & Tours
          </motion.p>
          <motion.h1 variants={revealItem} className="mt-3 font-display text-4xl font-normal text-[#0A1628] md:text-5xl">
            Schedule, navigate, and <span className="text-[#176FEB]">tour</span> with confidence
          </motion.h1>
          <motion.p variants={revealItem} className="mx-auto mt-4 max-w-2xl text-lg text-[#555860]">
            Book property tours, get directions, verify agents with secure PINs, and rate your experience. All with built-in safety tools.
          </motion.p>
          <motion.div variants={revealItem} className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/pricing/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0B5AD4]"
            >
              Start Free Trial
            </Link>
            <Link
              href="/demo/"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-6 text-sm font-semibold text-[#2C2E33] transition-colors duration-200 hover:border-[#176FEB]/30"
            >
              Book a Demo
            </Link>
          </motion.div>
        </RevealOnScroll>
      </section>

      {/* Feature grid */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <RevealOnScroll className="text-center mb-12">
            <motion.h2 variants={revealItem} className="font-heading text-2xl font-bold text-[#0A1628] md:text-3xl">
              How it works
            </motion.h2>
          </RevealOnScroll>

          <RevealOnScroll className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={revealItem}
                className="group relative rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all duration-200 hover:border-[#176FEB]/30"
              >
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[#176FEB] to-[#4A91F0] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${f.color}`}>
                  <f.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-heading text-base font-bold text-[#0A1628]">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#555860]">{f.description}</p>
              </motion.div>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* Upcoming events preview */}
      <section className="bg-[#F5F6F8] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#0A1628]">My Events</h2>
              <p className="mt-1 text-sm text-[#555860]">Manage your upcoming property tours</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#555860] transition-colors hover:border-[#176FEB]/30">
                <Plus className="h-4 w-4" />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#555860] transition-colors hover:border-[#176FEB]/30">
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex gap-1 rounded-lg border border-[#E5E7EB] bg-white p-1 w-fit">
            {(['upcoming', 'past'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab
                    ? 'bg-[#176FEB] text-white'
                    : 'text-[#555860] hover:text-[#0A1628]'
                }`}
              >
                {tab === 'upcoming' ? 'Upcoming' : 'Past'}
              </button>
            ))}
          </div>

          {/* Event cards */}
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="group flex items-center gap-5 rounded-xl border border-[#E5E7EB] bg-white p-5 transition-all duration-200 hover:border-[#176FEB]/30 cursor-pointer"
              >
                {/* Property image placeholder */}
                <div className="hidden sm:flex h-20 w-28 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#E8F2FE] to-[#F5F6F8]">
                  <MapPin className="h-6 w-6 text-[#176FEB]/40" />
                </div>

                {/* Event details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <StatusBadge status={event.status} />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-[#0A1628] truncate">
                    {event.property}
                  </h3>
                  <p className="text-sm text-[#555860]">{event.city}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-[#9CA3AF]">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {event.time}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="hidden sm:flex items-center gap-2">
                  <button className="flex h-9 items-center gap-1.5 rounded-lg border border-[#E5E7EB] px-3 text-xs font-medium text-[#555860] transition-colors hover:border-[#176FEB]/30 hover:text-[#176FEB]">
                    <Navigation className="h-3.5 w-3.5" />
                    Directions
                  </button>
                  <button className="flex h-9 items-center gap-1.5 rounded-lg bg-[#176FEB] px-3 text-xs font-medium text-white transition-colors hover:bg-[#0B5AD4]">
                    <Car className="h-3.5 w-3.5" />
                    Uber
                  </button>
                </div>

                <ChevronRight className="h-5 w-5 text-[#D3D5DB] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#176FEB]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tour safety section */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: info */}
            <RevealOnScroll>
              <motion.p variants={revealItem} className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]">
                Safety First
              </motion.p>
              <motion.h2 variants={revealItem} className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl">
                Safety tools, <span className="text-[#176FEB]">built in</span>
              </motion.h2>
              <motion.p variants={revealItem} className="mt-4 text-lg text-[#555860]">
                Quick access to help, recordings, and verification, so you feel confident during every tour.
              </motion.p>

              {/* PIN preview */}
              <motion.div variants={revealItem} className="mt-6 inline-flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-[#F5F6F8] p-4">
                <Shield className="h-5 w-5 text-[#176FEB]" />
                <div>
                  <p className="text-xs text-[#555860]">Secure meeting PIN</p>
                  <p className="font-heading text-lg font-bold tracking-widest text-[#0A1628]">9 5 6 8</p>
                </div>
              </motion.div>
            </RevealOnScroll>

            {/* Right: safety tools grid */}
            <RevealOnScroll className="grid grid-cols-2 gap-4" stagger={0.08}>
              {safetyTools.map((tool) => (
                <motion.div
                  key={tool.label}
                  variants={revealItem}
                  className="flex flex-col items-center rounded-xl border border-[#E5E7EB] bg-white p-5 text-center transition-all duration-200 hover:border-[#176FEB]/30"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F2FE]">
                    <tool.icon className="h-5 w-5 text-[#176FEB]" />
                  </div>
                  <h3 className="font-heading text-sm font-semibold text-[#0A1628]">{tool.label}</h3>
                  <p className="mt-1 text-xs text-[#555860]">{tool.description}</p>
                </motion.div>
              ))}
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Agent rating preview */}
      <section className="bg-[#F5F6F8] py-14">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll className="text-center mb-10">
            <motion.h2 variants={revealItem} className="font-heading text-2xl font-bold text-[#0A1628] md:text-3xl">
              Rate your experience
            </motion.h2>
            <motion.p variants={revealItem} className="mt-3 text-[#555860]">
              Your feedback helps keep schedules accurate and events running smoothly.
            </motion.p>
          </RevealOnScroll>

          <RevealOnScroll>
            <motion.div
              variants={revealItem}
              className="mx-auto max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-6"
            >
              {/* Agent card */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F2FE] font-heading text-xl font-bold text-[#176FEB]">
                  AM
                </div>
                <h3 className="font-heading text-lg font-semibold text-[#0A1628]">Anthony M</h3>
                <div className="mt-2 flex items-center gap-4 text-sm text-[#555860]">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                    4.7
                  </span>
                  <span>1,358 Tours</span>
                  <span>6 Properties</span>
                </div>
              </div>

              {/* Star rating */}
              <div className="mt-6 flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`h-8 w-8 cursor-pointer transition-colors duration-150 ${
                      s <= 4 ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-[#E5E7EB]'
                    }`}
                  />
                ))}
              </div>

              {/* Feedback tags */}
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {['Friendly & Helpful', 'On Time', 'Knowledgeable', 'Professional'].map((tag, i) => (
                  <span
                    key={tag}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                      i < 2
                        ? 'border-[#176FEB] bg-[#E8F2FE] text-[#176FEB]'
                        : 'border-[#E5E7EB] text-[#555860] hover:border-[#176FEB]/30'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button className="mt-6 w-full rounded-xl bg-[#176FEB] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0B5AD4]">
                Submit Review
              </button>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#176FEB] py-14">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
            Ready to schedule your first tour?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-white/80">
            Start your free trial today. No credit card required.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/pricing/"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-[#176FEB] transition-colors duration-200 hover:bg-white/90"
            >
              Start Free Trial
            </Link>
            <Link
              href="/contact/"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
            >
              Contact Sales <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
