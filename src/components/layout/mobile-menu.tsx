'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronRight } from 'lucide-react'
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
              ? 'text-brand-indigo hover:bg-brand-slate-50'
              : 'text-white hover:bg-white/10'
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
              className="flex items-baseline gap-1"
              onClick={() => setOpen(false)}
            >
              <span className="font-display text-xl italic tracking-tight text-brand-indigo">
                Revun
              </span>
              <span className="inline-flex items-center rounded-full bg-brand-violet/10 px-1.5 py-0.5 text-[9px] font-heading font-semibold uppercase leading-none tracking-wider text-brand-violet">
                beta
              </span>
            </Link>
            <SheetClose
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-brand-slate-500 transition-colors hover:bg-brand-slate-50 hover:text-brand-indigo outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                      <AccordionTrigger className="px-3 py-3 text-[15px] font-heading font-semibold text-brand-indigo hover:no-underline hover:bg-brand-slate-50 rounded-lg">
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
                                    ? 'bg-brand-violet/8 text-brand-violet'
                                    : 'text-brand-slate-600 hover:bg-brand-slate-50 hover:text-brand-indigo'
                                )}
                                onClick={() => setOpen(false)}
                              >
                                {'icon' in child && child.icon ? (
                                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-violet/8 text-sm">
                                    {child.icon}
                                  </span>
                                ) : null}
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium">{child.label}</p>
                                  <p className="mt-0.5 text-xs text-brand-slate-400 leading-snug">
                                    {child.description}
                                  </p>
                                </div>
                                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-brand-slate-300 transition-transform group-hover:translate-x-0.5" />
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
                          ? 'bg-brand-violet/8 text-brand-violet'
                          : 'text-brand-indigo hover:bg-brand-slate-50'
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
                className="cta-primary-shadow flex items-center justify-center rounded-lg bg-brand-violet px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-violet-dark"
                onClick={() => setOpen(false)}
              >
                Start Free
              </Link>
              <Link
                href="/demo/"
                className="flex items-center justify-center rounded-lg border border-brand-slate-200 px-4 py-3 text-sm font-semibold text-brand-indigo transition-all hover:bg-brand-slate-50"
                onClick={() => setOpen(false)}
              >
                Book Demo
              </Link>
              <Link
                href="/login/"
                className="flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-brand-slate-500 transition-colors hover:text-brand-indigo"
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
