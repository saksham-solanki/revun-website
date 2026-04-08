'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

const faqs = [
  {
    q: 'Can I switch plans later?',
    a: 'Yes. Upgrade or downgrade anytime. Changes take effect on your next billing cycle. No penalties.',
  },
  {
    q: 'What counts as a unit?',
    a: 'Any property with a current lease or active listing. Vacant, unlisted units are not billed.',
  },
  {
    q: 'Is there a free trial?',
    a: 'The Free plan is free forever for 1-2 units. Growth and Professional plans include a 14-day free trial with full access.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Credit card, ACH, and Interac (Canada). All payments processed securely through Stripe.',
  },
  {
    q: 'Do you offer annual billing?',
    a: 'Yes. Save 20% with annual billing on Growth and Professional plans.',
  },
  {
    q: 'What happens if I exceed my plan limits?',
    a: 'We notify you before any changes. No surprise charges. You can upgrade or we can discuss custom pricing.',
  },
  {
    q: 'Can I use Revun for properties in both Canada and the US?',
    a: 'Yes. Revun supports both markets with province and state-specific compliance workflows built in.',
  },
  {
    q: 'How do I cancel?',
    a: 'Cancel anytime from your account settings. No long-term contracts, no cancellation fees.',
  },
]

export function PricingFaq() {
  return (
    <section className="border-t border-[#E5E7EB] bg-[#F5F6F8] py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-6">
        <RevealOnScroll className="text-center mb-12">
          <motion.h2
            variants={revealItem}
            className="font-heading font-extrabold text-3xl text-[#0A1628]"
          >
            Frequently asked <span className="text-[#176FEB]">questions</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 text-[#555860] text-base"
          >
            Everything you need to know about pricing and billing.
          </motion.p>
        </RevealOnScroll>

        <RevealOnScroll>
          <motion.div variants={revealItem}>
            <Accordion>
              {faqs.map((faq) => (
                <AccordionItem key={faq.q} className="border-b border-[#E5E7EB]">
                  <AccordionTrigger className="py-5 text-base font-medium text-[#0A1628] hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#555860] text-sm leading-relaxed pb-5">
                    {faq.a}
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
