'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { MobileMenu } from './mobile-menu'

// ─── Types ───────────────────────────────────────────────────────────────────

interface NavChild {
  label: string
  description: string
  href: string
  icon?: string
}

interface NavItem {
  label: string
  href?: string
  children?: NavChild[]
}

// ─── Navigation data ─────────────────────────────────────────────────────────

const SOLUTIONS_ITEMS: NavChild[] = [
  {
    label: 'Self-Managing Owners',
    description: 'Manage your property from one app',
    href: '/solutions/self-managing-owners/',
    icon: '🏠',
  },
  {
    label: 'Property Management Companies',
    description: 'Replace fragmented systems',
    href: '/solutions/property-management-companies/',
    icon: '🏢',
  },
  {
    label: 'Brokerages & Agents',
    description: 'Run deals, docs, and communication',
    href: '/solutions/brokerages/',
    icon: '🤝',
  },
  {
    label: 'Leasing Companies',
    description: 'Automate leasing operations',
    href: '/solutions/leasing-companies/',
    icon: '📋',
  },
  {
    label: 'Maintenance Companies',
    description: 'Dispatch, proof of work, invoicing',
    href: '/solutions/maintenance-companies/',
    icon: '🔧',
  },
  {
    label: 'REITs & Asset Managers',
    description: 'Scale with consistency',
    href: '/solutions/reits/',
    icon: '📊',
  },
]

const RESOURCES_ITEMS: NavChild[] = [
  { label: 'Blog', description: 'Insights and updates', href: '/blog/' },
  { label: 'Help Center', description: 'Guides and documentation', href: '/help/' },
  { label: 'Guides', description: 'Step-by-step playbooks', href: '/guides/' },
  { label: 'Case Studies', description: 'Real customer results', href: '/case-studies/' },
]

export const NAV_ITEMS: NavItem[] = [
  { label: 'Platform', href: '/platform/' },
  { label: 'Solutions', children: SOLUTIONS_ITEMS },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Integrations', href: '/integrations/' },
  { label: 'Compare', href: '/compare/' },
  { label: 'Resources', children: RESOURCES_ITEMS },
  { label: 'Support', href: '/support/' },
]

// ─── Animation variants ──────────────────────────────────────────────────────

const dropdownVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94] as const as [number, number, number, number],
      staggerChildren: 0.04,
      delayChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    y: 4,
    scale: 0.98,
    transition: { duration: 0.15, ease: 'easeIn' as const },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
}

// ─── Logo ────────────────────────────────────────────────────────────────────

function Logo({ scrolled }: { scrolled: boolean }) {
  return (
    <Link href="/" className="relative flex items-baseline gap-1 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">
      <span
        className={cn(
          'font-display text-2xl italic tracking-tight transition-colors duration-300',
          scrolled ? 'text-brand-indigo' : 'text-white'
        )}
      >
        Revun
      </span>
      <span
        className={cn(
          'inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-heading font-semibold uppercase leading-none tracking-wider transition-all duration-300',
          scrolled
            ? 'bg-brand-violet/10 text-brand-violet'
            : 'bg-white/15 text-white/80'
        )}
      >
        beta
      </span>
    </Link>
  )
}

// ─── Mega menu: Solutions ────────────────────────────────────────────────────

function SolutionsMegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute left-1/2 top-full mt-2 w-[680px] -translate-x-1/2 rounded-xl border border-border bg-white p-5 shadow-xl shadow-brand-indigo/5"
      role="menu"
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-heading font-semibold uppercase tracking-wider text-brand-slate-400">
          By audience
        </p>
        <Link
          href="/solutions/"
          className="text-xs font-medium text-brand-violet hover:underline"
          onClick={onClose}
        >
          View all solutions
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {SOLUTIONS_ITEMS.map((item) => (
          <motion.div key={item.href} variants={itemVariants}>
            <Link
              href={item.href}
              className="group/card flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-brand-slate-50"
              role="menuitem"
              onClick={onClose}
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-violet/8 text-base transition-colors group-hover/card:bg-brand-violet/12">
                {item.icon}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-heading font-semibold text-brand-indigo group-hover/card:text-brand-violet transition-colors">
                  {item.label}
                </p>
                <p className="mt-0.5 text-xs text-brand-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Dropdown: Resources ─────────────────────────────────────────────────────

function ResourcesDropdown({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute left-1/2 top-full mt-2 w-[280px] -translate-x-1/2 rounded-xl border border-border bg-white p-2 shadow-xl shadow-brand-indigo/5"
      role="menu"
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      {RESOURCES_ITEMS.map((item) => (
        <motion.div key={item.href} variants={itemVariants}>
          <Link
            href={item.href}
            className="flex flex-col rounded-lg px-3 py-2.5 transition-colors hover:bg-brand-slate-50"
            role="menuitem"
            onClick={onClose}
          >
            <span className="text-sm font-heading font-semibold text-brand-indigo">
              {item.label}
            </span>
            <span className="text-xs text-brand-slate-500">{item.description}</span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}

// ─── Desktop nav item ────────────────────────────────────────────────────────

function DesktopNavItem({
  item,
  scrolled,
  openDropdown,
  setOpenDropdown,
}: {
  item: NavItem
  scrolled: boolean
  openDropdown: string | null
  setOpenDropdown: (label: string | null) => void
}) {
  const pathname = usePathname()
  const isOpen = openDropdown === item.label
  const hasChildren = !!item.children
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isActive = item.href
    ? pathname === item.href || pathname.startsWith(item.href)
    : item.children?.some((c) => pathname.startsWith(c.href))

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (hasChildren) setOpenDropdown(item.label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpenDropdown(null)
    }
    if (hasChildren && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      setOpenDropdown(isOpen ? null : item.label)
    }
  }

  const textColor = scrolled
    ? isActive
      ? 'text-brand-violet'
      : 'text-brand-slate-700 hover:text-brand-indigo'
    : isActive
      ? 'text-white'
      : 'text-white/80 hover:text-white'

  if (hasChildren) {
    return (
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          className={cn(
            'inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            textColor
          )}
          aria-expanded={isOpen}
          aria-haspopup="true"
          onKeyDown={handleKeyDown}
        >
          {item.label}
          <ChevronDown
            className={cn(
              'h-3.5 w-3.5 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            item.label === 'Solutions' ? (
              <SolutionsMegaMenu onClose={() => setOpenDropdown(null)} />
            ) : (
              <ResourcesDropdown onClose={() => setOpenDropdown(null)} />
            )
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <Link
      href={item.href!}
      className={cn(
        'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        textColor
      )}
    >
      {item.label}
    </Link>
  )
}

// ─── CTA cluster ─────────────────────────────────────────────────────────────

function CTACluster({ scrolled }: { scrolled: boolean }) {
  return (
    <div className="hidden items-center gap-2 lg:flex">
      <Link
        href="/login/"
        className={cn(
          'rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring',
          scrolled
            ? 'text-brand-slate-600 hover:text-brand-indigo hover:bg-brand-slate-50'
            : 'text-white/80 hover:text-white hover:bg-white/10'
        )}
      >
        Log In
      </Link>
      <Link
        href="/demo/"
        className={cn(
          'rounded-lg border px-3.5 py-2 text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring',
          scrolled
            ? 'border-brand-slate-200 text-brand-indigo hover:bg-brand-slate-50'
            : 'border-white/25 text-white hover:bg-white/10'
        )}
      >
        Book Demo
      </Link>
      <Link
        href="/signup/"
        className="cta-primary-shadow rounded-lg bg-brand-violet px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-violet-dark outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Start Free
      </Link>
    </div>
  )
}

// ─── Header (main export) ────────────────────────────────────────────────────

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll() // check on mount
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdowns on Escape anywhere
  const handleGlobalKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpenDropdown(null)
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => document.removeEventListener('keydown', handleGlobalKeyDown)
  }, [handleGlobalKeyDown])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-white/80 shadow-sm backdrop-blur-xl'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo scrolled={scrolled} />

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <DesktopNavItem
              key={item.label}
              item={item}
              scrolled={scrolled}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />
          ))}
        </nav>

        {/* Desktop CTAs */}
        <CTACluster scrolled={scrolled} />

        {/* Mobile menu trigger + sheet */}
        <MobileMenu scrolled={scrolled} />
      </div>
    </header>
  )
}
