'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

const FAQ_ITEMS = [
  {
    q: 'Can I switch plans later?',
    a: 'Yes. You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.',
  },
  {
    q: 'What counts as an active unit?',
    a: 'A unit with a current lease or an active listing. Vacant, unlisted units are not counted toward your plan.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Self-Manage plans start immediately with no trial period. Agent and Brokerage plans include a 60-day guided launch to get you set up.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept credit card, ACH, and Interac.',
  },
  {
    q: 'Do you offer annual billing?',
    a: 'Yes. Save 20% when you choose annual billing on any plan.',
  },
  {
    q: 'What happens if I exceed my plan limits?',
    a: "We'll reach out before any changes are made. There are no surprise charges.",
  },
  {
    q: 'Can I use Revun for properties in both Canada and the US?',
    a: 'Yes. Revun supports both markets with province and state-specific compliance built in.',
  },
  {
    q: "What's included in the 60-day guided launch?",
    a: 'Onboarding support, your first 2-3 client files set up, and direct access to our launch team throughout the process.',
  },
]

export function PricingFaq() {
  return (
    <section className="border-t bg-brand-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll className="text-center">
          <motion.h2
            variants={revealItem}
            className="font-display text-3xl italic text-brand-indigo md:text-4xl"
          >
            Frequently asked questions
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 text-base text-muted-foreground"
          >
            Everything you need to know about pricing and billing.
          </motion.p>
        </RevealOnScroll>

        <RevealOnScroll className="mt-12" stagger={0.06}>
          <motion.div variants={revealItem}>
            <Accordion>
              {FAQ_ITEMS.map((item, idx) => (
                <AccordionItem key={idx} value={String(idx)}>
                  <AccordionTrigger className="py-5 text-base font-semibold text-foreground hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
