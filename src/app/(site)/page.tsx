import type { Metadata } from 'next'
import { buildFAQPageSchema, buildBreadcrumbSchema } from '@/lib/schema-builders'
import { sanitizeJsonLd } from '@/lib/utils'
import { HeroSection } from '@/components/blocks/hero-section'
import { AudienceRouter } from '@/components/blocks/audience-router'
import { PoweredByRevun } from '@/components/blocks/powered-by-revun'
import { SelfManageCallout } from '@/components/blocks/self-manage-callout'
import { FeatureShowcase } from '@/components/blocks/feature-showcase'
import { DocumentCompliance } from '@/components/blocks/document-compliance'
import { CommunicationsSystem } from '@/components/blocks/communications-system'
import { PaymentsFintech } from '@/components/blocks/payments-fintech'
import { Testimonials } from '@/components/blocks/testimonials'
import { HomepageFaq } from '@/components/blocks/homepage-faq'
import { CTASection } from '@/components/blocks/cta-section'
import { ReviewBadges } from '@/components/blocks/review-badges'

export const metadata: Metadata = {
  title: 'Revun | Canada\'s Only Full-Stack Property Management Platform',
  description:
    'Revun is the first Canadian-native property management platform combining rent guarantee, tenant screening, lease management, maintenance, and provincial compliance automation for landlords across Canada and the US.',
  alternates: {
    canonical: '/',
  },
}

const homepageFaqs = [
  { question: 'What is Revun?', answer: 'Revun is a property management infrastructure platform for Canada and the United States. It replaces disconnected tools with a single operating system for leasing, payments, maintenance, screening, and more.' },
  { question: 'Who is Revun built for?', answer: 'Revun serves self-managing property owners, property management companies, brokerages, leasing companies, maintenance companies, and REITs. Whether you manage one unit or one thousand, the platform adapts to your role.' },
  { question: 'How much does Revun cost?', answer: 'Revun offers a free tier for self-managing owners. Growth starts at $29/unit/month, Professional at $49/unit/month, and Enterprise pricing is customized. All plans include a free trial with no credit card required.' },
  { question: 'Is Revun available in my province or state?', answer: 'Revun currently operates across all Canadian provinces including Ontario, British Columbia, Alberta, Quebec, Nova Scotia, and Manitoba. US expansion is underway with initial coverage in key states.' },
  { question: 'What integrations does Revun support?', answer: 'Revun integrates with 40+ tools including Stripe, QuickBooks, Xero, DocuSign, Twilio, Salesforce, HubSpot, Zapier, Google Workspace, Microsoft 365, Plaid, and Interac.' },
  { question: 'How do I get started?', answer: 'Sign up for a free account at revun.com. No credit card required. You can start managing properties immediately with our free tier, or book a demo to see the full platform in action.' },
]

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildBreadcrumbSchema([
            { name: 'Home', url: 'https://revun.com/' },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(buildFAQPageSchema(homepageFaqs)),
        }}
      />
      <HeroSection />
      <ReviewBadges />
      <AudienceRouter />
      <PoweredByRevun />
      <SelfManageCallout />
      <FeatureShowcase />
      <DocumentCompliance />
      <CommunicationsSystem />
      <PaymentsFintech />
      <Testimonials />
      <HomepageFaq />
      <CTASection />
    </>
  )
}
