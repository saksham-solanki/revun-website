import type { Metadata } from 'next'
import { RoleClient } from './client'

export const metadata: Metadata = {
  title: 'Select Your Role',
  description: 'Choose your role to personalize your Revun experience.',
}

export default function RolePage() {
  return <RoleClient />
}
