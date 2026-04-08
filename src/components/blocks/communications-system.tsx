'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  Phone,
  Video,
  Users,
  Send,
  Paperclip,
  Smile,
  Search,
  MoreVertical,
  Mic,
  MicOff,
  PhoneOff,
  Check,
  CheckCheck,
  Clock,
  Star,
  Image as ImageIcon,
  FileText,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

/* ═══════════════════════════════════════════ */
/*  Screen data                                */
/* ═══════════════════════════════════════════ */
const screens = [
  {
    title: 'Close In',
    highlight: 'One Place',
    description: 'Manage owners, tenants, vendors, and applicants from a single inbox.',
  },
  {
    title: 'Clear',
    highlight: 'Conversations',
    description: 'Rich messages, read receipts, and delivery status. Always know where things stand.',
  },
  {
    title: 'Connect &',
    highlight: 'Talk',
    description: 'Instantly phone or video call any contact. One-tap calling with full context.',
  },
  {
    title: 'Incoming',
    highlight: 'Call',
    description: 'Accept or decline with a tap. Caller info and linked requests shown automatically.',
  },
  {
    title: 'On a',
    highlight: 'Call',
    description: 'Crystal-clear VoIP with mute, video toggle, and automatic recording.',
  },
  {
    title: 'Meet Together,',
    highlight: 'All at Once',
    description: 'Group video calls with owners, tenants, and vendors. No third-party app needed.',
  },
  {
    title: 'Everything,',
    highlight: 'Saved for Later',
    description: 'Photos, documents, and recordings automatically linked to the right property.',
  },
] as const

/* ─── Mock data ─── */
const chatThreads = [
  { name: 'Sarah M.', role: 'Tenant · Unit 4B', message: 'The dishwasher is making a weird noise...', time: '2m', unread: 2, initials: 'SM', online: true },
  { name: 'David K.', role: 'Owner · 45 Queen', message: 'Can you send me the Q1 report?', time: '15m', unread: 1, initials: 'DK', online: true },
  { name: 'ProFix Plumbing', role: 'Vendor', message: 'Job #1247 done. Invoice attached.', time: '1h', unread: 0, initials: 'PF', online: false },
  { name: 'James L.', role: 'Tenant · Unit 2A', message: 'Thanks! Key fob works perfectly.', time: '3h', unread: 0, initials: 'JL', online: false },
]

const messages = [
  { text: 'Hi, the dishwasher started making a grinding noise.', time: '10:32', mine: false },
  { text: "I'll create a maintenance ticket right away.", time: '10:34', mine: true, status: 'read' as const },
  { text: 'Scheduled ProFix for tomorrow 9-11 AM. Work for you?', time: '10:35', mine: true, status: 'read' as const },
  { text: "Perfect, I'll be home!", time: '10:38', mine: false },
  { text: 'Avoid running it until the tech looks at it.', time: '10:39', mine: true, status: 'sent' as const },
]

const contactList = [
  { name: 'Sarah Mitchell', role: 'Tenant · Unit 4B', initials: 'SM', last: 'Yesterday' },
  { name: 'David Kim', role: 'Owner · 45 Queen', initials: 'DK', last: '2 days ago' },
  { name: 'ProFix Plumbing', role: 'Vendor', initials: 'PF', last: 'Last week' },
]

const meetParticipants = [
  { name: 'You', initials: 'YO', muted: false },
  { name: 'David K.', initials: 'DK', muted: false },
  { name: 'Sarah M.', initials: 'SM', muted: true },
  { name: 'James L.', initials: 'JL', muted: false },
]

const savedFiles = [
  { type: 'image' as const, name: 'Unit 4B · Kitchen', date: 'Mar 12' },
  { type: 'doc' as const, name: 'Q1-Financial-Report.pdf', date: 'Mar 10' },
  { type: 'image' as const, name: 'Move-in · Unit 7A', date: 'Mar 8' },
  { type: 'doc' as const, name: 'Lease-Agreement-MG.pdf', date: 'Mar 5' },
  { type: 'image' as const, name: 'Plumbing fix photo', date: 'Mar 3' },
]

