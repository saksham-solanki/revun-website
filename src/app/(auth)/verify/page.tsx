import type { Metadata } from 'next'
import { Suspense } from 'react'
import { VerifyClient } from './client'

export const metadata: Metadata = {
  title: 'Verify',
  description: 'Enter the verification code sent to your phone.',
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyClient />
    </Suspense>
  )
}
