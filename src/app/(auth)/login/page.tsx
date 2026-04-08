import type { Metadata } from 'next'
import { LoginClient } from './client'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Revun property management account.',
}

export default function LoginPage() {
  return <LoginClient />
}
