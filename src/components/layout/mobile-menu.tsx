'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronRight, Home, Building2, Handshake, FileText, Wrench, TrendingUp, Layers, Sparkles, Calendar, Wallet, Plug, MapPin } from 'lucide-react'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { NAV_ITEMS } from './header'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home, Building2, Handshake, FileText, Wrench, TrendingUp, Layers, Sparkles, Calendar, Wallet, Plug, MapPin,
}

// ─── Mobile menu ─────────────────────────────────────────────────────────────

export function MobileMenu({ scrolled }: { scrolled: boolean }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
            scrolled
              ? 'text-brand-graphite hover:bg-[#F5F6F8]'
              : 'text-brand-graphite hover:bg-[#F5F6F8]'
          )}
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </SheetTrigger>

        <SheetContent
          side="right"
          showCloseButton={false}
          className="flex w-full max-w-sm flex-col overflow-y-auto p-0 sm:max-w-sm"
        >
          {/* Header row */}
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setOpen(false)}
            >
              <Image
                src="/logo-dark.svg"
                alt="Revun"
                width={100}
                height={30}
                className="h-7 w-auto"
              />
            </Link>
            <SheetClose
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#555860] transition-colors hover:bg-[#F5F6F8] hover:text-brand-graphite outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5" />
            </SheetClose>
          </div>

          {/* Hidden title for accessibility */}
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>

          {/* Nav items */}
          <nav className="flex-1 px-3 py-3" aria-label="Mobile navigation">
            <Accordion>
              {NAV_ITEMS.map((item) => {
                if (item.children) {
                  return (
                    <AccordionItem key={item.label} value={item.label} className="border-none">
                      <AccordionTrigger className="px-3 py-3 text-[15px] font-heading font-semibold text-brand-graphite hover:no-underline hover:bg-[#F5F6F8] rounded-lg">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className="pb-1">
                        <div className="flex flex-col gap-0.5 pl-3">
                          {item.children.map((child) => {
                            const isActive = pathname.startsWith(child.href)
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  'group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors',
                                  isActive
                                    ? 'bg-brand-blue/8 text-brand-blue'
                                    : 'text-[#555860] hover:bg-[#F5F6F8] hover:text-brand-graphite'
                                )}
                                onClick={() => setOpen(false)}
                              >
                                {'icon' in child && child.icon && iconMap[child.icon] ? (
                                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-blue/8 text-brand-blue">
                                    {(() => { const Icon = iconMap[child.icon!]; return <Icon className="h-4 w-4" /> })()}
                                  </span>
                                ) : null}
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium">{child.label}</p>
                                  <p className="mt-0.5 text-xs text-[#94A3B8] leading-snug">
                                    {child.description}
                                  </p>
                                </div>
                                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#D3D5DB] transition-transform group-hover:translate-x-0.5" />
                              </Link>
                            )
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )
                }

                const isActive = item.href
                  ? pathname === item.href || pathname.startsWith(item.href)
                  : false

                return (
                  <div key={item.label} className="border-none">
                    <Link
                      href={item.href!}
                      className={cn(
                        'flex items-center rounded-lg px-3 py-3 text-[15px] font-heading font-semibold transition-colors',
                        isActive
                          ? 'bg-brand-blue/8 text-brand-blue'
                          : 'text-brand-graphite hover:bg-[#F5F6F8]'
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </div>
                )
              })}
            </Accordion>
          </nav>

          {/* CTAs at bottom */}
          <div className="mt-auto border-t border-border px-5 py-5">
            <div className="flex flex-col gap-2.5">
              <Link
                href="/signup/"
                className="flex items-center justify-center rounded-lg bg-brand-blue px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-blue-dark"
                onClick={() => setOpen(false)}
              >
                Start Free
              </Link>
              <Link
                href="/demo/"
                className="flex items-center justify-center rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm font-semibold text-brand-graphite transition-all hover:bg-[#F5F6F8]"
                onClick={() => setOpen(false)}
              >
                Book Demo
              </Link>
              <Link
                href="/login/"
                className="flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-[#555860] transition-colors hover:text-brand-graphite"
                onClick={() => setOpen(false)}
              >
                Log In
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
