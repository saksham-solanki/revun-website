import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SignUpClient } from './client'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create your Revun property management account.',
}

export default function SignUpPage() {
  return (
    <Suspense>
      <SignUpClient />
    </Suspense>
  )
}
