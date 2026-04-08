import type { Metadata } from 'next'
import { HeroSection } from '@/components/blocks/hero-section'
import { AudienceRouter } from '@/components/blocks/audience-router'
import { FeatureShowcase } from '@/components/blocks/feature-showcase'
import { DashboardProof } from '@/components/blocks/dashboard-proof'
import { StatsSection } from '@/components/blocks/stats-section'
import { Testimonials } from '@/components/blocks/testimonials'
import { IntegrationLogos } from '@/components/blocks/integration-logos'
import { HomepageFaq } from '@/components/blocks/homepage-faq'
import { CTASection } from '@/components/blocks/cta-section'

export const metadata: Metadata = {
  title: 'Revun | Property Management Infrastructure for Canada and the United States',
  description:
    'One platform for property management, leasing, maintenance, brokerage, and self-managing owners. Replace fragmented tools with Revun.',
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AudienceRouter />
      <FeatureShowcase />
      <DashboardProof />
      <StatsSection />
      <Testimonials />
      <IntegrationLogos />
      <HomepageFaq />
      <CTASection />
    </>
  )
}
