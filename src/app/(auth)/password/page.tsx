import type { Metadata } from 'next'
import { PasswordClient } from './client'

export const metadata: Metadata = {
  title: 'Set Password',
  description: 'Create a secure password for your Revun account.',
}

export default function PasswordPage() {
  return <PasswordClient />
}