/* ─── Reusable: Avatar ─── */
function Av({ initials, size = 10, online, dark }: { initials: string; size?: number; online?: boolean; dark?: boolean }) {
  return (
    <div className="relative shrink-0">
      <div
        className={`flex items-center justify-center rounded-full font-heading font-semibold ${dark ? 'bg-white/15 text-white' : 'bg-brand-blue/10 text-brand-blue'}`}
        style={{ width: size * 4, height: size * 4, fontSize: size < 10 ? 10 : 12 }}
      >
        {initials}
      </div>
      {online !== undefined && (
        <span className={`absolute -bottom-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${online ? 'bg-brand-success' : 'bg-[#D3D5DB]'}`} />
      )}
    </div>
  )
}

/* ─── Phone chrome ─── */
function PhoneStatusBar({ dark }: { dark?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-5 py-1.5 ${dark ? 'bg-[#0A1628]' : 'bg-[#FAFBFC]'}`}>
      <span className={`text-[10px] font-medium ${dark ? 'text-white/50' : 'text-brand-graphite-mid/60'}`}>9:41</span>
      <div className={`mx-auto h-5 w-20 rounded-full ${dark ? 'bg-white/10' : 'bg-black/5'}`} />
      <div className="flex items-center gap-1">
        {[40, 30, 20].map((o) => (
          <div key={o} className={`h-1.5 w-1 rounded-full ${dark ? `bg-white/${o}` : `bg-brand-graphite-mid/${o}`}`} />
        ))}
      </div>
    </div>
  )
}

function PhoneHomeBar({ dark }: { dark?: boolean }) {
  return (
    <div className="flex justify-center pb-1 pt-1.5">
      <div className={`h-1 w-28 rounded-full ${dark ? 'bg-white/20' : 'bg-black/10'}`} />
    </div>
  )
}

/* ═══════════════════════════════════════════ */
/*  7 Phone Screen Contents                   */
/* ═══════════════════════════════════════════ */

function Screen1() {
  return (
    <div className="flex h-full flex-col bg-white">
      <PhoneStatusBar />
      <div className="flex items-center justify-between border-b border-[#E5E7EB] px-4 py-2.5">
        <span className="font-heading text-sm font-bold text-brand-graphite">Messages</span>
        <Search className="h-3.5 w-3.5 text-brand-graphite-mid" />
      </div>
      <div className="flex-1 overflow-hidden">
        {chatThreads.map((t) => (
          <div key={t.name} className="flex items-start gap-2.5 border-b border-[#E5E7EB]/50 px-4 py-2.5">
            <Av initials={t.initials} size={9} online={t.online} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-brand-graphite">{t.name}</span>
                <span className="text-[9px] text-brand-graphite-mid">{t.time}</span>
              </div>
              <p className="text-[10px] text-brand-graphite-mid">{t.role}</p>
              <p className="mt-0.5 truncate text-[11px] text-brand-graphite/70">{t.message}</p>
            </div>
            {t.unread > 0 && (
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-blue text-[8px] font-bold text-white">{t.unread}</span>
            )}
          </div>
        ))}
      </div>
      <div className="border-t border-[#E5E7EB] px-4 py-2">
        <div className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-blue py-2 text-[11px] font-semibold text-white">
          <Send className="h-3 w-3" /> New Message
        </div>
      </div>
      <PhoneHomeBar />
    </div>
  )
}

function Screen2() {
  return (
    <div className="flex h-full flex-col bg-white">
      <PhoneStatusBar />
      <div className="flex items-center gap-2.5 border-b border-[#E5E7EB] px-4 py-2">
        <Av initials="SM" size={8} online />
        <div className="flex-1">
          <span className="text-xs font-semibold text-brand-graphite">Sarah M.</span>
          <p className="text-[9px] text-brand-success">Online</p>
        </div>
        <Phone className="h-3.5 w-3.5 text-brand-graphite-mid" />
        <Video className="h-3.5 w-3.5 text-brand-graphite-mid" />
      </div>
      <div className="flex-1 space-y-2 overflow-hidden px-3 py-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.mine ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[82%] rounded-2xl px-3 py-1.5 ${m.mine ? 'rounded-br-sm bg-brand-blue text-white' : 'rounded-bl-sm bg-[#F0F2F5] text-brand-graphite'}`}>
              <p className="text-[11px] leading-snug">{m.text}</p>
              <div className={`mt-0.5 flex items-center justify-end gap-0.5 ${m.mine ? 'text-white/50' : 'text-brand-graphite-mid'}`}>
                <span className="text-[8px]">{m.time}</span>
                {m.mine && (m.status === 'read' ? <CheckCheck className="h-2.5 w-2.5" /> : <Check className="h-2.5 w-2.5" />)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-[#E5E7EB] px-3 py-2">
        <div className="flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-2.5 py-1.5">
          <Smile className="h-4 w-4 text-brand-graphite-mid" />
          <span className="flex-1 text-[10px] text-[#D3D5DB]">Type a message...</span>
          <Paperclip className="h-4 w-4 text-brand-graphite-mid" />
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-blue">
            <Send className="h-3 w-3 text-white" />
          </div>
        </div>
      </div>
      <PhoneHomeBar />
    </div>
  )
}

function Screen3() {
  return (
    <div className="flex h-full flex-col bg-white">
      <PhoneStatusBar />
      <div className="flex items-center justify-between border-b border-[#E5E7EB] px-4 py-2.5">
        <span className="font-heading text-sm font-bold text-brand-graphite">Contacts</span>
        <Search className="h-3.5 w-3.5 text-brand-graphite-mid" />
      </div>
      <div className="flex-1 overflow-hidden">
        {contactList.map((c) => (
          <div key={c.name} className="flex items-center gap-2.5 border-b border-[#E5E7EB]/50 px-4 py-3">
            <Av initials={c.initials} size={10} />
            <div className="flex-1">
              <p className="text-xs font-semibold text-brand-graphite">{c.name}</p>
              <p className="text-[10px] text-brand-graphite-mid">{c.role}</p>
              <p className="mt-0.5 flex items-center gap-0.5 text-[9px] text-brand-graphite-mid">
                <Clock className="h-2.5 w-2.5" /> {c.last}
              </p>
            </div>
            <div className="flex gap-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-success/10">
                <Phone className="h-3.5 w-3.5 text-brand-success" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue/10">
                <Video className="h-3.5 w-3.5 text-brand-blue" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-2 text-center text-[9px] text-brand-graphite-mid">
        All calls recorded &amp; linked to property records
      </div>
      <PhoneHomeBar />
    </div>
  )
}

function Screen4() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-white to-brand-blue-tint text-center">
      <PhoneStatusBar />
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="relative mb-4">
          <motion.div
            className="absolute -inset-3 rounded-full border-2 border-brand-blue/20"
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -inset-6 rounded-full border border-brand-blue/10"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />
          <Av initials="SM" size={14} />
        </div>
        <p className="text-[10px] font-medium uppercase tracking-widest text-brand-blue">Incoming Call</p>
        <p className="mt-1.5 font-heading text-base font-semibold text-brand-graphite">Sarah Mitchell</p>
        <p className="mt-0.5 text-[11px] text-brand-graphite-mid">Tenant · Unit 4B</p>
        <div className="mt-8 flex items-center gap-10">
          <motion.div
            className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-error shadow-lg"
            whileHover={{ scale: 1.1 }}
          >
            <PhoneOff className="h-5 w-5 text-white" />
          </motion.div>
          <motion.div
            className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-success shadow-lg"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Phone className="h-5 w-5 text-white" />
          </motion.div>
        </div>
      </div>
      <PhoneHomeBar />
    </div>
  )
}

function Screen5() {
  return (
    <div className="flex h-full flex-col bg-[#0A1628] text-white">
      <PhoneStatusBar dark />
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <Av initials="DK" size={16} dark />
        <p className="mt-4 font-heading text-sm font-semibold">David Kim</p>
        <p className="mt-0.5 text-[10px] text-white/50">Owner · 45 Queen St</p>
        <motion.p
          className="mt-3 font-mono text-xl tabular-nums text-brand-blue-light"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          12:34
        </motion.p>
        <p className="mt-1 text-[9px] text-white/30">Call being recorded</p>
        <div className="mt-8 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <Mic className="h-4 w-4 text-white/70" />
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-error">
            <PhoneOff className="h-5 w-5 text-white" />
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <Video className="h-4 w-4 text-white/70" />
          </div>
        </div>
      </div>
      <PhoneHomeBar dark />
    </div>
  )
}

function Screen6() {
  return (
    <div className="flex h-full flex-col bg-[#0A1628]">
      <PhoneStatusBar dark />
      <div className="border-b border-white/10 px-4 py-2">
        <span className="text-xs font-semibold text-white">Q1 Property Review</span>
        <p className="text-[9px] text-white/40">4 participants</p>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-1.5 p-2">
        {meetParticipants.map((p) => (
          <div key={p.name} className="relative flex flex-col items-center justify-center rounded-xl bg-white/5">
            <Av initials={p.initials} size={12} dark />
            <p className="mt-1.5 text-[10px] font-medium text-white/70">{p.name}</p>
            {p.muted && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-error/80">
                <MicOff className="h-2.5 w-2.5 text-white" />
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-3 border-t border-white/10 px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"><Mic className="h-3.5 w-3.5 text-white/70" /></div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"><Video className="h-3.5 w-3.5 text-white/70" /></div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-error"><PhoneOff className="h-4 w-4 text-white" /></div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"><Users className="h-3.5 w-3.5 text-white/70" /></div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"><MoreVertical className="h-3.5 w-3.5 text-white/70" /></div>
      </div>
      <PhoneHomeBar dark />
    </div>
  )
}

function Screen7() {
  return (
    <div className="flex h-full flex-col bg-white">
      <PhoneStatusBar />
      <div className="flex items-center justify-between border-b border-[#E5E7EB] px-4 py-2.5">
        <span className="font-heading text-sm font-bold text-brand-graphite">Saved</span>
        <Search className="h-3.5 w-3.5 text-brand-graphite-mid" />
      </div>
      <div className="flex gap-1.5 border-b border-[#E5E7EB] px-4 py-2">
        {['All', 'Photos', 'Docs'].map((f, i) => (
          <span key={f} className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${i === 0 ? 'bg-brand-blue text-white' : 'bg-brand-off-white text-brand-graphite-mid'}`}>{f}</span>
        ))}
      </div>
      <div className="flex-1 overflow-hidden">
        {savedFiles.map((f) => (
          <div key={f.name} className="flex items-center gap-2.5 border-b border-[#E5E7EB]/50 px-4 py-2.5">
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${f.type === 'image' ? 'bg-brand-blue/10 text-brand-blue' : 'bg-brand-error/10 text-brand-error'}`}>
              {f.type === 'image' ? <ImageIcon className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-medium text-brand-graphite">{f.name}</p>
              <p className="text-[9px] text-brand-graphite-mid">{f.date}</p>
            </div>
            <Star className="h-3 w-3 text-[#D3D5DB]" />
          </div>
        ))}
      </div>
      <div className="border-t border-[#E5E7EB] px-4 py-2">
        <div className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-blue py-2 text-[11px] font-semibold text-white">
          Get Started <ArrowRight className="h-3 w-3" />
        </div>
      </div>
      <PhoneHomeBar />
    </div>
  )
}

const screenComponents = [Screen1, Screen2, Screen3, Screen4, Screen5, Screen6, Screen7]

/* ═══════════════════════════════════════════ */
/*  3D Carousel                                */
/* ═══════════════════════════════════════════ */
function PhoneCarousel() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(0)
  const total = screens.length
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: false, margin: '-100px 0px' })

  const go = useCallback((to: number) => {
    setDirection(to > active ? 1 : -1)
    setActive(((to % total) + total) % total)
  }, [active, total])

  const next = useCallback(() => go(active + 1), [active, go])
  const prev = useCallback(() => go(active - 1), [active, go])

  /* Autoplay - pause on hover */
  useEffect(() => {
    if (!inView) return
    autoplayRef.current = setInterval(next, 4000)
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current) }
  }, [next, inView])

  const pauseAutoplay = () => { if (autoplayRef.current) clearInterval(autoplayRef.current) }
  const resumeAutoplay = () => {
    pauseAutoplay()
    autoplayRef.current = setInterval(next, 4000)
  }

  /* Visible indices: prev, active, next */
  const getVisible = () => {
    const p = ((active - 1) + total) % total
    const n = (active + 1) % total
    return [p, active, n]
  }

  const visible = getVisible()

  /* Position config for the 3 visible phones */
  const positionConfig = (slot: number) => {
    // slot 0 = left, 1 = center, 2 = right
    if (slot === 1) return { x: 0, scale: 1, z: 20, opacity: 1, rotateY: 0 }
    if (slot === 0) return { x: -280, scale: 0.82, z: 0, opacity: 0.6, rotateY: 12 }
    return { x: 280, scale: 0.82, z: 0, opacity: 0.6, rotateY: -12 }
  }

  return (
    <div
      ref={sectionRef}
      className="relative"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      {/* Carousel viewport */}
      <div className="relative mx-auto h-[540px] max-w-3xl" style={{ perspective: 1200 }}>
        <AnimatePresence mode="popLayout">
          {visible.map((screenIdx, slot) => {
            const config = positionConfig(slot)
            const screen = screens[screenIdx]
            const ScreenComp = screenComponents[screenIdx]
            const isDark = screenIdx === 4 || screenIdx === 5

            return (
              <motion.div
                key={screenIdx}
                className="absolute left-1/2 top-0 w-[240px] cursor-pointer"
                style={{ transformStyle: 'preserve-3d', zIndex: config.z }}
                initial={{
                  x: direction > 0 ? 400 : -400,
                  scale: 0.7,
                  opacity: 0,
                  rotateY: direction > 0 ? -20 : 20,
                  marginLeft: -120,
                }}
                animate={{
                  x: config.x,
                  scale: config.scale,
                  opacity: config.opacity,
                  rotateY: config.rotateY,
                  marginLeft: -120,
                }}
                exit={{
                  x: direction > 0 ? -400 : 400,
                  scale: 0.7,
                  opacity: 0,
                  rotateY: direction > 0 ? 20 : -20,
                  marginLeft: -120,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                onClick={() => {
                  if (slot === 0) prev()
                  if (slot === 2) next()
                }}
              >
                {/* Title + description */}
                <motion.div
                  className="mb-4 text-center"
                  animate={{ opacity: slot === 1 ? 1 : 0.4 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-heading text-sm font-semibold leading-tight text-brand-graphite md:text-base">
                    {screen.title}{' '}
                    <span className="text-brand-blue">{screen.highlight}</span>
                  </h3>
                  <p className="mt-1.5 text-[11px] leading-snug text-brand-graphite-mid md:text-xs">
                    {screen.description}
                  </p>
                </motion.div>

                {/* Phone frame */}
                <motion.div
                  className={`overflow-hidden rounded-[28px] border-2 ${isDark ? 'border-white/10 bg-[#0A1628]' : 'border-[#E5E7EB] bg-white'}`}
                  animate={{
                    boxShadow: slot === 1
                      ? '0 20px 60px rgba(10,22,40,0.18), 0 8px 20px rgba(10,22,40,0.1)'
                      : '0 4px 16px rgba(10,22,40,0.08)',
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="h-[400px]">
                    <ScreenComp />
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          onClick={() => { pauseAutoplay(); prev(); resumeAutoplay() }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-brand-graphite-mid shadow-sm transition-all hover:border-brand-blue/30 hover:text-brand-blue hover:shadow-md"
          aria-label="Previous screen"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {screens.map((_, i) => (
            <button
              key={i}
              onClick={() => { pauseAutoplay(); go(i); resumeAutoplay() }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? 'w-6 bg-brand-blue' : 'w-2 bg-brand-graphite-light hover:bg-brand-blue/40'
              }`}
              aria-label={`Go to screen ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => { pauseAutoplay(); next(); resumeAutoplay() }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-brand-graphite-mid shadow-sm transition-all hover:border-brand-blue/30 hover:text-brand-blue hover:shadow-md"
          aria-label="Next screen"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════ */
/*  Main export                               */
/* ═══════════════════════════════════════════ */
export function CommunicationsSystem() {
  return (
    <section className="overflow-hidden bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
          >
            Communications
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-4xl font-normal text-brand-graphite md:text-5xl"
          >
            Every conversation in <span className="text-keyword">one place</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-xl text-lg text-brand-graphite/70"
          >
            Built-in phone, video, and messaging for tenants, owners, and vendors.
            No more switching between apps.
          </motion.p>
        </RevealOnScroll>

        {/* 3D Phone Carousel */}
        <div className="mt-16">
          <PhoneCarousel />
        </div>
      </div>
    </section>
  )
}
