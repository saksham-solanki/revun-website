import type { Metadata } from 'next'
import { OnboardingClient } from './client'

export const metadata: Metadata = {
  title: 'Onboarding',
  description: 'Set up your Revun property management account.',
}

export default function OnboardingPage() {
  return <OnboardingClient />
}
